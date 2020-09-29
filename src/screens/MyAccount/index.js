import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { View, TouchableOpacity, CheckBox } from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Icon, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import { cos } from 'react-native-reanimated';

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
    };
  }

  componentDidMount() {
    this.setState({

    })
  }

  render() {
    const { navigation } = this.props;

    let name = 'None', phone = 'None', email = 'None', city = 'None', country = 'None', years_of_bonsai_exp = 'None', receive_push_notifications = '0', agree_receive_email = '0'
    let userData = this.props.auth.info.user_data
    if (userData) {
      name = userData.name ? userData.name : 'None'
      phone = userData.phone ? userData.phone : 'None'
      email = userData.email ? userData.email : 'None'
      city = userData.city ? userData.city : 'None'
      country = userData.country ? userData.country : 'None'
      years_of_bonsai_exp = userData.years_of_bonsai_exp ? userData.years_of_bonsai_exp : '0'
      receive_push_notifications = userData.receive_push_notifications
      agree_receive_email = userData.agree_receive_email
    }

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}>
        <Header
          switchValue={this.state.switch}
          onPressDrawer={() => { }}
          onPressSwitch={() => { }}
        />

        <View style={styles.contain}>
          <View style={{ flex: 10 }}>
            <View style={styles.settingContainer}>
              <TouchableOpacity style={styles.settingLeft}>
                <Image source={Images.account} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>My Account</Text>
              </TouchableOpacity>
              <View style={styles.settingCenter}>
                <Text
                  style={{
                    fontSize: 26,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  My Account
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditMyAccount')
                  }
                  style={{ marginLeft: 5 }}>
                  <Icon name="pencil-alt" size={20} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyBonsais')}
                style={styles.settingRight}>
                <Image source={Images.bonsai} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>My Bonsais</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>Name: {`${name}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>Phone: {`${phone}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>Email: {`${email}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>City: {`${city}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>Country: {`${country}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>
                  Years of Bonsai Experience: {`${years_of_bonsai_exp}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 36 }}>
                <Text style={styles.infoText}>
                  Number of Bonsais in System: 20
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  disabled={true}
                  value={receive_push_notifications == '1' ? true : false}
                />
                <Text style={styles.infoText}>Receive Push Notifications</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  disabled={true}
                  value={agree_receive_email == '1' ? true : false}

                />
                <Text style={styles.infoText}>
                  Receive Email from Bonsai Mundo
                </Text>
              </View>
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
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
