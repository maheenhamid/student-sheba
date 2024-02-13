import { Card, Row, Col } from 'antd';
import React from 'react'
import { useStoreState } from '../../store/hooks/easyPeasy';

export default function RenderLibrary(props) {
    const user = useStoreState(state => state.auth.user)
    var mobileDisplay = false; //initiate as false
    if (
        /iP(hone|od)|android.+mobile|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
        mobileDisplay = true;
    }
    return (
        <>
        {
           !mobileDisplay && <>
           <br/>
           <Card title="Student Information" >
           <Row gutter={8}>
               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Student Id: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.customStudentId} </span>
               </Col>               
               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Student Name: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.studentName} </span>
               </Col>

               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Father's Name: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.fatherName} </span>
               </Col>

               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Mother's Name: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.motherName} </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Class: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.className} </span>
               </Col>               
               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Department: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.department} </span>
               </Col>

               {/* <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Gender: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.studentGender} </span>
               </Col> */}

               {/* <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Date of Birth: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.studentDOB===null?"N/A":user?.studentDOB} </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                   <span style={{ fontWeight: "bold" }}> Religion: </span>
               </Col>
               <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                   <span > {user?.studentReligion===null?"N/A":user?.studentReligion} </span>
               </Col> */}
           </Row>
       </Card>
           </>
        }
                {
           mobileDisplay &&
        <div className="mt-25 mb-sm-25">

            <Card title="Student Information" >
                <Row gutter={8} className="mb-sm-10">
                    <Col xs={10} sm={10} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Student Id: </span>
                    </Col>
                    <Col xs={14} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.customStudentId} </span>
                    </Col>
                </Row>                
                <Row gutter={8} className="mb-sm-10">
                    <Col xs={10} sm={10} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Student Name: </span>
                    </Col>
                    <Col xs={14} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.studentName} </span>
                    </Col>
                </Row>
                <Row gutter={8} className="mb-sm-10">
                    <Col xs={10} sm={10} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Father's Name: </span>
                    </Col>
                    <Col xs={14} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.fatherName} </span>
                    </Col>
                </Row>
                <Row gutter={8} className="mb-sm-10">
                    <Col xs={10} sm={10} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Mother's Name: </span>
                    </Col>
                    <Col xs={14} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.motherName} </span>
                    </Col>
                </Row>
               
                <Row className="mb-sm-10">
                    <Col xs={10} sm={14} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Class: </span>
                    </Col>
                    <Col xs={10} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.className} </span>
                    </Col>
                </Row>                
                <Row className="mb-sm-10">
                    <Col xs={10} sm={14} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Department: </span>
                    </Col>
                    <Col xs={10} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.department} </span>
                    </Col>
                </Row>
                {/* <Row className="mb-sm-10">
                    <Col xs={10} sm={14} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Gender: </span>
                    </Col>
                    <Col xs={10} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.studentGender} </span>
                    </Col>                    
                </Row>
                <Row className="mb-sm-10">
                    <Col xs={10} sm={14} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Date of Birth: </span>
                    </Col>
                    <Col xs={10} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.studentDOB===null?"N/A":user?.studentDOB} </span>
                    </Col>
                </Row>
                <Row className="mb-sm-10">
                    <Col xs={10} sm={14} md={24} lg={12} xl={8}>
                        <span style={{ fontWeight: "bold" }}> Religion: </span>
                    </Col>
                    <Col xs={10} sm={14} md={24} lg={12} xl={12}>
                        <span > {user?.studentReligion===null?"N/A":user?.studentReligion} </span>
                    </Col>
                </Row> */}
            </Card>
        </div>
}
        </>
    )
}
