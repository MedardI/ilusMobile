import React, { useState, } from 'react';
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Keyboard,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { colors, constants, fullWidth, scale, scaleFont, verticalScale } from '../utils';
import { TextInput } from 'react-native-paper';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    initLogin as loginActionCreator,
} from "../actions/login";


const LoginScreen = (props) => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [usernameError, setusernameError] = useState('');
    const [passError, setpassError] = useState('');
    const [showError, setShowError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const Logo = require("../assets/images/LoginImage.jpeg");

    if (props.auth.loginError && showError){
        ToastAndroid.show(props.auth.loginError, ToastAndroid.SHORT);
    }

   if (props.auth.loggedIn && !loggedIn 
    && !props.auth.isNewRegistration){
       setLoggedIn(true);
       setTimeout((
           () => props.navigation.navigate("BottomTab")
       ), 300);
   }

    const handlePhoneChange = (text) => {
        setShowError(false);
        setusername(text);
        setusernameError("");
    };

    const handlePasswordChange = (text) => {
        setShowError(false);
        setpassword(text);
        setpassError("");
    };

    const isValidEmail = (email) => {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    };

    const isValidPhone = (phone) => {
        return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
    };

    const handleLogin = async () => {

        if (!username){
            setusernameError("Numéro de téléphone/E-mail invalide!");
        }

        if (!password || password.length < 6){
            setpassError("Le mot de passe doit comporter au moins 6 caractères!");
        }

        if (!usernameError) {
            if (!isValidEmail(username) && !isValidPhone(username)) {
                setusernameError("Numéro de téléphone/E-mail invalide!");
            }
        }

        const data = {
            password: password
        };

        if (isValidEmail(username)) data.email = username;
        else data.phone = username;

        setShowError(true);

        if (!(passError || usernameError)){
            props.loginActionCreator(data)
        }
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
                            underlineColor={usernameError ? colors.primary_red : colors.green}
                            selectionColor={usernameError ? colors.primary_red : colors.green}
                            activeUnderlineColor={usernameError ? colors.primary_red : colors.green}
                            label="Votre téléphone/E-mail"
                            style={{ height: verticalScale(60), width: scale(270), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: verticalScale(5), color: colors.white, fontFamily: constants.OPENSANS_FONT_MEDIUM }}
                            keyboardType="default"
                            onChangeText={(text) => handlePhoneChange(text)}
                            value={username}
                        />
                        {
                            usernameError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                flex: 1,
                                color: colors.primary_red,
                                fontSize: scaleFont(12),
                                marginTop: 0,
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{usernameError}</Text>
                        }
                        <TextInput
                            mode="flat"
                            theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                            underlineColor={passError? colors.primary_red: colors.green}
                            selectionColor={passError? colors.primary_red: colors.green}
                            activeUnderlineColor={passError? colors.primary_red: colors.green}
                            label="Votre mot de passe"
                            style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white, }}
                            keyboardType='default'
                            onChangeText={(text) => handlePasswordChange(text)}
                            value={password}
                            minLength={6}
                            maxLength={15}
                            secureTextEntry={true}
                        />

                        {
                            passError && <Text style={{
                                alignSelf: 'center',
                                textAlign: 'left',
                                color: colors.primary_red,
                                marginTop: 0,
                                fontSize: scaleFont(11),
                                fontFamily: constants.OPENSANS_FONT_MEDIUM }}>{passError}</Text>
                        }
                        <TouchableOpacity
                            disabled={props.auth.loggedIn || props.auth.loggingIn}
                            onPress={() => handleLogin()}
                            style={{ backgroundColor: colors.green,
                                height: verticalScale(40),
                                width: scale(280),
                                alignSelf: 'center',
                                borderRadius: verticalScale(20),
                                marginTop: verticalScale(24),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: "row"}}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'identifier</Text>
                            {
                                props.auth.loggingIn && <ActivityIndicator style={{
                                    marginLeft: 15
                                }} size="small" color={colors.white}  />
                            }
                        </TouchableOpacity>

                        <Text style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: colors.white,
                            fontSize: scaleFont(12),
                            marginTop: verticalScale(24),
                            paddingLeft: 25,
                            paddingRight: 25,
                            fontFamily: constants.OPENSANS_FONT_MEDIUM }}>Vous n'avez pas encore de compte? Pas de souci, inscrivez vous.</Text>

                        <TouchableOpacity
                            disabled={props.auth.loggedIn || props.auth.loggingIn}
                            onPress={() => props.navigation.navigate("SignupScreen", { param: username })}
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
                                fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>S'inscrire</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </TouchableOpacity>

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({loginActionCreator}, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
