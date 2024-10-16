import { LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Spin, Card, } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { SelectAcademicYear } from '../profile/SelectAcademicYear';



export default function PaymentPremier(props) {
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const premierBank = useStoreState(state => state.auth.premierBank)
    const fetchPremierBank = useStoreActions(state => state.auth.fetchPremierBank);
    const getFeesPaymentSslPageLink = useStoreActions(state => state.auth.getFeesPaymentSslPageLink);
    const fetchacademicYearList = useStoreActions((state) => state.auth.fetchacademicYearList);
    useEffect(() => {
        fetchacademicYearList(user?.instituteId)
    }, [])
    const [form] = Form.useForm();

    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }

    const onFinish = (values: any) => {
        let payload: any = {
            account: user?.customStudentId,
            instituteId: user?.instituteId,
            year: values?.year,
            month: values?.month
        }
        fetchPremierBank(payload);
    };

    // const currentyear = new Date().getFullYear();

    // const optionsYear = [
    //     { value: currentyear - 1, label: currentyear - 1 },
    //     { value: currentyear, label: currentyear },
    //     { value: currentyear + 1, label: currentyear + 1 }
    // ]

    const optionsMonth = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" }

    ]


    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const onPay = () => {
        delete premierBank?.status;
        delete premierBank?.message;
        premierBank.instituteId = user?.instituteId;
        getFeesPaymentSslPageLink(premierBank);
    }

    return (
        <div className={isMobile ? 'mobileView' : "mt-25 mb-sm-25"} >
            <Card title="Fee Payment">

                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}></Col>
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

                            <Form.Item
                                name="month"
                                label="Month:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Month" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Month" options={optionsMonth} />


                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item className="mb-sm-0">
                                <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                    Search
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                {premierBank !== null &&
                    <Row className='info-wrapper'>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Account Name </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.accountName} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Student Name </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.accountRoll} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Class Name </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.className} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Father's Name </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.fatherName} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Fee Amount </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.feesAmount} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Service Charge </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.serviceCharge} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Total Amount </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.totalAmount} </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <span className='title'> Fee Detail </span>
                                </Col>
                                <Col span={4}>
                                    <span className='separator'> : </span>
                                </Col>
                                <Col span={10}>
                                    <span className='details'> {premierBank?.feesDetails} </span>
                                </Col>
                            </Row>
                        </Col>
                        <Button className='success-button' type="primary" id="mb-sm-25 demo" style={{ width: isMobile ? "100%" : "100%", marginTop: isMobile ? 20 : 20, float: "right", }} onClick={() => onPay()}>
                            Pay
                        </Button>
                    </Row>
                }
            </Card>
        </div>
    )
}
