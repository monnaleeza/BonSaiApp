import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { BaseColor, BaseStyle } from '@config';
import { Icon } from '@components';
import * as Utils from '@utils';

/* Bottom Screen */
import Home from '@screens/Home';
import MyAccount from '@screens/MyAccount';
import EditMyAccount from '@screens/EditMyAccount';
import MyBonsais from '@screens/MyBonsais';
import EditBonsais from '@screens/EditBonsais';
import DetailBonsais from '@screens/DetailBonsais';
import BonsaiCalendar from '@screens/BonsaiCalendar';
import BonsaiDiary from '@screens/BonsaiDiary';
import BonsaiEvents from '@screens/BonsaiEvents';
import GetHelp from '@screens/GetHelp';
import AboutUs from '@screens/AboutUs';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import TermsOfUse from '@screens/TermsOfUse';
import AdminSignIn from '@screens/AdminSignIn';
import AdminMsg from '@screens/AdminMsg';
import AdminUser from '@screens/AdminUser';
import Walkthrough from '@screens/Walkthrough';

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {
    Walkthrough: {
      screen: Walkthrough,
    },
    MyAccount: {
      screen: MyAccount,
    },
    EditMyAccount: {
      screen: EditMyAccount,
    },
    MyBonsais: {
      screen: MyBonsais,
    },
    EditBonsais: {
      screen: EditBonsais,
    },
    DetailBonsais: {
      screen: DetailBonsais,
    },
    BonsaiCalendar: {
      screen: BonsaiCalendar,
    },
    BonsaiDiary: {
      screen: BonsaiDiary,
    },
    BonsaiEvents: {
      screen: BonsaiEvents,
    },
    GetHelp: {
      screen: GetHelp,
    },
    AboutUs: {
      screen: AboutUs,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    TermsOfUse: {
      screen: TermsOfUse,
    },
    AdminSignIn: {
      screen: AdminSignIn,
    },
    AdminMsg: {
      screen: AdminMsg,
    },
    AdminUser: {
      screen: AdminUser,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Walkthrough',
  },
);

export default RootStack;
