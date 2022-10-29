import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { colors, scale, scaleFont, verticalScale, constants } from '../utils';
import CustomSlider from '../containers/Carousel/CustomSlider'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { carouseldataMovie, continuemovies, genredata, moviesdata, carouseldataSeries, continueseries, MoviesData, SeriesData } from '../utils/Data';

const Dashboard = (props) => {
    const [moviesTab, setmoviesTab] = useState(true);
    const [seriesTab, setseriesTab] = useState(false);
    const [animationTab, setanimationTab] = useState(false);



    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(15), alignItems: 'center', height: verticalScale(50), }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { setmoviesTab(true), setseriesTab(false), setanimationTab(false) }} style={{ marginLeft: scale(0), alignItems: 'center', }}>
                        <Text style={{ color: moviesTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, textAlignVertical: 'center' }} >Films</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(true), setanimationTab(false) }} style={{ marginLeft: scale(20) }}>
                        <Text style={{ color: seriesTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }} >Séries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(false), setanimationTab(true) }} style={{ marginLeft: scale(20) }}>
                        <Text style={{ color: animationTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }} >Jeunesse</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {moviesTab && (
                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                    <View>
                        <CustomSlider data={carouseldataMovie} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                        <Text
                            style={{
                                color: colors.white,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                fontSize: scaleFont(13),
                                opacity: 0.7,
                                marginTop: verticalScale(4)
                            }}
                        >CONTINUE WATCHING</Text>

                        <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continue Watching", param2: continuemovies })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                            <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={continuemovies}
                        horizontal
                        style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                    <Image source={item.url} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                    <View style={{ width: item.playduration, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                        <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                    </TouchableOpacity>
                                    <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                            {item.genre}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(15), marginHorizontal: scale(20) }}>
                        <Text
                            style={{
                                color: colors.white,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                fontSize: scaleFont(13),
                                opacity: 0.7,
                                marginTop: verticalScale(4)
                            }}
                        >EXPLORE BY GENRES </Text>

                    </View>

                    <FlatList
                        style={{ marginTop: verticalScale(10), marginHorizontal: scale(15) }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={genredata}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.title, param2: moviesdata })} activeOpacity={0.6} style={{ backgroundColor: item.color, marginHorizontal: scale(4), borderRadius: verticalScale(6), justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(7), paddingVertical: scale(7) }} >
                                    <Text style={{ color: colors.white, textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, opacity: 0.9 }}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}

                    />


                    <FlatList
                        data={MoviesData}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                        <Text
                                            style={{
                                                color: colors.white,
                                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                fontSize: scaleFont(13),
                                                opacity: 0.7,
                                                marginTop: verticalScale(4)
                                            }}
                                        >{item.title}</Text>

                                        <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.title, param2: item.data })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                            <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>


                                    <FlatList
                                        style={{ marginTop: verticalScale(10), }}
                                        data={item.data}
                                        horizontal
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                                    <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            )
                        }}
                    />



                </ScrollView>
            )}



            {
                seriesTab && (
                    <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                        <View>
                            <CustomSlider data={carouseldataSeries} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                    fontSize: scaleFont(13),
                                    opacity: 0.7,
                                    marginTop: verticalScale(4)
                                }}
                            >CONTINUE WATCHING</Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continue Watching", param2: continueseries })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                            </TouchableOpacity>

                        </View>

                        <FlatList
                            data={continueseries}
                            horizontal
                            style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ marginHorizontal: scale(6) }} >
                                        <Image source={item.url} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                        <View style={{ width: item.playduration, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                                {item.genre}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <FlatList
                            data={SeriesData}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >{item.title}</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.title, param2: item.data })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>


                                        <FlatList
                                            style={{ marginTop: verticalScale(10), }}
                                            data={item.data}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />




                    </ScrollView>
                )
            }

            {
                animationTab && (
                    <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                        <View>
                            <CustomSlider data={carouseldataSeries} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                    fontSize: scaleFont(13),
                                    opacity: 0.7,
                                    marginTop: verticalScale(4)
                                }}
                            >CONTINUE WATCHING</Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continue Watching", param2: continueseries })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                            </TouchableOpacity>

                        </View>

                        <FlatList
                            data={continueseries}
                            horizontal
                            style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ marginHorizontal: scale(6) }} >
                                        <Image source={item.url} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                        <View style={{ width: item.playduration, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                                {item.genre}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <FlatList
                            data={SeriesData}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >{item.title}</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.title, param2: item.data })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>


                                        <FlatList
                                            style={{ marginTop: verticalScale(10), }}
                                            data={item.data}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />




                    </ScrollView>
                )
            }

        </View>
    );
}

export default Dashboard;
