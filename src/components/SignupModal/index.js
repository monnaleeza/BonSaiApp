import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { Image, Text } from '@components';
import { Images } from '@config';

export default class SignupModal extends Component {
  render() {
    const { style, children, styleContent, visible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        style={[styles.container, style]}
        visible={visible}>
        <View style={styleContent}>{children}</View>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  visible: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

SignupModal.defaultProps = {
  visible: false,
  style: {},
  styleContent: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
};
