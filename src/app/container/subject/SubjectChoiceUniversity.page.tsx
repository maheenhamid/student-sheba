import { CalendarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal, message, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import jsPDF from "jspdf";
import { pdfDataL, ppowerdbypdf, pdatepdf } from '../utils/pdf';
import $ from 'jquery';
require('jspdf-autotable');

const { Option } = Select;

let totalCredit = 0;
let totalCreditAmount = 0;

let totalTheoraticalCredit = 0;
let totalPracticalCredit = 0;

export default function SubjectChoiceUniversity(props) {
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const studentSubjectListForAssign = useStoreState(state => state.module.studentSubjectListForAssign)
    const fetchstudentSubjectListForAssign = useStoreActions(state => state.module.fetchstudentSubjectListForAssign);
    const saveStudentSubjectAssign = useStoreActions(state => state.module.saveStudentSubjectAssign);
    const [form] = Form.useForm();


    const [first, setFirst] = useState<boolean>(false);
    const [nodata, setnodata] = useState(false);
    const [data2, setData2] = useState<any>(null);

    const onFinish = (values: any) => {
        setnodata(true);
        totalTheoraticalCredit=0;
        totalPracticalCredit=0;
        // console.log(user)
        let payload: any = {
            studentId: user?.studentId,
            instituteId: user?.instituteId,
            semesterYearId: values?.year,
        };
        setData2(payload);
        // console.log(payload)
        fetchstudentSubjectListForAssign(payload);
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns2 = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Theoratical Credit',
            dataIndex: 'theoryCredit',
            key: 'theoryCredit',
        },
        {
            title: 'Practical Credit',
            dataIndex: 'practicalCredit',
            key: 'practicalCredit',
        },

    ];

    const onSaveSubject = () => {
        if (selectedRowKeys?.length === 0) {
            notification.error({ message: "Please select subject" });
            return;
        }
        if (first === false) {
            alert("After saving, you wont be able to reassign/update");
            setFirst(true);
            return;
        }
        let payloadx: any = {
            "identificationId": studentSubjectListForAssign?.identificationId,
            "instituteId": user?.instituteId,
            "subjectIds": selectedValue?.map(item => item?.subjectId)
        }
        let final: any = { data1: payloadx, data2: data2 };
        saveStudentSubjectAssign(final)
        setselectedRowKeys([]);
        setselectedValue([]);
    }

    function exportPdf() {

        var doc = new jsPDF("p", "mm", "a4");

        var detailsc = `Assigned Subject List`;
        pdfDataL(doc, "");
        doc.text(detailsc, 105, 40, 'center');
        var totalPagesExp = "{total_pages_count_string}";

        var pageContent = function (data) {
            // FOOTER
            var str = ppowerdbypdf + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + pdatepdf;
            }
            doc.setFontSize(8);
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            doc.text(str, data.settings.margin.right, pageHeight - 10);
        };

        totalTheoraticalCredit = studentSubjectListForAssign?.studentAssignedSubjectList?.reduce(function (acc, obj) {
            return acc + obj.theoryCredit;
        }, 0);

        totalPracticalCredit = studentSubjectListForAssign?.studentAssignedSubjectList?.reduce(function (acc, obj) {
            return acc + obj.practicalCredit;
        }, 0);

        var col = [
            "Subject Code",
            "Subject",
            "Theoratical Credit",
            "Practical Credit",
        ].filter(Boolean);

        var rows: any = [];

        studentSubjectListForAssign?.studentAssignedSubjectList?.forEach(element => {
            var temp: any = [
                element.code,
                element.subjectName,
                element.theoryCredit,
                element.practicalCredit,
            ];
            rows.push(temp);
        });


        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
        ], [
            {
                b1: "Name",
                b2: user?.studentName,
            }
        ], {
            startY: 45,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 80,
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 102,
                },
            }
        });
        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
        ], [
            {
                b1: "Student Id",
                b2: user?.customStudentId,
            }
        ], {
            startY: doc.autoTable.previous.finalY + 0,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 80,
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 102,
                },
            }
        });
        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
        ], [
            {
                b1: "Session",
                b2: user?.session,
            }
        ], {
            startY: doc.autoTable.previous.finalY + 0,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 80,
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 102,
                },
            }
        });
        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
        ], [
            {
                b1: "Class Department",
                b2: user?.classDepartment,
            }
        ], {
            startY: doc.autoTable.previous.finalY + 0,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 80,
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 102,
                },
            }
        });
        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
        ], [
            {
                b1: "Semester Year",
                b2: $(".semYear").text(),
            }
        ], {
            startY: doc.autoTable.previous.finalY + 0,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 80,
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 102,
                },
            }
        });
        doc.autoTable(col, rows, {
            startY: doc.autoTable.previous.finalY + 5,
            showHeader: "firstPage",
            theme: 'grid',
            headerStyles: {
                // fillColor: [105, 105, 105],
                // textColor: [255, 255, 255],
                // fontSize: 10
                lineWidth: .01,
                overflow: 'linebreak',
                lineColor: [224, 224, 224]
            },
            styles: {
                overflow: 'linebreak',
            },
            columnStyles: {
                0: {
                    halign: "left",
                    columnWidth: 20
                },
                1: {
                    halign: "left",
                    columnWidth: 65
                },
                2: {
                    halign: "right",
                    columnWidth: 48.4
                },
                3: {
                    halign: "right",
                    columnWidth: 48.4
                }
            },
        });
        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
            { title: "", dataKey: "b3" },
        ], [
            {
                b1: "Total",
                b2: totalTheoraticalCredit,
                b3: totalPracticalCredit,
            }
        ], {
            startY: doc.autoTable.previous.finalY + 0,
            showHeader: "never",
            theme: 'grid',
            columnStyles: {
                b1: {
                    columnWidth: 85,
                    
                    fontStyle: 'bold'
                },
                b2: {
                    columnWidth: 48.4,
                    halign: "right",
                },
                b3: {
                    columnWidth: 48.4,
                    halign: "right",
                },
            }
        });

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.setPage(1 + doc.internal.getCurrentPageInfo().pageNumber - doc.autoTable.previous.pageCount);
        doc.save(detailsc + ".pdf");

    }

    return (
        <>
            <br />
            <Card className="mt-25 mb-sm-25" title="Subject Choice" >
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                <Form layout="vertical" onFinish={onFinish} id='create-class' form={form} className="mb-sm-25" >
                    <Row gutter={15}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}></Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>

                            <Form.Item
                                name="year"
                                label="Year:"
                                className="title-Text custon-form-wrapper"
                                rules={[
                                    { required: true, message: "Please Select Year" },
                                ]}
                            >
                                <Select allowClear placeholder="Select Semester Year" className='semYear'>
                                    {user?.semesterYearList?.map((item: any, index: any) => {
                                        return (
                                            <Option value={item.id} key={index}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item className="mb-sm-0">
                                <Button type="primary" className="success-button" htmlType="submit" style={{ marginTop: isMobile ? 0 : 30, width: "100%", padding: 10 }}>
                                    Search
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>

            </Card>
            {nodata && studentSubjectListForAssign != null &&
                <Row gutter={15}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className="mt-25 mb-sm-25" title="Subject List">
                            <Table
                                bordered={true}
                                dataSource={studentSubjectListForAssign?.subjectConfigurationList}
                                columns={columns2}
                                rowKey='subjectId'
                                rowSelection={rowSelection}
                                pagination={false}
                                style={{ marginBottom: 10 }}
                            />
                            <strong style={{ color: "red" }}>N.B: You cannot update the assigned subject list.</strong>
                            <div style={{ textAlign: "right" }}>
                                <Button type="primary" className="success-button" onClick={() => onSaveSubject()}  >
                                    Save
                                </Button>
                            </div>

                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className="mt-25 mb-sm-25" title="Assigned Subject List">
                            {studentSubjectListForAssign?.studentAssignedSubjectList?.length > 0 &&
                                <>
                                    <Table
                                        bordered={true}
                                        dataSource={studentSubjectListForAssign?.studentAssignedSubjectList}
                                        columns={columns2}
                                        rowKey='assignId'
                                        pagination={false}
                                    />
                                    <br />
                                    <div style={{ textAlign: "right" }}>
                                        <Button type="primary" className="success-button" onClick={() => exportPdf()}  >
                                            Download PDF
                                        </Button>

                                    </div>
                                </>
                            }
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}
