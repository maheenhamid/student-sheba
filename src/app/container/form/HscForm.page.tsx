import { CalendarOutlined, DownCircleOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { SelectAcademicYear } from '../profile/SelectAcademicYear';


export default function HscForm(props) {

    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const reportData = useStoreState(state => state.auth.reportData)
    const reportList = useStoreActions(state => state.auth.reportList);
    const fetchacademicYearList = useStoreActions((state) => state.auth.fetchacademicYearList);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalItem, setmodalItem] = useState<any>(null);

    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalVisible(false);
        setmodalItem(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setmodalItem(null);
    };

    useEffect(() => {
        // reportList(user?.identificationId);
        fetchacademicYearList(user?.instituteId)

    }, [])

    // console.log(tableData)
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = false;
    }


    const onFinish = (values: any) => {
        let payload: any = {
            academicYear:values?.year,
            instituteId:user?.instituteId,
            studentId:user?.studentId,
        }
        reportList(payload)
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
            title: 'Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
        },

        {
            title: 'Download',
            render: (text: any, record: any) => (

                <Tooltip title={"Download"}>
                    <Button className='success-button' type="primary" onClick={() => downloadReceipt(record?.feeInvoiceId)}> Download</Button>
                </Tooltip>

            ),
        },
    ];

    const downloadReceipt = (val) => {
        // console.log(val)
        const API_BASE = process.env.REACT_APP_API_ROOT
        window.location.href = `${API_BASE}/public/student-form-fillup/confirmation/download?instituteId=${user?.instituteId}&invoiceId=${val}`
    }


    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const refreshPage = () => {
        reportList(user?.identificationId)
    }

    //console.log(reportData)

    https://api.shebashikkha.com/public/fees-payment/invoice-fee/list?academicYear=undefined&instituteId=undefined&studentId=undefined

    return (
        <div className="mt-25 mb-sm-25">

<Card title="Fee Report" className='custom-card-view'>
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
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item className="mb-sm-0">
                                <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: mobileDisplay ? 0 : 30, width: "100%", padding: 10 }}>
                                    Search
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Card>

            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            {reportData.length > 0 ?
                <>

                    {
                        mobileDisplay ?
                            <>
                                <Card title="HSC Form" className='custom-card-view'></Card>
                                <List
                                    itemLayout="vertical"
                                    dataSource={reportData}
                                    size="large"
                                    pagination={false}
                                    renderItem={(item: any) => (
                                        <List.Item key={item.key}>
                                            <Card className="mobileCard">
                                                <Row gutter={4}>
                                                    <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                        <span>
                                                            <strong>Invoice Id: </strong> <span>{item?.feeInvoiceId}</span>
                                                        </span>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                        <span>
                                                            <span><CalendarOutlined />&nbsp;</span>
                                                            <span>&nbsp;{item?.paymentDate}</span>
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <Row gutter={4} className="paymentDate">
                                                    <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                        <strong>Amount:</strong>                                            
                                                        <span style={{ color: "#0a8849" }}>
                                                            <strong>৳ {item?.paidAmount}</strong>
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <Row gutter={4} className="paidAmountx">
                                                    <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                                                        <Button className='success-button' type="primary" onClick={() => downloadReceipt(item?.feeInvoiceId)} icon={<DownloadOutlined />} />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </>
                            :
                            <Card title="HSC Form">
                                <Table bordered={true} dataSource={reportData} columns={columns} className="custom-table" scroll={{ x: 1024 }} />
                            </Card>
                    }
                </>
                : <>
                    <Result
                        status="404"
                        title="No Data Found"
                        // subTitle="No Report Found"
                        extra={<Button type="primary" onClick={() => refreshPage()}>Refresh</Button>}
                    />,
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
                                <Button type="primary" className='download-button' onClick={() => downloadReceipt(modalItem?.feeInvoiceId)}> Download</Button>
                            </Tooltip>
                        </span>
                    </Col>
                </Row>
            </Modal>

        </div>
    )
}
