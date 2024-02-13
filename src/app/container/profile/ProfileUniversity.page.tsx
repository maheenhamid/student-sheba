import { CloseCircleOutlined, EditOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Divider, Button, Form, Input, Checkbox, Select, DatePicker, Spin, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import moment from 'moment';
import { SelectDistrict } from './SelectDistrict';
import { SelectThana } from './SelectThana';
import { SelectDistrict2 } from './SelectDistrict2';
import { SelectThana2 } from './SelectThana2';
import Modal from 'antd/lib/modal/Modal';
import OtpInput from 'react-otp-input';
const { Option } = Select;
const { TextArea } = Input;

export default function ProfileUniversity(props) {
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }

    const user = useStoreState(state => state.auth.user)
    const hasOtp = useStoreState(state => state.auth.hasOtp)
    const usedOtp = useStoreState(state => state.auth.usedOtp)
    const [updateBasic, setUpdateBasic] = useState<boolean>(false);
    const [updateGuardian, setUpdateGuardian] = useState<boolean>(false);
    const [updateAddress, setupdateAddress] = useState<boolean>(false);
    const loading = useStoreState(state => state.auth.loading)
    const updateStudentProfileBasicInfoUniversity = useStoreActions(state => state.auth.updateStudentProfileBasicInfoUniversity);
    const updateStudentPhotoUniversity = useStoreActions(state => state.auth.updateStudentPhotoUniversity);
    const updateStudentGuardianInfo = useStoreActions(state => state.auth.updateStudentGuardianInfo);
    const updateStudentAddressInfo = useStoreActions(state => state.auth.updateStudentAddressInfo);
    const saveStudentProfileUpdateTokenUniversity = useStoreActions(state => state.auth.saveStudentProfileUpdateTokenUniversity);
    const otpUsedSendUniversity = useStoreActions(state => state.auth.otpUsedSendUniversity);
    const thanaListFetch = useStoreActions((state) => state.auth.thanaListFetch);
    const thanaListFetch2 = useStoreActions((state) => state.auth.thanaListFetch2);
    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const [formBasic] = Form.useForm();
    const [formGuardian] = Form.useForm();
    const [formAddress] = Form.useForm();
    const [date, setDate] = useState<any>((user?.dob !== null || user?.dob !== undefined || user?.dob !== '') ? user?.dob : null)
    const [studentImageFileName, setStudentImageFileName] = useState<any>(null);
    const [studentImageFileContent, setStudentImageFileContent] = useState<any>(null);
    const [fatherPhotoName, setfatherPhotoName] = useState<any>(null);
    const [fatherPhotoFileContent, setfatherPhotoFileContent] = useState<any>(null);
    const [motherPhotoName, setmotherPhotoName] = useState<any>(null);
    const [motherPhotoFileContent, setmotherPhotoFileContent] = useState<any>(null);

    const [districtId, setpresentDistrictId] = useState<any>(user?.districtId);
    const [thanaId, setpresentThanaId] = useState<any>(user?.thanaId);
    const [permanentDistrictId, setpermanentDistrictId] = useState<any>(user?.permanentDistrictId);
    const [permanentThanaId, setpermanentThanaId] = useState<any>(user?.permanentThanaId);

    useEffect(() => {
        setTimeout(() => {
            thanaListFetch(districtId);
            thanaListFetch2(permanentDistrictId);
            setpresentThanaId(user?.thanaId)
            setpresentDistrictId(user?.districtId)
            setpermanentThanaId(user?.permanentThanaId)
            setpermanentDistrictId(user?.permanentDistrictId)
        }, 1000);

    }, [])

    const imageUpload = (e: any) => {
        e.preventDefault();
        const reader: any = new FileReader();
        const file = e.target.files[0];
        console.log(file)
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setStudentImageFileName(file.name)
                setStudentImageFileContent(reader.result.split(',')[1])
            }
            reader.readAsDataURL(file);
        }
    };
    const imageUploadFather = (e: any) => {
        e.preventDefault();
        const reader: any = new FileReader();
        const file = e.target.files[0];
        console.log(file)
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setfatherPhotoName(file.name)
                setfatherPhotoFileContent(reader.result.split(',')[1])
            }
            reader.readAsDataURL(file);
        }
    };
    const imageUploadMother = (e: any) => {
        e.preventDefault();
        const reader: any = new FileReader();
        const file = e.target.files[0];
        console.log(file)
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setmotherPhotoName(file.name)
                setmotherPhotoFileContent(reader.result.split(',')[1])
            }
            reader.readAsDataURL(file);
        }
    };


    const [imageData,setimageData] = useState<any>(null)

    const onFinishBasic = (values: any) => {
     
        values.dob= date;
        values.customStudentId= user?.customStudentId;
        values.instituteId= user?.instituteId;
        values.studentId= user?.studentId;
        // console.log('Success:', values);
        // console.log('Success:', imageData);

        // console.log(payload)
        updateStudentProfileBasicInfoUniversity(values)
       if (imageData !== null) {
        let data:any = {
            file: imageData,
            instituteId: user?.instituteId,
            studentId: user?.studentId,
            customStudentId: user?.customStudentId,
        }
        updateStudentPhotoUniversity(data);
        setimageData(null);
       }
        setUpdateBasic(false)

    };

    const uploadImage = (val) => {
        let image_as_files = val.target.files[0];
        setimageData(image_as_files)
        // let data = {
        //     file: image_as_files,
        // }
        //updateSingleStaffPhoto(data)
    }


    const onFinishGuardian = (values: any) => {
        console.log('Success:', values);
        values.fatherPhotoName = fatherPhotoName !== null ? fatherPhotoName : 'Father.jpg';
        values.motherPhotoName = motherPhotoName !== null ? motherPhotoName : 'Father.jpg';
        values.fatherPhotoFileContent = fatherPhotoFileContent !== null ? fatherPhotoFileContent : user?.fatherPhotoFileContent !== null ? user?.fatherPhoto : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        values.motherPhotoFileContent = motherPhotoFileContent !== null ? motherPhotoFileContent : user?.motherPhotoFileContent !== null ? user?.motherPhoto : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        values.studentId = user?.studentId;
        values.instituteId = user?.instituteId;
        values.customStudentId = user?.customStudentId;
        updateStudentGuardianInfo(values);
        setUpdateGuardian(false);
        setfatherPhotoFileContent(null);
        setfatherPhotoName(null);

    }

    const onFinishAddress = (values: any) => {
        console.log('Success:', values);
        values.studentId = user?.studentId;
        values.instituteId = user?.instituteId;
        values.customStudentId = user?.customStudentId;
        updateStudentAddressInfo(values);
        setupdateAddress(false);
    }

    const updateNumber = (value) => {
        // console.log(value);
    }

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        let otpCode: any = localStorage.getItem("otpCode");
        if (otpCode === null) {
            setIsModalVisible(true);
            setEdit(false);
        }
        if (otpCode === "true") {
            setEdit(true);
        }
    }, [])

    useEffect(() => {
        if (usedOtp === true) {
            setIsModalVisible(false);
            setEdit(true)
        }
    }, [usedOtp])


    const otpSubmitForm = () => {
        let payload: any = {
            "token": token,
            "instituteId": user?.instituteId,
            "studentId": user?.studentId,
            "customStudentId": user?.customStudentId
        }
        if (token.length === 4) {
            otpUsedSendUniversity(payload)
        }
    }
    const sendOtp = () => {
        let payload: any = {
            "instituteId": user?.instituteId,
            "studentId": user?.studentId
        }
        // console.log(payload)
        saveStudentProfileUpdateTokenUniversity(payload);
    }
    const [token, setToken] = useState<any>('')
    return (
        <div className="mt-25 mb-sm-25">

            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            <Card title='Student Information' >
                <Row gutter={8}>
                    {/* <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card>
                            <div style={{ textAlign: "center" }}>
                                <Avatar
                                    src={'data:image/png;base64,' + user?.imageName}
                                    size={100}
                                    style={{ marginRight: 5 }}
                                    className="pointer topUserImage"
                                />

                                <h3 style={{ marginTop: 10 }}>{user?.studentName}</h3>
                                <Divider style={{ marginTop: -3, marginBottom: 5 }} />
                                <h4> <span style={{ fontWeight: "bold" }}>Student ID:</span>  {user?.customStudentId}</h4>
                                <h4> <span style={{ fontWeight: "bold" }}>Class:</span>  {user?.className}</h4>
                                <h4> <span style={{ fontWeight: "bold" }}>Section:</span>  {user?.sectionName}</h4>
                            </div>
                        </Card>
                    </Col> */}
                    {/*  Second */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className='custom-inner-card' title='Basic Info' extra={<Button className='success-button' type='primary' disabled={edit === false ? true : false} onClick={() => setUpdateBasic(true)} icon={<EditOutlined />}>Edit</Button>}>
                            <Row className='info-wrapper'>
                                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                    <Form
                                        name="basic"
                                        // labelCol={{ span: 6 }}
                                        // wrapperCol={{ span: 14 }}
                                        // initialValues={{ remember: true }}
                                        onFinish={onFinishBasic}
                                        form={formBasic}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Name </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="studentName"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.studentName}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                >
                                                    {updateBasic ? <Input /> : <span>{user?.studentName}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col span={6}>
                                                <span className='title'> Gender </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="studentGender"
                                                    labelAlign="left"
                                                    initialValue={user?.studentGender}
                                                    className='custon-form-wrapper'
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select gender' }]}
                                                >
                                                    {updateBasic ? <Select
                                                        placeholder="Select Gender"
                                                        className="selectBasic"
                                                    >
                                                        <Option value="Male">Male</Option>
                                                        <Option value="Female">Female</Option>
                                                    </Select> : <span>{user?.studentGender}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Religion </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="religion"
                                                    labelAlign="left"
                                                    initialValue={user?.religion}
                                                    className='custon-form-wrapper'
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select religion' }]}
                                                >
                                                    {updateBasic ? <Select
                                                        placeholder="Select Religion"
                                                        className="selectBasic"
                                                    >
                                                        <Option value="Islam">Islam</Option>
                                                        <Option value="Hinduism">Hinduism</Option>
                                                        <Option value="Christian">Christian</Option>
                                                        <Option value="Buddist">Buddist</Option>
                                                        <Option value="Other">Other</Option>
                                                    </Select> : <span>{user?.religion}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Birthday </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="dob"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.dob !== null ? moment(user?.dob?.split('-').join('/')) : null}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select religion' }]}
                                                >
                                                    {updateBasic ? <DatePicker style={{ width: "100%", height: 40 }} value={user?.dob ? moment(user?.dob, 'YYYY/MM/DD') : moment((new Date()), "DD/MM/YYYY")} onChange={e => setDate(moment(e).format("YYYY-MM-DD"))} /> : <span>{user?.dob}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Blood Group </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="bloodGroup"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.bloodGroup}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select blood group' }]}
                                                >
                                                    {updateBasic ? <Select
                                                        placeholder="Select Blood Group"
                                                        className="selectBasic"
                                                    >
                                                        <Option value="A+">A+</Option>
                                                        <Option value="A-">A-</Option>
                                                        <Option value="AB+">AB+</Option>
                                                        <Option value="AB-">AB-</Option>
                                                        <Option value="B+">B+</Option>
                                                        <Option value="B-">B-</Option>
                                                        <Option value="O+">O+</Option>
                                                        <Option value="O-">O-</Option>

                                                    </Select> : <span>{user?.bloodGroup}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Studnet's Number </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="studentMobile"
                                                    labelAlign="left"
                                                    initialValue={user?.studentMobile}
                                                    className='custon-form-wrapper'
                                                    rules={[{ required: updateBasic ? true : false, message: "Please input students's number" }]}
                                                >
                                                    {updateBasic ? <Input placeholder="Student's Mobile mNumber" style={{ height: 40 }} /> : <span>{user?.studentMobile}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Father's Name </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="fatherName"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.fatherName}
                                                    rules={[{ required: updateBasic ? true : false, message: "Please input father's name" }]}
                                                >
                                                    {updateBasic ? <Input placeholder="Father's Name" style={{ height: 40 }} /> : <span>{user?.fatherName}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Mother's Name </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="motherName"
                                                    labelAlign="left"
                                                    initialValue={user?.motherName}
                                                    className='custon-form-wrapper'
                                                    rules={[{ required: updateBasic ? true : false, message: "Please input mother's name" }]}
                                                >
                                                    {updateBasic ? <Input placeholder="Mother's Name" style={{ height: 40 }} /> : <span>{user?.motherName}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Guardian's Number </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="guardianMobile"
                                                    labelAlign="left"
                                                    initialValue={user?.guardianMobile}
                                                    className='custon-form-wrapper'
                                                    rules={[{ required: updateBasic ? true : false, message: "Please input guardian's number" }]}
                                                >
                                                    {updateBasic ? <Input placeholder="Guardian's Mobile mNumber" style={{ height: 40 }} /> : <span>{user?.guardianMobile}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        
                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Mailing Address </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="mailingAddress"
                                                    labelAlign="left"
                                                    initialValue={user?.mailingAddress}
                                                // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                >
                                                    {updateBasic ? <TextArea style={{ height: 50 }} placeholder='Mailing Address' /> : <span>{user?.mailingAddress}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Village </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="villege"
                                                    labelAlign="left"
                                                    initialValue={user?.villege}
                                                // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                >
                                                    {updateBasic ? <Input placeholder='Village' style={{ height: 40 }} /> : <span>{user?.villege}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Post Office </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="postOffice"
                                                    labelAlign="left"
                                                    initialValue={user?.postOffice}
                                                // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                >
                                                    {updateBasic ? <Input placeholder='Post Office' style={{ height: 40 }} /> : <span>{user?.postOffice}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> District </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="districtId"
                                                    labelAlign="left"
                                                    initialValue={user?.districtId}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select district' }]}
                                                >
                                                    {updateBasic ? <SelectDistrict selected={districtId} onChange={e => { setpresentDistrictId(e); setpresentThanaId(null); formAddress.setFieldsValue({ thanaId: null }) }} /> : <span>{user?.districtName}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                <span className='title'>Thana </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="thanaId"
                                                    labelAlign="left"
                                                    initialValue={user?.thanaId}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select thana' }]}
                                                >
                                                    {updateBasic ? <SelectThana selected={thanaId} onChange={e => setpresentThanaId(e)} /> : <span>{user?.thanaName}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                                <Row>
                                                    <Col span={6}>
                                                        <span className='title'> Student's Photo </span>
                                                    </Col>
                                                    <Col span={4}>
                                                        <span className='separator'> : </span>
                                                    </Col>
                                                    <Col span={14}>
                                                        {updateBasic ? 
                                                        <div style={{display:"flex"}}>
                                                            <Avatar
                                                            src={user?.studentImageLink}
                                                            size={'large'}
                                                            style={{ marginRight: 5 }}
                                                            className='custon-form-wrapper pointer topUserImage'
                                                        />
                                                        <Input type={'file'} accept=".png, .jpg, .jpeg" onChange={(e) => { uploadImage(e) }} /> 
                                                        </div>
                                                        : <Avatar
                                                            src={user?.studentImageLink}
                                                            size={'large'}
                                                            style={{ marginRight: 5 }}
                                                            className='custon-form-wrapper pointer topUserImage'
                                                        />}
                                                    </Col>
                                                </Row>
                                            

                                        {updateBasic &&
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item style={{ float: "right", marginTop: 20, marginBottom: -10 }}>
                                                        <Space size={"middle"}>
                                                            <Button type="primary" danger className='danger-button' onClick={() => setUpdateBasic(false)}>Close</Button>
                                                            <Button type="primary" className='ant-btn ant-btn-primary success-button' htmlType="submit">
                                                                Update
                                                            </Button>
                                                        </Space>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        }
                                    </Form>
                                </Col>

                            </Row>
                        </Card>
                        <br />
                        
                    </Col>
                </Row>
            </Card>
            <Modal title="OTP Code"
                visible={isModalVisible}
                onOk={updateNumber}
                onCancel={() => setIsModalVisible(false)}
                centered
                cancelText={"Close"}
                maskClosable={false}
                // cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                keyboard={false}
                closeIcon={<CloseCircleOutlined />}
                footer={false}
            >

                {!hasOtp &&
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: 15, textAlign: "left" }}> We will send you A One Time Password (OTP) code to verify your account. It might take up to 5 minutes. Once verified, you will be able to edit your profile in this browser. </span> <br />
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <Button type='primary' className='success-button' onClick={() => sendOtp()}>Send OTP</Button>
                        </div>

                    </div>
                }
                {hasOtp &&
                    <>
                        <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center', alignItems: "center" }}>
                            <div className="otp">
                                <OtpInput
                                    value={token}
                                    onChange={(e) => setToken(e)}
                                    numInputs={4}
                                    separator={<span style={{ color: "#D9D9D9" }}>-</span>}
                                    inputStyle={{
                                        border: '1px solid #D9D9D9',
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <Button type="primary" className='success-button' onClick={() => otpSubmitForm()} style={{ height: 40, right: 0 }}>
                                Submit
                            </Button>
                        </div>
                    </>
                }

            </Modal>
        </div>
    )
}
