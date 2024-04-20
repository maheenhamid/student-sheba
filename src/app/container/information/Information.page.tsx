import { Card, Row, Col, Button, Form, Input, Avatar } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { validBdNumber } from 'valid-bd-numbers'
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';

export default function RenderLibrary(props) {
    const user = useStoreState(state => state.auth.user)
    const checkNumber = useStoreState(state => state.auth.checkNumber)
    const authenticate2 = useStoreActions(state => state.auth.authenticate2);
    const updateStudentGuardianInfo2 = useStoreActions(state => state.auth.updateStudentGuardianInfo2);
    const logout = useStoreActions(state => state.auth.logout);
    // console.log(user);
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }
    useEffect(() => {
        authenticate2(user);
    }, [])

    useEffect(() => {
        //let mobileClose = localStorage.getItem("mobileClose");
        // if (!validBdNumber(user.guardianMobile) && mobileClose !== "true") {
        if (!validBdNumber(user.guardianMobile)) {
            setIsModalVisible(true)
        }
    }, [user])

    useEffect(() => {
        if (checkNumber) {
            setIsModalVisible(false)
        }
    }, [checkNumber])

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const updateNumber = (value) => {
        // console.log(value);
    }

    const updateNumberForm = (value) => {
        let numberPayload: any = {
            instituteId: user?.instituteId,
            studentId: user?.studentId,
            customStudentId: user?.customStudentId,
            fatherName: user?.fatherName,
            motherName: user?.motherName,
            guardianMobile: value.guardianMobile,
        }
        updateStudentGuardianInfo2(numberPayload);
    }
    return (
        <>
            {
                !mobileDisplay && <>
                    <Card title="Student Information">
                        <Row className='info-wrapper'>
                            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                                <Row>
                                    <Col span={4}>
                                        <Avatar
                                            src={ user?.studentImageLink}
                                            size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                                            className="pointer topUserImage"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Student Id </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.customStudentId} </span>
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
                                        <span className='details'> {user?.studentName} </span>
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
                                        <span className='details'> {user?.fatherName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Mother's Name </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.motherName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Class </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.className} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Section </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.sectionName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Group </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.groupName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Roll </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.studentRoll} </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </>
            }
            {
                mobileDisplay &&
                <div className="mt-25 mb-sm-25">

                    <Card title="Student Information" >
                        <Row className='info-wrapper'>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Row>
                                    <Col span={24}>
                                        <div className="text-center">
                                            <Avatar
                                                src={'data:image/png;base64,' + user?.imageName}
                                                size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                                                className="pointer topUserImage"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Student Id </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.customStudentId} </span>
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
                                        <span className='details'> {user?.studentName} </span>
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
                                        <span className='details'> {user?.fatherName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Mother's Name </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.motherName} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Class </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.className} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Section </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.sectionName} </span>
                                    </Col>
                                </Row>                               
                                 <Row>
                                    <Col span={10}>
                                        <span className='title'> Group </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.groupName} </span>
                                    </Col>
                                </Row>                                 
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Roll </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.studentRoll} </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </div>
            }
            <Modal title="Update Number"
                visible={isModalVisible}
                onOk={updateNumber}
                onCancel={() => {
                    setIsModalVisible(false);
                    logout(1);
                    // localStorage.setItem("mobileClose", 'true');
                }}
                centered
                okText={"Update"}
                maskClosable={false}
                // cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                keyboard={false}
                // closeIcon={<span></span>}
                footer={false}
            >
                <Form
                    name="basic"

                    onFinish={updateNumberForm}
                    autoComplete="off"
                >
                    <div style={{ color: "red", fontWeight: "bold", fontSize: 15, marginBottom: 15 }}>Please update your mobile number.</div>
                    <Form.Item
                        name="guardianMobile"
                        label="Mobile Number:"
                        className="title-Text"
                        // initialValue={user?.guardianMobile}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter contact number!',
                            },
                            {
                                validator(_, value) {
                                    if (validBdNumber(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Please enter valid number!');
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Mobile Number" style={{ height: 40 }} />
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary" className='success-button' htmlType="submit" icon={<SaveOutlined />} style={{ height: 40, right: 0 }}>
                            Save
                        </Button>
                    </div>

                </Form>
            </Modal>
        </>
    )
}
