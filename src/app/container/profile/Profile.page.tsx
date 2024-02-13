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
export default function Profile(props) {
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
    const updateStudentProfileBasicInfo = useStoreActions(state => state.auth.updateStudentProfileBasicInfo);
    const updateStudentGuardianInfo = useStoreActions(state => state.auth.updateStudentGuardianInfo);
    const updateStudentAddressInfo = useStoreActions(state => state.auth.updateStudentAddressInfo);
    const saveStudentProfileUpdateToken = useStoreActions(state => state.auth.saveStudentProfileUpdateToken);
    const otpUsedSend = useStoreActions(state => state.auth.otpUsedSend);
    const thanaListFetch = useStoreActions((state) => state.auth.thanaListFetch);
    const thanaListFetch2 = useStoreActions((state) => state.auth.thanaListFetch2);
    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    const [formBasic] = Form.useForm();
    const [formGuardian] = Form.useForm();
    const [formAddress] = Form.useForm();
    const [date, setDate] = useState<any>((user?.studentDOB !== null || user?.studentDOB !== undefined || user?.studentDOB !== '') ? user?.studentDOB : null)
    const [studentImageFileName, setStudentImageFileName] = useState<any>(null);
    const [studentImageFileContent, setStudentImageFileContent] = useState<any>(null);
    const [fatherPhotoName, setfatherPhotoName] = useState<any>(null);
    const [fatherPhotoFileContent, setfatherPhotoFileContent] = useState<any>(null);
    const [motherPhotoName, setmotherPhotoName] = useState<any>(null);
    const [motherPhotoFileContent, setmotherPhotoFileContent] = useState<any>(null);

    const [presentDistrictId, setpresentDistrictId] = useState<any>(user?.presentDistrictId);
    const [presentThanaId, setpresentThanaId] = useState<any>(user?.presentThanaId);
    const [permanentDistrictId, setpermanentDistrictId] = useState<any>(user?.permanentDistrictId);
    const [permanentThanaId, setpermanentThanaId] = useState<any>(user?.permanentThanaId);

    useEffect(() => {
        setTimeout(() => {
            thanaListFetch(presentDistrictId);
            thanaListFetch2(permanentDistrictId);
            setpresentThanaId(user?.presentThanaId)
            setpresentDistrictId(user?.presentDistrictId)
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
    const ref = useRef<any>();



    const onFinishBasic = (values: any) => {
        // console.log('Success:', values);
        // console.log(date)
        let payload:any = {
            "birthCertificateNo": values.birthCertificateNo,
            "bloodGroup": values.bloodGroup,
            "instituteId": user?.instituteId,
            // "mailingAddress": values.mailingAddress,
            // "studentDOB": date,
            "studentGender": values.studentGender,
            "studentId": user?.studentId,
            "customStudentId": user?.customStudentId,
            "studentName": values.studentName,
            "studentReligion": values.studentReligion,
            "studentImageFileContent": studentImageFileContent !== null ? studentImageFileContent : user?.studentImageFileContent !== null ? user?.imageName : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            "studentImageFileName": studentImageFileName !== null ? studentImageFileName : 'Test.jpg',
        }
        // console.log(payload)
        updateStudentProfileBasicInfo(payload)
        setUpdateBasic(false)
        setStudentImageFileName(null);
        setStudentImageFileContent(null);
        // reset();
        //console.log(studentImageFileContent)
        // setUpdateBasic(true);
    };


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
        let payload:any = {
            "token": token,
            "instituteId": user?.instituteId,
            "customStudentId": user?.customStudentId
        }
        if (token.length === 4) {
            otpUsedSend(payload)
        }
    }
    const sendOtp = () => {
        let payload:any = {
            "instituteId": user?.instituteId,
            "studentId": user?.studentId
        }
        // console.log(payload)
        saveStudentProfileUpdateToken(payload);
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
                                        <Row>
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
                                        </Row>
                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Religion </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="studentReligion"
                                                    labelAlign="left"
                                                    initialValue={user?.studentReligion}
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
                                                    </Select> : <span>{user?.studentReligion}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* <Row>
                                            <Col span={6}>
                                                <span className='title'> Birthday </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="studentDOB"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.studentDOB !== null ? moment(user?.studentDOB, 'YYYY/MM/DD') : null}
                                                    rules={[{ required: updateBasic ? true : false, message: 'Please select religion' }]}
                                                >
                                                    {updateBasic ? <DatePicker style={{ width: "100%", height: 40 }} value={user?.studentDOB ? moment(user?.studentDOB, 'YYYY/MM/DD') : moment((new Date()), "DD/MM/YYYY")} onChange={e => setDate(moment(e).format("YYYY-MM-DD"))} /> : <span>{user?.studentDOB}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row> */}
                                        
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
                                                <span className='title'> Birth Certificate No </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                <Form.Item
                                                    name="birthCertificateNo"
                                                    labelAlign="left"
                                                    className='custon-form-wrapper'
                                                    initialValue={user?.birthCertificateNo}

                                                >
                                                    {updateBasic ? <Input placeholder='Birth Certificate No' style={{ height: 40 }} /> : <span>{user?.birthCertificateNo}</span>}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* <Form.Item
                                            label="Address"
                                            name="mailingAddress"
                                            labelAlign="left"
                                            initialValue={user?.mailingAddress}

                                        >
                                            {updateBasic ? <TextArea placeholder='Address' /> : <span>{user?.mailingAddress}</span>}
                                        </Form.Item> */}
                                        {updateBasic &&
                                        <Row>
                                            <Col span={6}>
                                                <span className='title'> Student Photo: </span>
                                            </Col>
                                            <Col span={4}>
                                                <span className='separator'> : </span>
                                            </Col>
                                            <Col span={14}>
                                                {updateBasic ? <Input type={'file'} accept=".png, .jpg, .jpeg" onChange={(e) => { imageUpload(e) }} /> : <Avatar
                                                    src={user?.studentImageLink}
                                                    size={'large'}
                                                    style={{ marginRight: 5 }}
                                                    className="pointer topUserImage"
                                                />}
                                            </Col>
                                        </Row>
                                        }
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
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div className='text-center'>
                                        {updateBasic && <Avatar
                                            src={'data:image/png;base64,' + user?.imageName}
                                            size={100}
                                            style={{ marginRight: 5 }}
                                        />}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <br />
                        {edit &&
                            <Card className='custom-inner-card' title='Guardian Info' extra={<Button className='success-button' type='primary' disabled={!edit} onClick={() => setUpdateGuardian(true)} icon={<EditOutlined />}>Edit</Button>}>
                                <Row className='info-wrapper'>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                        <Form
                                            name="guardianInfo"
                                            // initialValues={{ remember: true }}
                                            onFinish={onFinishGuardian}
                                            form={formGuardian}
                                            // onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
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
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input father's name" }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Father's Name" style={{ height: 40 }} /> : <span>{user?.fatherName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Father's Profession </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="fatherOccupation"
                                                        labelAlign="left"
                                                        initialValue={user?.fatherOccupation}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please select father occupation" }]}
                                                    >
                                                        {updateGuardian ? <Select
                                                            placeholder="Select Profession"
                                                            className="selectBasic"
                                                        >
                                                            <Option value="Business">Business</Option>
                                                            <Option value="Service">Service</Option>
                                                            <Option value="Private Service">Private Service</Option>
                                                            <Option value="Govt. Service">Govt. Service</Option>
                                                            <Option value="Teacher">Teacher</Option>
                                                            <Option value="Banker">Banker</Option>
                                                            <Option value="Doctor">Doctor</Option>
                                                            <Option value="Engineer">Engineer</Option>
                                                            <Option value="Lawyer">Lawyer</Option>
                                                            <Option value="Journalist">Journalist</Option>
                                                            <Option value="Farmer">Farmer</Option>
                                                            <Option value="Driver">Driver</Option>
                                                            <Option value="Phycian">Phycian</Option>
                                                            <Option value="Student">Student</Option>
                                                            <Option value="Army">Army</Option>
                                                            <Option value="Police Officer">Police Officer</Option>
                                                            <Option value="Navy">Navy</Option>
                                                            <Option value="Airforce">Airforce</Option>
                                                            <Option value="Retired Person">Retired Person</Option>
                                                            <Option value="NRB">NRB</Option>
                                                            <Option value="BGB">BGB</Option>
                                                            <Option value="N/A">N/A</Option>
                                                            <Option value="NSI">NSI</Option>
                                                        </Select> : <span>{user?.fatherOccupation}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Father's Designation </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="fatherDesignation"
                                                        labelAlign="left"
                                                        initialValue={user?.fatherDesignation}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input father's designation " }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Father's Designation " style={{ height: 40 }} /> : <span>{user?.fatherDesignation}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Father's Workplace </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="fatherWorkingPlace"
                                                        labelAlign="left"
                                                        initialValue={user?.fatherWorkingPlace}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input father's working place " }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Father's Working Place " style={{ height: 40 }} /> : <span>{user?.fatherWorkingPlace}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Father's NID </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="fatherNid"
                                                        labelAlign="left"
                                                        initialValue={user?.fatherNid}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input father's nid" }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Father's NID " style={{ height: 40 }} /> : <span>{user?.fatherNid}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {updateGuardian &&
                                                <Row>
                                                    <Col span={6}>
                                                        <span className='title'> Father's Photo </span>
                                                    </Col>
                                                    <Col span={4}>
                                                        <span className='separator'> : </span>
                                                    </Col>
                                                    <Col span={14}>
                                                        {updateGuardian ? <Input type={'file'} className="custon-form-wrapper" accept=".png, .jpg, .jpeg" onChange={(e) => { imageUploadFather(e) }} /> : <Avatar
                                                            src={ user?.fatherPhotoLink}
                                                            size={'large'}
                                                            style={{ marginRight: 5 }}
                                                            className="pointer topUserImage"
                                                        />}
                                                    </Col>
                                                </Row>
                                            }
                                            <div>
                                                <br />
                                            </div>
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
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input mother's name" }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Mother's Name" style={{ height: 40 }} /> : <span>{user?.motherName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Mother's Profession </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="motherOccupation"
                                                        labelAlign="left"
                                                        initialValue={user?.motherOccupation}
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please select mother's occupation" }]}
                                                        className='custon-form-wrapper'
                                                    >
                                                        {updateGuardian ? <Select
                                                            placeholder="Select Profession"
                                                            className="selectBasic"
                                                        >
                                                            <Option value="House Wife">House Wife</Option>
                                                            <Option value="Business">Business</Option>
                                                            <Option value="Service">Service</Option>
                                                            <Option value="Private Service">Private Service</Option>
                                                            <Option value="Govt. Service">Govt. Service</Option>
                                                            <Option value="Teacher">Teacher</Option>
                                                            <Option value="Banker">Banker</Option>
                                                            <Option value="Doctor">Doctor</Option>
                                                            <Option value="Engineer">Engineer</Option>
                                                            <Option value="Lawyer">Lawyer</Option>
                                                            <Option value="Journalist">Journalist</Option>
                                                            <Option value="Farmer">Farmer</Option>
                                                            <Option value="Driver">Driver</Option>
                                                            <Option value="Phycian">Phycian</Option>
                                                            <Option value="Student">Student</Option>
                                                            <Option value="Army">Army</Option>
                                                            <Option value="Police Officer">Police Officer</Option>
                                                            <Option value="Navy">Navy</Option>
                                                            <Option value="Airforce">Airforce</Option>
                                                            <Option value="Retired Person">Retired Person</Option>
                                                            <Option value="NRB">NRB</Option>
                                                            <Option value="BGB">BGB</Option>
                                                            <Option value="N/A">N/A</Option>
                                                            <Option value="NSI">NSI</Option>
                                                        </Select> : <span>{user?.motherOccupation}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Mother's Designation </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="motherDesignation"
                                                        labelAlign="left"
                                                        initialValue={user?.motherDesignation}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input mother's designation " }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Mother's Designation " style={{ height: 40 }} /> : <span>{user?.motherDesignation}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Mother's Workplace </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="motherWorkingPlace"
                                                        labelAlign="left"
                                                        initialValue={user?.motherWorkingPlace}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input mother's working place " }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Mother's Working Place " style={{ height: 40 }} /> : <span>{user?.motherWorkingPlace}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Mother's NID </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="motherNid"
                                                        labelAlign="left"
                                                        initialValue={user?.motherNid}
                                                        className='custon-form-wrapper'
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input mother's nid" }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Mother's NID " style={{ height: 40 }} /> : <span>{user?.motherNid}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {updateGuardian &&
                                                <Row>
                                                    <Col span={6}>
                                                        <span className='title'> Mother's Photo </span>
                                                    </Col>
                                                    <Col span={4}>
                                                        <span className='separator'> : </span>
                                                    </Col>
                                                    <Col span={14}>
                                                        {updateGuardian ? <Input type={'file'} accept=".png, .jpg, .jpeg" onChange={(e) => { imageUploadMother(e) }} /> : <Avatar
                                                            src={user?.motherPhotoLink}
                                                            size={'large'}
                                                            style={{ marginRight: 5 }}
                                                            className='custon-form-wrapper pointer topUserImage'
                                                        />}
                                                    </Col>
                                                </Row>
                                            }
                                            <br />
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
                                                        rules={[{ required: updateGuardian ? true : false, message: "Please input guardian's number" }]}
                                                    >
                                                        {updateGuardian ? <Input placeholder="Guardian's Mobile mNumber" style={{ height: 40 }} /> : <span>{user?.guardianMobile}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            
                                            {updateGuardian &&
                                                <Row>
                                                    <Col span={24}>
                                                        <Form.Item style={{ float: "right", marginTop: 20, marginBottom: -10 }}>
                                                            <Space size={"middle"}>
                                                                <Button type="primary" danger className='danger-button' onClick={() => setUpdateGuardian(false)}>Close</Button>
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
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <div className='text-center'>
                                            {updateGuardian && <Avatar
                                                src={user?.fatherPhotoLink}
                                                size={100}
                                                style={{ marginRight: 5 }}
                                                className='custon-form-wrapper pointer topUserImage'
                                            />}
                                        </div>
                                        <br />
                                        <div className='text-center'>
                                            {updateGuardian && <Avatar
                                                src={user?.motherPhotoLink}
                                                size={100}
                                                style={{ marginRight: 5 }}
                                                className='custon-form-wrapper pointer topUserImage'
                                            />}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        }
                        {edit &&
                            <Card className='custom-inner-card' title='Address Info' extra={<Button type='primary' className='success-button' disabled={!edit} onClick={() => setupdateAddress(true)} icon={<EditOutlined />}>Edit</Button>}>
                                <Row className='info-wrapper'>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                        <Form
                                            name="address"
                                            // initialValues={{ remember: true }}
                                            onFinish={onFinishAddress}
                                            form={formAddress}
                                            // onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                        >
                                            
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
                                                        {updateAddress ? <TextArea style={{ height: 50 }} placeholder='Mailing Address' /> : <span>{user?.mailingAddress}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Present Village </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                <Form.Item
                                                        name="presentVillege"
                                                        labelAlign="left"
                                                        initialValue={user?.presentVillege}
                                                    // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                    >
                                                        {updateAddress ? <Input placeholder='Present Village' style={{ height: 40 }} /> : <span>{user?.presentVillege}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Present Post Office </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="presentPostOffice"
                                                        labelAlign="left"
                                                        initialValue={user?.presentPostOffice}
                                                    // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                    >
                                                        {updateAddress ? <Input placeholder='Present Post Office' style={{ height: 40 }} /> : <span>{user?.presentPostOffice}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Present District </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="presentDistrict"
                                                        labelAlign="left"
                                                        initialValue={user?.presentDistrictId}
                                                        rules={[{ required: updateAddress ? true : false, message: 'Please select district' }]}
                                                    >
                                                        {updateAddress ? <SelectDistrict selected={presentDistrictId} onChange={e => { setpresentDistrictId(e); setpresentThanaId(null); formAddress.setFieldsValue({ presentThanaId: null }) }} /> : <span>{user?.presentDistrictName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Present Thana </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="presentThanaId"
                                                        labelAlign="left"
                                                        initialValue={user?.presentThanaId}
                                                        rules={[{ required: updateAddress ? true : false, message: 'Please select thana' }]}
                                                    >
                                                        {updateAddress ? <SelectThana selected={presentThanaId} onChange={e => setpresentThanaId(e)} /> : <span>{user?.presentThanaName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Permanent Village </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="permanentVillege"
                                                        labelAlign="left"
                                                        initialValue={user?.permanentVillege}
                                                    // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                    >
                                                        {updateAddress ? <Input placeholder='Permanent Village' style={{ height: 40 }} /> : <span>{user?.permanentVillege}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Permanent Post Office </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="permanentPostOffice"
                                                        labelAlign="left"
                                                        initialValue={user?.permanentPostOffice}
                                                    // rules={[{ required: updateBasic ? true : false, message: 'Please input your name' }]}
                                                    >
                                                        {updateAddress ? <Input placeholder='Permanent Post Office' style={{ height: 40 }} /> : <span>{user?.permanentPostOffice}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Permanent District </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="permanentDistrict"
                                                        labelAlign="left"
                                                        initialValue={user?.presentDistrictId}
                                                        rules={[{ required: updateAddress ? true : false, message: 'Please select district' }]}
                                                    >
                                                        {updateAddress ? <SelectDistrict2 selected={permanentDistrictId} onChange={e => { setpermanentDistrictId(e); setpermanentThanaId(null); formAddress.setFieldsValue({ permanentThanaId: null }) }} /> : <span>{user?.permanentDistrictName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={6}>
                                                    <span className='title'> Permanent Thana </span>
                                                </Col>
                                                <Col span={4}>
                                                    <span className='separator'> : </span>
                                                </Col>
                                                <Col span={14}>
                                                    <Form.Item
                                                        name="permanentThanaId"
                                                        labelAlign="left"
                                                        initialValue={user?.permanentThanaId}
                                                        rules={[{ required: updateAddress ? true : false, message: 'Please select thana' }]}
                                                    >
                                                        {updateAddress ? <SelectThana2 selected={permanentThanaId} onChange={e => setpermanentThanaId(e)} /> : <span>{user?.permanentThanaName}</span>}
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            {updateAddress &&
                                                <Row>
                                                    <Col span={24}>
                                                        <Form.Item style={{ float: "right", marginTop: 20, marginBottom: -10 }}>
                                                            <Space size={"middle"}>
                                                                <Button type="primary" danger className='danger-button' onClick={() => setupdateAddress(false)}>Close</Button>
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
                        }
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
