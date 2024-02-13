import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Input, Spin, Result, List, Card, Checkbox, Tooltip, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';

import axios from 'axios';

const { Option } = Select;
const currentyear = new Date().getFullYear();
const optionsYear = [
    { value: currentyear - 1, label: currentyear - 1 },
    { value: currentyear, label: currentyear },
    { value: currentyear + 1, label: currentyear + 1 }
]
export default function ResultPage(props) {

    const [loading, setLoading] = useState(false);
    const user = useStoreState(state => state.auth.user)
    const [form] = Form.useForm();
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }


    const onFinish = (values: any) => {
       
        downloadResult2();
      

    };

    const [classConfigList, setclassConfigList] = useState<any>([])
    const [classConfigId, setclassConfigId] = useState<any>()
    const [examList, setExamList] = useState<any>([])
    const [examConfigId, setexamConfigId] = useState<any>()
    const [academicYear, setacademicYear] = useState<any>()
    useEffect(() => {
        async function fetchMyAPI() {
            setLoading(true)
            let response = await fetch(`${process.env.REACT_APP_API_ROOT}/public/class/configuration/list?instituteId=${user?.instituteId}`)
            let data = await response.json()
            if (response.status === 200) {
                setclassConfigList(data?.item)
                setLoading(false)
            } else {
                setLoading(false)
            }

        }

        fetchMyAPI()
    }, [])


    const [url, setUrl] = useState<any>('');
    const [pdf, setPdf] = useState<boolean>(false)
    const [time, settime] = useState<boolean>(false)
    const [message, setMessage] = useState<any>('')

    function downloadResult2() {
        
        //const API_BASE = process.env.REACT_APP_API_ROOT
        window.open(`${process.env.REACT_APP_API_ROOT}/public/general/marksheet/download/single?examConfigId=${examConfigId}&academicYear=${academicYear}&classConfigId=${classConfigId}&customStudentId=${user?.customStudentId}&instituteId=${user?.instituteId}`, '_blank');

    }

    async function downloadResult() {

        try {
            const res: any = await axios(`${process.env.REACT_APP_API_ROOT}/public/general/marksheet/download/single?examConfigId=${examConfigId}&academicYear=${academicYear}&classConfigId=${classConfigId}&customStudentId=${user?.customStudentId}&instituteId=${user?.instituteId}`);
            console.log(res)
            if (res.status === 200) {
                if (res?.headers?.['content-type']) {
                    setPdf(false)
                    // notification.warn({ message: res?.data?.message });
                    settime(true)
                    setMessage(res?.data?.message)
                } else {
                    // var blob = new Blob([res?.data])
                    // FileSaver.saveAs(blob, 'fileName.pdf');

                    setPdf(true)
                    settime(false)
                    if (isMobile) {
                        notification.warn({ message: 'A Pdf file has been downloaded in your mobile device' });
                        window.open(`${process.env.REACT_APP_API_ROOT}/public/general/marksheet/download/single?examConfigId=${examConfigId}&classConfigId=${classConfigId}&academicYear=${academicYear}&customStudentId=${user?.customStudentId}&instituteId=${user?.instituteId}`)
                    }
                    axios(`${process.env.REACT_APP_API_ROOT}/public/general/marksheet/download/single?examConfigId=${examConfigId}&classConfigId=${classConfigId}&academicYear=${academicYear}&customStudentId=${user?.customStudentId}&instituteId=${user?.instituteId}`, {
                        method: 'GET',
                        responseType: 'blob' //Force to receive data in a Blob Format
                    })
                        .then(response => {

                            const file = new Blob(
                                [response.data],
                                { type: 'application/pdf' });
                            //Build a URL from the file
                            const fileURL = URL.createObjectURL(file);
                            //Open the URL on new Window
                            setUrl(fileURL)
                        })

                }
            } else {
                notification.error({ message: "No Data Found" })
                setPdf(false)
                settime(false)
            }
        } catch (err) {
            notification.error({ message: "No Data Found" })
            setPdf(false)
            settime(false)
        }

    }

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    async function fetchExam(val) {
        let response = await fetch(`${process.env.REACT_APP_API_ROOT}/public/exam-configuration/list/by/class-configuration-id?classConfigurationId=${val}&instituteId=${user?.instituteId}`)
        let data = await response.json()
        if (response.status === 200) {
            setExamList(data?.item)
            setLoading(false)
        } else {
        }
    }

    return (
        <div className="mt-25 mb-sm-25">
            <Card title="Result" >

                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="academicYear"
                                label="Year:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Year" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Year" options={optionsYear} onChange={(value) => { setacademicYear(value) }} />


                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="classConfigId"
                                label="Section:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please select section" },
                                ]}
                            >
                                <Select
                                    placeholder="Select Section"
                                    allowClear
                                    showSearch
                                    filterOption={(input, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value: any) => {
                                        setclassConfigId(value)
                                        fetchExam(value)
                                        setexamConfigId(null)
                                        form.setFieldsValue({ examConfigId: null })
                                    }}
                                >
                                    {classConfigList ? (
                                        classConfigList?.map((type, idx) => (
                                            <Option key={type.id} value={type.id} >
                                                {type.classConfigName}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="fetching">Fetching Section</Option>
                                    )}
                                </Select>


                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="examConfigId"
                                label="Exam:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please select exam" },
                                ]}
                            >
                                <Select
                                    placeholder="Select Exam"
                                    onChange={(value) => { setexamConfigId(value) }}
                                    allowClear
                                    showSearch
                                    filterOption={(input, option: any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {examList ? (
                                        examList?.map((type, idx) => (
                                            <Option key={type.examConfigId} value={type.examConfigId} >
                                                {type.examName}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="fetching">Fetching Exam</Option>
                                    )}
                                </Select>


                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                            <Form.Item className="mb-sm-0">
                                <Button className='success-button' type="primary" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10}} >
                                    Download
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {time &&
                    <div style={{ marginTop: 20, fontWeight: "bold", fontSize: 18, color: "red", textAlign: "center" }}>
                        {message}
                    </div>
                }
                {pdf &&
                    <>
                        <div style={{ height: 600, marginTop: 20 }}>

                            <embed
                                src={url}
                                type="application/pdf"
                                height="100%"
                                width="100%"
                            ></embed>
                        </div>

                    </>
                }

            </Card>
        </div>
    )
}
