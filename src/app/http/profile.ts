import { post, get, del } from "./http";



// export const collectionList = (values: any) => {
//   //console.group(auth)
//   return post(
//     '/public/fees-payment/view/for/online-collection', values
//   );
// };

// export const submitDataFinal = (payload: any) => {
//   return post("/public/get/online-fees-payment/spg/session-id", payload);
// };

// export const delInvoice = (values: any) => {
//   //console.group(auth)
//   return del(
//     `/public/fees-payment/delete/unnecessary/invoices?identificationId=${values.identificationId}`
//   );
// };

export const fetchgeneralSingleStudentView = (values: any) => {
  return get(
    `/public/student/single/basic/view?customStudentId=${values.customStudentId}&instituteId=${values.instituteId}`
  );
};

