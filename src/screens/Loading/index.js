import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { ActivityIndicator, View, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Images, BaseColor } from '@config';
import SplashScreen from 'react-native-splash-screen';
import { Image, Text } from '@components';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from "@react-native-community/netinfo";
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/dynamic-links';

class Loading extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedin: false,
      uid: '',
      api_key: ''
    }
  }

  onProcess() {
    SplashScreen.hide();
    let { navigation, auth } = this.props;
    let { isLoggedin } = this.state;
    switch (isLoggedin) {
      case true:
        setTimeout(() => {
          navigation.navigate('MyAccount');
        }, 500);
        break;
      case false:
        setTimeout(() => {
          navigation.navigate('Walkthrough');
        }, 500);
        break;
      default:
        break;
    }
  }

  UNSAFE_componentWillMount() {
    // this.props.actions.authentication(false, response => {});
  }

  componentDidMount() {
    this.getLoginState();
    NetInfo.addEventListener(item => {
      this.props.actions.setNetState(item.isConnected)
      if (!item.isConnected) {
        Alert.alert('Network Error', 'Please confirm your network')
      }
    });
  }

  getLoginState = async () => {
    let self = this
    let id = await AsyncStorage.getItem('id')
    let api_key = await AsyncStorage.getItem('api_key')
    AsyncStorage.getItem('isLoggedin')
      .then(result => {
        if (result == 'yes') {
          self.props.actions.getUserdataFromServer(id, api_key)
          self.setState({ isLoggedin: true })
        }
        else {
          self.setState({ isLoggedin: false })
        }
        this.onProcess()
      })
      .catch(error => {
        console.log('getItem from AsyncStorage is error', error)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <View
          style={{
            position: 'absolute',
            top: 220,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text title1 whiteColor semibold>
            Bonsai Mundo
          </Text>
          <ActivityIndicator
            size="large"
            color={BaseColor.whiteColor}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
