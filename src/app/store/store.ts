import { createStore } from 'easy-peasy';
import { Auth, authStore } from './states/auth';
import { Profile, profileStore } from './states/profile';
import { Module, moduleStore } from './states/module';

export interface StoreModel {
	auth: Auth;
	profile: Profile;
	module: Module;
}

const storeModel: StoreModel = {
	auth: authStore,
	profile: profileStore,
	module: moduleStore,
}

export const store = createStore(storeModel);
