import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: { flexDirection: 'row', marginTop: 12 },
  contentLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  contentCenter: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  logo: {
    width: Utils.scaleWithPixel(120),
    height: Utils.scaleWithPixel(84),
  },
});
