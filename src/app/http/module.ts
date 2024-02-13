import { post, get} from "./httpuni";

export const fetchstudentSubjectListForAssign = (payload) =>
  get(
    `/public/student/subject/list/for/assign?instituteId=${payload?.instituteId}&studentId=${payload.studentId}&semesterYearId=${payload.semesterYearId}`
  );
export const saveStudentSubjectAssign = (payload) =>
  post(
    `/public/student/subject/assign`, payload
  );
