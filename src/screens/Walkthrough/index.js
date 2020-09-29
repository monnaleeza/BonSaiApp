import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  TextInput,
  ImageBackground,
  Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Button, Image, Icon, Header } from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';
import { Switch } from 'react-native-switch';
import AsyncStorage from '@react-native-community/async-storage'
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
// import SignupModal from '../../components/SignupModal';

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
      confirmationVisible: false,
      signupFormVisible: false,
      signinVisible: false,
      forgotpwdVisible: false,
      resetpwdVisible: false,
      name: '',
      phone: '',
      email: '',
      password: '',
      password2: '',
      agreeTerms: 0,
      agreeEmail: 0
    };
  }

  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  componentDidMount() {
    this.setState({
      loading: false,
      name: '',
      phone: '',
      email: '',
      password: '',
      password2: '',
      agreeTerms: 0,
      agreeEmail: 0
    })
  }


  registerUserData = (data) => {
    AsyncStorage.setItem('isLoggedin', 'yes')
    AsyncStorage.setItem('id', !data.id ? '' : data.id)
    AsyncStorage.setItem('name', !data.name ? '' : data.name)
    AsyncStorage.setItem('phone', !data.phone ? '' : data.phone)
    AsyncStorage.setItem('city', !data.city ? '' : data.city)
    AsyncStorage.setItem('api_key', !data.api_key ? '' : data.api_key)
    AsyncStorage.setItem('country', !data.country ? '' : data.country)
    AsyncStorage.setItem('years_of_bonsai_exp', !data.years_of_bonsai_exp ? '' : data.years_of_bonsai_exp)
    AsyncStorage.setItem('email', !data.email ? '' : data.email)
    AsyncStorage.setItem('user_type', !data.user_type ? '' : data.user_type)
  }

  btn_login = () => {
    this.setState({
      forgotpwdVisible: false,
      confirmationVisible: false,
      signupFormVisible: false,
      signinVisible: true,
    })
    let { email, password } = this.state

    if (email != '' && password != '') {
      this.setState({ loading: true })
      this.props.actions.loginWithEmailAndPassword(email, password, response => {
        if (response.success) {
          this.setState({ loading: false })
          this.registerUserData(response.data)
          this.props.navigation.navigate('MyAccount');
        }
        else {
          this.setState({
            loading: false
          })
        }
      })
    }
    else {
      Alert.alert('Alert', 'Please fill out all blanks')
    }
  }

  btn_signup = () => {
    this.setState({
      confirmationVisible: false,
      signupFormVisible: true,
      signinVisible: false,
      forgotpwdVisible: false,
    })
    let { name, phone, email, password, password2, agreeTerms, agreeEmail } = this.state
    let isBlankField = false
    let isPasswordMatch = false
    if (name != '' && phone != '' && email != '') {
      isBlankField = true
    }
    else {
      Alert.alert('Alert', 'Please fill out all blanks')
      return
    }
    if (password != '' && password2 != '') {
      if (password == password2) {
        isPasswordMatch = true
      }
      else {
        Alert.alert('Error', 'Password doesnot match')
        return
      }
    }
    else {
      Alert.alert('Error', 'Please input your password')
      return
    }
    if (agreeTerms == 0) {
      Alert.alert('Alert', 'You have to agree with privacy policy')
    }
    if (isBlankField && isPasswordMatch && agreeTerms == 1) {
      this.setState({ loading: true })
      this.props.actions.signupWithEmailAndPhoneNumber(name, phone, email, password, password2, agreeEmail, response => {
        if (response.success) {
          this.setState({ loading: false })
          this.registerUserData(response.data)
          this.props.navigation.navigate('MyAccount');
        }
        else {
          this.setState({
            loading: false
          })
        }
      })
    }
  }

  btn_resetPassword = () => {
    if(this.state.password == '' || this.state.password2 == ''){
      Alert.alert('Error', 'Please input password')
      return
    }
    if(this.state.password !== this.state.password2){
      Alert.alert('Error', 'Password does not match')
      return
    }
    this.props.actions.resetPassword(this.state.email, this.state.password, this.state.password2, response => {
      if(response.success){
        this.setState({
          resetpwdVisible : false,
          forgotpwdVisible : false
        })
      }
    })
  }


  btn_forgotPassword = () => {
    if (this.state.email == '') {
      Alert.alert('Error', 'Please input correct Email')
      return
    }
    this.props.actions.forgotPassword(this.state.email, response => {
      if (response.success) {
        this.setState({
          resetpwdVisible : true,
          password : '',
          password2 : ''
        })
      }
      else{
        this.setState({ forgotpwdVisible: false })
      }
    })
  }

  renderConfirm = () => {
    return (
      <ImageBackground
        source={Images.balloonWalkthrough2}
        style={styles.modalContainer}
        imageStyle={{ width: '100%' }}>

        <Text style={[styles.modalText, { marginTop: 50 }]}>
          Congrats! Your Bonsai Mundo{'\n'}Account has been created!
        </Text>
        <Text style={[styles.modalText, { marginTop: 25 }]}>
          Click the button below to set up your{'\n'}user account. Once you have
          {'\n'}
          cpmpleted your account information...{'\n'}let’s set up your Bonsai!
        </Text>
        <Button
          onPress={() =>
            this.setState({
              confirmationVisible: false,
              signupFormVisible: true,
              signinVisible: false,
              forgotpwdVisible: false,
            })
          }
          style={{
            marginHorizontal: 100,
            marginTop: 40,
            marginBottom: 130,
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            Set Up Your Account!
          </Text>
        </Button>
      </ImageBackground>
    );
  };

  renderForgotPassword = () => {
    return (
      <ImageBackground
        source={Images.balloonWalkthrough1}
        style={styles.modalContainer}
        imageStyle={{ width: '100%' }}>
        {this.state.resetpwdVisible == true ?
          <View style = {{ width : '100%', alignItems : "center"}}>
            <Text style={[styles.modalText, { marginTop: 50 }]}>
              Reset Password.
            </Text>
            <TextInput
              keyboardType='default'
              style={{
                width: '80%',
                height: 32,
                borderWidth: 1,
                borderColor: BaseColor.primaryColor,
                paddingVertical: 0,
                paddingLeft: 10,
                marginTop: 25,
              }}
              value={this.state.password}
              onChangeText={val => this.setState({ password: val })}
              placeholder={`Password`}
            />
            <TextInput
              keyboardType='default'
              style={{
                width: '80%',
                height: 32,
                borderWidth: 1,
                borderColor: BaseColor.primaryColor,
                paddingVertical: 0,
                paddingLeft: 10,
                marginTop: 25,
              }}
              value={this.state.password2}
              onChangeText={val => this.setState({ password2: val })}
              placeholder={`Confirm Password`}
            />
            <Button
              onPress={() => this.btn_resetPassword()}
              style={{
                marginHorizontal: 100,
                marginTop: 25,
                marginBottom: 110,
              }}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Reset</Text>
            </Button>
          </View>
          :
          <View style = {{width : '100%', alignItems : 'center'}}>
            <Text style={[styles.modalText, { marginTop: 50 }]}>
              Forgot Your Password? No Worries!{'\n'}Enter Your Email Address and We’ll{'\n'} Send it to You.
            </Text>
            <TextInput
              keyboardType="email-address"
              style={{
                width: '80%',
                height: 32,
                borderWidth: 1,
                borderColor: BaseColor.primaryColor,
                paddingVertical: 0,
                paddingLeft: 10,
                marginTop: 25,
              }}
              value={this.state.email}
              onChangeText={val => this.setState({ email: val })}
              placeholder={`Email`}
            />
            <Button
              onPress={() => this.btn_forgotPassword()}
              style={{
                marginHorizontal: 100,
                marginTop: 25,
                marginBottom: 110,
              }}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Submit</Text>
            </Button>
          </View>
        }
      </ImageBackground>
    );
  };

  renderSignMeUp = () => {
    return (
      <ImageBackground
        source={Images.balloonWalkthrough3}
        style={styles.modalContainer}
        imageStyle={{ width: '100%' }}>
        <Text style={[styles.modalText, { marginTop: 20 }]}>
          Just enter your name, phone, email address and{'\n'}
          preferred password. We’ll get you set up!
        </Text>
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ name: text })}
          autoCorrect={false}
          placeholder="Enter name"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.name}
          selectionColor={BaseColor.primaryColor}
        />
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ phone: text })}
          autoCorrect={false}
          placeholder="Enter phone"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.phone}
          selectionColor={BaseColor.primaryColor}
        />
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ email: text })}
          autoCorrect={false}
          placeholder="Enter your email"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.email}
          selectionColor={BaseColor.primaryColor}
        />
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ password: text })}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.password}
          selectionColor={BaseColor.primaryColor}
        />
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ password2: text })}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Confirm password"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.password2}
          selectionColor={BaseColor.primaryColor}
        />
        <View style={{ width: '80%', alignItems: 'flex-start' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              value={this.state.agreeTerms == 1 ? true : false}
              onValueChange={val => this.setState({ agreeTerms: val ? 1 : 0 })}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('TermsOfUse')}>
              <Text
                style={{
                  color: BaseColor.primaryColor,
                  textDecorationLine: 'underline',
                }}>
                I agree to the app’s Terms and privacy Policies
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              value={this.state.agreeEmail == 1 ? true : false}
              onValueChange={val => this.setState({ agreeEmail: val ? 1 : 0 })}
            />
            <Text>I agree to receive email from the app.</Text>
          </View>
        </View>
        <Button
          onPress={() => this.btn_signup()}
          style={{
            borderRadius: 0,
            marginHorizontal: 130,
            height: 40,
            marginTop: 15,
            marginBottom: 80,
            backgroundColor: '#2A6101',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            Sign Me Up!
          </Text>
        </Button>
      </ImageBackground>
    );
  };

  renderSignIn = () => {
    return (
      <ImageBackground
        source={Images.balloonWalkthrough1}
        style={styles.modalContainer}
        imageStyle={{ width: '100%' }}>
        <Text
          style={[
            styles.modalText,
            {
              marginTop: 30,
              marginBottom: 25,
            },
          ]}>
          {'Enter Your Email Address & Password!'}
        </Text>
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ email: text })}
          autoCorrect={false}
          placeholder="Enter email"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.email}
          selectionColor={BaseColor.primaryColor}
        />
        <TextInput
          style={styles.modalInput}
          onChangeText={text => this.setState({ password: text })}
          autoCorrect={false}
          placeholder="Enter password"
          placeholderTextColor={BaseColor.grayColor}
          value={this.state.password}
          selectionColor={BaseColor.primaryColor}
        />
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: 30,
            marginBottom: 120,
            marginHorizontal: 30,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                email: '',
                confirmationVisible: false,
                signupFormVisible: false,
                signinVisible: false,
                forgotpwdVisible: true,
                loading: false
              })}>
            <Text
              style={{
                color: '#2A6101',
                textDecorationLine: 'underline',
              }}>
              {'Forgot Password?'}
            </Text>
          </TouchableOpacity>
          <Button
            onPress={() => this.btn_login()}
            style={{
              borderRadius: 0,
              height: 30,
              backgroundColor: '#2A6101',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Sign In</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  };

  closeConfirmation = () => {
    this.setState({
      confirmationVisible: false,
      signupFormVisible: false,
      signinVisible: false,
      forgotpwdVisible: false,
    });
  };

  showSignupDlg = () => {
    this.setState({
      name: '',
      phone: '',
      email: '',
      password: '',
      password2: '',
      agreeTerms: 0,
      agreeEmail: 0,
      confirmationVisible: true
    })
  }

  showSigninDlg = () => {
    this.setState({
      name: '',
      phone: '',
      email: '',
      password: '',
      password2: '',
      agreeTerms: 0,
      agreeEmail: 0,
      signinVisible: true
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}>

        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
        />

        <Header
          switchValue={this.state.switch}
          onPressDrawer={() => { }}
          onPressSwitch={() => { }}
        />

        <View style={styles.contain}>
          <View style={{ flex: 10 }}>
            <View style={styles.introContainer}>
              <Text style={styles.introText}>
                Welcome to Bonsai Mundo, your home for everything Bonsai!
              </Text>
              <Text style={styles.introText}>
                Post your bonsai, track maintenance events,grow diary, and get
                free help!
              </Text>
              <Text style={styles.introText}>
                Our app is free. So dig in... and enjoy!
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <Image
                source={Images.bonsaiLandscape}
                style={styles.cardImage}
                resizeMode="stretch"
              />
              <View style={styles.cardTextContainer}>
                <TouchableOpacity onPress={() => this.showSignupDlg()}>
                  <Text style={styles.cardText}>
                    <Text style={{ color: 'blue' }}>Sign Up </Text>
                    Using Facebook, Twitter, or your Email.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.showSigninDlg()}>
                  <Text style={styles.cardText}>
                    Already have an account? Click one of the icons to{' '}
                    <Text style={{ color: 'blue' }}>sign in</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              {this.state.confirmationVisible && this.renderConfirm()}
              {this.state.forgotpwdVisible && this.renderForgotPassword()}
              {this.state.signupFormVisible && this.renderSignMeUp()}
              {this.state.signinVisible && this.renderSignIn()}
              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <Image source={Images.facebook} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.twitter} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.closeConfirmation()}
                >
                  <Image source={Images.email} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.copyright}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AdminSignIn')}>
              <Text>Copyrightⓒ 2020 Bonsai Mundo. All Rights Reserved.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
