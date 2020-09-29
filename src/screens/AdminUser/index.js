/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Button, Header, Icon } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';

class AdminMsg extends Component {
  constructor(props) {
    super(props);

    let items = Array.apply(null, Array(10)).map((v, i) => {
      return {
        id: i,
        firstname: 'Firstname',
        lastname: 'Lastname',
        since: '02/20/2020',
        detail:
          'User Name: This is the detail that appears when you tap a message summary.It displays the entire message. Note: There is no ability to remove or edit a message. They are permanent.',
      };
    });

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
      dataSource: items,
    };
  }
  renderUserItem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            height: 20,
            marginTop: 3,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flex: 3 }}
            onPress={() => {
              if (this.state.currentId === item.id) {
                this.setState({ currentId: -1 });
              } else {
                this.setState({ currentId: item.id });
              }
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#002A5D',
                fontSize: 13,
              }}>
              {item.firstname + ' ' + item.lastname}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'right',
              }}>
              {item.since}
            </Text>
          </View>
        </View>
      </View>
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
            <View style={[styles.settingContainer, { paddingHorizontal: 10 }]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AdminUser');
                }}
                style={styles.settingLeft}>
                <Image source={Images.account} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>Users</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    borderBottomWidth: 1,
                    borderColor: BaseColor.primaryColor,
                    textAlign: 'center',
                    marginHorizontal: 5,
                  }}>
                  Admin
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AdminMsg')}
                style={styles.settingRight}>
                <Image source={Images.helpAdmin} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>Help</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: BaseColor.primaryColor,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 16,
                }}>
                <Icon name="search" size={16} style={{ marginLeft: 10 }} />
                <TextInput
                  style={{ height: 30, padding: 0, paddingLeft: 10 }}
                  placeholder="Search"
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  marginTop: 3,
                  flexDirection: 'row',
                  paddingBottom: 4,
                  paddingRight: 5,
                  borderBottomWidth: 1,
                  borderColor: BaseColor.primaryColor,
                }}>
                <View style={{ flex: 4 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                    User Name
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Since
                  </Text>
                </View>
              </View>
              <FlatList
                style={{ width: '100%' }}
                data={this.state.dataSource}
                renderItem={this.renderUserItem}
                keyExtractor={item => item.id}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminMsg);
