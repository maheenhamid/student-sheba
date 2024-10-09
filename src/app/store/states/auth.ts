import { Action, Thunk, thunk, action } from 'easy-peasy';
import { login, collectionList, submitDataFinal, reportList, updateStudentProfileBasicInfo, updatData, updateStudentGuardianInfo, updateStudentAddressInfo, fetchDistrictList, fetchThanaList, saveStudentProfileUpdateToken, otpUsed, collectionListWithoutMonth, fetchpaidViews, fetchacademicYearList, collectionListAll, submitDataFinalBkash, submitDataFinalUpayPgw, fetchPublicExamList, fetchsingleStudentMarkView, submitDataFinalSSL } from '../../http/auth';
import { loginUni, collectionListUni, submitDataFinalUni, reportListUni, updateStudentGuardianInfoUniversity, updatDataUni, updateStudentProfileBasicInfoUniversity, updateStudentPhotoUniversity, saveStudentProfileUpdateTokenUniversity, otpUsedSendUniversity, fetchpaidViewsUniversity, fetchExamList, fetchExamList2, fetchledgerList, submitDataFinalBkashUniversity, loginUniPassword, passwordChangeUni, resetStudentPassword, sendStudentPasswordRecoveryToken, submitDataForUpayPgwUniversity } from '../../http/authuni';
import { message, notification } from 'antd';

const API_BASE = process.env.REACT_APP_API_ROOT
const API_BASE_UNI = process.env.REACT_APP_API_ROOT_UNIVERSITY
export interface Auth {
	user: any | undefined,
	checkAuth: Thunk<Auth>;
	authenticated: Action<Auth, any>;
	authenticate: Thunk<Auth, any>;
	authenticateQR: Thunk<Auth, any>;
	authenticate2: Thunk<Auth, any>;
	authenticateUniversity: Thunk<Auth, any>;
	authenticateUniversity2: Thunk<Auth, any>;
	authenticateUniversityPassword: Thunk<Auth, any>;
	updatDataUni: Thunk<Auth, any>;
	authenticateUniversityQR: Thunk<Auth, any>;
	logout: Action<Auth, any>;
	loginFailed: Action<Auth, string>;
	error?: string;
	busy?: boolean;
	setBusy: Action<Auth, boolean>;
	collectionList: Thunk<Auth, any>;
	collectionListWithoutMonth: Thunk<Auth, any>;
	fetchpaidViews: Thunk<Auth, any>;
	fetchpaidViewsUniversity: Thunk<Auth, any>;
	paidViewsUniversity: any,
	setpaidViewsUniversity: Action<Auth, any>;
	collectionListUni: Thunk<Auth, any>;
	submitDataFinal: Thunk<Auth, any>;
	submitDataFinalBkash: Thunk<Auth, any>;
	submitDataFinalBkashUniversity: Thunk<Auth, any>;
	submitDataFinalForSSL: Thunk<Auth, any>;
	submitDataFinalForUpayPgwUniversity: Thunk<Auth, any>;
	updateStudentProfileBasicInfo: Thunk<Auth, any>;
	submitDataFinalUpayPgw: Thunk<Auth, any>;
	updateStudentProfileBasicInfoUniversity: Thunk<Auth, any>;
	updateStudentPhotoUniversity: Thunk<Auth, any>;
	updateStudentGuardianInfo: Thunk<Auth, any>;
	checkNumber: boolean;
	setcheckNumber: Action<Auth, boolean>;
	updateStudentGuardianInfo2: Thunk<Auth, any>;
	updateStudentGuardianInfoUniversity: Thunk<Auth, any>;
	updateStudentAddressInfo: Thunk<Auth, any>;
	submitDataFinalUni: Thunk<Auth, any>;
	tableData: any,
	setTableData: Action<Auth, any>;
	paidViews: any,
	setpaidViews: Action<Auth, any>;
	loading: boolean,
	show: boolean,
	setShow: Action<Auth, boolean>;
	startLoading: Action<Auth, any>;
	stopLoading: Action<Auth, any>;
	reportData: any;
	setreportData: Action<Auth, any>;
	reportList: Thunk<Auth, any>;
	reportListUni: Thunk<Auth, any>;
	sendStudentPasswordRecoveryToken: Thunk<Auth, any>;
	passwordChangeUni: Thunk<Auth, any>;
	resetStudentPassword: Thunk<Auth, any>;
	serviceCharge: any;
	totalserviceCharge: any;
	setserviceCharge: Action<Auth, any>;
	operationIdentificationId: any;
	setoperationIdentificationId: Action<Auth, any>;
	settotalserviceCharge: Action<Auth, any>;
	checkType: any;
	setcheckType: Action<Auth, any>;

