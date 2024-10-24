import { Alert, Form, Input, Button, Checkbox, Layout, Row, Col, Tooltip, Spin, Select } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { InfoCircleOutlined, UserOutlined, LoadingOutlined, HomeOutlined, MailOutlined, PhoneOutlined, KeyOutlined, FacebookOutlined, FacebookFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled, LinkedinFilled } from '@ant-design/icons';
import logo from "./student-sheba-logo.svg";
import play from "../../../images/google-play-badge.svg";
import loginBanner from "./login-banner-image.png";
import loginBannerMobile from "./login-mobile.png";
import handShake from "./hand-shake.svg";
import { decode } from 'js-base64';
import { useHistory  } from 'react-router';
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';


// const FormItem = Form.Item;
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// interface IProps {
//     logInConnect: (cred: any) => void;
//     authFailed: boolean;
//     authFailedMessage: string | undefined;
// }

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 8 },
// };

// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };

// const { Option } = Select;



// function onFinish() {

// }

export function QrLogin() {
    // const authFailed = false;
    // const authFailedMessage = '';
    const authenticate = useStoreActions(state => state.auth.authenticateQR);
    const authenticateUniversity = useStoreActions(state => state.auth.authenticateUniversityQR);
    const setBusy = useStoreActions(state => state.auth.setBusy);
    const setcheckType = useStoreActions(state => state.auth.setcheckType);

    const error = useStoreState(state => state.auth.error);
    const isBusy = useStoreState(state => state.auth.busy);
    const user = useStoreState(state => state.auth.user);
    let rememberChoice: boolean = true;
    let type = '';

    useLayoutEffect(() => {
        setBusy(true);
    }, []);
    const history = useHistory ();
    useEffect(() => {
        let string: any = window.location.pathname.split("/").pop()
        let decoded = decode(string);
        const items = { ...localStorage };
        // console.log(items)
        setTimeout(() => {
            if(Object.getOwnPropertyNames(items).length === 0){
                finalLogin(decoded);
                checkUser();
              } else {
                localStorage.clear();
                setTimeout(() => {
                    finalLogin(decoded); 
                    checkUser();
                }, 200);
              }
            // if (items!==null){
            //     console.log("we")
            //     //localStorage.clear();
            //     // finalLogin(decoded);
            // } else {
            //     console.log("here")
            //     // finalLogin(decoded);
            // }
        }, 1000);
        // localStorage.clear();

        // console.log(decoded);
    }, []);

    function finalLogin(val){
        if (val) {
            let data = val?.split('-');
            // console.log(data)
            let payload: any = {
                username: data[0],
                password: data[1],
                remember: true
            };
            if (payload?.password?.length === 7) {
                localStorage.setItem("type", JSON.stringify('university'));
                authenticateUniversity(payload);
            } else {
                localStorage.setItem("type", JSON.stringify('school'));
                authenticate(payload);
            }
        }
    }

    function checkUser(){
        setTimeout(() => {
            history.push('/')
        }, 3000);
    }

    // if (user) {
    //     return <Redirect to="/" />
    // }
    // console.log(user);

    // useEffect(()=>{
    //     if (user) {
    //          <Redirect to="/" />
    //     }
    // },[user])


    const onRememberChange = (event) => {
        rememberChoice = event.target.checked;
    }

    const onChangeInstituteType = (value) => {
        //  setType(value);
        type = value;
        localStorage.setItem("type", JSON.stringify(value));
    }
    const handleSubmit = async (payload) => {
        setBusy(true);
        payload.remember = rememberChoice;
        payload.type = rememberChoice;
        if (payload?.password?.length === 7) {
            localStorage.setItem("type", JSON.stringify('university'));
            authenticateUniversity(payload);
        } else {
            localStorage.setItem("type", JSON.stringify('school'));
            authenticate(payload);
        }
    };



    const style = {
        container: {
            // position: 'absolute' as 'absolute',
            // background: '#360A64',
            // backgroundColor: '#6f42c1',
            // backgroundnoRepeat: 'no-repeat',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center'
        },
        asideLogoLeft: {
            backgroundImage: 'url(../../../mujib-borsho.png)',
        },
        asideLogoRight: {
            backgroundImage: 'url(../../../sonalibank.png)',
        },
        sonaliLogo: {
            backgroundImage: 'url(../../../sonalilogo.png)',
            marginRight: '10px'
        },
        shebaLogo: {
            backgroundImage: 'url(../../../logo-white.png)',
        }
    };
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }
    // console.log(document.body.clientWidth)
    return (
        <>
            {isBusy ?
                <div className='loadFirst'>
                    <div style={{ textAlign: 'center' }}>
                        <Spin indicator={antIcon} />  <br />
                        <span>Please wait while we connect you to your student account...</span>
                    </div>

                </div>
                :
                <>
                    {mobileDisplay == true ?
                        <>
                            <div id='studentShebaMobileV2'>
                                <div className="login-page-wrapper">
                                    <div className="login-form-wrapper">
                                        <div>
                                            <div className="login-details-wrapper">
                                                <div className="login-banner-wrapper">
                                                    <img src={loginBannerMobile} style={{ maxWidth: "100%" }} />
                                                </div>
                                            </div>
                                            <div className="login-form-inner no-boxshadows">
                                                <div className="login-form-logo text-center">
                                                    <img src={logo} className="loginLogo" />
                                                </div>
                                                <div className="text-center">
                                                    <h1>Login</h1>
                                                </div>
                                                <div style={{ padding: '20px', paddingBottom: '0' }}>
                                                    <Form name="login" onFinish={handleSubmit}>
                                                        <Form.Item className='no-boxshadows' style={{ width: '100%' }} name='username' rules={[{ required: true, message: 'Please input your student id' }]}>
                                                            <Input
                                                                className='no-boxshadows'
                                                                name="username"
                                                                style={{ width: '100%' }}
                                                                placeholder="Account"
                                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                                suffix={
                                                                    <Tooltip title="Account">
                                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                                    </Tooltip>
                                                                }
                                                            />
                                                        </Form.Item>

                                                        <Form.Item style={{ width: '100%' }} name='password' rules={[{ required: true, message: 'Please input your EIIN No/Sheba Institute ID' }]}>
                                                            <Input
                                                                name="password"
                                                                style={{ width: '100%' }}
                                                                placeholder="EIIN No/Sheba Institute ID"
                                                                prefix={<KeyOutlined className="site-form-item-icon" />}
                                                                suffix={
                                                                    <Tooltip title="EIIN No/Sheba Institute ID">
                                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                                    </Tooltip>
                                                                }
                                                            />
                                                        </Form.Item>
                                                        {/* <Form.Item style={{ width: '330px' }} name='type' rules={[{ required: true, message: 'Please select institute type' }]}>
                                                <Select placeholder="Institute Type" style={{ width: "100%" }} onChange={onChangeInstituteType} >
                                                    <Option value="school">School/Collge</Option>
                                                    <Option value="university">University</Option>
                                                </Select>
                                            </Form.Item> */}
                                                        {!mobileDisplay &&
                                                            <>
                                                                <Row justify="space-between">
                                                                    <Col>
                                                                        <Button type="primary" className='success-button' htmlType="submit" disabled={isBusy}>
                                                                            {isBusy ? <Spin indicator={antIcon} /> : 'Login'}
                                                                        </Button>
                                                                    </Col>
                                                                    <Col>
                                                                        <Checkbox defaultChecked onChange={onRememberChange}>Remember me</Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        }
                                                        {mobileDisplay &&
                                                            <Row>

                                                                <Col xs={24}>
                                                                    <Button className='success-button' type="primary" htmlType="submit" disabled={isBusy} block={true}>
                                                                        {isBusy ? <Spin indicator={antIcon} /> : 'Login'}
                                                                    </Button>

                                                                </Col>
                                                                <Col xs={24}>
                                                                    <Checkbox onChange={onRememberChange}>Remember me</Checkbox>
                                                                </Col>
                                                            </Row>
                                                        }

                                                        {
                                                            error ? <Alert style={{ marginTop: '20px' }} message={error} type="error" /> : null
                                                        }
                                                    </Form>
                                                </div>
                                                <Row>
                                                    <Col span={24}>
                                                        <div className="social-button-wrapper">
                                                            <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.facebook.com/shebadigitalltd", "_blank")}><FacebookFilled /></Button>
                                                            <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.linkedin.com/company/sdlltd", "_blank")}><LinkedinFilled /></Button>
                                                            <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.youtube.com/channel/UClbBrxTaRlbFj0-5S2AbNmw", "_blank")}><YoutubeFilled /></Button>
                                                            <Button type="primary" shape="circle" href="#" size="large"><TwitterCircleFilled /></Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24}>
                                                        <div className="text-center">
                                                            <img src={handShake} alt="" style={{ width: "100%" }} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="text-center mb-30">
                                                    <span className='copyright'>Powered By <a href='https://www.sheba-digital.com/'>Sheba Digital Limited</a> & Sonali Bank Limited</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <img className="loginLogo" src={logo} alt="login_logo" /> <br /> */}
                                    </div>

                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div id="studentShebaV2">
                                <div className="login-page-wrapper" >
                                    <aside className="login-side-wrapper" style={style.container}>
                                        <div className="login-details-wrapper">
                                            <div className="login-banner-wrapper">
                                                <img src={loginBanner} />
                                            </div>
                                        </div>
                                        {/* <div className='play-store-wrapper'>
                                            <p>Please download the mobile app </p>
                                            <a className="me-lg-3 mb-4 mb-lg-0" rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.sdl.epay">
                                                <img className="app-badge" src={play} alt="Sheba E-Pay" width={"45%"} />
                                            </a>
                                        </div> */}
                                    </aside>
                                    <div className="login-form-wrapper">
                                        <div className="login-form-inner">
                                            <div className="login-form-logo text-center">
                                                <img src={logo} className="loginLogo" />
                                            </div>
                                            <div className="login-title text-center">
                                                <p>Log in</p>
                                            </div>
                                            <div>
                                                <Form name="login" onFinish={handleSubmit}>
                                                    <Form.Item name='username' rules={[{ required: true, message: 'Please input your student id' }]}>
                                                        <Input
                                                            name="username"
                                                            placeholder="Student Id"
                                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                                            suffix={
                                                                <Tooltip title="Student Id">
                                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Form.Item>

                                                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your EIIN No/Sheba Institute ID' }]}>
                                                        <Input
                                                            name="password"
                                                            placeholder="EIIN No/Sheba Institute ID"
                                                            prefix={<KeyOutlined className="site-form-item-icon" />}
                                                            suffix={
                                                                <Tooltip title="EIIN No/Sheba Institute ID">
                                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Form.Item>
                                                    {/* <Form.Item style={{ width: '330px' }} name='type' rules={[{ required: true, message: 'Please select institute type' }]}>
                                                <Select placeholder="Institute Type" style={{ width: "100%" }} onChange={onChangeInstituteType} >
                                                    <Option value="school">School/Collge</Option>
                                                    <Option value="university">University</Option>
                                                </Select>
                                            </Form.Item> */}
                                                    {!mobileDisplay && <>
                                                        <Row>
                                                            <Col span={24}>
                                                                <Button type="primary" htmlType="submit" className='success-button' disabled={isBusy} style={{ width: '100%', }}>
                                                                    {isBusy ? <Spin indicator={antIcon} /> : 'Login'}
                                                                </Button>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Checkbox defaultChecked onChange={onRememberChange}>Remember me</Checkbox>
                                                            </Col>
                                                        </Row>
                                                        <Col span={24}>
                                                            <div className="social-button-wrapper">
                                                                <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.facebook.com/shebadigitalltd", "_blank")}><FacebookFilled /></Button>
                                                                <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.linkedin.com/company/sdlltd", "_blank")}><LinkedinFilled /></Button>
                                                                <Button type="primary" shape="circle" href="#" size="large" onClick={() => window.open("https://www.youtube.com/channel/UClbBrxTaRlbFj0-5S2AbNmw", "_blank")}><YoutubeFilled /></Button>
                                                                <Button type="primary" shape="circle" href="#" size="large"><TwitterCircleFilled /></Button>
                                                            </div>
                                                        </Col>
                                                    </>
                                                    }
                                                    {mobileDisplay &&
                                                        <Row>
                                                            <Col xs={24}>
                                                                <Checkbox onChange={onRememberChange}>Remember me</Checkbox>
                                                            </Col>

                                                            <Col xs={24} className="mb-20" style={{ marginTop: '15px' }}>
                                                                <Button type="primary" htmlType="submit" disabled={isBusy} block={true} style={{ height: '48px' }}>
                                                                    {isBusy ? <Spin indicator={antIcon} /> : 'Login'}
                                                                </Button>

                                                            </Col>
                                                        </Row>
                                                    }

                                                    {
                                                        error ? <Alert style={{ marginTop: '20px' }} message={error} type="error" /> : null
                                                    }
                                                </Form>
                                            </div>
                                        </div>
                                        <p className='copyright-text'>Powered by Sheba Digital Limited | Part of Sheba Group</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    );
}