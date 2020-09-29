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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  copyright: {
    flex: 1,
    alignItems: 'center',
  },
});
