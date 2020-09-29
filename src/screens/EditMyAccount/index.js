import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  TextInput,
  Picker,
  Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Button, Image, Icon, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';
import CountryPicker from 'react-native-country-picker-modal'
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

class EditMyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
      showPassword: true,
      loading: false,
      id: '',
      api_key: '',
      name: '',
      phone: '',
      email: '',
      pass: '',
      pass2: '',
      city: '',
      country: '',
      years_of_bonsai_exp: '',
      pushNotification: '1',
      receiveEmail: '1',
      name_prev: '',
      phone_prev: '',
      email_prev: '',
      pass_prev: '',
      pass2_prev: '',
      city_prev: '',
      country_prev: '',
      years_of_bonsai_exp_prev: '',
      pushNotification_prev: '1',
      receiveEmail_prev: '1',
    };
  }

  componentDidMount() {
    let userData = this.props.auth.info.user_data
    if (userData) {
      this.setState({
        id: userData.id,
        api_key: userData.api_key,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        city: userData.city,
        country: userData.country,
        years_of_bonsai_exp: userData.years_of_bonsai_exp,
        pushNotification: userData.receive_push_notifications,
        receiveEmail: userData.agree_receive_email,
        name_prev: userData.name,
        phone_prev: userData.phone,
        email_prev: userData.email,
        city_prev: userData.city,
        country_prev: userData.country,
        years_of_bonsai_exp_prev: userData.years_of_bonsai_exp,
        pushNotification_prev: userData.receive_push_notifications,
        receiveEmail_prev: userData.agree_receive_email
      })
    }
  }

  btn_update_profile = () => {
    this.setState({ loading: true })
    const formData = new FormData()
    formData.append('uid', this.state.id)
    formData.append('api_key', this.state.api_key)
    if (this.state.name_prev !== this.state.name) {
      formData.append('name', this.state.name)
    }
    if (this.state.phone_prev !== this.state.phone) {
      formData.append('phone', this.state.phone)
    }
    if (this.state.email_prev !== this.state.email) {
      formData.append('email', this.state.email)
    }
    if (this.state.pass !== this.state.pass_prev) {
      formData.append('password', this.state.pass)
    }
    if (this.state.pass2_prev !== this.state.pass2) {
      formData.append('confirm_password', this.state.pass2)
    }
    if (this.state.city_prev !== this.state.city) {
      formData.append('city', this.state.city)
    }
    if (this.state.country_prev !== this.state.country) {
      formData.append('country', this.state.country)
    }
    if (this.state.years_of_bonsai_exp_prev !== this.state.years_of_bonsai_exp) {
      formData.append('years_of_bonsai_exp', this.state.years_of_bonsai_exp)
    }
    if (this.state.pushNotification_prev !== this.state.pushNotification) {
      formData.append('receive_push_notifications', this.state.pushNotification)
    }
    if (this.state.receiveEmail_prev !== this.state.receiveEmail) {
      formData.append('agree_receive_email', this.state.receiveEmail)
    }
    this.props.actions.edit_my_account_data(formData, response => {
      if (response.success) {
        this.setState({ loading: false })
        this.props.actions.getUserdataFromServer(this.state.id, this.state.api_key)
        this.props.navigation.navigate('MyAccount')
      }
      this.setState({ loading: false })
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

            <ScrollView style={{ marginTop: 10 }}>
              <View style={styles.contentContainer}>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ name: text })}
                    autoCorrect={false}
                    placeholder="Enter First Name Last Name"
                    placeholderTextColor={BaseColor.grayColor}
                    value={this.state.name}
                    selectionColor={BaseColor.primaryColor}
                  />
                </View>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}>Phone:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ phone: text })}
                    autoCorrect={false}
                    placeholder="Enter Phone"
                    placeholderTextColor={BaseColor.grayColor}
                    value={this.state.phone}
                    selectionColor={BaseColor.primaryColor}
                  />
                </View>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ email: text })}
                    autoCorrect={false}
                    placeholder="Enter Email"
                    placeholderTextColor={BaseColor.grayColor}
                    value={this.state.email}
                    selectionColor={BaseColor.primaryColor}
                  />
                </View>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}>Pass:</Text>
                  <View style={{ width: '80%' }}>
                    <TextInput
                      style={[styles.input, { width: '100%' }]}
                      onChangeText={text => this.setState({ pass: text })}
                      autoCorrect={false}
                      placeholder="Update Password"
                      placeholderTextColor={BaseColor.grayColor}
                      value={this.state.pass}
                      selectionColor={BaseColor.primaryColor}
                      secureTextEntry={this.state.showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eye}
                      onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                    >
                      <Icon name="eye" size={20} color={BaseColor.blackColor} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}></Text>
                  <View style={{ width: '80%' }}>
                    <TextInput
                      style={[styles.input, { width: '100%' }]}
                      onChangeText={text => this.setState({ pass2: text })}
                      autoCorrect={false}
                      placeholder="Confirm Password"
                      placeholderTextColor={BaseColor.grayColor}
                      value={this.state.pass2}
                      selectionColor={BaseColor.primaryColor}
                      secureTextEntry={this.state.showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eye}
                      onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                    >
                      <Icon name="eye" size={20} color={BaseColor.blackColor} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contentItem}>
                  <Text style={styles.contentItemLabel}>City:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ city: text })}
                    autoCorrect={false}
                    placeholder="Enter City"
                    placeholderTextColor={BaseColor.grayColor}
                    value={this.state.city}
                    selectionColor={BaseColor.primaryColor}
                  />
                </View>
                <View style={styles.contentItem}>
                  <Text style={[styles.contentItemLabel, { width: '25%' }]}>
                    Country:
                  </Text>
                  <View style={styles.picker}>
                    <CountryPicker
                      placeholder={this.state.country}
                      withCountryNameButton={true}
                      withFilter={true}
                      visible={false}
                      onSelect={item => { this.setState({ country: item.name }) }}
                    />
                  </View>
                </View>
                <View style={styles.contentItem}>
                  <Text style={[styles.contentItemLabel, { width: '60%' }]}>
                    Years of Bonsai Experience:
                  </Text>
                  <View style={[styles.picker, { width: '40%' }]}>
                    <Picker
                      style={{ height: '100%' }}
                      selectedValue={this.state.years_of_bonsai_exp}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ years_of_bonsai_exp: itemValue })
                      }>
                      <Picker.Item label="Less than 6 months" value="0" />
                      <Picker.Item label="1 ~ 5 years" value="1" />
                      <Picker.Item label="More than 5 years" value="5" />
                    </Picker>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ height: 36, justifyContent: 'center' }}>
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
                    value={this.state.pushNotification == '1' ? true : false}
                    onValueChange={val => this.setState({ pushNotification: val ? '1' : '0' })}
                  />
                  <Text style={styles.infoText}>
                    Receive Push Notifications
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    value={this.state.receiveEmail == '1' ? true : false}
                    onValueChange={val => this.setState({ receiveEmail: val ? '1' : '0' })}
                  />
                  <Text style={styles.infoText}>
                    Receive Email from Bonsai Mundo
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Button
                    onPress={() => this.btn_update_profile()}
                    style={{ height: 40, marginTop: 30, marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      Update
                    </Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMyAccount);
