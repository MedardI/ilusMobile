import React from 'react';
import { TouchableOpacity, View } from "react-native";
import Image from "../../components/Image";
import Carousel from "react-native-snap-carousel";
import { verticalScale, scale } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import Env from "../../env";

const CustomSlider = (props) => {

  const navigation = useNavigation();


  const getBackDropURL = (image) => {
      return `${Env.cloudFront}/backdrops/${image}`;
  };

  const CarouselItem = ({ item, index }) => {

    return (
      <TouchableOpacity onPress={() => navigation.navigate("PlayerScreen", { param: item })} >
        <Image
          source={{
              uri: getBackDropURL(item.backdrop)
          }}
          style={{
            width: scale(300),
            height: verticalScale(200),
            borderRadius: verticalScale(15)
          }}
        />
      </TouchableOpacity>
    );
  };


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
