import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStoreState } from './store/hooks/easyPeasy';
import customerAlert from '../images/sidebar-photo-call-center.svg';
import { QRCodeCanvas } from 'qrcode.react';
import { encode } from 'js-base64';

function Base64EncodeUrl(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}


export default function RightSidebar() {

  var isMobile = false; //initiate as false
  if (
    /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
  ) {
    isMobile = true;
  }
  const user = useStoreState(state => state.auth.user);
  const [finalUrl, setfinalUrl] = useState<any>('');


  useEffect(() => {
    //const encodedString = Base64EncodeUrl(Buffer.from(`username=${user?.customStudentId}&password=${user?.guardianMobile}`).toString('base64'));
    const basestring = encode(`${user?.customStudentId}-${user?.instituteId}`)
    const encodedString = Base64EncodeUrl(basestring)
    const temp = 'http://' + window.location.host + `/go/` + encodedString;
    setfinalUrl(temp);
  }, [])

  const qrcode = useRef(null);


  const saveQRCode = useCallback(() => {
    const { firstChild: canvas }: any = qrcode!.current;
    const href = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = href;
    link.download = `${user?.studentName}.png`;
    const event = new MouseEvent("click");
    link.dispatchEvent(event);
  }, []);

  // console.log(finalUrl);

  return (
    <>
      <div className="customer-care-wrapper">
        <div className='customer-care-details-wrapper'>
          <img src={customerAlert} alt="customer service icon" style={{ width: "100%" }} />
          {/* <div className="customer-care-details">
            <div>
              <img src={customerServiceIcon} alt="customer service icon" />
            </div>
            <div>
              <span className='details'>Facing Difficulties?<br /> Call Our Customer<br /> Support</span>
              <a href="tel:+4733378901" className='phoneNumber'>09612-191919</a>
              <a href="tel:+4733378901" className='phoneNumber'>01951-901919</a>
              
            </div>
          </div> */}
        </div>
        {!isMobile && <>
          <div style={{ textAlign: "center", paddingTop: 10 }}>
        <strong>Log in with QR Code</strong>
        </div>
          <div style={{ textAlign: "center", paddingTop: 0 }} ref={qrcode} className='HpQrcode '>
            <QRCodeCanvas value={finalUrl} /> <br />
            <button className='qrd' onClick={saveQRCode}>Download</button>
          </div>
        </>
        }
        <div className='poweredByText'>
          <span>Powered by Sheba Digital Limited Part of Sheba Group</span>
        </div>
      </div>
    </>
  );
}