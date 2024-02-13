import React from 'react';
import { useStoreActions, Actions } from "easy-peasy";
import { StoreModel } from "./store/store";
import { Button, Card, Col, Popover, Row, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useStoreState } from './store/hooks/easyPeasy';
import profile from './profile.png'
import bellIcon from '../images/notification-icon.svg';
const { Text } = Typography;

export default function TopNavBar() {
  const logout = useStoreActions(
    (actions: Actions<StoreModel>) => actions.auth.logout
  );
  var isMobile = false; //initiate as false
	if (
		/iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
	) {
		isMobile = true;
	}
  const user = useStoreState(state => state.auth.user)
  
  const profilePopover = (onLogout, userData) => (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Button danger onClick={onLogout}>
          Logout
            </Button>,
      ]}
    >
      <div style={{ textAlign: "center" }}>
        {user?.imageName == null ?
          <Avatar size={100} src={profile} /> :
          <Avatar size={100} src={'data:image/png;base64,' + user?.imageName} />
        }

      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <Text strong>Name: {userData?.studentName} </Text>
      </div>
    </Card>
  );
  return (
    <>
      <Popover
        content={profilePopover(logout, user)}
        placement="bottomLeft"
        trigger="click"
      >
        {user?.imageName == null ?
          <Avatar size={40} src={profile} style={{marginTop:isMobile?15:0}} /> :
          <div>
              <Avatar
                src={user?.studentImageLink}
                size="large"
                style={{ marginRight: 5, boxShadow:"18px 24px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)" }}
                className="pointer topUserImage"
              />
          </div>
          // <div>
          //   {isMobile == false ? 
          //     <div className='text-right' style={{ cursor: "pointer", padding: "5px", borderRadius:"50%", border: "1px solid #263238" }}> 
          //       {/* <img src={bellIcon} alt="bellIcon" /> */}
          //       <UserOutlined style={{ fontSize: "24px" }} />
          //     </div>
          //   :
              
          //   }
          // </div>
        }
      </Popover>

    </>
  );
}