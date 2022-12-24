import React, { useState } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { colors, fullWidth, scale, scaleFont, verticalScale, constants } from '../utils';
import { TextInput } from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    initRegister
} from "../actions/login";
import { showMessage } from 'react-native-flash-message';

const SignUpScreen = (props) => {
    const [registering, setRegistering] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const Logo = require("../assets/images/LoginImage.jpeg");


    if (registering && !props.auth.registering){
        if (props.auth.registerError){
            showMessage({
                message: props.auth.registerError,
                type: "danger"
            });
        } else {
            props.navigation.navigate("SubscriptionScreen");
        }
        setRegistering(false);
    }

    const handleNameChange = (text) => {
        setNameError('');
        setName(text);
    };

    const handleEmailChange = (text) => {
        setEmailError('');
        setEmail(text);
    };

    const handlePhoneChange = (text) => {
        setPhoneError('');
        setPhoneNumber(text);
    };

    const handlePasswordChange = (text) => {
        setPasswordError('');
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPasswordError('');
        setConfirmPassword(text);
    };

    const isValidEmail = (email) => {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    };

    const isValidPhone = (phone) => {
        return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
    };

    const onRegistration = () => {

        const data = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
            phone
        }

        const fullNames = name.split(' ');
        let error = false;
        if (!fullNames || fullNames.length < 2) {
            setNameError('Nom et prénom sont obligatoires !'); error = true;
        }
        if (!isValidEmail(email)) {
            setEmailError('Une adresse email valide est exigée!'); error = true;
        }
        if (!isValidPhone(phone)) {
            setPhoneError('Un numéro de téléphone valide est requis!'); error = true;
        }
        if (password.length < 6) {
            setPasswordError('Le mot de passe doit comporter au moins 6 caractères'); error = true;
        }
        if (password !== confirmPassword){
            setConfirmPasswordError('Non concordance des mots de passe'); error = true;
        }

        if (!error){
            setRegistering(true);
            props.initRegister(data);
        }
    }

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
                            underlineColor={nameError? colors.primary_red: colors.green}
                            selectionColor={nameError? colors.primary_red: colors.green}
                            activeUnderlineColor={nameError? colors.primary_red: colors.green}
                            label="Nom et prénom"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handleNameChange(text)}
                            value={name}
                            maxLength={100}
                        />

                        {
                            nameError && <Text style={{
                                textAlign: 'left',
                                flex: 1,
                                width: scale(270),
                                alignSelf: 'center',
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{nameError}</Text>
                        }

                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={emailError? colors.primary_red: colors.green}
                            selectionColor={emailError? colors.primary_red: colors.green}
                            activeUnderlineColor={emailError? colors.primary_red: colors.green}
                            autoCapitalize="none"
                            autoCorrect={false}
                            label="E-mail"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="email-address"
                            onChangeText={(text) => handleEmailChange(text)}
                            value={email}
                            maxLength={100}
                        />

                        {
                           emailError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                flex: 1,
                                width: scale(270),
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{emailError}</Text>
                        }

                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={phoneError? colors.primary_red: colors.green}
                            selectionColor={phoneError? colors.primary_red: colors.green}
                            activeUnderlineColor={phoneError? colors.primary_red: colors.green}
                            label="Numéro de téléphone"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white }}
                            keyboardType="number-pad"
                            autoCapitalize='none'
                            onChangeText={(text) => handlePhoneChange(text)}
                            value={phone}
                            maxLength={10}
                        />

                        {
                           phoneError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                flex: 1,
                                width: scale(270),
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{phoneError}</Text>
                        }
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={passwordError? colors.primary_red: colors.green}
                            selectionColor={passwordError? colors.primary_red: colors.green}
                            activeUnderlineColor={passwordError? colors.primary_red: colors.green}
                            label="Votre mot de passe"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handlePasswordChange(text)}
                            value={password}
                            minLength={6}
                            maxLength={15}
                        />

                        {
                          passwordError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                flex: 1,
                                width: scale(270),
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{passwordError}</Text>
                        }

                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={confirmPasswordError? colors.primary_red: colors.green}
                            selectionColor={confirmPasswordError? colors.primary_red: colors.green}
                            activeUnderlineColor={confirmPasswordError? colors.primary_red: colors.green}
                            label="Confirmez mot de passe"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handleConfirmPasswordChange(text)}
                            value={confirmPassword}
                            minLength={6}
                            maxLength={15}
                        />

                        {
                           confirmPasswordError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                flex: 1,
                                width: scale(270),
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{confirmPasswordError}</Text>
                        }

                        <TouchableOpacity
                            disabled={registering || props.auth.loggedIn}
                            onPress={() => onRegistration()}
                            style={{
                                backgroundColor: colors.green,
                                height: verticalScale(40),
                                width: scale(280),
                                width: scale(270),
                                alignSelf: 'center',
                                borderRadius: verticalScale(20),
                                marginTop: verticalScale(24),
                                justifyContent: 'center',
                                alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'inscrire</Text>
                            {
                                registering && <ActivityIndicator style={{
                                    marginLeft: 15
                                }} size="small" color={colors.white}  />
                            }
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

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initRegister
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
