import React, { useState } from 'react';
import { TouchableOpacity, View, ImageBackground, Text, Keyboard, Image, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, fullWidth, scale, scaleFont, verticalScale } from '../utils';
import { TextInput } from 'react-native-paper';



const SocialSignIn = (props) => {


    const [phoneNumber, sethoneNumber] = useState();

    const Logo = require("../assets/images/LoginImage.jpeg")


    const handleTextChange = (text) => {
        sethoneNumber(text)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />

                <ImageBackground source={Logo} style={{ width: fullWidth, height: verticalScale(450), alignSelf: 'center', opacity: 0.4 }}>
                </ImageBackground>
                <View style={{ position: 'absolute', top: verticalScale(40) }}>
                    <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />


                    <Image source={require("../assets/images/John-Doe.jpeg")} style={{ height: verticalScale(100), width: verticalScale(100), borderRadius: verticalScale(50), alignSelf: 'center', marginTop: verticalScale(40) }} />

                    <View style={{ alignSelf: 'center', marginTop: verticalScale(30), width: scale(260) }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }}>Hey, Jonn Doe.</Text>
                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(20) }}>
                            You're Almost In
                        </Text>
                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, }}>
                            Kindly provide your phone number for Verification.
                        </Text>


                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Enter Your Number"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="number-pad"
                            onChangeText={(text) => handleTextChange(text)}
                            value={phoneNumber}
                            maxLength={10}
                        />

                        <TouchableOpacity onPress={() => props.navigation.navigate("OtpVerification", { param: phoneNumber })} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(14), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default SocialSignIn;