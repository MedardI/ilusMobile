import React from 'react';
import { View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TileLists = (props) => {
    const heading = props?.route?.params?.param1
    const data = props?.route?.params?.param2


    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.92)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading={heading} navigation={() => props.navigation.goBack()} showicon={true} />

            <FlatList
                data={data}
                numColumns={2}
                style={{ alignSelf: 'center', marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ marginHorizontal: scale(10), marginVertical: verticalScale(10) }} >
                            <Image source={item.url ? item.url : item.banner} style={{ height: verticalScale(120), width: scale(150), borderRadius: verticalScale(6), opacity: 0.6 }} />
                            <View style={{ position: 'absolute', bottom: verticalScale(0), width: scale(150), backgroundColor: 'rgba(0,0,0,0.8)', borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }}>
                                <Text style={{ marginLeft: scale(5), color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                    {item.name}</Text>
                                <View style={{ alignSelf: 'center', width: scale(140), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                        {item.duration}</Text>
                                    <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                        {item.year}</Text>
                                </View>


                            </View>
                        </TouchableOpacity>
                    )
                }}

            />

        </View>
    );
}

export default TileLists;