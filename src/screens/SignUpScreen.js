import React, { useState } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, ScrollView } from 'react-native';
import { colors, fullWidth, scale, scaleFont, verticalScale, constants } from '../utils';
import { TextInput } from 'react-native-paper';
import AppHeader from '../components/AppHeader';


const SignUpScreen = (props) => {
    const [phoneNumber, sethoneNumber] = useState(props.route.params.param);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const Logo = require("../assets/images/LoginImage.jpeg");

    const handleNameChange = (text) => {
        setname(text)
    };

    const handleEmailChange = (text) => {
        setemail(text)
    };

    const handlePhoneChange = (text) => {
        sethoneNumber(text)
    };

    const handlePasswordChange = (text) => {
        setpassword(text)
    };

    const handleConfirmPasswordChange = (text) => {
        setconfirmPassword(text)
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />

                <ImageBackground source={Logo} style={{ width: fullWidth, height: verticalScale(180), alignSelf: 'center', opacity: 0.5 }}>
                </ImageBackground>
                <View style={{ position: 'absolute', top: verticalScale(40) }}>
                    <AppHeader heading="Inscription" navigation={() => props.navigation.goBack()} showicon={true} />
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ color: colors.white }}>
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Nom et prénom"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handleNameChange(text)}
                            value={name}
                            maxLength={15}
                        />


                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="E-mail"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="email-address"
                            onChangeText={(text) => handleEmailChange(text)}
                            value={email}
                            maxLength={20}
                        />

                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Numéro de téléphone"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="number-pad"
                            autoCapitalize='none'
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

                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={colors.green}
                            selectionColor={colors.green}
                            activeUnderlineColor={colors.green}
                            label="Confirmez mot de passe"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handleConfirmPasswordChange(text)}
                            value={confirmPassword}
                            minLength={8}
                            maxLength={15}
                        />

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("BottomTab")}
                            style={{
                                backgroundColor: colors.green,
                                height: verticalScale(40),
                                width: scale(280),
                                alignSelf: 'center',
                                borderRadius: verticalScale(20),
                                marginTop: verticalScale(24),
                                justifyContent: 'center',
                                alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'inscrire</Text>
                        </TouchableOpacity>

                        {/*<Text style={{ alignSelf: 'center', color: colors.white, fontSize: scaleFont(10), marginTop: verticalScale(20), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>By signing up, you are in agreement with our</Text>*/}

                        {/*<TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')} ><Text style={{ alignSelf: 'center', color: colors.primary_red, fontSize: scaleFont(12), marginTop: verticalScale(4), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>Terms & Conditions</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </ScrollView>
                </View>
            </TouchableOpacity>

        </View>
    );
};

export default SignUpScreen;
