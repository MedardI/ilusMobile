import React, { useState, useEffect, useRef, createRef } from 'react';
import { Animated, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Button, FlatList, Image, ScrollView } from 'react-native';
import { colors, scaleFont, scale, verticalScale, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { moviesdata, seriesdata } from '../utils/Data';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";





const WishList = (props) => {

    const [moviesTab, setmoviesTab] = useState(true);
    const [seriesTab, setseriesTab] = useState(false);
    const [animationTab, setanimationTab] = useState(false);
    const [onswipe, setonswipe] = useState(false)
    const swipeableRef = useRef();

    // const [leftbackground, setleftbackground] = useState(true)




    useEffect(() => {

    }, []
    );

    const deleteitem = (item) => {
        item.close()
        showMessage({
            backgroundColor: colors.primary_red,
            message: "File" + " Deleted",
            type: "info",
        })
    };

    const downloaditem = (item) => {
        item.close()
        showMessage({
            backgroundColor: colors.green,
            message: "Download Started ",
            type: "info",
        })

    };



    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />

            <Text
                style={{
                    color: colors.white,
                    fontSize: scaleFont(22),
                    letterSpacing: 0.5,
                    height: verticalScale(48),
                    textAlignVertical: 'center',
                    marginLeft: scale(20),
                    fontFamily: constants.OPENSANS_FONT_SEMI_BOLD
                }}
            >Favoris</Text>


            <FlashMessage position={'bottom'} />


            <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                <TouchableOpacity onPress={() => { setmoviesTab(true), setseriesTab(false), setanimationTab(false) }} style={{ marginLeft: scale(20) }}>
                    <Text style={{ color: moviesTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Films</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(true), setanimationTab(false) }} style={{ marginLeft: scale(10) }}>
                    <Text style={{ color: seriesTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Séries</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(false), setanimationTab(true) }} style={{ marginLeft: scale(10) }}>
                    <Text style={{ color: animationTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Jeunesse</Text>
                </TouchableOpacity>
            </View>
            {/* #282C35  */}
            {/* #36454f */}

            {
                moviesTab && (
                    <View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={moviesdata}
                            renderItem={({ item, index }) => {
                                return (
                                    <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                                        <Swipeable
                                            ref={ref => item = ref}
                                            renderLeftActions={() => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        deleteitem(item)


                                                    }}
                                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(90), height: verticalScale(110), borderRadius: verticalScale(12), }}>
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
                                            renderRightActions={() => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        downloaditem(item)
                                                    }}
                                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.green, width: scale(90), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                downloaditem(item)
                                                            }
                                                            }
                                                            style={{ color: colors.white }}>
                                                            <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Download</Text>
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
                )
            }

            {seriesTab &&
                (<View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={seriesdata}
                        renderItem={({ item }) => {
                            return (
                                <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                                    <Swipeable
                                        ref={ref => item = ref}
                                        renderLeftActions={() => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    deleteitem(item)
                                                }}
                                                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(80), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            deleteitem(item)
                                                        }
                                                        }
                                                        style={{ color: colors.white }}>
                                                        <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Download</Text>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        renderRightActions={() => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    downloaditem(item)
                                                }}
                                                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.green, width: scale(90), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            downloaditem(item)
                                                        }
                                                        }
                                                        style={{ color: colors.white }}>
                                                        <Text style={{ color: colors.white, marginLeft: scale(0), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Download</Text>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    >
                                        <View style={{ width: scale(340), backgroundColor: "#36454f", flexDirection: 'row', borderRadius: verticalScale(12) }}>
                                            <View style={{ borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }}>
                                                <Image source={item.banner} style={{ width: scale(90), height: verticalScale(110), borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }} />
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
                </View>)}

            {animationTab &&
            (<View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={seriesdata}
                    renderItem={({ item }) => {
                        return (
                            <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                                <Swipeable
                                    ref={ref => item = ref}
                                    renderLeftActions={() => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                deleteitem(item)
                                            }}
                                                              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(80), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteitem(item)
                                                    }
                                                    }
                                                    style={{ color: colors.white }}>
                                                    <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Download</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    renderRightActions={() => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                downloaditem(item)
                                            }}
                                                              style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.green, width: scale(90), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        downloaditem(item)
                                                    }
                                                    }
                                                    style={{ color: colors.white }}>
                                                    <Text style={{ color: colors.white, marginLeft: scale(0), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Download</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }}
                                >
                                    <View style={{ width: scale(340), backgroundColor: "#36454f", flexDirection: 'row', borderRadius: verticalScale(12) }}>
                                        <View style={{ borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }}>
                                            <Image source={item.banner} style={{ width: scale(90), height: verticalScale(110), borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }} />
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
            </View>)}
        </View>
    );
}

export default WishList;
