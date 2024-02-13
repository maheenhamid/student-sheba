import { CalendarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import axios from 'axios';
import FileSaver from 'file-saver';

const { Option } = Select;

export default function AdmitCardUniversity(props) {
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const examList = useStoreState(state => state.auth.examList)
    const fetchExamList = useStoreActions(state => state.auth.fetchExamList);

    useEffect(() => {
        let payload:any = {instituteId: user?.instituteId, studentId: user?.studentId}
        fetchExamList(payload);
    }, [])



    const [form] = Form.useForm();


    async function onFinish(values: any) {

        try {
            const res: any = await axios(`${process.env.REACT_APP_API_ROOT_UNIVERSITY}/public/admit-card/download?examId=${values?.examId}&instituteId=${user?.instituteId}&semesterYearId=${values?.semesterYearId}&studentId=${user?.studentId}`);
            if (res.status === 200) {
                if (res?.headers?.['content-type']) {
                    notification.error({ message: "No Data Found" })
                } else {
                    // var blob = new Blob([res?.data])
                    // FileSaver.saveAs(blob, 'fileName.pdf');
                    if (isMobile) {
                        notification.warn({ message: 'A Pdf file has been downloaded in your mobile device' });
                        window.open(`${process.env.REACT_APP_API_ROOT_UNIVERSITY}/public/admit-card/download?examId=${values?.examId}&instituteId=${user?.instituteId}&semesterYearId=${values?.semesterYearId}&studentId=${user?.studentId}`)
                    }
                    axios(`${process.env.REACT_APP_API_ROOT_UNIVERSITY}/public/admit-card/download?examId=${values?.examId}&instituteId=${user?.instituteId}&semesterYearId=${values?.semesterYearId}&studentId=${user?.studentId}`, {
                        method: 'GET',
                        responseType: 'blob' //Force to receive data in a Blob Format
                    })
                        .then(response => {

                            const file = new Blob(
                                [response.data],
                                { type: 'application/pdf' });
                            FileSaver.saveAs(file, 'ADMIT_CARD.pdf');

                        })

                }
            } else {
                notification.error({ message: "No Data Found" })
            }
        } catch (err) {
            notification.error({ message: "No Data Found" })

        }
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;



    return (
        <>
            <br />
            <Card className="mt-25 mb-sm-25" title="Admit Card">
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                            <Form.Item
                                name="semesterYearId"
                                label="Year:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Year" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Semester Year" >
                                    {user?.semesterYearList?.map((item: any, index: any) => {
                                        return (
                                            <Option value={item.id} key={index}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                            <Form.Item
                                name="examId"
                                label="Exam:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Exam" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Exam" >
                                    {examList?.map((item: any, index: any) => {
                                        return (
                                            <Option value={item.id} key={index}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <Form.Item className="mb-sm-0">
                                <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                    Download
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Card>
        </>
    )
}
