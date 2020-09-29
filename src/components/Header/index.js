import React, { Component } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Image, Icon } from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import { BaseColor, Images } from '@config';
import { Switch } from 'react-native-switch';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: props.switch,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle(this.props.barStyle, true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  onSwitch(newVal) {
    this.props.onPressSwitch(newVal);
    this.setState({ switch: newVal });
  }

  render() {
    return (
      <View style={styles.contain}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.contentLeft}
            onPress={this.props.onPressDrawer}>
            <Icon name="bars" size={32} color={BaseColor.primaryColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentCenter}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentRight}>
          {/* {this.state.signupFormVisible || this.state.confirmationVisible ? (
            <View style={{ width: 50 }}></View>
          ) : ( */}
          <Switch
            circleBorderWidth={0}
            innerCircleStyle={{ width: 20, height: 20 }}
            circleSize={25}
            onValueChange={newVal => this.onSwitch(newVal)}
            value={this.state.switch}
          />
          {/* )} */}
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  onPressDrawer: PropTypes.func,
  onPressSwitch: PropTypes.func,
  switch: PropTypes.bool,
};

Header.defaultProps = {
  onPressDrawer: () => {},
  onPressSwitch: () => {},
  switch: true,
};
