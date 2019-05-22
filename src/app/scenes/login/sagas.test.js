import { testSaga } from "redux-saga-test-plan";

import * as api from "app/core/api";
import * as authActions from "app/services/auth/actions";

import { login } from "./sagas";
import * as actions from "./actions";
import * as types from "./constants";

describe("login", () => {
  const username = "a";
  const password = "b";
  const enterCredentials = {
    type: types.ENTER_CREDENTIALS,
    payload: { username, password },
  };

  it("call login success when api succeeds", () => {
    testSaga(login, enterCredentials).next()
      .call(api.postParamsForText, "/ui/login", enterCredentials.payload).next()
      .put(authActions.authSuccess())
      .next()
      .isDone()
    ;
  });

  it("call login failed when api fails", () => {
    const error = new Error("Something happens...");
    testSaga(login, enterCredentials).next()
      .call(api.postParamsForText, "/ui/login", enterCredentials.payload)
      .throw(error)
      .put(actions.loginFailed({
        badCredentials: false,
        message: error.message,
      }))
    ;
  });

  it("call login failed when authorization fails", () => {
    const error = new api.ApiBadStatus(401, "Unauthorized");
    testSaga(login, enterCredentials).next()
      .call(api.postParamsForText, "/ui/login", enterCredentials.payload)
      .throw(error)
      .put(actions.loginFailed({ badCredentials: true, message: "" }))
    ;
  });
});