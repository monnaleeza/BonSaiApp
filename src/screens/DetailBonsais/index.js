import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Icon, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';

class DetailBonsais extends Component {
  constructor(props) {
    super(props);

    let items = Array.apply(null, Array(12)).map((v, i) => {
      return { id: i, title: 'Bonsai ' + i, image: Images.bonsaiThumb };
    });

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
      dataSource: items,
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
            <View style={styles.settingContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyAccount')}
                style={styles.settingLeft}>
                <Image source={Images.account} style={styles.settingIcon} />
                <Text style={{ fontSize: 12 }}>My Account</Text>
              </TouchableOpacity>
              <View style={styles.settingCenter}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>+</Text>
                <Text
                  style={{
                    fontSize: 26,
                    borderBottomWidth: 1,
                    borderColor: BaseColor.primaryColor,
                    textAlign: 'center',
                    marginHorizontal: 5,
                  }}>
                  Bonsais Title
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditBonsais')}>
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
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      width: '100%',
                      height: 80,
                      fontSize: 15,
                    }}>
                    {
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laborisUt enim ad minim veniam, nisi ut aliquip ex commodo Ut enim ad minim veniam.'
                    }
                  </Text>
                </View>
                <ImageBackground
                  source={Images.bonsaiLandscape}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    width: '100%',
                    height: Utils.scaleWithPixel(120),
                  }}>
                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={() => {}}>
                      <Icon name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                      <Icon name="arrow-right" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
                <FlatList
                  style={{ marginTop: 15 }}
                  data={this.state.dataSource}
                  horizontal={true}
                  ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({ highlighted }) => (
                      <View
                        style={[
                          styles.separator,
                          highlighted && { marginLeft: 0 },
                        ]}
                      />
                    ))
                  }
                  renderItem={({ item, index, separators }) => (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => {}}
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}
                      style={{ marginHorizontal: 5 }}>
                      <Image source={item.image} style={styles.thumbImage} />
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.bottomIconContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BonsaiCalendar')
                  }
                  style={{ alignItems: 'center' }}>
                  <Image
                    source={Images.calendar}
                    style={styles.bottomIcon}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 12 }}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('BonsaiDiary')}
                  style={{ alignItems: 'center' }}>
                  <Image
                    source={Images.diary}
                    style={styles.bottomIcon}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 12 }}>Diary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('BonsaiEvents')}
                  style={{ alignItems: 'center' }}>
                  <Image
                    source={Images.event}
                    style={styles.bottomIcon}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 12 }}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('GetHelp')}
                  style={{ alignItems: 'center' }}>
                  <Image
                    source={Images.help}
                    style={styles.bottomIcon}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 12 }}>Get Help</Text>
                </TouchableOpacity>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBonsais);
