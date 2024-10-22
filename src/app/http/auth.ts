import { post, get, del, put } from "./http";

export interface AuthRequest {
  username: string;
  password: string;
}

export const login = (auth: AuthRequest) => {
  //console.group(auth)
  return get(
    `/public/student-portal/login?customStudentId=${auth.username}&instituteId=${auth.password}`
  );
};

export const collectionList = (values: any) => {
  //console.group(auth)
  return post(
    '/public/fees-payment/view/for/online-collection', values
  );
};
export const collectionListWithoutMonth = (values: any) => {
  //console.group(auth)
  return post(
    '/public/fees-payment/view/for/online-collection/united', values
  );
};

export const collectionListAll= (values: any) => {
  //console.group(auth)
  return post(
    '/public/fees-payment/view/for/online-collection/all', values
  );
};

export const submitDataFinal = (payload: any) => {
  return post("/public/get/online-fees-payment/spg/session-id", payload);
};

export const submitDataFinalBkash = (payload: any) => {
  return post("/public/get/baksh/fees-payment-url", payload);
};

export const submitDataFinalSSL = (payload: any) => {
  return post("/public/get/online-fees-payment/ssl/gateway-url", payload);
};

export const submitDataFinalUpayPgw = (payload: any) => {
  return post("/public/upay/pgw/init/request", payload);
};

export const delInvoice = (values: any) => {
  //console.group(auth)
  return del(
    `/public/fees-payment/delete/unnecessary/invoices?identificationId=${values.identificationId}`
  );
};

export const reportList = (values: any) => {
  //console.group(auth)
  return get(
    `/public/fees-payment/invoice-fee/list?academicYear=${values?.academicYear}&instituteId=${values.instituteId}&studentId=${values.studentId}`
  );
};

export const fetchpaidViews = (values: any) => {
  //console.group(auth)
  return get(
    `/public/fees-payment/paid/view?identificationId=${values.identificationId}&instituteId=${values.instituteId}`
  );
};

export const updateStudentProfileBasicInfo = (payload: any) => {
  return put("/public/student/profile/basic/info/update", payload);
};

export const updateStudentGuardianInfo = (payload: any) => {
  return put("/public/student/profile/guardian/info/update", payload);
};

export const updateStudentAddressInfo = (payload: any) => {
  return put("/public/student/profile/address/info/update", payload);
};

export const updatData = (payload: any) => {
  //console.group(auth)
  return get(
    `/public/student-portal/login?customStudentId=${payload.customStudentId}&instituteId=${payload.instituteId}`
  );
};

export const fetchDistrictList = () => get("/public/location/info/district-list");
export const fetchThanaList = (id) => get(`/public/location/info/thana-list/by/district-id?districtId=${id}`);

export const saveStudentProfileUpdateToken = (payload) => get(`/public/student/update/otp/send?instituteId=${payload.instituteId}&studentId=${payload.studentId}`);
export const otpUsed = (payload) => get(`/public/student/otp/use?instituteId=${payload.instituteId}&customStudentId=${payload.customStudentId}&token=${payload.token}`);

export const fetchacademicYearList = (id) => get(`/public/academic-year/list?instituteId=${id}`);

export const fetchsingleStudentMarkView = (payload: any) => {
  return post("/public/single/student/mark/view", payload);
};
export const fetchPublicExamList = (id) => get(`/public/exam/list?instituteId=${id}`);

export const fetchPremierBank = (payload: any) => {return post("/public/premier/bank/student/payment/query", payload)};
export const getFeesPaymentSslPageLink = (payload: any) => {return post("/public/premier/bank/student/payment/link", payload)};
export const fetchpremierBankSslFeesTransactionList = (payload: any) => {return post("/public/premier/bank/ssl/fees-payment/list", payload)};
export const studentSignup = (payload: any) => {return post("/public/premier/bank/student/sign-up", payload)};