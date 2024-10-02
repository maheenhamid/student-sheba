import { post, get, del, postFile } from "./httpuni";

export interface AuthRequest {
  username: string;
  password: string;
  unipassword?: string;
};

export interface PostAuthRequest {
  customStudentId: string;
  instituteId: string;
  password: string;
}
 
export const loginUni = (auth: AuthRequest) => {
  //console.group(auth)
  return get(
    `/public/student/login?customStudentId=${auth.username}&instituteId=${auth.password}`
  );
};
export const loginUniPassword = (auth: AuthRequest) => {
  //console.group(auth)
  return get(
    `/public/student/login?customStudentId=${auth.username}&instituteId=${auth.password}&password=${auth.unipassword}`
  );
};

export const loginUniPassword2 = (auth: AuthRequest) => { return post("/public/student/login2",auth)};

export const updatDataUni = (payload: any) => {
  //console.group(auth)
  return get(
    `/public/student/login?customStudentId=${payload.customStudentId}&instituteId=${payload.instituteId}`
  );
};

export const collectionListUni = (values: any) => {
  //console.group(auth)
  return get(
    `/public/online/fees/payable?instituteId=${values.instituteId}&semesterYearId=${values.semesterYearId}&studentId=${values.studentId}`
  );
};
export const fetchpaidViewsUniversity = (values: any) => {
  //console.group(auth)
  return get(
    `/public/student/single/paid/view?instituteId=${values.instituteId}&semesterYearId=${values.semesterYearId}&studentId=${values.studentId}`
  );
};

export const submitDataFinalUni = (payload: any) => {
  return post("/public/get/online-fees-payment/spg/session-id", payload);
};
export const delInvoiceUni = (values: any) => {
  //console.group(auth)
  return del(
    `/public/fees-payment/delete/unnecessary/invoices?identificationId=${values.identificationId}`
  );
};

export const reportListUni = (values: any) => {
  //console.group(auth)
  return get(
    `/public/student/paid/invoices?instituteId=${values.instituteId}&semesterYearId=${values.semesterYearId}&studentId=${values.studentId}`
  );
};

export const sendStudentPasswordRecoveryToken = (values: any) => {
  //console.group(auth)
  return get(
    `/public/student/password/recovery/token/send?customStudentId=${values.customStudentId}&instituteId=${values.instituteId}`
  );
};

export const passwordChangeUni = (payload: any) => {
  return post("/public/student/password/change", payload);
};

export const resetStudentPassword = (payload: any) => {
  return post("/public/student/password/recover", payload);
};


export const updateStudentGuardianInfoUniversity = (payload: any) => {
  //console.group(auth)
  return get(
    `/public/student/mobileno/change?instituteId=${payload.instituteId}&mobileNo=${payload.mobileNo}&studentId=${payload.studentId}`
  );
};

export const updateStudentProfileBasicInfoUniversity = (payload: any) => {
  return post("/public/student/basic/info/update", payload);
};

export const updateStudentPhotoUniversity = (data, payload) => postFile(`/public/student/photo/update?instituteId=${payload.instituteId}&studentId=${payload.studentId}`, data);
export const saveStudentProfileUpdateTokenUniversity = (payload) => get(`/public/student/otp/send?instituteId=${payload.instituteId}&studentId=${payload.studentId}`);
export const otpUsedSendUniversity = (payload) => get(`/public/student/otp/check?instituteId=${payload.instituteId}&studentId=${payload.studentId}&token=${payload.token}`);
export const fetchExamList = (payload) => get(`/public/initial-setup/exam/list?instituteId=${payload}`);
export const fetchExamList2 = (payload) => get(`/public/initial-setup/exam/list/by/student-id?instituteId=${payload?.instituteId}&studentId=${payload.studentId}`);
export const fetchledgerList = (payload) => get(`/public/single-student/paid-unpaid/view?customStudentId=${payload?.customStudentId}&instituteId=${payload.instituteId}`);

export const submitDataFinalBkashUniversity = (payload: any) => {return post("/public/get/baksh/fees-payment-url", payload);};

export const submitDataForUpayPgwUniversity = (payload: any) => {return post("/public/upay/pgw/init/request", payload)};