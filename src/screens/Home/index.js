import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import * as Utils from '@utils';
import styles from './styles';

// Load sample data
import { PromotionData, TourData, HotelData } from '@data';

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      icons: [
        {
          icon: 'calendar-alt',
          name: 'Hotel',
          route: 'Hotel',
        },
        {
          icon: 'map-marker-alt',
          name: 'Tour',
          route: 'Tour',
        },
        {
          icon: 'car-alt',
          name: 'Car',
          route: 'OverViewCar',
        },
        {
          icon: 'plane',
          name: 'Flight',
          route: 'FlightSearch',
        },
        {
          icon: 'ship',
          name: 'Cruise',
          route: 'CruiseSearch',
        },
        {
          icon: 'bus',
          name: 'Bus',
          route: 'BusSearch',
        },
        {
          icon: 'star',
          name: 'Event',
          route: 'DashboardEvent',
        },
        {
          icon: 'ellipsis-h',
          name: 'More',
          route: 'More',
        },
      ],
      relate: [
        {
          id: '0',
          image: Images.event4,
          title: 'BBC Music Introducing',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.event5,
          title: 'Bearded Theory Spring Gathering',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
      ],
      promotion: PromotionData,
      tours: TourData,
      hotels: HotelData.splice(0, 4),
      heightHeader: Utils.heightHeader(),
    };
    this._deltaY = new Animated.Value(0);
  }

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  renderIconService() {
    const { navigation } = this.props;
    const { icons } = this.state;

    return (
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <View style={styles.iconContent}>
                <Icon
                  name={item.icon}
                  size={18}
                  color={BaseColor.primaryColor}
                  solid
                />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { promotion, tours, hotels, relate, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
          <EventCard
            image={Images.event4}
            title={'item.title'}
            time={'item.time'}
            location={'item.location'}
            onPress={() => navigation.navigate('EventDetail')}
            style={{ marginLeft: 20 }}
          />
        </View>
      </View>
    );
  }
}
