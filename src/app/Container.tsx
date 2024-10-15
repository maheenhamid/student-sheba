import { Layout, Row, Col, Avatar, } from 'antd';

import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { useStoreState } from './store/hooks/easyPeasy';
import TopNavBar from './topNavbar'
import { Sidebar } from './layouts/sidebar/Sidebar';
import Information from './container/information/Information.page';
import Payment from './container/payment/Payment.page';
import PaymentPremier from './container/payment/PaymentPremier.page';
import ReportPremier from './container/report/ReportPremier.page';
import Bkash from './container/payment/Bkash.page';
import Report from './container/report/Report.page';
import ResultPage from './container/result/Result.page';
import Profile from './container/profile/Profile.page';
import HscForm from './container/form/HscForm.page';
import MarkSheet from './container/report/MarkSheet.page';
import Icon, { MenuFoldOutlined, MenuUnfoldOutlined, PhoneOutlined } from '@ant-design/icons';
import RightSidebar from './rightSidebar';

const { Header, Content, Sider } = Layout;

// Application
export default function Container() {
	const user = useStoreState(state => state.auth.user)
	const [collapsed, setCollapsed] = useState(false);
	const toggle = () => setCollapsed(!collapsed);
	var isMobile = false; //initiate as false
	if (
		/iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
	) {
		isMobile = true;
	}
	const onCollapse = collapsed => {
		//console.log("hello")
		//console.log(collapsed);
		setCollapsed(collapsed)
	};
	
	
	return (
		<Layout style={{ minHeight: '100vh' }} id={isMobile == false ? 'studentShebaV2' : 'studentShebaMobileV2'}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={onCollapse}
				breakpoint="lg"
				onBreakpoint={(broken) => {
					//console.log(broken);
				}}
				trigger={null}
				collapsedWidth={isMobile ? 0 : 80}
				width="258"
				style={{
					height: "100vh",
					overflow: "auto",
					position: isMobile ? "fixed" : "sticky",
					left: 0,
					top: 0,
					zIndex: 1000,
					flex: '0 0 258px',
					maxWidth: '258px',
					minWidth: '258px',
					width: '258px',
				}}
			>
				<div className="logo">
					{!collapsed &&
						<>
							<Avatar
								src={user?.logoLink}
								size={118}
								className="pointer"
							/>
							<br />
						</>
					}
					{collapsed &&
						<Avatar
							src={user?.logoLink}
							size={"large"}
							style={{ marginLeft: 22, marginTop: 15 }}
							className="pointer"
						/>
					}
					{/* {!collapsed && <span style={{color:"white", fontSize:12}}> {user?.instituteName}</span>} */}
				</div>
				{user && <div onClick={() => setCollapsed(isMobile ? true : false)}> <Sidebar /></div>}
			</Sider>
			<Layout className="site-layout">
				{isMobile == false ?
					<Header className="site-layout-background" style={{ padding:"10px 0 0", }}>
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: toggle,
							style: { marginLeft: 20 }
						})}
						{!isMobile &&
							<div className='ins-info-wrapper'>
								<div>
									<span className="institute-name">{user?.instituteName}</span><br />
									<span className="acdemic-address">{user?.instituteAddress}</span>
								</div>
								<div>
									<TopNavBar />
								</div>
							</div>
						}


					</Header>
					:
					<Header className="site-layout-background" style={{ padding: 0, }}>


						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: toggle,
							style: { marginLeft: 20 }
						})}
						{!isMobile &&
							<>
								<span className="institute-name" style={{ marginLeft: 20, fontWeight: "bold", fontSize: 15 }}>{user?.instituteName} </span>
								<div style={{ float: "right", marginRight: 10 }}>
								<span style={{marginRight:50, fontWeight:"normal",color:"red" }}>Helpline: <a href="tel:+8809612191919" style={{color:"red"}}>09612-191919</a>, <a href="tel:+8801951901919" style={{color:"red"}}>01951-901919</a></span>
									<TopNavBar />
								</div>
							</>
						}
						{isMobile && collapsed &&
							<>
								<div style={{ lineHeight: "1.2",  marginLeft: 20 }}>
									{/* <span style={{ fontSize: "9px", fontWeight: "bold" }}>Welcome to</span> */}
									<span className="institute-name" style={{fontWeight: "bold", fontSize: 15 }}>{user?.instituteName}</span>
									<span style={{ fontSize: "8px" }}>{user?.instituteAddress}</span>
								</div>
								<div style={{ float: "right", marginRight: 10 }}>
									<TopNavBar />
								</div>
							</>
						}
						{isMobile && !collapsed &&
							<>

								{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
									className: 'trigger',
									onClick: toggle,
									style: { marginTop: 0, float: "right", marginRight: 20 }
								})}
							</>
						}


					</Header>
				}
				<Content>
					<Switch>
						<Route exact path="/" component={Information} />
						<Route exact path="/payment" component={Payment} />
						<Route exact path="/payment-premier" component={PaymentPremier} />
						<Route exact path="/bkash" component={Bkash} />
						<Route exact path="/report" component={Report} />
						<Route exact path="/report-premier" component={ReportPremier} />
						<Route exact path="/result" component={ResultPage} />
						<Route exact path="/marksheet" component={MarkSheet} />
						<Route exact path="/hsc-form" component={HscForm} />
						<Route exact path="/profile" component={Profile} />
						{/* <Route exact path="/calendar" component={Calendar} /> */}
					</Switch>
				</Content>
			</Layout>
			{isMobile == false ?
			<Sider
				className='right-sidebar-wrapper'
				breakpoint="lg"
				onBreakpoint={(broken) => {
					//console.log(broken);
				}}
				trigger={null}
				collapsedWidth={isMobile ? 0 : 80}
				width="290"
				style={{
					height: "100vh",
					overflow: "auto",
					position: isMobile ? "fixed" : "sticky",
					left: 0,
					top: 0,
					zIndex: 1000,
					flex: '0 0 290px',
					maxWidth: '290px',
					minWidth: '290px',
					width: '290px',
				}}
			>
				<RightSidebar />
			</Sider>
			: ''}
		</Layout>
	);
}
