import * as actionTypes from '@actions/actionTypes';
const initialState = {
  netState: false,
  isSignup: false,
  signupStart: false,
  signupError: false,
  signupSuccess: false,
  isLogin: false,
  loginStart: false,
  loginError: false,
  info: {
    data: null
  },
  bonsai_data: {
    data: null
  },
  bonsai_data_by_id: {
    data: null
  },
  user: {
    lang: 'en',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: action.payload.isLogin
      }
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loginStart: action.payload.loginStart
      }
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload.loginError
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        isSignup: action.payload.isSignup
      }
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        signupStart: action.payload.signupStart
      }
    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.payload.signupError
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: action.payload.signupSuccess,
      };
    case actionTypes.NETWORK_STATE:
      return {
        ...state,
        netState: action.payload.netState
      }
    default:
      return state;
  }
};
