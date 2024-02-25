import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Input, Spin, Result, List, Card, Checkbox, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { delInvoice } from '../../http/auth';
const { Option } = Select;

export default function Payment(props) {
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const tableData = useStoreState(state => state.auth.tableData)
    const paidViewsUniversity = useStoreState(state => state.auth.paidViewsUniversity)
    const serviceCharge = useStoreState(state => state.auth.serviceCharge)
    const collectionListUni = useStoreActions(state => state.auth.collectionListUni);
    const fetchpaidViewsUniversity = useStoreActions(state => state.auth.fetchpaidViewsUniversity);
    const submitDataFinalUni = useStoreActions(state => state.auth.submitDataFinalUni);
    const authenticateUniversity = useStoreActions(state => state.auth.authenticateUniversity2);
    const authenticateUniversityPassword = useStoreActions(state => state.auth.authenticateUniversityPassword);
    const submitDataBkash = useStoreActions(state => state.auth.submitDataFinalBkashUniversity);

    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password=="false"){
            let payload: any = { username: user?.customStudentId, password: user?.instituteId }
            authenticateUniversity(payload)
        } else  if (password=="true"){
            let unipassword = localStorage.getItem("unipassword");
            let payload: any = { username: user?.customStudentId, password: user?.instituteId, unipassword: unipassword, remember:true }
            authenticateUniversityPassword(payload)
        }
       // authenticateUniversity(payload)
    }, [])

    const [form] = Form.useForm();
    // console.log(paidViewsUniversity)
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const [selectedRowKeys, setselectedRowKeys] = useState<any>([])
    const [pageTableData, setpageTableData] = useState<any>([])
    const [indeterminateSelected, setindeterminateSelected] = useState<any>(false)
    const [allselected, setallselected] = useState<any>(true)
    const [submitTableData, setsubmitTableData] = useState<any>([])
    const [viewData, setviewData] = useState<any>([])
    const [totalPayable, settotalPayable] = useState<any>(0)
    const [identificationId, setidentificationId] = useState<any>(0)
    const [showcharge, setshowcharge] = useState<any>(0)
    useEffect(() => {
        //  console.log("hello")
        setselectedRowKeys([])
        settotalPayable(0)
        let tableDataa = tableData?.feesList?.map(function (item, index) {
            return {
                key: index,
                feeHeadId: item?.feeHeadId,
                feeHeadName: item?.feeHeadName,
                feeSubHeadId: item?.feeSubHeadId,
                feeSubHeadName: item?.feeSubHeadName,
                feeWaiverId: item?.feeWaiverId,
                feeWaiverName: item?.feeWaiverName,
                feeAmount: item?.feeAmount,
                waiverAmount: item?.waiverAmount,
            }
        })
        setidentificationId(tableData?.identificationId)
        setpageTableData(tableDataa)
        let totalPayAbleVal = tableData?.feesList?.map(item => item.feeAmount).reduce((prev, curr) => prev + curr, 0);
        settotalPayable(totalPayAbleVal)
        setsubmitTableData(tableData?.feesList)
        setviewData(tableData?.feesList)
        let temp: any = []
        for (let i = 0; i < tableData?.feesList?.length; i++) {
            temp.push(i)
        }
        setselectedRowKeys(temp)
    }, [tableData])

    const onFinish = (values: any) => {
        //delInvoice({ identificationId: user?.identificationId });
        // console.log(user?.identificationId);
        let payload: any = {
            studentId: user?.studentId,
            instituteId: user?.instituteId,
            semesterYearId: values?.semesterYearId,
        }
        collectionListUni(payload);
        fetchpaidViewsUniversity(payload);
    };



    const columns = [
        {
            title: 'Fee Head Name',
            dataIndex: 'feeHeadName',
            key: 'feeHeadName',
        },
        {
            title: 'Payable Amount',
            dataIndex: 'feeAmount',
            key: 'feeAmount',
        },
        // {
        //     title: 'Waiver Name',
        //     dataIndex: 'waiverName',
        //     key: 'waiverName',
        // }, 
        // {
        //     title: 'Waiver Amount',
        //     dataIndex: 'waiverAmount',
        //     key: 'waiverAmount',
        // }, 
    ];

    const columns2 = [
        {
            title: 'Fee Head Name',
            dataIndex: 'feeHeadName',
            key: 'feeHeadName',
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
        },
    ]
    const onSelectChange = (selectedRowKeys, value) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setsubmitTableData(value);
        setselectedRowKeys(selectedRowKeys);

        let totalPayAbleVal = value
            .map(item => item.feeAmount)
            .reduce((prev, curr) => prev + curr, 0);
        settotalPayable(totalPayAbleVal)

    };
    const rowSelection = {
        preserveSelectedRowKeys: true,
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => {
            return {
                disabled: user?.onlineFeesCheckOption===0?true:false,
            };
        },
    };

    // console.log(selectedRowKeys)

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const onPay = () => {
        let details = submitTableData.map(function (item) {
            return {
                "feeAmount": item?.feeAmount,
                "feeHeadId": item?.feeHeadId,
                "waiverAmount": item?.waiverAmount,
                "waiverId": null,
            }
        });
        // let details = tableData.map(function (item) {
        //     return {
        //         "feeAmount": item?.feeAmount,
        //         "feeHeadId": item?.feeHeadId,
        //         "feeSubHeadId": item?.feeSubHeadId,
        //         "waiverAmount": item?.waiverAmount,
        //         "waiverId": item?.feeWaiverId
        //     }
        // });


        let postData: any = {
            identificationId: identificationId,
            serviceCharge: serviceCharge,
            details: details
        };
        if (user?.ofpsType==="bkash"){
            submitDataBkash(postData)
        } else {
            submitDataFinalUni(postData)
        }
    }

    const mobileSelectAll = (e) => {
        setindeterminateSelected(false)
        let temp:any = [];

            temp = viewData?.map(item=>{
                return {
                        "feeHeadId": item?.feeHeadId,
                        "feeHeadName": item?.feeHeadName,
                        "waiverAmount": item?.waiverAmount,
                        "waiverId": item?.waiverId,
                        "waiverName": item?.waiverName,
                        "feeAmount": item?.feeAmount,
                        "selected" : !allselected
                }
            })
            setallselected(!allselected)
            setviewData(temp)
            setsubmitTableData(allselected?[]:temp)
            let totalPayAbleVal = temp
                .map(item => item?.feeAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(allselected?0:totalPayAbleVal)

        }


    const mobileSelect = (e, item, index) => {
        const newData: any = [...viewData];
        newData[index]['selected']= e;
        let newdatalen= newData?.filter(item=>item?.selected==true)?.length;
        let viewdatalen= viewData?.length;
        if (viewdatalen===newdatalen){
            setallselected(true);
            setindeterminateSelected(false);
        } else if (newdatalen<viewdatalen && newdatalen!=0){
            setallselected(false);
            setindeterminateSelected(true);
        } else if (newdatalen===0){
            setallselected(false);
            setindeterminateSelected(false);
        }
        setviewData(newData)

        let temp;
        if (e) {
            temp = [...submitTableData, item]
            setsubmitTableData(temp)
            let totalPayAbleVal = temp
                .map(item => item.feeAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(totalPayAbleVal)

        }
        if (!e) {
            temp = submitTableData.filter(i => i.feeHeadId !== item.feeHeadId);
            setsubmitTableData(temp)
            let totalPayAbleVal = temp
                .map(item => item.feeAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(totalPayAbleVal)
        }
    }


    return (
        <>
            <br />
            <div className={isMobile ? 'mobileView' : "mt-25 mb-sm-25"}>
                <Card title="Fee Payment">
                    <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                    <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                        <Row gutter={15}>
                            <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                                <Form.Item
                                    name="semesterYearId"
                                    label="Semester Year:"
                                    className="title-Text custon-form-wrapper"
                                    rules={[
                                        { required: true, message: "Please Select semester year" },
                                    ]}
                                >
                                    <Select allowClear placeholder="Select Semester Year" >
                                        {user?.semesterYearList?.map((item: any, index: any) => {
                                            return (
                                                <Option value={item.id} key={index}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <Form.Item className="mb-sm-0">
                                    <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                        Search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                {/* <br /> */}

                {!isMobile && <><br /></>}
                {/* <Skeleton active /> */}
                <Row>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        {tableData?.feesList?.length > 0 &&
                            <Card title={"Payable fees:"}>

                                <>
                                    {
                                        isMobile ?
                                            <List
                                                itemLayout="vertical"
                                                dataSource={viewData}
                                                size="large"
                                                pagination={false}
                                                header={<div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                <div>
                                                    <Checkbox disabled={user?.onlineFeesCheckOption===0?true:false} indeterminate={indeterminateSelected} checked={allselected} onChange={(e) => mobileSelectAll(e.target.checked)}  ></Checkbox>
                                                </div>
                                                <div style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                                    Select All
                                                </div>

                                            </div>
                                            }

                                                renderItem={(item: any, index:any) => (
                                                    <List.Item key={item.key}>
                                                        <ul className="w3-ul w3-card-4 payment-fee-list">
                                                            <li className="w3-bar">
                                                                <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right">{item?.feeAmount}</span>
                                                                <div className="w3-bar-item">
                                                                    <div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                        <div>
                                                                            <Checkbox disabled={user?.onlineFeesCheckOption===0?true:false} checked={item?.selected} onChange={(e) => mobileSelect(e.target.checked, item, index)} ></Checkbox>
                                                                        </div>
                                                                        <div style={{ marginLeft: 5 }}>
                                                                            <span style={{ fontWeight: "bold" }}>{item?.feeHeadName}</span><br />
                                                                            {/* <span>{item?.feeSubHeadName}</span> */}
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>
                                                        </ul>

                                                    </List.Item>
                                                )}
                                            /> :
                                            <Table
                                                bordered={true}
                                                dataSource={pageTableData}
                                                columns={columns}
                                                rowSelection={rowSelection}
                                            />
                                    }
                                    {isMobile &&
                                        <>
                                            {user?.onlinePaymentStatus === 1 ?
                                                <>
                                                    <span style={{ marginTop: 10, fontSize: 10, marginBottom: -10 }}> * {serviceCharge} Taka Service Charge</span>
                                                    <div className="payableWrapper">
                                                        <div className="totalPayable">
                                                            <div className="totalPayableTitle"> Total Payable</div>
                                                            <h3 className="totalPayableCount">{totalPayable + serviceCharge}</h3>
                                                        </div>
                                                        <div className="bg">
                                                        </div>
                                                    </div>

                                                    <Button type="primary" className="mb-sm-25" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", padding: 10, height: "auto" }} disabled={totalPayable > 0 ? false : true} onClick={() => onPay()}>
                                                        Pay Now
                                                    </Button>
                                                </> :
                                                <div style={{ textAlign: 'center', padding: 20 }}>
                                                    <strong style={{ fontSize: 16, color: 'red' }}>Online payment is currently disabled</strong>
                                                </div>
                                            }
                                        </>

                                    }

                                </>

                            </Card>
                        }
                        {tableData?.feesList?.length > 0 &&
                            <>
                                {!isMobile &&
                                    <Row className='mt-30'>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <div className="payment-instruction-wrapper">
                                                <span className="text-highlight">*Marked fields are mandatory</span>
                                                {<span>{serviceCharge} Taka Service Charge </span>}
                                                {/* <span>2. XYZ</span> */}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            {user?.onlinePaymentStatus === 1 ?
                                                <Row className='d-flex align-items-center justify-content-between payable-wrapper'>
                                                    <Col span={12} style={{ paddingRight: "6px" }}>
                                                        <Form.Item className='payment-input'>
                                                            <span>Total Payable:</span>
                                                            <Input placeholder="Total Payable" disabled value={totalPayable + serviceCharge} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} style={{ paddingLeft: "6px" }}>
                                                        <Form.Item>
                                                            <div className="mb-sm-25">
                                                                <Button className='success-button' type="primary" id="mb-sm-25 demo" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", }} disabled={totalPayable > 0 ? false : true} onClick={() => onPay()}>
                                                                    Pay
                                                                </Button>
                                                            </div>
                                                        </Form.Item>
                                                    </Col>
                                                </Row> :

                                                <div style={{ textAlign: 'center', padding: 20 }}>
                                                    <strong style={{ fontSize: 16, color: 'red' }}>Online payment is currently disabled</strong>
                                                </div>
                                            }
                                        </Col>

                                    </Row>
                                }
                            </>
                        }
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        {paidViewsUniversity?.length > 0 &&
                            <Card title={"Paid fees:"}>

                                <>
                                    {
                                        isMobile ?
                                            <List
                                                itemLayout="vertical"
                                                dataSource={paidViewsUniversity}
                                                size="large"
                                                pagination={false}


                                                renderItem={(item: any) => (
                                                    <List.Item key={item.key}>
                                                        <ul className="w3-ul w3-card-4 payment-fee-list">
                                                            <li className="w3-bar">

                                                                <div className="w3-bar-item">
                                                                    <div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                        <div style={{ marginLeft: 5 }}>
                                                                            <span style={{ fontWeight: "bold" }}>Fee Head: {item?.feeHeadName}</span><br />
                                                                            <span style={{ fontWeight: "bold" }}>Paid Amount: {item?.paidAmount}</span><br />
                                                                            {/* <span>{item?.feeSubHeadName}</span> */}
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>
                                                        </ul>

                                                    </List.Item>
                                                )}
                                            /> :
                                            <Table
                                                bordered={true}
                                                dataSource={paidViewsUniversity}
                                                columns={columns2}
                                            />
                                    }


                                </>

                            </Card>
                        }
                    </Col>
                </Row>




            </div>
        </>
    )
}
