import React, { useState } from 'react';
import { TouchableOpacity, View, ImageBackground, Text, Keyboard, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, fullWidth, scale, scaleFont, verticalScale, constants } from '../utils';
import { TextInput } from 'react-native-paper';



const OtpVerification = (props) => {

    const [code, setcode] = useState()
    const Logo = require("../assets/images/LoginImage.jpeg")

    const handlecodeChange = (text) => {
        setcode(text)
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
                    <AppHeader heading="Otp Verification" navigation={() => props.navigation.goBack()} showicon={true} />

                    <View style={{ alignSelf: 'center', marginTop: verticalScale(30), width: scale(260) }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }}>Almost Logged In !</Text>
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(10) }}>
                            Enter the 6 Digit verfication code send to you at {props.route.params.param}.
                        </Text>


                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Enter Verification Code "
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', marginTop: verticalScale(20), backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="number-pad"
                            onChangeText={(text) => handlecodeChange(text)}
                            value={code}
                            maxLength={6}
                        />

                        <TouchableOpacity onPress={() => props.navigation.navigate("BottomTab")} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(14), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default OtpVerification;