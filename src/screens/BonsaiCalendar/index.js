import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  Picker,
  ImageBackground,
  TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { SafeAreaView, Text, Image, Icon, Button, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Dropdown } from 'react-native-material-dropdown';

class BonsaiCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
    };

    LocaleConfig.locales['en'] = {
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      today: 'today',
    };
    LocaleConfig.defaultLocale = 'en';
  }

  renderAddEdit = () => {
    return (
      <ImageBackground
        source={Images.balloonCalender1}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '85%',
          height: 320,
          marginTop: 120,
          marginHorizontal: 'auto',
          position: 'absolute',
          top: 0,
          zIndex: 100,
        }}
        imageStyle={{ resizeMode: 'stretch', width: '100%' }}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-around',
            marginTop: 65,
            paddingLeft: 40,
          }}>
          <Text>Add, Edit or </Text>
          <TouchableOpacity>
            <Icon name="trash" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '85%',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <View style={styles.picker}>
            <Dropdown
              placeholder="Time"
              fontSize={14}
              labelFontSize={12}
              data={[{ value: '1' }, { value: '1' }, { value: '1' }]}
              labelHeight={0}
              containerStyle={styles.dropdownContainer}
              labelTextStyle={{ marginLeft: 5 }}
              value={this.state.time}
              onChangeText={value => {
                this.setState({ time: value });
              }}
              rippleInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
              inputContainerStyle={styles.dropdownInput}
            />
          </View>
          <View style={styles.picker}>
            <Dropdown
              placeholder="Choose Action or Event Below"
              fontSize={14}
              labelFontSize={12}
              data={[{ value: '1' }, { value: '1' }, { value: '1' }]}
              labelHeight={0}
              containerStyle={styles.dropdownContainer}
              labelTextStyle={{ marginLeft: 5 }}
              value={this.state.time}
              onChangeText={value => {
                this.setState({ time: value });
              }}
              rippleInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
              inputContainerStyle={styles.dropdownInput}
            />
          </View>
          <View style={{ width: '85%', marginTop: 5 }}>
            <TextInput
              multiline
              style={{
                width: '100%',
                height: 50,
                borderWidth: 1,
                borderColor: BaseColor.primaryColor,
                textAlignVertical: 'top',
                paddingTop: 2,
                paddingLeft: 10,
              }}
              value={this.state.action}
              onChangeText={val => this.setState({ action: val })}
              placeholder={`Enter Action`}
            />
          </View>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Button
            onPress={() => this.setState({ showEdit: false })}
            style={{
              borderRadius: 0,
              paddingHorizontal: 30,
              height: 36,
              marginTop: 10,
              backgroundColor: BaseColor.primaryColor,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 15,
              }}>
              Save
            </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  };

  renderRemove = () => {
    return (
      <ImageBackground
        source={Images.balloonCalender2}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '85%',
          height: 250,
          marginTop: 120,
          marginHorizontal: 'auto',
          position: 'absolute',
          top: 0,
          zIndex: 100,
        }}
        imageStyle={{ resizeMode: 'stretch', width: '100%' }}>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 55,
          }}>
          <View style={{ width: 20 }}></View>
          <Icon name="trash" size={20} color={BaseColor.blackColor} />
          <TouchableOpacity>
            <Icon name="times-circle" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 15,
            }}>{`Are you sure you want to delete this item?\nThis action cannot be undone!`}</Text>
        </View>
        <View
          style={{
            width: '70%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Button
            onPress={() => this.setState({ showDelete: false })}
            style={{
              borderRadius: 0,
              paddingHorizontal: 30,
              height: 36,
              marginTop: 10,
              backgroundColor: BaseColor.primaryColor,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 15,
              }}>
              Confirm
            </Text>
          </Button>
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
                <TouchableOpacity>
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

            <View style={styles.bottomIconContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BonsaiCalendar')}
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

            <View style={{ marginTop: 30, alignItems: 'center' }}>
              {this.state.showEdit && this.renderAddEdit()}
              {this.state.showDelete && this.renderRemove()}
              <Calendar
                style={{ width: '100%' }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={direction => (
                  <Icon name={'caret-' + direction} size={38} color="white" />
                )}
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                theme={{
                  textSectionTitleColor: 'black',
                  todayTextColor: 'white',
                  todayBackgroundColor: BaseColor.primaryColor,
                  dayTextColor: 'black',
                  monthTextColor: 'white',
                  textDayFontWeight: 'bold',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: 'bold',
                  textDayFontSize: 15,
                  textMonthFontSize: 24,
                  textDayHeaderFontSize: 15,
                  'stylesheet.calendar.header': {
                    header: {
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: 10,
                      paddingRight: 10,
                      alignItems: 'center',
                      backgroundColor: 'black',
                    },
                  },
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(BonsaiCalendar);
