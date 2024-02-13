import { message, notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchstudentSubjectListForAssign, saveStudentSubjectAssign } from '../../http/module';

export interface Module {
    studentSubjectListForAssign: any;
    setstudentSubjectListForAssign: Action<Module, any>;
    fetchstudentSubjectListForAssign: Thunk<Module, any>;
    saveStudentSubjectAssign: Thunk<Module, any>;
}

export const moduleStore: Module = {
    studentSubjectListForAssign: null,
    setstudentSubjectListForAssign: action((state, payload) => {
        //console.log(auth)
        state.studentSubjectListForAssign = payload;
    }),
    fetchstudentSubjectListForAssign: thunk(async (actions, payload) => {
        const response = await fetchstudentSubjectListForAssign(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            actions.setstudentSubjectListForAssign(body.item);
        } else {
            const body = await response.json();
            notification.error({ message: body.message });
            actions.setstudentSubjectListForAssign(null);
        }
    }),
    saveStudentSubjectAssign: thunk(async (actions, payload) => {
        const response = await saveStudentSubjectAssign(payload?.data1);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.messageType === 1) {
                actions.fetchstudentSubjectListForAssign(payload?.data2)
                message.success(body?.message);
            } else {
                message.error(body?.message);
            }

        } else {
            message.error('Something Went Wrong');
        }
    }),
}
