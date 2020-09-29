import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Icon, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';

class EditBonsais extends Component {
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

  saveChange = () => {

  }

  renderUpload = () => {
    return (
      <ImageBackground
        source={Images.balloonMyBonsais}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '80%',
          height: 250,
          marginTop: 120,
          marginHorizontal: 'auto',
          position: 'absolute',
          top: 0,
          zIndex: 100,
        }}
        imageStyle={{ resizeMode: 'contain', width: '100%' }}>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 45,
          }}>
          <TouchableOpacity>
            <Icon name="camera" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
          <Text>Or</Text>
          <TouchableOpacity>
            <Icon name="desktop" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text>Image.jpg</Text>
          <Text>Image2.jpg</Text>
          <Text>Image3.jpg</Text>
          <Text>Image4.jpg</Text>
          <Text>Image5.jpg</Text>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <Icon name="upload" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
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
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>+</Text>
                <TextInput
                  style={{
                    fontSize: 26,
                    borderWidth: 1,
                    borderColor: BaseColor.primaryColor,
                    width: 120,
                    textAlign: 'center',
                    marginHorizontal: 5,
                  }}>
                  Title
                </TextInput>
                <TouchableOpacity
                  onPress={() => this.saveChange()}
                >
                  <Icon name="save" size={20} />
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
                  <TextInput
                    multiline
                    style={{
                      width: '100%',
                      height: 80,
                      borderWidth: 1,
                      textAlign: 'center',
                      textAlignVertical: 'top',
                    }}
                    value={this.state.description}
                    onChangeText={username =>
                      this.setState({ description: username })
                    }
                    placeholder={`Enter Bonsai's Description`}
                  />
                </View>
                {this.state.showUpload && this.renderUpload()}
                <ImageBackground
                  source={Images.bonsaiLandscape}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 10,
                    width: '100%',
                    height: Utils.scaleWithPixel(120),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ showUpload: !this.state.showUpload })}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                        marginTop: 10,
                      }}>
                      Upload Images
                    </Text>
                  </TouchableOpacity>
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
                      onPress={() => { }}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBonsais);