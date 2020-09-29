import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import { BaseColor } from '@config';

export default StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 15,
  },
  introContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  introText: {
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 30,
    marginTop: 5,
  },
  cardContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: '#D4D4D4',
    marginTop: 10,
  },
  cardTextContainer: {
    marginBottom: 10,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 60,
  },
  cardImage: {
    height: Utils.scaleWithPixel(120),
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  icon: {
    width: Utils.scaleWithPixel(40),
    height: Utils.scaleWithPixel(40),
  },
  copyright: {
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    width: '112%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
    zIndex: 100,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 15,
  },
  modalInput: {
    height: 30,
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: '#2A6101',
    padding: 10,
    width: '80%',
    marginHorizontal: 25,
    marginVertical: 3,
    paddingVertical: 0,
    justifyContent: 'center',
  },
});
