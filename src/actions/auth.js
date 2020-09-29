import * as actionTypes from './actionTypes';
import axios from 'axios'
import { Alert } from 'react-native';
import { call } from 'react-native-reanimated';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVzTEZ1ZlkxbHpkWGVLNUlDRWw2UnJNWUxHZE44dkdxbFVLMmFPVmVPdVM1YzVuNEszT0kxQUFFb2dvTjhrQU0i.Lj4U71TA1DHGbal6mxgI5_jcBhwmI-Nuoyz-5XlGkAQ'

const netState = (bool) => {
  return {
    type: actionTypes.NETWORK_STATE,
    payload: bool
  }
}

export const setNetState = (bool) => dispatch => {
  dispatch(netState({ 'netState': bool }))
}

const isLogin = (bool) => {
  return {
    type: actionTypes.LOGIN,
    payload: bool
  }
}

const loginStart = (bool) => {
  return {
    type: actionTypes.LOGIN_START,
    payload: bool
  }
}

const loginHasError = (bool) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: bool
  }
}

const loginSuccess = (bool) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: bool
  }
}

const get_bonsai_data = (data) => {
  return{
    type : actionTypes.GET_BONSAI_DATA,
    payload : data
  }
}

const get_bonsai_data_by_id = (data) => {
  return{
    type : actionTypes.GET_BONSAI_DATA_BY_ID,
    payload : data
  }
}

export const resetPassword = (email, pass, pass2, callback) => dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', pass)
  formData.append('confirm_password', pass2)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/reset_password', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        if (typeof callback === 'function') {
          Alert.alert('Success', data.msg)
          callback({ success: true})
        }
      }
      else {
        if(data.errors){
          if(data.errors.email != ''){
            Alert.alert('Error', data.errors.email)
          }
          if(data.errors.password != ''){
            Alert.alert('Error', data.errors.password)
          }
        }
      }
    })
}

export const forgotPassword = (email, callback) => dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }
  const formData = new FormData()
  formData.append('email', email)
  axios.post('https://soheard.dev/dev/bonsai_backend/api/check_email_for_forgot_password', formData, config)
    .then(function (response) {
      let data = response.data
      console.log(data)
      if (data.success == true) {
        if (typeof callback === 'function') {
          callback({ success: true})
        }
      }
      else {
        if(data.error){
          Alert.alert('Error', data.error)
        }
        if(data.errors){
          Alert.alert('Error', data.errors.email)
        }
        callback({success : false})
      }
    })
}


export const loginWithEmailAndPassword = (email, password, callback) => dispatch => {
  dispatch(isLogin({ 'isLogin': true }))
  dispatch(loginStart({ 'loginStart': true }))
  const config = {
    headers: {
      'Token': token
    }
  }
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/login', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        if (typeof callback === 'function') {
          dispatch(loginSuccess({ 'info': data }))
          callback({ success: true, data: data.user_data })
        }
      }
      else {
        if(typeof callback === 'function'){
          callback({success : false, data :null})
        }
        if(data.error){
          Alert.alert('Error', data.error)
          return
        }
        else{
          let error = data.errors
          console.log(data)
          
          if (error.email != '') {
            Alert.alert('Error', error.email)
            return
          }
          if (error.password != '') {
            Alert.alert('Error', error.password)
            return
          }
        }
      }
      dispatch(isLogin({ 'isLogin': false }))
      dispatch(loginStart({ 'loginStart': false }))
    })
    .catch(error => {
      dispatch(loginHasError({ 'loginError': true }))
      dispatch(isLogin({ 'isLogin': false }))
      dispatch(loginStart({ 'loginStart': false }))
      console.log('onLogin call api error', error)
      Alert.alert('Error', 'Sorry, It seems like server error')
    })
};


const isSignup = (bool) => {
  return {
    type: actionTypes.SIGNUP,
    payload: bool
  }
}

const signupStart = (bool) => {
  return {
    type: actionTypes.SIGNUP_START,
    payload: bool
  }
}

const signupHasError = (bool) => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    payload: bool
  }
}

const signupSuccess = (bool) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: bool
  }
}

