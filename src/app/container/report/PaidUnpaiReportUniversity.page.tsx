import { CalendarOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Modal, Descriptions, Avatar, Typography } from 'antd';
import React, { useEffect, useRef } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import ReactToPrint from 'react-to-print';
const { Text } = Typography;
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        name?: string;
    }
}

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const { data, info } = props;
    const columns = [
        {
            title: 'Fee Head',
            dataIndex: 'feeHeadName',
            key: 'feeHeadName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        }
    ]
    const columns2 = [
        {
            title: 'Fee Head',
            dataIndex: 'feeHeadName',
            key: 'feeHeadName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'paidDate',
            key: 'paidDate',
        },
    ]
    return (
        <div className='print-sourcex' ref={ref} style={{ padding: 20 }} >
            <style>
                {`
                .ant-descriptions-bordered .ant-descriptions-item-label, .ant-descriptions-bordered .ant-descriptions-item-content {
                    padding: 5px 18px;
                    border-right: 1px solid #f0f0f0;
                }
                .ant-table-tbody > tr > td {
                    height: 5px;
                    padding: 4px;
                  }
                  .ant-table-thead > tr > th {
                    height: 5px;
                    padding: 4px;
                  }
                  .ant-table-title {
                    padding: 8px 8px;
                }
                .ant-col {
                    padding-left: 5px !important;
                    padding-right: 5px !important;
                }
                  
            `}
            </style>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Avatar
                        size={70}
                        src={"data:image/png;base64," + info?.instituteLogo}
                        style={{ margin: "auo" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: -5 }}>{info?.instituteName}</h2>
                    <h3>{info?.instituteAddress}</h3> <br />
                    <h2><u>Student Ledger</u></h2>
                </div>
                <div></div>
            </div>
            <hr />
            <Row>
                <Col span={24} style={{ marginBottom: 10 }}  >
                    <Descriptions
                        // title="User Info"
                        bordered

                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                    >
                        <Descriptions.Item label={<strong>Student Id</strong>}>{info?.customStudentId}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Roll</strong>}>{info?.studentRoll}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Student Name</strong>}>{data?.studentName}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Father Name</strong>}>{data?.fatherName}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Session</strong>}>{data?.session}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Class Name</strong>}>{data?.className}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Department Name</strong>}>{data?.departmentName}</Descriptions.Item>
                        <Descriptions.Item label={<strong>Mobile No</strong>}>{data?.mobileNo}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>

            <br />

            {data?.semesterInfos?.length === 0 ? <div style={{ color: "red", fontWeight: "bold", textAlign: "left" }}>No Paid Unpaid Fees Found</div> :
                <div>
                    {data?.semesterInfos?.map(item => <><div style={{ marginBottom: 5, marginTop: -10 }}>
                        <div style={{ textAlign: "center" }}>
                            <h3>Semester: {item?.semesterName} ...........  Student Type: {item?.studentType}</h3>
                        </div>
                    </div>

                        <Row>

                            <Col span={12} style={{ marginBottom: 10 }}>

                                {item?.unPaidInfos?.length === 0 ? <div style={{ fontWeight: "bold", textAlign: "left" }}>No Unpaid Fees Found</div> :
                                    < >
                                        <Table
                                            dataSource={item?.unPaidInfos}
                                            columns={columns}
                                            pagination={false}
                                            bordered ={true}
                                            title={() => <strong>Unpaid Fees</strong>}
                                            summary={(pageData) => {
                                                let totalamount = 0;
                                                pageData.forEach(({ amount }) => {
                                                    totalamount += amount;
                                                });
                                                return (
                                                    <>
                                                        <Table.Summary.Cell index={0}> <Text type="danger" strong>Total</Text></Table.Summary.Cell>
                                                        <Table.Summary.Cell index={1}>
                                                            <Text >{totalamount}</Text>
                                                        </Table.Summary.Cell>
                                                    </>
                                                );
                                            }}
                                        />
                                    </>
                                }
                            </Col>

                            <Col span={12} style={{ marginBottom: 10 }}>


                                {item?.paidInfos?.length === 0 ? <div style={{ color: "red", fontWeight: "bold", textAlign: "left" }}>No Paid Fees Found</div> :
                                    <>
                                        <Table
                                            dataSource={item?.paidInfos}
                                            columns={columns2}
                                            pagination={false}
                                            bordered
                                            title={() => <strong>Paid Fees</strong>}
                                            summary={(pageData2) => {
                                                let totalamount = 0;
                                                pageData2.forEach(({ amount }) => {
                                                    totalamount += amount;
                                                });
                                                return (
                                                    <>
                                                        <Table.Summary.Cell index={0}> <Text type="danger" strong>Total</Text></Table.Summary.Cell>
                                                        <Table.Summary.Cell index={1}>
                                                            <Text >{totalamount}</Text>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={2}>
                                                        </Table.Summary.Cell>
                                                    </>
                                                );
                                            }}
                                        />
                                    </>
                                }
                            </Col>
                        </Row>



                    </>
                    )}
                </div>
            }

        </div>
    );
});

export default function PaidUnpaiReportUniversity(props) {
    // console.log(tableData)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const ledgerList = useStoreState(state => state.auth.ledgerList)
    const fetchledgerList = useStoreActions(state => state.auth.fetchledgerList);
    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    useEffect(() => {
        let payload: any = { customStudentId: user?.customStudentId, instituteId: user?.instituteId }
        fetchledgerList(payload)
    }, [])
    const componentRef: any = useRef();

    return (
        <>
            <br />
            <Card className="mt-25 mb-sm-25" title="Student Ledger">
                <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
                {ledgerList !== null &&

                    <div style={{ textAlign: "center" }}>
                        <ReactToPrint
                            trigger={() => <Button className='pbtnx' type='primary' icon={<FileTextOutlined />}>Print</Button>}
                            content={() => componentRef.current}
                        />
                        <ComponentToPrint ref={componentRef} data={ledgerList} info={user} />
                    </div>

                }
            </Card>
        </>
    )
}
