/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  Picker,
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

    let items = Array.apply(null, Array(5)).map((v, i) => {
      return {
        id: i,
        date: '02/20/2020',
        note: 'This is a message summary...',
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
  renderMsgItem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            height: 20,
            marginTop: 3,
            flexDirection: 'row',
          }}>
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 13 }}>{item.date}</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 5 }}
            onPress={() => {
              if (this.state.currentId === item.id)
                this.setState({ currentId: -1 });
              else this.setState({ currentId: item.id });
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#002A5D',
                fontSize: 13,
              }}>
              {item.note}
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.currentId === item.id && (
          <>
            <View>
              <Text style={{ fontSize: 13 }}>{item.date}</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 10,
                paddingBottom: 8,
                paddingHorizontal: 12,
                marginTop: 5,
                borderColor: '#2A6101',
              }}>
              <Text numberOfLines={4} style={{ fontSize: 13 }}>
                {item.detail}
              </Text>
              {this.state.showReply ? (
                <View>
                  <TextInput
                    placeholder="Admin Reply: Type Your response here."
                    style={{ height: 120, textAlignVertical: 'top' }}
                  />
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ currentId: -1, showReply: false })
                      }>
                      <Icon
                        name="telegram-plane"
                        size={30}
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ showReply: true })}>
                    <Icon name="reply" size={20} style={{ marginLeft: 10 }} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
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
                  borderColor: '#2A6101',
                }}>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Date</Text>
                </View>
                <View style={{ flex: 5 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                    Message
                  </Text>
                </View>
              </View>
              <FlatList
                style={{ width: '100%' }}
                data={this.state.dataSource}
                renderItem={this.renderMsgItem}
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
