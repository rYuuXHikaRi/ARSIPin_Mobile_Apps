import { LOGIN_SUCCESS, LOGIN_FAILURE, 
         GET_USER_SUCCESS, GET_USER_FAILURE,} from './actions/loginAction';

const initialState = {
    tokenSession: null,
    userData: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        tokenSession: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        tokenSession: null,
        error: action.payload,
      };
    case GET_USER_SUCCESS:
    return {
        ...state,
        userData: action.payload,
        error: null,
    };
    case GET_USER_FAILURE:
    return {
        ...state,
        userData: null,
        error: action.payload,
    };
    default:
      return state;
  }
};

export default userReducer;
