import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Header } from '@components';
import styles from './styles';
import { BaseStyle } from '@config';
import { Contents } from '@data';

class TermsOfUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      switch: true,
    };
  }

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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '500',
                  borderBottomWidth: 1,
                  borderColor: '#2A6101',
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                Terms of Use
              </Text>
            </View>
            <ScrollView style={{ marginTop: 20, marginBottom: 30 }}>
              <Text
                numberOfLines={100}
                style={{ fontSize: 16, paddingHorizontal: 5, lineHeight: 20 }}>
                {Contents.terms}
              </Text>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