	districtList: any,
	thanaList: any,
	setdistrictList: Action<Auth, any>;
	setthanaList: Action<Auth, any>;
	districtListFetch: Thunk<Auth>;
	thanaListFetch: Thunk<Auth>;

	districtList2: any,
	thanaList2: any,
	setdistrictList2: Action<Auth, any>;
	setthanaList2: Action<Auth, any>;
	districtListFetch2: Thunk<Auth>;
	thanaListFetch2: Thunk<Auth>;
	hasOtp: boolean;
	sethasOtp: Action<Auth, boolean>;
	usedOtp: boolean;
	setusedOtp: Action<Auth, boolean>;
	saveStudentProfileUpdateToken: Thunk<Auth, any>;
	otpUsedSend: Thunk<Auth, any>;
	saveStudentProfileUpdateTokenUniversity: Thunk<Auth, any>;
	otpUsedSendUniversity: Thunk<Auth, any>;
	fetchacademicYearList: Thunk<Auth, any>;
	setacademicYearList: Action<Auth, any>;
	academicYearList: any;
	fetchExamList: Thunk<Auth, any>;
	setExamList: Action<Auth, any>;
	examList: any;
	fetchPublicExamList: Thunk<Auth, any>;
	setPublicExamList: Action<Auth, any>;
	publicexamList: any;
	singleStudentMarkView: any;
	setsingleStudentMarkView: Action<Auth, any>;
	fetchsingleStudentMarkView: Thunk<Auth, any>;
	fetchledgerList: Thunk<Auth, any>;
	setledgerList: Action<Auth, any>;
	ledgerList: any;
	showModal: boolean;
	setshowModal: Action<Auth, boolean>;	
	isPassword: any;
	setisPassword: Action<Auth>;
}

export let token: string | undefined = undefined;

