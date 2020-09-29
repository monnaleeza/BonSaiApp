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
import { SafeAreaView, Text, Image, Button, Icon, Header } from '@components';
import styles from './styles';
import { BaseColor, BaseStyle, Images } from '@config';
import * as Utils from '@utils';

class BonsaiDiary extends Component {
  constructor(props) {
    super(props);

    let items = Array.apply(null, Array(5)).map((v, i) => {
      return {
        id: i,
        date: '02/20/2020',
        note: 'This is a note summary...',
        detail:
          'This is the detail that appears when you top a diary note summary. It displays the entire note. You also have the ability to edit or remove the note from this view.',
      };
    });

    this.state = {
      loading: false,
      scrollEnabled: true,
      switch: true,
      dataSource: items,
    };
  }

  calculateY = () => {
    if (this.state.currentId < 0) {
      return 0;
    }
    return 30 * (this.state.currentId + 1) + 100;
  };

  renderDiaryItem = ({ item }) => {
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
          <View
            style={{
              borderWidth: 1,
              paddingVertical: 10,
              paddingBottom: 8,
              paddingHorizontal: 12,
              marginVertical: 10,
              borderColor: BaseColor.primaryColor,
            }}>
            <Text numberOfLines={3} style={{ fontSize: 13 }}>
              {item.detail}
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Icon
                  name="pencil-alt"
                  size={20}
                  color={BaseColor.primaryColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => this.setState({ showDelete: true })}>
                <Icon name="times" size={20} color={BaseColor.primaryColor} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  renderSaveEntry = () => {
    return (
      <ImageBackground
        source={Images.balloonDiary2}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '110%',
          height: 250,
          marginTop: 10,
          position: 'absolute',
          right: 0,
          marginRight: -30,
          zIndex: 100,
        }}
        imageStyle={{ resizeMode: 'stretch', width: '100%' }}>
        <View
          style={{
            width: '90%',
            paddingHorizontal: 10,
            alignItems: 'center',
            marginTop: 60,
          }}>
          <Text
            numberOfLines={5}
            style={{
              height: 100,
              fontSize: 13,
              color: 'black',
            }}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
            }
          </Text>
          <Button
            style={{
              borderRadius: 0,
              paddingHorizontal: 30,
              height: 36,
              marginTop: 10,
              backgroundColor: BaseColor.primaryColor,
            }}
            onPress={() => this.setState({ showSave: false })}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 15,
              }}>
              Save Diary Entry
            </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  };

  renderDeleteEntry = () => {
    return (
      <ImageBackground
        source={Images.balloonDiary1}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '75%',
          height: 250,
          marginTop: 180,
          position: 'absolute',
          right: 0,
          marginRight: -36,
          zIndex: 100,
          translateY: this.calculateY(),
        }}
        imageStyle={{ resizeMode: 'stretch', width: '100%' }}>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 60,
          }}>
          <View style={{ width: 20 }}></View>
          <Icon name="trash" size={20} color={BaseColor.blackColor} />
          <TouchableOpacity>
            <Icon name="times-circle" size={20} color={BaseColor.blackColor} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '80%',
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
            style={{
              borderRadius: 0,
              paddingHorizontal: 30,
              height: 36,
              marginTop: 10,
              backgroundColor: BaseColor.primaryColor,
            }}
            onPress={() => this.setState({ showDelete: false })}>
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

            <View
              style={{
                flex: 1,
                marginTop: 30,
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
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Date</Text>
                </View>
                <View style={{ flex: 5, marginLeft: 10 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Note</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({ showSave: true })}>
                  <Icon name="plus" size={20} color={BaseColor.primaryColor} />
                </TouchableOpacity>
              </View>
              {this.state.showSave && this.renderSaveEntry()}
              <FlatList
                style={{ width: '100%' }}
                data={this.state.dataSource}
                renderItem={this.renderDiaryItem}
                keyExtractor={item => item.id}
              />
            </View>
            {this.state.showDelete && this.renderDeleteEntry()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BonsaiDiary);
