import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Header, Icon } from '@components';
import styles from './styles';
import { BaseStyle, Images } from '@config';
import * as Utils from '@utils';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

class MyBonsais extends Component {
  constructor(props) {
    super(props);

    let items = Array.apply(null, Array(12)).map((v, i) => {
      return { id: i, title: 'Bonsai ' + i };
    });

    this.state = {
      uid: '',
      api_key: '',
      loading: false,
      scrollEnabled: true,
      switch: true,
      dataSource: items,
    };
  }

  componentDidMount() {
    this.setState({
      uid: this.props.auth.info.user_data.id,
      api_key: this.props.auth.info.user_data.api_key
    })
  }

  btn_goBonsaiDataByID = (id) => {
    // this.setState({ loading: true })

  }

  renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          this.btn_goBonsaiDataByID(item.id)
        }}>
        <View
          style={{
            backgroundColor: '#737373',
            width: Utils.getWidthDevice() / 5,
            height: Utils.getWidthDevice() / 5,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              // this.btn_addBonsaiDataById(item.id)
              // console.log('===selected item = ')
              this.props.navigation.navigate('EditBonsais')
            }}
            style={{ marginBottom: 5 }}>
            <Icon name="pencil-alt" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyAccount')}
                style={styles.settingLeft}>
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
                  My Bonsais +
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyBonsais')}
                style={styles.settingRight}>
                <Image source={Images.bonsai} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>My Bonsais</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, marginTop: 10, justifyContent: 'center' }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
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
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBonsais);