export const signupWithEmailAndPhoneNumber = (name, phone, email, password, password_comfirm, receiveEmail, callback) => dispatch => {
  dispatch(isSignup({ 'isSignup': true }))
  dispatch(signupStart({ 'signupStart': true }))
  const config = {
    headers: {
      'Token': token
    }
  }
  const formData = new FormData()
  formData.append('name', name)
  formData.append('phone', phone)
  formData.append('email', email)
  formData.append('agree_terms', 1)
  formData.append('agree_receive_email', receiveEmail)
  formData.append('password', password),
    formData.append('confirm_password', password_comfirm)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/registration', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        dispatch(signupSuccess({ 'signupSuccess': true }))
        dispatch(loginWithEmailAndPassword(email, password, response => {
          if (response.success) {
            if (typeof callback === 'function') {
              callback({ success: true, data: data.user_data })
            }
          }
          else {
            Alert.alert('Login Failed', 'Please try again Login')
          }
        }))
      }
      else {
        callback({ success: false, data: null })
        let error = data.errors
        if (error.name != '') {
          Alert.alert('Error', error.name)
          return
        }
        if (error.phone != '') {
          Alert.alert('Error', error.phone)
          return
        }
        if (error.email != '') {
          Alert.alert('Error', error.email)
          return
        }
        if (error.password != '') {
          Alert.alert('Error', error.password)
          return
        }
        if (error.password_comfirm != '') {
          Alert.alert('Error', error.password_comfirm)
          return
        }
      }
      dispatch(isSignup({ 'isSignup': false }))
      dispatch(signupStart({ 'signupStart': false }))
    })
    .catch(function (error) {
      Alert.alert('Error', 'Sorry, It seems likes server error')
      dispatch(signupHasError({ 'signupError': true }))
      dispatch(isSignup({ 'isSignup': false }))
      dispatch(signupStart({ 'signupStart': false }))
      console.log('onSignup call api error', error)
    })
}

export const edit_my_account_data = (data, callback) => dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }
  axios.post('https://soheard.dev/dev/bonsai_backend/api/edit_my_account_data', data, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        if (typeof callback === 'function') {
          callback({ success: true })
        }
      }
      else {
        callback({ success: false })
        Alert.alert('Error', data.msg)
      }
    })
    .catch(error => {
      Alert.alert('Error', 'Sorry, It seems like server error')
      console.log('update data error', error)
    })
}

export const getUserdataFromServer = (uid, api_key) => dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }

  const formData = new FormData()
  formData.append('uid', uid)
  formData.append('api_key', api_key)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/my_account_data', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        dispatch(loginSuccess({ 'info': data }))
      }
      else {
        // Alert.alert('Error', 'Loading user data failed')
        console.log('load userdata from server error', data.error)
      }
    })
    .catch(error => {
      console.log('get userdata from server error', error)
    })
}

export const logout = () => dispatch => {
  axios.get('https://soheard.dev/dev/bonsai_backend/api/logout')
    .then(response => {

    })
    .catch(error => {

    })
}

export const get_my_bonsai_data = (uid, api_key) =>dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }

  const formData = new FormData()
  formData.append('uid', uid)
  formData.append('api_key', api_key)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/get_my_bosais_data', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        dispatch(get_bonsai_data({ 'bonsai_data': data }))
      }
      else {
        // Alert.alert('Error', 'Loading user data failed')
        console.log('load userdata from server error', data.error)
      }
    })
    .catch(error => {
      console.log('get userdata from server error', error)
    })
}

export const get_my_bonsai_data_by_id = (uid, api_key, id, callback) =>dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }

  const formData = new FormData()
  formData.append('api_key', api_key)
  formData.append('uid', uid)
  formData.append('bonsai_id', id)

  console.log(formData)


  axios.post('https://soheard.dev/dev/bonsai_backend/api/get_bonsai_data_by_id', formData, config)
    .then(function (response) {
      
      let data = response.data
      if (data.success == true) {
        dispatch(get_bonsai_data_by_id({ 'bonsai_data_by_id': data }))
        if(typeof callback === 'function'){
          callback({success : true, data: data})
        }
      }
      else {
        if(typeof callback === 'function'){
          callback({success : false, data: null})
        }
        console.log('load userdata from server error', data.error)
      }
    })
    .catch(error => {
      console.log('get userdata from server error', error)
    })
}

export const add_bonsai_data = (uid, api_key, title, description) =>dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }

  const formData = new FormData()
  formData.append('uid', uid)
  formData.append('api_key', api_key)
  formData.append('bonsai_title', title)
  formData.append('bonsai_description', description)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/get_bonsai_data_by_id', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        console.log(data)
      }
      else {
        // Alert.alert('Error', 'Loading user data failed')
        console.log('load userdata from server error', data.error)
      }
    })
    .catch(error => {
      console.log('get userdata from server error', error)
    })
}


export const edit_bonsai_data = (uid, api_key, id, title, description) =>dispatch => {
  const config = {
    headers: {
      'Token': token
    }
  }

  const formData = new FormData()
  formData.append('uid', uid)
  formData.append('api_key', api_key)
  formData.append('bonsai_id', id)
  formData.append('bonsai_title', title)
  formData.append('bonsai_description', description)

  axios.post('https://soheard.dev/dev/bonsai_backend/api/edit_bonsai', formData, config)
    .then(function (response) {
      let data = response.data
      if (data.success == true) {
        console.log(data)
      }
      else {
        // Alert.alert('Error', 'Loading user data failed')
        console.log('load userdata from server error', data.error)
      }
    })
    .catch(error => {
      console.log('get userdata from server error', error)
    })
}
