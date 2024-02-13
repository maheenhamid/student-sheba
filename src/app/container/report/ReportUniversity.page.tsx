import { CalendarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';

const { Option } = Select;
export default function RenderLibrary(props) {
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const reportData = useStoreState(state => state.auth.reportData)
    const reportListUni = useStoreActions(state => state.auth.reportListUni);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalItem, setmodalItem] = useState<any>(null);

    const handleOk = () => {
        setIsModalVisible(false);
        setmodalItem(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setmodalItem(null);
    };

    const [form] = Form.useForm();

    const [nodata,setnodata] = useState(false);

    const onFinish = (values: any) => {
        setnodata(true);
        // console.log(user)
        let payload: any = {
            studentId: user?.studentId,
            instituteId: user?.instituteId,
            semesterYearId: values?.year,
        }
       // console.log(payload)
       reportListUni(payload);
    };

  

    // console.log(tableData)
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }
    const columns = [
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Fee Invoice Id',
            dataIndex: 'feeInvoiceId',
            key: 'feeInvoiceId',
        },
        {
            title: 'Fee Heads',
            dataIndex: 'feeHead',
            key: 'feeHead',
        },
        {
            title: 'Ledger By',
            dataIndex: 'ledgerBy',
            key: 'ledgerBy',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: 'Download',
            
            render: (text: any, record: any) => (

                <Tooltip title={"Download"}>
                    <Button type="primary" className="mb-sm-25 success-button" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", padding: 10, height: "auto" }}  onClick={() => downloadReceipt(record?.feeInvoiceId)}> Download</Button>
                </Tooltip>

            ),
        },
    ];

    const downloadReceipt = (val) => {
        // console.log(val)
        const API_BASE_UNI = process.env.REACT_APP_API_ROOT_UNIVERSITY
        window.location.href = `${API_BASE_UNI}/public/money-receipt/download?invoiceIds=${val}&instituteId=${user?.instituteId}`
    }


    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const refreshPage = () => {
        reportListUni(user?.identificationId)
    }

    //console.log(reportData)


    return (
        <>
            <br />
            <Card className="mt-25 mb-sm-25" title="Fee Report">
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
                            <Select  allowClear  placeholder="Select Semester Year" >
                                {user?.semesterYearList?.map((item:any, index:any) => {
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
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            {nodata && reportData!=null ?
                <>

                    {
                        mobileDisplay ?
                            <List
                                itemLayout="vertical"
                                dataSource={reportData}
                                size="large"
                                pagination={false}
                                renderItem={(item: any) => (
                                    <List.Item key={item.key}>
                                        <Card className="mobileCard" onClick={() => { setIsModalVisible(true); setmodalItem(item) }}>
                                            <Row gutter={4}>
                                                <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                    <span>
                                                        <strong>Transection ID</strong>
                                                    </span>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                    <span>#{item?.feeInvoiceId}</span>
                                                </Col>
                                            </Row>
                                            <Row gutter={4} className="paymentDate">
                                                <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                    <span>
                                                        <span><CalendarOutlined />&nbsp;</span> 
                                                        <span>&nbsp;{item?.paymentDate}</span>
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row gutter={4} className="paidAmount">
                                                <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                    <span>
                                                        <strong>৳ {item?.paidAmount}</strong>
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                            /> :
                            
                            <Table bordered={true} dataSource={reportData} columns={columns} rowKey="masterId" scroll={{ x: 400 }}/>
                    }
                </>
                : <>
                { nodata && reportData==null &&
                    <Result
                        status="404"
                        title="No Data Found"
                        // subTitle="No Report Found"
                        extra={<Button type="primary" onClick={() => refreshPage()}>Refresh</Button>}
                    />
                }
                </>
            }

            <Modal title="Payment Report"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                okText={"Close"}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <Row gutter={4}>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} className="mb-10">
                        <span>
                            <strong>Payment Date: </strong>
                            <span> {modalItem?.paymentDate}</span>
                        </span>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={3} xl={3} className="mb-10">
                        <span>
                            <strong>Fee Invoice Id: </strong>
                            <span>{modalItem?.feeInvoiceId}</span>
                        </span>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={4} xl={4} className="mb-10">
                        <span>
                            <strong>Fee Heads: </strong>
                            <span>{modalItem?.feeHeads}</span>
                        </span>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={4} xl={4} className="mb-10">
                        <span>
                            <strong>Fee Sub Heads: </strong>
                            <span>{modalItem?.feeSubHeads}</span>
                        </span>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={3} xl={3} className="mb-10">
                        <span>
                            <strong>Amount: </strong>
                            <span>{modalItem?.paidAmount}</span>
                        </span>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} className="mb-10">
                        <span>
                            <strong>Payment Status: </strong>
                            <span>{modalItem?.paymentStatus}</span>
                        </span>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                        <span>
                            <Tooltip title={"Download"}>
                                <Button type="primary" onClick={() => downloadReceipt(modalItem?.feeInvoiceId)}> Download</Button>
                            </Tooltip>
                        </span>
                    </Col>
                </Row>
            </Modal>

        </Card>
        </>
    )
}
