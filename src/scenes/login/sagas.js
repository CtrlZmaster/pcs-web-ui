import {call, put, takeEvery} from 'redux-saga/effects'

import * as api from "~/services/api.js"
import * as notify from "~/scenes/notifications/actions.js";
import * as authActions from "~/services/auth/actions";

import * as types from "./constants";
import * as actions from "./actions";

export function* logout(){
  try{
    var notice = yield put(notify.info(`Trying to logout`))

    yield call(api.getForText, "/ui/logout");

    yield put(notify.toSuccess(notice, {
      message: `Success logout`,
      disappear: 1000,
    }));
    yield put(actions.logoutSuccess())
  }catch(error){
    if(api.isUnauthorizedError(error)){
      // Ok we are already somehow loged out.
      yield put(notify.toSuccess(notice, {
        message: `Already logged out`,
        disappear: 1000,
      }));
      yield put(actions.logoutSuccess())
    }else{
      yield put(notify.toError(notice, {
        message: `Cannot logout: ${error.message}`
      }));
    }
  }
}

export function* login({payload: {username, password}}){
  try{
    yield call(api.postParamsForText, "/ui/login", {username, password})
    yield put(authActions.authSuccess())
  }catch(error){
    const failInfo = api.isUnauthorizedError(error)
      ? {badCredentials: true}
      : {badCredentials: false, message: error.message}
    ;
    yield put(actions.loginFailed(failInfo))
  }
}


export default [
  takeEvery(types.LOGOUT, logout),
  takeEvery(types.ENTER_CREDENTIALS, login),
];
