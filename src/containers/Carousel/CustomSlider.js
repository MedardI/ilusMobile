import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { colors, verticalScale, scale, scaleFont } from '../../utils';
import { useNavigation } from '@react-navigation/native';


const CustomSlider = (props) => {

  const navigation = useNavigation()


  const CarouselItem = ({ item, index }) => {

    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.bannerredirecturl, { param: item, ismovie: item.ismovie })} >
        <Image
          source={item.url}
          style={{
            width: scale(300),
            height: verticalScale(200),
            borderRadius: verticalScale(15)
          }}
        />
      </TouchableOpacity>
    );
  }


  const settings = {
    sliderWidth: scale(360),
    sliderHeight: verticalScale(130),
    itemWidth: scale(300),
    itemHeight: verticalScale(200),
    data: props.data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
  };
  return (
    <View style={{ marginTop: verticalScale(20), }}>
      <Carousel {...settings}
        autoplay={true}
        loop={true}
      />
    </View>
  );
}


export default CustomSlider