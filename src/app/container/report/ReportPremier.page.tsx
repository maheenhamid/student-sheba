import { CalendarOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select, Col, Button, Table, Result, Spin, Tooltip, List, Card, Descriptions, Avatar, } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import { SelectAcademicYear } from '../profile/SelectAcademicYear';
import ReactToPrint from 'react-to-print';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        name?: string;
    }
}

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
    const { data, info } = props;
    return (
        <div className='print-source' ref={ref} style={{ padding: 20 }} >
            <style>
                {`
          .form-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        .form-row label {
            width: 45%;
            font-weight: bold;
            color: #333;
        }
        .form-row .static-value {
            width: 100%;
            padding: 8px;
            border: 1px solid #000;
            border-radius: 4px;
            background-color: #f0f0f0;
            text-align: left;
            color: #333;
            min-height: 24px;
            box-sizing: border-box;
        }
        .form-row-full {
            margin-bottom: 15px;
        }
        .form-row-full label {
            width: 100%;
            font-weight: bold;
            color: #333;
        }
        .form-row-full .static-value {
            width: 100%;
            padding: 8px;
            border: 1px solid #000;
            border-radius: 4px;
            background-color: #f0f0f0;
            color: #333;
            min-height: 24px;
            box-sizing: border-box;
        }
                  
            `}
            </style>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Avatar
                        size={70}
                        src={ info?.logoLink}
                        style={{ margin: "auo" }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: -5 }}>{info?.instituteName}</h2>
                    <h3>{info?.instituteAddress}</h3> <br />
                    <h2><u>Fees Report</u></h2>
                </div>
                <div></div>
            </div>
            <hr />
            <Row>
                <Col span={24} style={{ marginBottom: 10 }}  >
                    <div className="form-container">
                        <div className="form-row">
                            <label>
                                Account ID:
                                <div className="static-value">{data?.accountId}</div>
                            </label>
                            <label>
                                Account Name:
                                <div className="static-value">{data?.accountName}</div>
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Father Name:
                                <div className="static-value">{data?.fatherName}</div>
                            </label>
                            <label>
                                Class:
                                <div className="static-value">{data?.className}</div>
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Roll:
                                <div className="static-value">{data?.accountRoll}</div>
                            </label>
                            <label>
                                Trn Date:
                                <div className="static-value">{data?.transactionDate}</div>
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Bank Transaction ID:
                                <div className="static-value">{data?.bankTransactionId}</div>
                            </label>
                            <label>
                                Fees Amount:
                                <div className="static-value">{data?.feesAmount}</div>
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Year:
                                <div className="static-value">{data?.paymentYear}</div>
                            </label>
                            <label>
                                Month:
                                <div className="static-value">{data?.monthName}</div>
                            </label>
                        </div>
                        <div className="form-row-full">
                            <label>
                                Fee Details:
                                <div className="static-value">{data?.feesDetails}</div>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
});


const ComponentToPrintWrapper = ({ data, info }) => { // 1.
    const componentRef: any = useRef(); // 2.

    return (
        <div style={{ display: "flex" }}>
            <ReactToPrint
                trigger={() => <Button type='primary' icon={<FileTextOutlined />}>Print</Button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint ref={componentRef} data={data} info={info} />
        </div>
    );
};
export default function ReportPremier(props) {

    const user = useStoreState(state => state.auth.user)
    const loading = useStoreState(state => state.auth.loading)
    const premierBankSslFeesTransactionList = useStoreState(state => state.auth.premierBankSslFeesTransactionList)
    const fetchpremierBankSslFeesTransactionList = useStoreActions(state => state.auth.fetchpremierBankSslFeesTransactionList);

    const fetchacademicYearList = useStoreActions((state) => state.auth.fetchacademicYearList);
    useEffect(() => {
        fetchacademicYearList(user?.instituteId)
    }, [])


    const columns: any = [
        {
            title: 'Account Id',
            dataIndex: 'accountId',
            key: 'accountId',
        },
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: 'Father Name',
            dataIndex: 'fatherName',
            key: 'fatherName',
        },
        {
            title: 'Class',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Roll',
            dataIndex: 'accountRoll',
            key: 'accountRoll',
        },
        {
            title: 'Month',
            dataIndex: 'monthName',
            key: 'monthName',
        },
        {
            title: 'Fees Amount',
            dataIndex: 'feesAmount',
            key: 'feesAmount',
        },
        {
            title: 'Service Charge',
            dataIndex: 'serviceCharge',
            key: 'serviceCharge',
        },
        {
            title: 'Total Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Bank Transaction Id',
            dataIndex: 'bankTransactionId',
            key: 'bankTransactionId',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
        },

        {
            title: 'Print',
            fixed: 'right',
            render: (index: any, record: any) => (

                <Tooltip title={"Print"}>
                    <ComponentToPrintWrapper key={index} data={record} info={user} />
                </Tooltip>

            ),
        },
    ];

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    //console.log(premierBankSslFeesTransactionList)
    var isMobile = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        isMobile = true;
    }
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        let payload: any = {
            paymentYear: values?.year,
            instituteId: user?.instituteId,
            customStudentId: user?.customStudentId,
        }
        fetchpremierBankSslFeesTransactionList(payload)
    }


    return (
        <div className="mt-25 mb-sm-25">
            <Card title="Fee Report" className='custom-card-view'>
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
                                <SelectAcademicYear />
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

            </Card>
            <div className="loading" style={{ display: loading ? "inherit" : "none" }}> <Spin indicator={antIcon} /></div>
            {premierBankSslFeesTransactionList.length > 0 &&
                <>
                    <Table bordered={true} dataSource={premierBankSslFeesTransactionList} columns={columns} className="custom-table" scroll={{ x: 1024 }} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }} />

                </>
            }
        </div>
    )
}
