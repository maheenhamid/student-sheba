import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { DollarCircleOutlined, FileDoneOutlined, FilePdfOutlined, FileTextOutlined, IdcardOutlined, InfoCircleOutlined, LayoutOutlined, LogoutOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons/lib';
import play from "../../../images/google-play-badge.svg";
import { useStoreActions, useStoreState } from '../../store/hooks/easyPeasy';
import logoutIcon from '../../../images/logoutBtnIcon.svg';
import customerService from '../../../images/customer-service-icon.svg';



export function Sidebar(props: any) {
	// console.log(window.location.pathname)
	const user = useStoreState(state => state.auth.user);
	const isPassword = useStoreState(state => state.auth.isPassword);
	const [pathValue, setpathValue] = useState<any>("1")
	const checkType = useStoreState(state => state.auth.checkType)
	const logout = useStoreActions(state => state.auth.logout);
	const setisPassword = useStoreActions(state => state.auth.setisPassword);
	var isMobile = false; //initiate as false
	if (
		/iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
	) {
		isMobile = true;
	}
	useEffect(() => {
		if (window.location.pathname == '/payment') {
			setpathValue("2")
		} else if (window.location.pathname == '/report') {
			setpathValue("3")
		} else if (window.location.pathname == '/result') {
			setpathValue("4")
		} else if (window.location.pathname == '/profile') {
			setpathValue("5")
		} else if (window.location.pathname == '/hsc-form') {
			setpathValue("7")
		} else if (window.location.pathname == '/admit-card') {
			setpathValue("12")
		} else if (window.location.pathname == '/subject-choice') {
			setpathValue("13")
		} else if (window.location.pathname == '/report-paid-unpaid') {
			setpathValue("14")
		}  else if (window.location.pathname == '/unipassword') {
			setpathValue("1011")
		}
		else {
			setpathValue("1")
		}
	}, [window.location.pathname])

	// console.log(pathValue)
	useEffect(()=>{
		setisPassword()
	},[])

	return (
		<>
			<Menu theme="dark" defaultSelectedKeys={[pathValue]} mode="inline" selectedKeys={[pathValue]}>
				<Menu.Item key="1" icon={<InfoCircleOutlined />}>
					<Link to="/" className="nav-text">Information</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<DollarCircleOutlined />} >
					<Link to="/payment" className="nav-text">Fee Payment</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<FilePdfOutlined />} >
					<Link to="/report" className="nav-text">Fee Report</Link>
				</Menu.Item>
				{checkType === 'school' ?
					<Menu.Item key="4" icon={<FileTextOutlined />} >
						<Link to="/result" className="nav-text">Result</Link>
					</Menu.Item> : null}
				{checkType === 'school' ?
					<Menu.Item key="7" icon={<FileTextOutlined />} >
						<Link to="/hsc-form" className="nav-text">HSC Form</Link>
					</Menu.Item> : null}
				{checkType === 'school' && user?.onlineProfileUpdateStatus === 1 &&
					<Menu.Item key="5" icon={<UserOutlined />} >
						<Link to="/profile" className="nav-text">Profile</Link>
					</Menu.Item>
				}
				{checkType === 'university' &&
					<>
						<Menu.Item key="14" icon={<FileDoneOutlined  />} >
							<Link to="/report-paid-unpaid" className="nav-text">Student Ledger</Link>
						</Menu.Item>
						{/* <Menu.Item key="12" icon={<IdcardOutlined />} >
							<Link to="/admit-card" className="nav-text">Admit Card</Link>
						</Menu.Item> */}
						<Menu.Item key="13" icon={<LayoutOutlined />} >
							<Link to="/subject-choice" className="nav-text">Subject Choice</Link>
						</Menu.Item>
					</>
				}
				{checkType === 'university' &&
					<Menu.Item key="5" icon={<UserOutlined />} >
						<Link to="/profile" className="nav-text">Profile</Link>
					</Menu.Item>
				}				
				
				{isPassword === "true" &&
					<Menu.Item key="1011" icon={<SecurityScanOutlined  />} >
						<Link to="/unipassword" className="nav-text">Password Update</Link>
					</Menu.Item>
				}
				{isMobile == false ?
					<Menu.Item key="6" icon={<LogoutOutlined />}>
						<Link className="nav-text" onClick={() => logout(1)}  >Logout</Link>
					</Menu.Item>
					: ""}
				{isMobile == true ?
					<Menu.Item key="6" icon={<LogoutOutlined />} >
						<Link className="nav-text" onClick={() => logout(1)}  >Logout</Link>
					</Menu.Item>
					: ""}
				{/* <SubMenu key="sub1" icon={ <UserOutlined/> } title="User">
					<Menu.Item key="3">Tom</Menu.Item>
					<Menu.Item key="4">Bill</Menu.Item>
					<Menu.Item key="5">Alex</Menu.Item>
				</SubMenu> */}
			</Menu>
			{isMobile == true ? <>
				<div className='play-store-wrapper'>
					<div className="customer-care-details-wrapper">
						<div className="customer-care-details">
							<img src={customerService} alt="" />
							<div>
								<div className="details">
									Facing Difficulties?
									Call Our Customer Support
								</div>
								<div className="phoneNumber">
									<span>09612-191919</span><br />
									<span>01951-901919</span>
								</div>
							</div>
						</div>
					</div>
					<div className='poweredByText'>
						<span>Powered by Sheba Digital Limited Part of Sheba Group</span>
					</div>
				</div>
			</>
				: ''}
			{isMobile == false ?
				<div className='play-store-wrapper'>
					<span className='paly-store-text'>Please download<br /> the mobile app </span>
					<a className="me-lg-3 mb-4 mb-lg-0" rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.sdl.epay">
						<img className="app-badge" src={play} alt="Sheba E-Pay" width={"60%"} />
					</a>
				</div>
				: ''}
		</>
	)

}
