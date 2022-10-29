import React, { useState, useEffect } from 'react';
import { Animated, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Keyboard, Image, ScrollView, TextInput } from 'react-native';
import { colors, scaleFont, scale, verticalScale, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moviesdata, genredata, recentsearches, popularsearches, seriesdata } from '../utils/Data';

const Search = (props) => {



    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>

                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />

                <Text
                    style={{
                        color: colors.white,
                        fontSize: scaleFont(22),
                        letterSpacing: 0.5,
                        textAlignVertical: 'center',
                        marginLeft: scale(20),
                        fontFamily: constants.OPENSANS_FONT_SEMI_BOLD,
                        marginTop: verticalScale(10),
                    }}
                >
                    What'd you like</Text>


                <Text
                    style={{
                        color: colors.white,
                        fontSize: scaleFont(22),
                        letterSpacing: 0.5,
                        textAlignVertical: 'center',
                        marginLeft: scale(20),
                        fontFamily: constants.OPENSANS_FONT_SEMI_BOLD,
                    }}
                >to watch today? </Text>
                <ScrollView overScrollMode="never">


                    <View style={{ flexDirection: "row", marginHorizontal: scale(20), marginTop: verticalScale(20), borderRadius: verticalScale(6), backgroundColor: colors.black }}>
                        <TouchableOpacity activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: scale(40), }}>
                            <MaterialIcons name='search' color={colors.green} size={verticalScale(28)} />
                        </TouchableOpacity>
                        <TextInput
                            style={{ flex: 1, marginRight: scale(5), color: colors.white }}
                            placeholder="Search Movies, Tv Series, Genre & More..."
                            placeholderTextColor={colors.greyColour}
                        />
                    </View>

                    <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>

                        <FlatList
                            style={{}}
                            data={popularsearches}
                            numColumns={3}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10), marginHorizontal: scale(5), marginVertical: verticalScale(5) }}>
                                        <Text style={{ color: colors.white, fontSize: scaleFont(13), opacity: 0.9, fontFamily: constants.OPENSANS_FONT_BOLD }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}


                        />
                        {/* 
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>ANIMATED</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>BOLLYWOOD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>COMEDY REVIEW</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', marginTop: verticalScale(10) }}>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>COMEDIES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>AWARD WINNING</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>FANTASY</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: verticalScale(10) }}>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>CHILDREN & FAMILY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>INTERNATIONAL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#303030', justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), height: verticalScale(30), paddingHorizontal: scale(10) }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(12), opacity: 0.6, fontFamily:constants.OPENSANS_FONT_BOLD}}>ANIME</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>

                    <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                    fontSize: scaleFont(13),
                                    opacity: 0.7,
                                    marginTop: verticalScale(4)
                                }}
                            >RECENTLY SEARCHED </Text>

                            <TouchableOpacity activeOpacity={0.6}>
                                <Text
                                    style={{
                                        marginTop: verticalScale(10),
                                        color: colors.primary_red,
                                        fontFamily: constants.OPENSANS_FONT_BOLD,
                                        fontSize: scaleFont(12),
                                        letterSpacing: 0.7,
                                    }}
                                >CLEAR ALL</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            style={{ marginVertical: verticalScale(10) }}
                            data={recentsearches}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ flexDirection: 'row', marginVertical: verticalScale(5), alignItems: 'center', }}>
                                        <MaterialIcons name="youtube-searched-for" color={colors.primary_red} size={verticalScale(20)} />
                                        <Text style={{ color: colors.white, marginLeft: scale(10), textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
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
                            style={{ marginTop: verticalScale(10), }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={genredata}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.title, param2: moviesdata })} activeOpacity={0.6} style={{ backgroundColor: item.color, marginHorizontal: scale(4), borderRadius: verticalScale(6), justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(7), paddingVertical: scale(7) }} >
                                        <Text style={{ color: colors.white, textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_BOLD, opacity: 0.8 }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}

                        />


                    </View>

                    <View style={{ marginTop: verticalScale(10), marginHorizontal: scale(18) }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                    fontSize: scaleFont(13),
                                    opacity: 0.7,
                                    marginTop: verticalScale(4)
                                }}
                            >MOVIES YOU MAY LIKE</Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Movies You May Like", param2: moviesdata })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                            </TouchableOpacity>
                        </View>


                        <FlatList
                            style={{ marginTop: verticalScale(10), }}
                            data={moviesdata}
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


                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    fontFamily: constants.OPENSANS_FONT_BOLD,
                                    fontSize: scaleFont(13),
                                    letterSpacing: 0.7,
                                    opacity: 0.7,
                                    marginTop: verticalScale(4)
                                }}
                            >SERIES YOU MAY LIKE</Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Movies You May Like", param2: seriesdata })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                            </TouchableOpacity>
                        </View>


                        <FlatList
                            style={{ marginTop: verticalScale(10), marginBottom: verticalScale(40), }}
                            data={seriesdata}
                            horizontal
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ marginHorizontal: scale(6) }} >
                                        <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>




                </ScrollView>

            </TouchableOpacity>
        </View>
    );
}

export default Search;