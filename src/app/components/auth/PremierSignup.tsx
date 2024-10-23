import { Alert, Form, Input, Button, Checkbox, Layout, Row, Col, Tooltip, Spin, Select, Modal } from 'antd';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { InfoCircleOutlined, UserOutlined, LoadingOutlined, HomeOutlined, MailOutlined, PhoneOutlined, KeyOutlined, FacebookOutlined, FacebookFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled, LinkedinFilled } from '@ant-design/icons';
import logo from "./student-sheba-logo.svg";
import play from "../../../images/google-play-badge.svg";
import loginBanner from "./login-banner-image.png";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export function PremierSignup() {

    const setBusy = useStoreActions(state => state.auth.setBusy);
    const isBusy = useStoreState(state => state.auth.busy);
    const studentSignup = useStoreActions(state => state.auth.studentSignup);


    const handleSubmit = async (payload) => {
        setBusy(true);
        studentSignup(payload);
    };

    const style = {
        container: {

        },
        asideLogoLeft: {
            backgroundImage: 'url(../../../mujib-borsho.png)',
        },
        asideLogoRight: {
            backgroundImage: 'url(../../../sonalibank.png)',
        },
        sonaliLogo: {
            backgroundImage: 'url(../../../sonalilogo.png)',
            marginRight: '10px'
        },
        shebaLogo: {
            backgroundImage: 'url(../../../logo-white.png)',
        }
    };
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }

    const optionsInstitute = [
        { value: "20505", label: "South Point School and College" }
    ]
    const optionsGender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]

    return (
        <>

            <>
                <div id="studentShebaV2">
                    <div className="login-page-wrapper" >
                        <aside className="login-side-wrapper" style={style.container}>
                            <div className="login-details-wrapper">
                                <div className="login-banner-wrapper">
                                    <img src={loginBanner} />
                                </div>
                            </div>
                            <div className='play-store-wrapper'>
                                <p>Please download the mobile app </p>
                                <a className="me-lg-3 mb-4 mb-lg-0" rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.sdl.epay">
                                    <img className="app-badge" src={play} alt="Sheba E-Pay" width={"45%"} />
                                </a>
                            </div>
                        </aside>
                        <div className="login-form-wrapper">
                            <div className="login-form-inner" style={{ width: 550 }}>
                                <div className="login-form-logo text-center">
                                    <img src={logo} className="loginLogo" />
                                </div>
                                <div className="login-title text-center">
                                    <p>Student Sign-Up</p>
                                </div>
                                <div>
                                    <Form name="login" onFinish={handleSubmit}>
                                        <Row gutter={4}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item name='instituteId' rules={[{ required: true, message: 'Please select institute' }]}>
                                                    <Select bordered={false} allowClear placeholder="Select Institute" options={optionsInstitute} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='account' rules={[{ required: true, message: 'Please input account' }]}>
                                                    <Input name="account" placeholder="Account" bordered={false} style={{ height: 40 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='accountName' rules={[{ required: true, message: 'Please input account name' }]}>
                                                    <Input name="accountName" placeholder="Account Name" bordered={false} style={{ height: 40 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='fatherName' rules={[{ required: true, message: 'Please input father name' }]}>
                                                    <Input name="fatherName" placeholder="Father Name" bordered={false} style={{ height: 40 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='guardianMobile' rules={[{ required: true, message: 'Please input guardian mobile' }]}>
                                                    <Input name="guardianMobile" placeholder="Guardian Mobile" bordered={false} style={{ height: 40 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='accountRoll' rules={[{ required: true, message: 'Please input student roll' }]}>
                                                    <Input name="accountRoll" placeholder="Student Roll" bordered={false} style={{ height: 40 }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item name='gender' rules={[{ required: true, message: 'Please select gender' }]}>
                                                    <Select bordered={false} allowClear placeholder="Select Gender" options={optionsGender} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {!mobileDisplay && <>
                                            <Row>
                                                <Col span={24}>
                                                    <Button type="primary" htmlType="submit" className='success-button' disabled={isBusy} style={{ width: '100%', }}>
                                                        {isBusy ? <Spin indicator={antIcon} /> : 'Save'}
                                                    </Button>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <div style={{ textAlign: "center" }}>
                                                        <br />
                                                        <p>Already have an account? <br />
                                                            <Link to="/"> Go back to Login</Link>
                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Col span={24}>
                                                <div className="social-button-wrapper">
                                                    <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.facebook.com/shebadigitalltd", "_blank")}><FacebookFilled /></Button>
                                                    <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.linkedin.com/company/sdlltd", "_blank")}><LinkedinFilled /></Button>
                                                    <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.youtube.com/channel/UClbBrxTaRlbFj0-5S2AbNmw", "_blank")}><YoutubeFilled /></Button>
                                                    <Button type="primary" shape="circle" href="#" size="large"><TwitterCircleFilled /></Button>
                                                </div>
                                            </Col>
                                        </>
                                        }

                                        {mobileDisplay &&
                                            <>
                                                <Row>

                                                    <Col xs={24} className="mb-20" style={{ marginTop: '15px' }}>
                                                        <Button type="primary" htmlType="submit" disabled={isBusy} block={true} style={{ height: '48px' }}>
                                                            {isBusy ? <Spin indicator={antIcon} /> : 'Save'}
                                                        </Button>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <div style={{ textAlign: "center" }}>
                                                            <br />
                                                            <p>Already have an account? <br />
                                                                <Link to="/"> Go back to Login</Link>
                                                            </p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                    </Form>

                                </div>
                            </div>
                            <p className='copyright-text'>Powered by Sheba Digital Limited | Part of Sheba Group</p>
                        </div>
                    </div>
                </div>
            </>


        </>
    );
}
