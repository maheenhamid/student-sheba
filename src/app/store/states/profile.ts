import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchgeneralSingleStudentView } from '../../http/profile';

export interface Profile {
    fetchgeneralSingleStudentView: Thunk<Profile>;
    setgeneralSingleStudentView: Action<Profile, any>;
    generalSingleStudentView: any;
}

export const profileStore: Profile = {
    generalSingleStudentView: {},
    setgeneralSingleStudentView: action((state, payload) => {
        //console.log(auth)
        state.generalSingleStudentView = payload;
    }),
    fetchgeneralSingleStudentView: thunk(async (actions, payload) => {
        const response = await fetchgeneralSingleStudentView(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            actions.setgeneralSingleStudentView(body.item);
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),
}
