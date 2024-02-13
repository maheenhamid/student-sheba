import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Input, Form, Modal, Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { validBdNumber } from 'valid-bd-numbers';
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';

export default function PasswordChangeUniversity(props) {
    const user = useStoreState(state => state.auth.user);
    const loading = useStoreState(state => state.auth.loading)
    const resetStudentPassword = useStoreActions((state) => state.auth.resetStudentPassword);
    const sendStudentPasswordRecoveryToken = useStoreActions((state) => state.auth.sendStudentPasswordRecoveryToken);
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }

    useEffect(() => {
        let payload: any = { customStudentId: user?.customStudentId, instituteId: user?.instituteId }
        sendStudentPasswordRecoveryToken(payload)
    }, []);

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        let payload: any = {
            "customStudentId": user?.customStudentId,
            "instituteId": user?.instituteId,
            "newPassword": values?.newPassword,
            "token": values?.token
        }
        resetStudentPassword(payload);

    }

    const normalizeValue = (value) => {
        // Just replace the following regex to what you wnat
        const filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        return filteredValue;
       };

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    return (
        <>
            <style>
                {`
                aside.ant-layout-sider.ant-layout-sider-dark {
                    display: none;
                }
                span.anticon.anticon-menu-fold.trigger {
                    display: none;
                }
                span.anticon.anticon-menu-unfold.trigger {
                    display: none;
                }
            `}
            </style>
            <Card title="Password Change" style={{ marginTop: 20 }}>
                <h3>You need to update your password. We have sent you a token to your mobile number. Please input the token and your new password to reset password.</h3>
                <Row className='info-wrapper'>
                    <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                        <Row gutter={15}>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                                <Form.Item
                                    name="token"
                                    label="Token:"
                                    className="title-Text custon-form-wrapper"
                                    rules={[
                                        { required: true, message: "Please input your token" },
                                    ]}
                                >
                                    <Input placeholder='Token' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                 normalize={normalizeValue}
                                    name="newPassword"
                                    label="Password (No Special Character)"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password style={{ minHeight: 40, borderRadius: 10 }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <Form.Item className="mb-sm-0">
                                    <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                </Row>
            </Card>
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
        </>
    )
}
