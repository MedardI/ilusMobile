import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, scale, scaleFont, verticalScale } from '../utils';
import { TextInput } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReviewPage = (props) => {

    const data = props?.route?.params;
    const [review, setreview] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. ")


    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>

            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={"black"} hidden={false} translucent={false}
                />

                <Image source={data.param2} style={{ width: scale(360), height: verticalScale(400), opacity: 0.4 }} />
                <View style={{ position: 'absolute', top: verticalScale(40) }}>
                    <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />

                    <View style={{ marginLeft: scale(30), marginTop: verticalScale(20) }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(30), fontFamily: constants.OPENSANS_FONT_BOLD }}>{data.param1}</Text>
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, opacity: 0.6 }}>Add Your Review</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: scale(25), marginTop: verticalScale(20) }}>
                        <MaterialIcons name="star" color='rgba(255,255,255,0.3)' size={verticalScale(32)} />
                        <MaterialIcons name="star" color='rgba(255,255,255,0.3)' size={verticalScale(32)} />
                        <MaterialIcons name="star" color='rgba(255,255,255,0.3)' size={verticalScale(32)} />
                        <MaterialIcons name="star" color='rgba(255,255,255,0.3)' size={verticalScale(32)} />
                        <MaterialIcons name="star" color='rgba(255,255,255,0.3)' size={verticalScale(32)} />
                    </View>

                    <View style={{ marginTop: verticalScale(20), height: verticalScale(400), paddingHorizontal: scale(20), }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(20), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(20) }}>Let Us know your feedback</Text>
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.white}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Enter your review"
                            style={{ width: scale(320), alignSelf: 'center', color: colors.white }}
                            keyboardType='default'
                            multiline={true}
                            onChangeText={(text) => setreview(text)}
                            value={review}
                            maxLength={350}
                        />
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(44), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_BOLD }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ReviewPage;