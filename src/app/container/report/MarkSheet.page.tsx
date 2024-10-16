import { CalendarOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal } from 'antd';
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { SelectAcademicYear } from '../profile/SelectAcademicYear';
import { SelectExam } from '../profile/SelectExam';
import ReactToPrint from 'react-to-print';
// import './Custom.css'

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        name?: string;
    }
}
const ComponentToPrint = forwardRef((props: any, ref: any) => {
    const { data, info } = props;

    return (
        <div className='print-sourcex' ref={ref} >
            <div className="marksheet">
                <div className="marksheet_header">
                    <div className="row logo_institue_profile" >

                    </div>
                    <div className="row">
                        <div style={{ display: 'flex', alignContent: "center", alignItems: "center", justifyContent: "space-around" }}>
                            <div>
                            </div>
                            <div style={{ display: 'flex', alignContent: "center", alignItems: "center", justifyContent: "space-around" }}>
                                <div>
                                    <img className="billinvoice" src={data?.logoLink} alt="Logo" height={70} width={70} />
                                </div>
                                <div>
                                    <span style={{ fontSize: 22, fontWeight: "bold" }}>{data?.instituteName}</span> <br />
                                    <span style={{ fontSize: 11, }}>{data?.instituteAddress}</span>
                                </div>

                            </div>
                            <div>
                                <table className="mark_table">
                                    <thead>
                                        <tr className="HEAD_TABLE">
                                            <td>Range</td>
                                            <td>Grade</td>
                                            <td>GPA</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.gradeViews?.map((item, id) => {
                                            return <tr key={id}>
                                                <td>{item?.gradeRange}</td>
                                                <td>{item?.gradeName}</td>
                                                <td>{item?.gradePoint}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className="row two" style={{ marginBottom: -8 }}>
                        <div className="roll">Student's Name : {data?.studentName}</div>
                    </div>
                    {/* <div className="row two">
      <div className="roll">Father's Name : {data?.studentName}</div>
    </div>       */}
                    <div className="row two" style={{ marginBottom: -8 }}>
                        <div className="roll">Class : {data?.className}</div>
                        <div className="roll">Exam : {data?.examName}</div>
                    </div>
                    <div className="row two">
                        <div className="roll">Group : {data?.groupName}</div>
                        <div className="roll">Year/Session : {data?.groupName}</div>
                    </div>

                    <hr style={{ marginBottom: 10 }} />
                    {/* SSC Full Preparation */}
                </div>
                <table className="mark_table">
                    <thead>
                        <tr className="HEAD_TABLE">
                            <td>Subject Name</td>
                            <td>Full Mark</td>
                            <td>{data?.shortCode1}</td>
                            <td>{data?.shortCode2}</td>
                            <td>{data?.shortCode3}</td>
                            <td>{data?.shortCode4}</td>
                            <td>{data?.shortCode5}</td>
                            <td>{data?.shortCode6}</td>
                            <td>Total Mark</td>
                            <td>Letter Grade</td>
                            <td>Grade Point</td>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.marks?.map((item, id) => {
                            return <tr key={id}>
                                <td>{item?.subjectName}</td>
                                <td>{item?.fullMark}</td>
                                <td>{item?.shortCode1}</td>
                                <td>{item?.shortCode2}</td>
                                <td>{item?.shortCode3}</td>
                                <td>{item?.shortCode4}</td>
                                <td>{item?.shortCode5}</td>
                                <td>{item?.shortCode6}</td>
                                <td>{item?.obtainMark}</td>
                                <td>{item?.letterGrade}</td>
                                <td>{item?.gradePoint}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total Full Mark</td>
                            <td>{data?.totalMark}</td>
                            <td colSpan={6}>Grand Total</td>
                            <td>{data?.totalMark}</td>
                            <td>{data?.letterGrade}</td>
                            <td>{data?.avgGpaWithOptional}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div style={{ width: "50%", padding: 10, border: "1px solid #000", marginLeft: 20 }}>
                <div className="row two" style={{ marginBottom: -8 }}>
                    <div className="roll">Result Status : {data?.resultStatus}</div>
                    <div className="roll">Class Position : {data?.classPosition}</div>
                </div>
                <div className="row two">
                    <div className="roll">GPA (without 4th) : {data?.avgGpaWithOutOptional}</div>
                    <div className="roll">Section Postion : {data?.sectionPosition}</div>
                </div>
            </div>

        </div>
    );
});


export default function MarkSheet(props) {

    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const singleStudentMarkView = useStoreState(state => state.auth.singleStudentMarkView)
    const fetchsingleStudentMarkView = useStoreActions(state => state.auth.fetchsingleStudentMarkView);

    const fetchacademicYearList = useStoreActions((state) => state.auth.fetchacademicYearList);
    const fetchPublicExamList = useStoreActions((state) => state.auth.fetchPublicExamList);
    useEffect(() => {
        fetchacademicYearList(user?.instituteId)
        fetchPublicExamList(user?.instituteId)
    }, [])





    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;


    //console.log(singleStudentMarkView)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        let payload: any = {
            academicYear: values?.academicYear,
            instituteId: user?.instituteId,
            customStudentId: user?.customStudentId,
            examId: values?.examId,
        }
        fetchsingleStudentMarkView(payload)
    }

    const componentRef: any = useRef();
    return (
        <div className="mt-25 mb-sm-25">
            <Card title="Fee Report" className='custom-card-view'>
                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="academicYear"
                                label="Academic Year:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Year" },
                                ]}
                            >
                                <SelectAcademicYear />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>

                            <Form.Item
                                name="examId"
                                label="Exam:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Exam" },
                                ]}
                            >
                                <SelectExam />
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

            </Card>
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            {singleStudentMarkView !== null &&

                <div style={{ textAlign: "center" }}>
                    <ReactToPrint
                        trigger={() => <Button className='pbtnx' type='primary' icon={<FileTextOutlined />}>Print</Button>}
                        content={() => componentRef.current}
                    />
                    <ComponentToPrint ref={componentRef} data={singleStudentMarkView} info={user} />
                </div>

            }

        </div>
    )
}