export const authStore: Auth = {
	user: undefined,
	checkType: undefined,
	serviceCharge: 0,
	operationIdentificationId: null,
	totalserviceCharge: null,
	tableData: [],
	paidViewsUniversity: [],
	paidViews: [],
	reportData: [],
	loading: false,
	show: false,
	showModal: false,
	isPassword: false,
	checkAuth: thunk(async (actions) => {
		let jwt = localStorage.getItem("jwt");
		let type = localStorage.getItem("type");
		if (type == null || type == undefined) {
			return;
		} else {
			actions.setcheckType(JSON.parse(type));
		}
		if (jwt) {
			try {
				// console.log("Success")
				actions.authenticated(JSON.parse(jwt));
			} catch (e) {
				console.error("Error");
			}
		}
	}),
	authenticate: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.setcheckType(payload.type);
		const response = await login(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//sessionStorage.setItem("jwt", JSON.stringify(body?.item));
			// console.log(body)
			if (body.messageType === 1) {
				if (payload.remember) {
					localStorage.setItem("jwt", JSON.stringify(body?.item));
				} else {
					localStorage.removeItem("jwt");
				}

				actions.authenticated(body?.item);

			} else {
				actions.loginFailed("Failed to login");
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),

	authenticateQR: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.setcheckType(payload.type);
		const response = await login(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//sessionStorage.setItem("jwt", JSON.stringify(body?.item));
			//  console.log(body)
			if (body.messageType === 1) {
				if (payload.remember) {
					localStorage.setItem("jwt", JSON.stringify(body?.item));
				} else {
					localStorage.removeItem("jwt");
				}

				actions.authenticated(body?.item);
				// window.location.reload();

			} else {
				actions.loginFailed("Failed to login");
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	authenticateUniversity: thunk(async (actions, payload) => {
		actions.setcheckType(payload.type);
		const response = await loginUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//sessionStorage.setItem("jwt", JSON.stringify(body?.item));
			// console.log(body)
			if (body.messageType === 1) {
				if (payload.remember) {
					localStorage.setItem("password", JSON.stringify(false));
					localStorage.setItem("jwt", JSON.stringify(body?.item));
				} else {
					localStorage.removeItem("jwt");
				}
				actions.authenticated(body?.item);

			} else if (body.messageType === 10) {
				localStorage.setItem("password", JSON.stringify(true));
				actions.setBusy(false);
				actions.setshowModal(true);
			} else {
				actions.loginFailed("Failed to login");
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	
	authenticateUniversityPassword: thunk(async (actions, payload) => {
		actions.setcheckType(payload.type);
		const response = await loginUniPassword(payload);
		actions.setBusy(false);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//sessionStorage.setItem("jwt", JSON.stringify(body?.item));
			// console.log(body)
			if (body.messageType === 1) {
				if (payload.remember) {
					localStorage.setItem("jwt", JSON.stringify(body?.item));
					localStorage.setItem("unipassword", payload?.unipassword);
					actions.setisPassword(payload?.unipassword)
				} else {
					localStorage.removeItem("jwt");
				}

				actions.authenticated(body?.item);
				actions.setshowModal(false);

			} else {
				localStorage.removeItem("jwt");
				notification.error({message:"Failed to login"})
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	authenticateUniversity2: thunk(async (actions, payload) => {
		const response = await loginUni(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType === 1) {
				localStorage.setItem("jwt", JSON.stringify(body?.item));
				actions.authenticated(body?.item);

			} else {
				localStorage.removeItem("jwt");
				notification.error({ message: "Something went wrong" });
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	updatDataUni: thunk(async (actions, payload) => {
		const response = await updatDataUni(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType === 1) {
				localStorage.setItem("jwt", JSON.stringify(body?.item));
				actions.authenticated(body?.item);

			} else {
				localStorage.removeItem("jwt");
				notification.error({ message: "Something went wrong" });
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	authenticateUniversityQR: thunk(async (actions, payload) => {
		actions.setcheckType(payload.type);
		const response = await loginUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//sessionStorage.setItem("jwt", JSON.stringify(body?.item));
			// console.log(body)
			if (body.messageType === 1) {
				if (payload.remember) {
					localStorage.setItem("jwt", JSON.stringify(body?.item));
				} else {
					localStorage.removeItem("jwt");
				}

				actions.authenticated(body?.item);
				// window.location.reload();

			} else {
				actions.loginFailed("Failed to login");
			}

		} else {
			actions.loginFailed("Failed to login");
		}
	}),
	authenticated: action((state, auth) => {
		//console.log(auth)
		state.user = auth;
	}),

	setcheckType: action((state, payload) => {
		//console.log(auth)
		state.checkType = payload;
	}),
	setBusy: action((state, isbusy) => {
		state.busy = isbusy;
	}),
	setShow: action((state, payload) => {
		state.show = payload;
	}),	
	setshowModal: action((state, payload) => {
		state.showModal = payload;
	}),	
	setisPassword: action((state) => {
		let password: any = localStorage.getItem("password");
		state.isPassword = password;
	}),
	loginFailed: action((state, message) => {
		state.busy = false;
		state.error = message;
	}),
	logout: action((state) => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("type");
		localStorage.clear();
		sessionStorage.removeItem("jwt");
		state.user = undefined;
		state.busy = false;
		state.error = "";
		window.location.reload()
	}),

	collectionList: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await collectionList(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			//	console.log(body)
			if (body?.item?.length === 0) {
				message.warning('No Data Found');
				actions.setTableData([])
				actions.setserviceCharge(0)
			} else if (body?.item === null) {
				message.warning(body?.message);
				actions.setTableData([])
				actions.setserviceCharge(0)
			} else {
				actions.setTableData(body?.item)
				actions.setserviceCharge(body?.serviceCharge)

			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	collectionListWithoutMonth: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.setTableData([])
		actions.startLoading("start");
		actions.setShow(false);
		const response = await collectionListAll(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			actions.setShow(true);
			const body = await response.json();
			//	console.log(body)
			actions.setoperationIdentificationId(body?.operationIdentificationId)
			let fetchview: any = { instituteId: payload?.instituteId, identificationId: body?.operationIdentificationId }
			actions.fetchpaidViews(fetchview)
			if (body?.item?.length === 0) {
				message.warning('No payable fees found');
				actions.setTableData([])
				actions.setserviceCharge(0)
				actions.settotalserviceCharge(null)
			} else if (body?.item === null) {
				message.warning(body?.message);
				actions.setTableData([])
				actions.settotalserviceCharge(null)
				actions.setserviceCharge(0)
			} else {
				actions.setTableData(body?.item)
				actions.setserviceCharge(body.serviceChargeUnit)
				actions.settotalserviceCharge(body.totalPayableServiceCharge)
				localStorage.setItem("totalCharge", JSON.stringify(body?.totalPayableServiceCharge));
				localStorage.setItem("charge", JSON.stringify(body?.serviceChargeUnit));
				// console.log(body?.totalPayableServiceCharge)
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			actions.setShow(true);
			//actions.loginFailed("Failed to login");
		}
	}),
	fetchpaidViews: thunk(async (actions, payload) => {
		actions.setpaidViews([])
		const response = await fetchpaidViews(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//	console.log(body)
			if (body?.item?.length === 0) {
				//message.warning('No Data Found');
				actions.setpaidViews([])
			} else if (body?.item === null) {
				//message.warning(body?.message);
				actions.setpaidViews([])
			} else {
				actions.setpaidViews(body?.item)
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	collectionListUni: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await collectionListUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			//	console.log(body)
			if (body?.item?.length === 0) {
				message.warning('No payable fees found');
				actions.setTableData([])
				actions.setserviceCharge(0)
			} else if (body?.item === null) {
				message.warning('No Data Found');
				actions.setTableData([])
				actions.setserviceCharge(0)
			} else {
				actions.setTableData(body?.item)
				actions.setserviceCharge(body?.item?.serviceCharge)
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	fetchpaidViewsUniversity: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await fetchpaidViewsUniversity(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			//actions.stopLoading("stop");
			const body = await response.json();
			//	console.log(body)
			console.log(body)
			if (body?.item?.length === 0) {
				// message.warning('No payable fees found');
				actions.setpaidViewsUniversity([])
				// actions.setserviceCharge(0)
			} else if (body?.item === null) {
				// message.warning('No Data Found');
				actions.setpaidViewsUniversity([])
				// actions.setserviceCharge(0)
			} else {
				actions.setpaidViewsUniversity(body?.item)
				//actions.setserviceCharge(body?.item?.serviceCharge)
			}

		} else {
			message.error('Something Went Wrong');
			//actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	submitDataFinal: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await submitDataFinal(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = `${API_BASE}/public/goto/spg-payment/portal?sessiontoken=${body?.item}`
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}


		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),	
	submitDataFinalBkash: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await submitDataFinalBkash(payload);

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body);
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = body?.item;
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}


		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),


	submitDataFinalBkashUniversity: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await submitDataFinalBkashUniversity(payload);

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body);
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = body?.item;
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}


		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),

	submitDataFinalForUpayPgwUniversity: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await submitDataForUpayPgwUniversity(payload);

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body);
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = body?.item;
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}


		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),

	submitDataFinalUpayPgw: thunk(async (actions, payload) => {
		actions.startLoading("start");
		const response = await submitDataFinalUpayPgw(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = body?.item;
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
		}
	}),

	submitDataFinalForSSL: thunk(async (actions, payload) => {
		actions.startLoading("start");
		const response = await submitDataFinalSSL(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = body?.item;
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
		}
	}),

	submitDataFinalUni: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await submitDataFinalUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				let requestUrl = `${API_BASE_UNI}/public/goto/spg-payment/portal?sessiontoken=${body?.item}`
				window.open(requestUrl, '_self');
			} else {
				message.error(body?.message);
			}


		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	setTableData: action((state, payload) => {
		//console.log(auth)
		state.tableData = payload;
	}),
	setpaidViewsUniversity: action((state, payload) => {
		//console.log(auth)
		state.paidViewsUniversity = payload;
	}),

	setpaidViews: action((state, payload) => {
		//console.log(auth)
		state.paidViews = payload;
	}),
	setserviceCharge: action((state, payload) => {
		//console.log(auth)
		state.serviceCharge = payload;
	}),
	setoperationIdentificationId: action((state, payload) => {
		//console.log(auth)
		state.operationIdentificationId = payload;
	}),

	settotalserviceCharge: action((state, payload) => {
		//console.log(auth)
		state.totalserviceCharge = payload;
	}),
	startLoading: action((state) => {
		//console.log(auth)
		state.loading = true;
	}),
	stopLoading: action((state) => {
		//console.log(auth)
		state.loading = false;
	}),
	reportList: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await reportList(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			// console.log(body)
			if (body?.item?.length === 0) {
				message.warning('No Data Found');
				actions.setreportData(body?.item)
			} else {
				let dt = body?.item.map(function (item, index) {
					return {
						key: index,
						customStudentId: item.customStudentId,
						feeHeads: item.feeHeads,
						feeInvoiceId: item.feeInvoiceId,
						feeSubHeads: item.feeSubHeads,
						masterId: item.masterId,
						paidAmount: item.paidAmount,
						paymentDate: item.paymentDate,
						paymentStatus: item.paymentStatus,
						studentName: item.studentName,
						studentRoll: item.studentRoll
					}
				})
				actions.setreportData(dt)
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	reportListUni: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await reportListUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			// console.log(body)
			if (body?.item === null) {
				message.warning('No Data Found');
				actions.setreportData(body?.item)
			} else {

				actions.setreportData(body?.item)
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),	
	sendStudentPasswordRecoveryToken: thunk(async (actions, payload) => {
		//console.log(payload)
		// actions.startLoading("start");
		const response = await sendStudentPasswordRecoveryToken(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			// console.log(body)
			if (body?.messageType === 1) {
				message.success(body?.message);
			} else {
				message.error(body?.message);
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),	
	passwordChangeUni: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await passwordChangeUni(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			// console.log(body)
			if (body?.messageType === 1) {
				localStorage.removeItem("unipassword");
				message.success(body?.message);
				localStorage.setItem("unipassword", payload?.newPassword);
			} else {
				message.error(body?.message);
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),	
	resetStudentPassword: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await resetStudentPassword(payload);

		//console.log(response.status)
		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			// console.log(body)
			if (body?.messageType === 1) {
				message.success("Password has been changed. Please login again using your new password");
				setTimeout(() => {
					localStorage.removeItem("jwt");
					localStorage.removeItem("type");
					localStorage.clear();
					sessionStorage.removeItem("jwt");
					window.location.reload()
				}, 500);
			} else {
				message.error(body?.message);
				
			}

		} else {
			message.error('Something Went Wrong');
			actions.stopLoading("stop");
			//actions.loginFailed("Failed to login");
		}
	}),
	setreportData: action((state, payload) => {
		//console.log(auth)
		state.reportData = payload;
	}),

	updateStudentProfileBasicInfo: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await updateStudentProfileBasicInfo(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.authenticate2(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	updateStudentProfileBasicInfoUniversity: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await updateStudentProfileBasicInfoUniversity(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.updatDataUni(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	updateStudentPhotoUniversity: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		var data = new FormData()
		data.append('file', payload.file);

		const response = await updateStudentPhotoUniversity(data, payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.updatDataUni(payload);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),

	updateStudentGuardianInfo: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await updateStudentGuardianInfo(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.authenticate2(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),

	updateStudentAddressInfo: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await updateStudentAddressInfo(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.authenticate2(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	authenticate2: thunk(async (actions, payload) => {
		const response = await updatData(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			// console.log(body)
			if (body.messageType === 1) {
				localStorage.setItem("jwt", JSON.stringify(body?.item));
				actions.authenticated(body?.item);

			} else {

			}

		} else {

		}
	}),

	districtList: null,
	thanaList: null,
	districtListFetch: thunk(async (actions) => {
		const response = await fetchDistrictList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdistrictList(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	thanaListFetch: thunk(async (actions, id) => {
		const response = await fetchThanaList(id);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log('hello',body)
			actions.setthanaList(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	setdistrictList: action((state, payload) => {
		state.districtList = payload;
	}),
	setthanaList: action((state, payload) => {
		state.thanaList = payload;
	}),


	districtList2: null,
	thanaList2: null,
	districtListFetch2: thunk(async (actions) => {
		const response = await fetchDistrictList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdistrictList2(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	thanaListFetch2: thunk(async (actions, id) => {
		const response = await fetchThanaList(id);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log('hello',body)
			actions.setthanaList2(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	setdistrictList2: action((state, payload) => {
		state.districtList2 = payload;
	}),
	setthanaList2: action((state, payload) => {
		state.thanaList2 = payload;
	}),
	checkNumber: false,
	setcheckNumber: action((state, payload) => {
		state.checkNumber = payload;
	}),

	updateStudentGuardianInfo2: thunk(async (actions, payload) => {
		//console.log(payload)
		actions.startLoading("start");
		const response = await updateStudentGuardianInfo(payload);

		//console.log(response.status)

		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.setcheckNumber(true);
				actions.authenticate2(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	updateStudentGuardianInfoUniversity: thunk(async (actions, payload) => {
		actions.startLoading("start");
		const response = await updateStudentGuardianInfoUniversity(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.stopLoading("stop");
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.setcheckNumber(true);
				actions.authenticateUniversity2(payload);
			} else {
				message.error('Something Went Wrong');
			}

		} else {
			message.error('Something Went Wrong');
			//actions.loginFailed("Failed to login");
			actions.stopLoading("stop");
		}
	}),
	hasOtp: false,
	sethasOtp: action((state, payload) => {
		state.hasOtp = payload;
	}),
	usedOtp: false,
	setusedOtp: action((state, payload) => {
		state.usedOtp = payload;
	}),
	saveStudentProfileUpdateToken: thunk(async (actions, payload) => {
		const response = await saveStudentProfileUpdateToken(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.sethasOtp(true);
				//localStorage.setItem("otpCode", JSON.stringify(true));
			} else {
				message.error(body?.message);
				actions.sethasOtp(false);
			}

		} else {
			message.error('Something Went Wrong');
			actions.sethasOtp(false);
		}
	}),
	saveStudentProfileUpdateTokenUniversity: thunk(async (actions, payload) => {
		const response = await saveStudentProfileUpdateTokenUniversity(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.sethasOtp(true);
				//localStorage.setItem("otpCode", JSON.stringify(true));
			} else {
				message.error(body?.message);
				actions.sethasOtp(false);
			}

		} else {
			message.error('Something Went Wrong');
			actions.sethasOtp(false);
		}
	}),

	otpUsedSend: thunk(async (actions, payload) => {
		const response = await otpUsed(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.setusedOtp(true);
				localStorage.setItem("otpCode", JSON.stringify(true));
			} else {
				message.error(body?.message);
				actions.setusedOtp(false);
			}

		} else {
			message.error('Something Went Wrong');
			actions.setusedOtp(false);
		}
	}),
	otpUsedSendUniversity: thunk(async (actions, payload) => {
		const response = await otpUsedSendUniversity(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				message.success(body?.message);
				actions.setusedOtp(true);
				localStorage.setItem("otpCode", JSON.stringify(true));
			} else {
				message.error(body?.message);
				actions.setusedOtp(false);
			}

		} else {
			message.error('Something Went Wrong');
			actions.setusedOtp(false);
		}
	}),
	academicYearList: [],
	setacademicYearList: action((state, payload) => {
		state.academicYearList = payload;
	}),
	fetchacademicYearList: thunk(async (actions, payload) => {
		const response = await fetchacademicYearList(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.setacademicYearList(body.item);
		} else {
			actions.setacademicYearList([]);
		}
	}),
	examList: [],
	setExamList: action((state, payload) => {
		state.examList = payload;
	}),
	fetchExamList: thunk(async (actions, payload:any) => {
		const response = await fetchExamList2(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.setExamList(body.item);
		} else {
			actions.setExamList([]);
		}
	}),	
	publicexamList: [],
	setPublicExamList: action((state, payload) => {
		state.publicexamList = payload;
	}),
	fetchPublicExamList: thunk(async (actions, payload:any) => {
		const response = await fetchPublicExamList(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.setPublicExamList(body.item);
		} else {
			actions.setPublicExamList([]);
		}
	}),
	singleStudentMarkView: null,
	setsingleStudentMarkView: action((state, payload) => {
		state.singleStudentMarkView = payload;
	}),

	fetchsingleStudentMarkView: thunk(async (actions, payload) => {
		actions.startLoading("start");
		const response = await fetchsingleStudentMarkView(payload);
		if (response.status === 201 || response.status === 200) {
			actions.stopLoading("stop");
			const body = await response.json();
			if (body?.messageType === 1) {
				actions.setsingleStudentMarkView(body?.item);
				//localStorage.setItem("otpCode", JSON.stringify(true));
			} else {
				message.error("No Data Found");
				actions.setsingleStudentMarkView(null);
			}

		} else {
			actions.stopLoading("stop");
			message.error('Something Went Wrong');
			actions.sethasOtp(false);
		}
	}),
	ledgerList: null,
	setledgerList: action((state, payload) => {
		state.ledgerList = payload;
	}),
	fetchledgerList: thunk(async (actions, payload:any) => {
		const response = await fetchledgerList(payload);
		actions.startLoading("start");
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			actions.setledgerList(body.item);
			actions.stopLoading("stop");
		} else {
			actions.setledgerList(null);
			actions.stopLoading("stop");
		}
	}),
}
