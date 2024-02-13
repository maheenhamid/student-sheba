import { CalendarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';

const { Option } = Select;
export default function PasswordUniversity(props) {
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const passwordChangeUni = useStoreActions(state => state.auth.passwordChangeUni);
    const [form] = Form.useForm();



    const onFinish = (values: any) => {

        let payload: any = {
            customStudentId: user?.customStudentId,
            instituteId: user?.instituteId,
            currentPassword: values?.currentPassword,
            newPassword: values?.newPassword,
        }
       // console.log(payload)
       passwordChangeUni(payload);
       form.resetFields();
    };

  

    // console.log(tableData)
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }




    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const normalizeValue = (value) => {
        // Just replace the following regex to what you wnat
        const filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        return filteredValue;
       };
    

    return (
        <>
            <br />
            <Card className="mt-25 mb-sm-25" title="Change Password">
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >   
            <h3>No special character is allowed</h3>
                <Row gutter={15}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item
                            normalize={normalizeValue}
                            name="currentPassword"
                            label="Current Password:"
                            className="title-Text custon-form-wrapper"
                            rules={[
                                { 
                                    required: true, 
                                    message: "Please input current password" 
                                },
                            ]}
                        >
                            <Input.Password style={{height:50, borderRadius:10}} placeholder='Current Password'/>
                        </Form.Item>
                    </Col>                    
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                        <Form.Item
                        normalize={normalizeValue}
                            name="newPassword"
                            label="New Password:"
                            className="title-Text custon-form-wrapper"
                            rules={[
                                { 
                                    required: true, 
                                    message: "Please input new password" 
                                },
                            ]}
                        >
                            <Input.Password style={{height:50, borderRadius:10}}  placeholder='New Password'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item className="mb-sm-0">
                            <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
           

        </Card>
        </>
    )
}
