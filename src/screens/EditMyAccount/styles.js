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
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  contentItemLabel: {
    fontSize: 15,
    width: '20%',
  },
  infoText: {
    fontSize: 15,
  },
  eye: { position: 'absolute', right: 10, top: 7 },
  input: {
    height: 30,
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: '#2A6101',
    paddingHorizontal: 10,
    paddingVertical: 0,
    width: '80%',
    marginVertical: 3,
  },
  picker: {
    height: 30,
    borderWidth: 1,
    borderColor: '#2A6101',
    paddingVertical: 0,
    width: '75%',
    marginVertical: 3,
    paddingLeft: 10,
    justifyContent:'center'
  },
  copyright: {
    flex: 1,
    alignItems: 'center',
  },
});
