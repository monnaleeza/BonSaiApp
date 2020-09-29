import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import { BaseColor } from '@config';

export default StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 15,
  },
  settingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  settingRight: {
    alignItems: 'center',
  },
  settingCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  settingLeft: {
    alignItems: 'center',
  },
  settingIcon: {
    width: Utils.scaleWithPixel(30),
    height: Utils.scaleWithPixel(30),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
  },
  copyright: {
    flex: 1,
    alignItems: 'center',
  },
});
