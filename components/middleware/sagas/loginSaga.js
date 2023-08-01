import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

//local
import { LOGIN_REQUEST, loginSuccess, loginFailure,
         GET_USER_REQUEST, getUserSuccess, getUserFailure } from '../actions/loginAction';
import { loginUserApi, userDataApi } from '../apiEndpoint';
import { UserContext } from '../Contexts/userContext';
import userReducer from '../reducers';

function* login(action) {
  try {
    console.log("Login Triggered");
    const response = yield call(axios.post, loginUserApi, action.payload);
    const tokenSession = response.data.token;
    yield put(loginSuccess(tokenSession));
    console.log(tokenSession);
  } catch (error) {
    console.log(error.message)
    yield put(loginFailure(error.message));
  }
}

function* getUserFromStore(action) {
    try {
      const response = yield call(axios.get, userDataApi, {
        headers: {
          'Authorization': `Bearer ${action.payload}`,
        },
      });
      const userData = response.data;
      yield put(getUserSuccess(userData));
    } catch (error) {
      yield put(getUserFailure(error.message));
    }
  }

export function* LoginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_USER_REQUEST, getUserFromStore);
}
