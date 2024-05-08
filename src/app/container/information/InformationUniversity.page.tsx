import { SaveOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Input, Form, Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { validBdNumber } from 'valid-bd-numbers';
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';

export default function RenderLibrary(props) {
    const user = useStoreState(state => state.auth.user);
    const checkNumber = useStoreState(state => state.auth.checkNumber);
    const logout = useStoreActions(state => state.auth.logout);
    const updateStudentGuardianInfoUniversity = useStoreActions(state => state.auth.updateStudentGuardianInfoUniversity);
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    };
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!validBdNumber(user.studentMobile)) {
            setIsModalVisible(true)
        }
    }, [user]);

    useEffect(() => {
        if (checkNumber) {
            setIsModalVisible(false)
        }
    }, [checkNumber]);

    const updateNumberForm = (value) => {
        let payload: any = {
            instituteId: user.instituteId,
            studentId: user.studentId,
            mobileNo: value.studentMobile,
            username: user.customStudentId,
            password: user.instituteId
        };
        updateStudentGuardianInfoUniversity(payload);
    };

    useEffect (()=>{
        if(parseInt(user?.studentPassword)==parseInt(user?.instituteId) && parseInt(user?.passwordRequired)==1){
            window.location.href= ("/password-change")
        }
    },[])
    

    return (
        <>
            {
                !mobileDisplay && <>
                    <br />
                    <Card title="Student Information">
                        <Row className='info-wrapper'>
                            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                                {/* <Row>
                            <Col span={4}>
                                <Avatar
                                    src={'data:image/png;base64,' + user?.imageName}
                                    size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                                    className="pointer topUserImage"
                                />
                            </Col>
                        </Row> */}
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
                                        <span className='title'> Session </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.session} </span>
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
                                        <span className='title'> Department </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.department} </span>
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
                                {/* <Row>
                            <Col span={10}>
                                <span className='title'> Religion </span>
                            </Col>
                            <Col span={4}>
                                <span className='separator'> : </span>
                            </Col>
                            <Col span={10}>
                                <span className='details'> {user?.studentReligion===null?"N/A":user?.studentReligion} </span>
                            </Col>
                        </Row> */}

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
                                {/* <Row>
                                    <Col span={24}>
                                        <div className="text-center">
                                            <Avatar
                                                src={'data:image/png;base64,' + user?.imageName}
                                                size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
                                                className="pointer topUserImage"
                                            />
                                        </div>
                                    </Col>
                                </Row> */}
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
                                        <span className='title'> Session </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.session} </span>
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
                                        <span className='title'> Department </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.department} </span>
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
                                {/* <Row>
                                    <Col span={10}>
                                        <span className='title'> Gender </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.studentGender} </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Date of Birth </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.studentDOB === null ? "N/A" : user?.studentDOB}  </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <span className='title'> Religion </span>
                                    </Col>
                                    <Col span={4}>
                                        <span className='separator'> : </span>
                                    </Col>
                                    <Col span={10}>
                                        <span className='details'> {user?.studentReligion === null ? "N/A" : user?.studentReligion}  </span>
                                    </Col>
                                </Row> */}
                            </Col>
                        </Row>
                    </Card>
                </div>
            }
            <Modal title="Update Number"
                visible={isModalVisible}
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
                        name="studentMobile"
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
