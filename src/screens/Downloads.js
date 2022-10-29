import React, { useState, useEffect, useRef, createRef } from 'react';
import { Animated, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Button, FlatList, Image, ScrollView } from 'react-native';
import { colors, scaleFont, scale, verticalScale, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { downloads, moviesdata, seriesdata } from '../utils/Data';

import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import AppHeader from '../components/AppHeader';



const Downloads = (props) => {

    const deleteitem = (item) => {
        item.close()
        showMessage({
            backgroundColor: colors.primary_red,
            message: "File has been removed from downloads",
            type: "info",
        })
    }





    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <FlashMessage position={'bottom'} />

            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Téléchargements" navigation={() => props.navigation.goBack()} showicon={true} />

            <View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={downloads}
                    renderItem={({ item, index }) => {
                        return (
                            <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                                <Swipeable
                                    ref={ref => item = ref}
                                    renderRightActions={() => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                deleteitem(item)


                                            }}
                                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(80), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteitem(item, item.name)
                                                    }
                                                    }
                                                    style={{ color: colors.white }}>
                                                    <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Delete</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }}

                                >
                                    <View style={{ width: scale(340), backgroundColor: "#36454f", flexDirection: 'row', borderRadius: verticalScale(12) }}>
                                        <View style={{ borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }}>
                                            <Image source={item.banner} style={{ width: scale(100), height: verticalScale(110), borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }} />
                                        </View>
                                        <View style={{ justifyContent: 'space-between' }}>
                                            <View style={{ marginLeft: scale(10) }}>
                                                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(5) }}>
                                                    {item.name}
                                                </Text>
                                                <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                    {item.genre}
                                                </Text>
                                                <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                    {item.language}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginLeft: scale(10), marginBottom: verticalScale(5) }}>
                                                <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, }}>
                                                    {item.duration}
                                                </Text>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(10) }}>
                                                    <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />
                                                </View>
                                                <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(6) }}>
                                                    {item.size}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Swipeable>
                            </GestureHandlerRootView>
                        )
                    }}
                />

            </View>

        </View>
    );
}

export default Downloads;
