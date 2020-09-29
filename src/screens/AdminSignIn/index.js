/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Button, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import { Switch } from 'react-native-switch';
import * as Utils from '@utils';

class AdminSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
    };
  }

  renderForgotPassword = () => {
    return (
      <ImageBackground
        source={Images.balloonAdmin}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '110%',
          height: 310,
          marginTop: -20,
          position: 'absolute',
          top: 0,
          zIndex: 100,
        }}
        imageStyle={{ resizeMode: 'stretch', width: '100%' }}>
        <Text
          style={{
            marginTop: 70,
            fontSize: 15,
            textAlign: 'center',
          }}>
          Forgot Your Password? No Worries!{'\n'}
          Enter Your Email Address and We’ll{'\n'}
          Send it to You.
        </Text>
        <TextInput
          style={{
            width: '80%',
            height: 30,
            borderWidth: 1,
            borderColor: BaseColor.primaryColor,
            paddingVertical: 0,
            paddingLeft: 10,
            marginTop: 30,
          }}
          value={this.state.email}
          onChangeText={val => this.setState({ email: val })}
          placeholder={`Email`}
        />
        <Button
          onPress={() => this.setState({ forgotpwdVisible: false })}
          style={{
            borderRadius: 0,
            marginHorizontal: 100,
            marginTop: 30,
            height: 30,
            backgroundColor: BaseColor.primaryColor,
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Submit</Text>
        </Button>
      </ImageBackground>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}>
        <Header
          switchValue={this.state.switch}
          onPressDrawer={() => {}}
          onPressSwitch={() => {}}
        />

        <View style={styles.contain}>
          <View style={{ flex: 10 }}>
            <View style={styles.settingContainer}>
              <Text
                style={{
                  fontSize: 25,
                  borderBottomWidth: 1,
                  borderColor: BaseColor.primaryColor,
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                Admin Sign In
              </Text>
            </View>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <TextInput
                style={{
                  width: '90%',
                  height: 30,
                  borderWidth: 1,
                  borderColor: BaseColor.primaryColor,
                  paddingVertical: 0,
                  paddingLeft: 10,
                  marginTop: 15,
                }}
                value={this.state.email}
                onChangeText={val => this.setState({ email: val })}
                placeholder={`Email`}
              />
              <TextInput
                style={{
                  width: '90%',
                  height: 30,
                  borderWidth: 1,
                  borderColor: BaseColor.primaryColor,
                  paddingVertical: 0,
                  paddingLeft: 10,
                  marginTop: 15,
                }}
                value={this.state.email}
                onChangeText={val => this.setState({ email: val })}
                placeholder={`Password`}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginTop: 25,
                  width: '90%',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({ forgotpwdVisible: true })}>
                  <Text
                    style={{
                      color: BaseColor.primaryColor,
                      textDecorationLine: 'underline',
                    }}>
                    {'Forgot Password?'}
                  </Text>
                </TouchableOpacity>
                <Button
                  style={{
                    borderRadius: 0,
                    height: 30,
                    backgroundColor: BaseColor.primaryColor,
                  }}
                  onPress={() => this.props.navigation.navigate('AdminUser')}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    Sign In
                  </Text>
                </Button>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              {this.state.forgotpwdVisible && this.renderForgotPassword()}
            </View>
          </View>

          <View style={styles.copyright}>
            <Text>Copyrightⓒ 2020 Bonsai Mundo. All Rights Reserved.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignIn);
