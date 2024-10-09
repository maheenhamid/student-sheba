import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Input, Spin, Result, List, Card, Checkbox, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { SelectAcademicYear } from '../profile/SelectAcademicYear';



export default function Payment(props) {
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const tableDatax = useStoreState(state => state.auth.tableData)
    const paidViews = useStoreState(state => state.auth.paidViews)
    const serviceCharge = useStoreState(state => state.auth.serviceCharge)
    const show = useStoreState(state => state.auth.show)
    const totalserviceCharge = useStoreState(state => state.auth.totalserviceCharge)
    const operationIdentificationId = useStoreState(state => state.auth.operationIdentificationId)
    const collectionList = useStoreActions(state => state.auth.collectionList);
    const collectionListWithoutMonth = useStoreActions(state => state.auth.collectionListWithoutMonth);
    const fetchpaidViews = useStoreActions(state => state.auth.fetchpaidViews);
    const submitDataFinal = useStoreActions(state => state.auth.submitDataFinal);
    const submitDataBkash = useStoreActions(state => state.auth.submitDataFinalBkash);
    const submitDataForSSL = useStoreActions(state => state.auth.submitDataFinalForSSL);
    const submitDataUpayPgw = useStoreActions(state => state.auth.submitDataFinalUpayPgw);
    const fetchacademicYearList = useStoreActions((state) => state.auth.fetchacademicYearList);
    const [form] = Form.useForm();

    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const [selectedRowKeys, setselectedRowKeys] = useState<any>([])
    const [pageTableData, setpageTableData] = useState<any>([])
    const [submitTableData, setsubmitTableData] = useState<any>([])
    const [tableData, settableData] = useState<any>([])
    const [totalPayable, settotalPayable] = useState<any>(0)
    const [totalCharge, settotalCharge] = useState<any>(0)
    const [charge, setcharge] = useState<any>(0)
    const [showcharge, setshowcharge] = useState<any>(0)

    useEffect(() => {
        setTimeout(() => {
            checkTableData(user?.allFeeCheckStatus, tableDatax)
        }, 200);
    }, [tableDatax]);

    function checkTableData (allFeeCheckStatus, tablelist) {
        let checkdata = [];
        if (allFeeCheckStatus===0) {
            checkdata = tablelist.map(item => {
                return {
                  ...item,
                  selected: true,
                  payableList: item.payableList.map(datas => {
                    return {
                      ...datas,
                      selected: true,
                    }
                  })
                }
            });
            common(checkdata);
            settableData(checkdata);
        } else {
            settableData(tablelist);
        }
    }

    function selectionCheckFeeHead (){
        if (user?.allFeeCheckStatus===0){
            return true;
        } else {
            return false;
        }
    }

    function selectionCheckFeeSubHead (){
        if (user?.allFeeCheckStatus===0){
            return true;
        } else if (user?.feeSubheadCheckStatus===0) {
            return true;
        } else return false
    }


    useEffect(() => {
        settotalCharge(totalserviceCharge)
    }, [totalserviceCharge])

    useEffect(() => {
        setcharge(serviceCharge)
    }, [serviceCharge])

    useEffect(() => {
        fetchacademicYearList(user?.instituteId)
    }, [])



    const onFinish = (values: any) => {
 
      
        // delInvoice({ identificationId: user?.identificationId });
        // console.log(user?.identificationId);
        setshowcharge(0);
        setcharge(0);
        settotalCharge(0);
        settotalPayable(0);
        let payload: any = {
            studentId: user?.studentId,
            instituteId: user?.instituteId,
            academicYear: values?.year,
        }
        //collectionList(payload);
        collectionListWithoutMonth(payload);
    };



    // console.log(paidViews)

    const currentyear = new Date().getFullYear();

    // console.log(currentyear)

    const optionsYear = [
        { value: currentyear - 1, label: currentyear - 1 },
        { value: currentyear, label: currentyear },
        { value: currentyear + 1, label: currentyear + 1 }
    ]

    const optionsMonth = [
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" }

    ]

    const onSelectChange = (selectedRowKeys, value) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setsubmitTableData(value);
        setselectedRowKeys(selectedRowKeys);

        let totalPayAbleVal = value
            .map(item => item.payableAmount)
            .reduce((prev, curr) => prev + curr, 0);
        settotalPayable(totalPayAbleVal)

    };
    const rowSelection = {
        preserveSelectedRowKeys: true,
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // console.log(selectedRowKeys)

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const onPay = () => {
        let details = submitTableData.map(function (item) {
            return {
                "feeAmount": item?.feeAmount,
                "feeHeadId": item?.feeHeadId,
                "feeSubHeadId": item?.feeSubHeadId,
                "waiverAmount": item?.waiverAmount,
                "waiverId": item?.feeWaiverId,
                "fineAmount": item?.fineAmount
            }
        });
        let postData: any = {
            identificationId: operationIdentificationId,
            serviceCharge: showcharge,
            details: details
        };

        if (user?.ofpsType==="bkash"){
            submitDataBkash(postData)
        } else if (user?.ofpsType==="upaypgw"){
            submitDataUpayPgw(postData)
        }else if (user?.ofpsType==="ssl"){
            submitDataForSSL(postData)
        } else {
            submitDataFinal(postData)
        }
        
    }

    const mobileSelect = (e, item) => {
        let temp;
        if (e) {
            temp = [...submitTableData, item]
            setsubmitTableData(temp)
            let totalPayAbleVal = temp
                .map(item => item.payableAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(totalPayAbleVal)

        }
        if (!e) {
            temp = submitTableData.filter(i => i.feeSubHeadId !== item.feeSubHeadId);
            setsubmitTableData(temp)
            let totalPayAbleVal = temp
                .map(item => item.payableAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(totalPayAbleVal)

        }

    }

    const onchangeValue: any =
        useCallback((i1, i2, payableList) => (e: React.ChangeEvent<HTMLInputElement>) => {

            const newData: any = [...tableData];
            newData[i1]['payableList'][i2]['selected'] = e.target.checked;
            // console.log(payableList?.length)
            // console.log(payableList?.filter(item=>item.selected===true)?.length)
            if (payableList?.filter(item => item.selected === true)?.length > 0 && payableList?.length !== payableList?.filter(item => item.selected === true)?.length) {
                newData[i1]['indeterminateSelected'] = true;
            } else if ((payableList?.length) === (payableList?.filter(item => item.selected === true)?.length)) {
                newData[i1]['indeterminateSelected'] = false;
                newData[i1]['selected'] = true;
            } else if (payableList?.filter(item => item.selected === true)?.length === 0) {
                newData[i1]['selected'] = false;
                newData[i1]['indeterminateSelected'] = false;
            };
            common(newData);
            settableData(newData);
        }, [tableData]);

    const onchangeValueAll: any =
        useCallback((i1) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData: any = [...tableData];
            if (e.target.checked === true) {
                newData[i1]['selected'] = true;
                newData[i1]['indeterminateSelected'] = false;
                newData[i1]['payableList'].map(item => {
                    item['selected'] = true;
                    return item;
                })
            } else {
                newData[i1]['selected'] = false;
                newData[i1]['indeterminateSelected'] = false;
                newData[i1]['payableList'].map(item => {
                    item['selected'] = false;
                    return item;
                })
            }
            common(newData);
            settableData(newData);

        }, [tableData]);

    // console.log(totalserviceCharge)

    function common(data) {
        if (totalCharge===null || totalCharge===0) {
            let totChrg:any = localStorage.getItem("totalCharge");
            let chrg:any = localStorage.getItem("charge");
            setTimeout(() => {
                totChrg= parseFloat(totChrg);
                chrg= parseFloat(chrg);
                let len = data.filter(item => item.selected === true || item.indeterminateSelected === true).length;
                let temp = data.filter(item => item.selected === true || item.indeterminateSelected === true)?.map(item => item.payableList.filter(item => item.selected === true)).flat()
                setsubmitTableData(temp);
                let totalPayAbleVal = temp.map(item => item.payableAmount)
                    .reduce((prev, curr) => prev + curr, 0);
                settotalPayable(totalPayAbleVal);
                if (totChrg === 0) {
                    setshowcharge(0)
                } else {
                    setshowcharge(len * chrg > totChrg ? totChrg : len * chrg);
                }
            }, 200);
        } else {
            let len = data.filter(item => item.selected === true || item.indeterminateSelected === true).length;
            let temp = data.filter(item => item.selected === true || item.indeterminateSelected === true)?.map(item => item.payableList.filter(item => item.selected === true)).flat()
            setsubmitTableData(temp);
            let totalPayAbleVal = temp.map(item => item.payableAmount)
                .reduce((prev, curr) => prev + curr, 0);
            settotalPayable(totalPayAbleVal);
            console.log(totalserviceCharge)
            console.log(len * charge)
            if (totalCharge === 0) {
                setshowcharge(0)
            } else {
                setshowcharge(len * charge > totalserviceCharge ? totalserviceCharge : len * serviceCharge);
            }
        }

    }
    // console.log(tableData)

    return (
        <div className={isMobile ? 'mobileView' : "mt-25 mb-sm-25"} >
            <Card title="Fee Payment">
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                            <Form.Item
                                name="year"
                                label="Year:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Year" },
                                ]}
                            >
                                <SelectAcademicYear />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                            <Form.Item
                                name="month"
                                label="Month:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Month" },
                                ]}
                            >
                                <Select mode="multiple" allowClear placeholder="Select Month" options={optionsMonth} />


                            </Form.Item>

                        </Col> */}
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
            {show &&
                <>
                    {!isMobile &&
                        <Row className='mt-30' gutter={5} style={{ overflow: "hidden", marginLeft: "0", marginRight: "0" }}>
                            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                                <Card title="Payable fees" className='custom-card-second'>
                                    {tableData?.length > 0 ?
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <List
                                                    itemLayout="vertical"
                                                    dataSource={tableData}
                                                    size="large"
                                                    style={{ maxHeight: 350, overflowY: 'auto' }}
                                                    renderItem={(item: any, index) => (
                                                        <List.Item key={item.serial}>

                                                            <List
                                                                itemLayout="vertical"
                                                                dataSource={item.payableList}
                                                                size="large"
                                                                header={<div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                    <div>
                                                                        <Checkbox disabled={selectionCheckFeeHead()} indeterminate={item.indeterminateSelected} checked={item.selected} onChange={onchangeValueAll(index)} ></Checkbox>
                                                                    </div>
                                                                    <div style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                                                        {item.monthName}
                                                                    </div>

                                                                </div>
                                                                }
                                                                renderItem={(value: any, index2) => (
                                                                    <List.Item key={value.feeSubHeadId}>
                                                                        <ul className="w3-ul w3-card-4 payment-fee-list no-boxshadows">
                                                                            <li className="w3-bar" style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                                                                                <div className="w3-bar-item" style={{ paddingLeft: 0 }}>
                                                                                    <div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                                        <div>
                                                                                            <Checkbox disabled={selectionCheckFeeSubHead()} checked={value.selected} onChange={onchangeValue(index, index2, item.payableList)} ></Checkbox>
                                                                                        </div>
                                                                                        <div style={{ marginLeft: 15, display: 'grid' }}>
                                                                                            <span >{value?.feeHeadName} - ({value?.feeSubHeadName})</span>
                                                                                        </div>

                                                                                    </div>

                                                                                </div>
                                                                                <div style={{ display: 'grid', textAlign: 'center' }}>
                                                                                    <span style={{ fontWeight: "bold", fontSize: 18 }}> ৳{value?.payableAmount}</span>
                                                                                </div>

                                                                            </li>
                                                                        </ul>



                                                                    </List.Item>
                                                                )}
                                                            />


                                                        </List.Item>
                                                    )}
                                                />
                                            </Col>
                                        </Row> :
                                        <div style={{
                                            height: 350,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>No payable fees found</div>
                                    }
                                </Card>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                <Card title="Previously paid fees" className='custom-card-second'>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            {paidViews.length > 0 ?
                                                <List
                                                    itemLayout="vertical"
                                                    dataSource={paidViews}
                                                    size="large"
                                                    style={{ maxHeight: 350, overflowY: 'auto' }}
                                                    renderItem={(value: any, index2) => (
                                                        <List.Item key={value.feeHeadId}>
                                                            <ul className="w3-ul w3-card-4 payment-fee-list no-boxshadows">
                                                                <li className="w3-bar" style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                                                                    <div className="w3-bar-item" style={{ paddingLeft: 0 }}>
                                                                        <div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                            <div style={{ marginLeft: 15, display: 'grid' }}>
                                                                                <span >{value?.feeHeadName} - ({value?.feeSubHeadName})</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div style={{ display: 'grid', textAlign: 'center' }}>
                                                                        <span style={{ fontWeight: "bold", fontSize: 18 }}> ৳{value?.paidAmount}</span>
                                                                    </div>

                                                                </li>
                                                            </ul>



                                                        </List.Item>
                                                    )}
                                                /> :
                                                <div style={{
                                                    height: 350,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <strong>No Record Found</strong>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    }
                    {isMobile && tableData?.length > 0 &&
                        <List
                            itemLayout="vertical"
                            dataSource={tableData}
                            size="large"
                            style={{ maxHeight: 200, overflowY: 'auto' }}
                            renderItem={(item: any, index) => (
                                <List.Item key={item.serial}>

                                    <List
                                        itemLayout="vertical"
                                        dataSource={item.payableList}
                                        size="large"
                                        header={<div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                            <div>
                                                <Checkbox disabled={selectionCheckFeeHead()} indeterminate={item.indeterminateSelected} checked={item.selected} onChange={onchangeValueAll(index)} ></Checkbox>
                                            </div>
                                            <div style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                                {item.monthName}
                                            </div>

                                        </div>
                                        }
                                        renderItem={(value: any, index2) => (
                                            <List.Item key={value.feeSubHeadId}>
                                                <ul className="w3-ul w3-card-4 payment-fee-list no-boxshadows">
                                                    <li className="w3-bar" style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                                                        <div className="w3-bar-item" style={{ paddingLeft: 0 }}>
                                                            <div style={{ display: "flex", justifyItems: "center", alignContent: "center", alignItems: 'center' }}>
                                                                <div>
                                                                    <Checkbox disabled={selectionCheckFeeSubHead()} checked={value.selected} onChange={onchangeValue(index, index2, item.payableList)} ></Checkbox>
                                                                </div>
                                                                <div style={{ marginLeft: 15, display: 'grid' }}>
                                                                    <span >{value?.feeHeadName} - ({value?.feeSubHeadName})</span>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div style={{ display: 'grid', textAlign: 'center' }}>
                                                            <span style={{ fontWeight: "bold", fontSize: 18 }}> ৳{value?.payableAmount}</span>
                                                        </div>

                                                    </li>
                                                </ul>



                                            </List.Item>
                                        )}
                                    />


                                </List.Item>
                            )}
                        />
                    }
                    {isMobile && tableData?.length > 0 &&
                        <>
                            <div className="payableWrapper">
                                <div className="totalPayable">
                                    <div className="totalPayableTitle"> Total Payable</div>
                                    <h3 className="totalPayableCount">{totalPayable + showcharge}</h3>
                                </div>
                                <div className="bg">
                                </div>
                            </div>

                            <Button type="primary" className="mb-sm-25 success-button" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", padding: 10, height: "auto" }} disabled={totalPayable > 0 ? false : true} onClick={() => onPay()}>
                                Pay Now
                            </Button>
                            <span style={{ marginTop: 10, fontSize: 10, marginBottom: -10 }}> </span>
                            <div className="payment-instruction-wrapper ml-0">
                                <span className="text-highlight">*Marked fields are mandatory</span>
                                <span>{showcharge} Taka Service Charge</span>
                            </div>
                        </>
                    }
                </>
            }

            {/* <br /> */}
            {/* {tableData.length > 0 && !isMobile ? <span style={{ fontSize: 18, marginTop: 25, marginBottom: 25, display: "block" }}>List of fees: </span> : ''} */}
            {/* <Skeleton active /> */}

            {tableData.length > 0 &&
                <>
                    {!isMobile &&
                        <Row className='mt-30'>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <div className="payment-instruction-wrapper">
                                    <span className="text-highlight">*Marked fields are mandatory</span>
                                    {totalPayable > 0 && <span>{showcharge} Taka Service Charge is also payable with Total Payable</span>}
                                    {/* <span>2. XYZ</span> */}
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <Row className='d-flex align-items-center justify-content-between payable-wrapper'>
                                    <Col offset={12} span={6} style={{ paddingRight: "6px" }}>
                                        <Form.Item className='payment-input'>
                                            <span>Total Payable:</span>
                                            <Input placeholder="Total Payable" disabled value={totalPayable + showcharge} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} style={{ paddingLeft: "6px" }}>
                                        <Form.Item>
                                            <div className="mb-sm-25">
                                                <Button className='success-button' type="primary" id="mb-sm-25 demo" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", }} disabled={totalPayable > 0 ? false : true} onClick={() => onPay()}>
                                                    Pay
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    }
                </>

            }
        </div>
    )
}
