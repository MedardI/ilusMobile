import React, { useState, useEffect } from 'react';
import { Animated, View, Text, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, ScrollView, LayoutAnimation, Platform, UIManager, FlatList } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, fullWidth, scale, scaleFont, verticalScale } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";



const Settings = (props) => {

    const [expanded1, setexpanded1] = useState(false)
    const [expanded2, setexpanded2] = useState(false)
    const [expanded3, setexpanded3] = useState(false)
    const [lang, setlang] = useState("English (USA)")
    const [download, setdownload] = useState("Wifi Only")
    const [quality, setquality] = useState("HD 720p")
    const [language, setlanguage] = useState([
        "Hindi", "English (USA)"
    ])
    const [downloads, setdownloads] = useState([
        "Wifi Only", "Mobile Data & Wifi"
    ])
    const [downloadquality, setdownloadquality] = useState([
        "Full HD 1080p", "HD 720p", "SD 480p"
    ])

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand1 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded1(!expanded1)
    }

    const toggleExpand2 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded2(!expanded2)
    }

    const toggleExpand3 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded3(!expanded3)
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />

            <AppHeader heading="Settings" navigation={() => props.navigation.goBack()} showicon={true} />

            <View style={{ width: scale(340), alignSelf: 'center', backgroundColor: colors.black, paddingVertical: verticalScale(10), paddingHorizontal: scale(10), borderRadius: verticalScale(6) }}>

                <Text style={{ fontSize: scaleFont(12), color: colors.greyColour, fontFamily: constants.OPENSANS_FONT_BOLD }}>Preferred App Language</Text>
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', height: verticalScale(40), justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.black, paddingEnd: scale(20) }} onPress={() => toggleExpand1()}>
                    <Text style={{ fontSize: scaleFont(14), color: colors.white, }}>{lang}</Text>
                    <FontAwesome name={expanded1 ? 'angle-up' : 'angle-down'} size={verticalScale(24)} color={colors.white} />
                </TouchableOpacity>

                {
                    expanded1 ? (<Animated.View style={{ backgroundColor: colors.black, height: verticalScale(70) }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={language}
                            renderItem={({ item }) => <TouchableOpacity activeOpacity={0.5} onPress={() => { setlang(item), toggleExpand1() }} style={{ height: verticalScale(35), flexDirection: 'row', }}>
                                <Text style={{
                                    fontSize: scaleFont(14),
                                    color: colors.white,
                                }}>{item}</Text>
                            </TouchableOpacity>
                            }
                        />
                    </Animated.View>) : null

                }



                <Text style={{ fontSize: scaleFont(12), color: colors.greyColour, fontFamily: constants.OPENSANS_FONT_BOLD }}>Download</Text>
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', height: verticalScale(40), justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.black, paddingEnd: scale(20) }} onPress={() => toggleExpand2()}>
                    <Text style={{ fontSize: scaleFont(14), color: colors.white, }}>{download}</Text>
                    <FontAwesome name={expanded2 ? 'angle-up' : 'angle-down'} size={verticalScale(24)} color={colors.white} />
                </TouchableOpacity>
                {
                    expanded2 ? (<Animated.View style={{ backgroundColor: colors.black, height: verticalScale(70) }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={downloads}
                            renderItem={({ item }) => <TouchableOpacity activeOpacity={0.5} onPress={() => { setdownload(item), toggleExpand2() }} style={{ height: verticalScale(35), flexDirection: 'row', }}>
                                <Text style={{
                                    fontSize: scaleFont(14),
                                    color: colors.white,
                                }}>{item}</Text>
                            </TouchableOpacity>
                            }
                        />
                    </Animated.View>) : null

                }



                <Text style={{ fontSize: scaleFont(12), color: colors.greyColour, fontFamily: constants.OPENSANS_FONT_BOLD }}>Download Video Quality</Text>
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', height: verticalScale(40), justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.black, paddingEnd: scale(20) }} onPress={() => toggleExpand3()}>
                    <Text style={{ fontSize: scaleFont(14), color: colors.white, }}>{quality}</Text>
                    <FontAwesome name={expanded3 ? 'angle-up' : 'angle-down'} size={verticalScale(24)} color={colors.white} />
                </TouchableOpacity>
                {
                    expanded3 ? (<Animated.View style={{ backgroundColor: colors.black, height: verticalScale(100) }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={downloadquality}
                            renderItem={({ item }) => <TouchableOpacity activeOpacity={0.5} onPress={() => { setquality(item), toggleExpand3() }} style={{ height: verticalScale(35), flexDirection: 'row', }}>
                                <Text style={{
                                    fontSize: scaleFont(14),
                                    color: colors.white,
                                }}>{item}</Text>
                            </TouchableOpacity>
                            }
                        />
                    </Animated.View>) : null

                }



            </View>


        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({


});