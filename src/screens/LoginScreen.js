import React, { useState, } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, ScrollView } from 'react-native';
import { colors, constants, fullWidth, scale, scaleFont, verticalScale } from '../utils';
import { TextInput } from 'react-native-paper';


const LoginScreen = (props) => {

    const [phoneNumber, sethoneNumber] = useState('');
    const [password, setpassword] = useState('');

    const Logo = require("../assets/images/LoginImage.jpeg");


    const handlePhoneChange = (text) => {
        sethoneNumber(text);
    };

    const handlePasswordChange = (text) => {
        setpassword(text);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>

                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />
                <ImageBackground source={Logo} style={{ width: fullWidth, height: verticalScale(300), alignSelf: 'center', opacity: 0.5 }}>
                </ImageBackground>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Votre numéro de téléphone"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white, fontFamily: constants.OPENSANS_FONT_MEDIUM }}
                            keyboardType="number-pad"
                            onChangeText={(text) => handlePhoneChange(text)}
                            value={phoneNumber}
                            maxLength={10}
                        />
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Votre mot de passe"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handlePasswordChange(text)}
                            value={password}
                            minLength={8}
                            maxLength={15}
                        />

                        <TouchableOpacity onPress={() => props.navigation.navigate("BottomTab", { param: phoneNumber })} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(24), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'identifier</Text>
                        </TouchableOpacity>

                        <Text style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: colors.white,
                            fontSize: scaleFont(12),
                            marginTop: verticalScale(24),
                            paddingLeft: 25,
                            paddingRight: 25,
                            fontFamily: constants.OPENSANS_FONT_MEDIUM }}>Vous n'avez pas encore de compte, pas de souci, inscrivez vous.</Text>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("SignupScreen", { param: phoneNumber })}
                            style={{
                                backgroundColor: colors.greyColour,
                                height: verticalScale(40),
                                width: scale(280),
                                alignSelf: 'center',
                                borderRadius: verticalScale(20),
                                marginTop: verticalScale(24),
                                justifyContent: 'center',
                                alignItems: 'center' }}>
                            <Text style={{
                                color: colors.white,
                                fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'inscrivez</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </TouchableOpacity>

        </View>
    );
};

export default LoginScreen;
