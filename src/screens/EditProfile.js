import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import { TextInput } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    initUpdateProfile
} from "../actions/user";
import { showMessage } from 'react-native-flash-message';

const EditProfile = (props) => {

    const { user } = props.auth || {};

    const [phone, setPhone] = useState(user.phone ? user.phone : '');
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const Logo = require("../assets/images/LoginImage.jpeg")
    const [disable, setDisable] = useState(true);
    const [updating, setUpdating] = useState(false);

    if (updating && !props.auth.updating) {
        setUpdating(false);
        if (props.auth.profileError){
            showMessage({
                message: props.auth.profileError,
                type: "danger"
            });
        }else {
            showMessage({
                message: "Profil mis à jour avec succès!",
                type: "info"
            });
        }
    }
    const handleNameChange = (text) => {
        setDisable(false)
        setName(text)
    }
    const handleEmailChange = (text) => {
        setDisable(false)
        setEmail(text)
    }
    const handlePhoneChange = (text) => {
        setDisable(false)
        setPhone(text)
    }

    const isValidEmail = (email) => {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    };

    const isValidPhone = (phone) => {
        return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
    };

    const updateDetails = () => {
        if (!isValidEmail(email)){
            showMessage({
                message: "Adresse e-mail invalide",
                type: "danger"
            });
            return;
        }
        if (!isValidPhone(phone)) {
            showMessage({
                message: "Numéro de téléphone invalide",
                type: "danger"
            });
            return;
        }
        if (phone && name && email){
            setUpdating(true);
            props.initUpdateProfile({
                phone,
                name,
                email
            });
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Mon Profile" navigation={() => props.navigation.goBack()} showicon={true} />
            <Image source={require("../assets/images/avatar.jpeg")} style={{ height: verticalScale(100), width: verticalScale(100), borderRadius: verticalScale(50), alignSelf: 'center', marginTop: verticalScale(80) }} />
            <TouchableOpacity style={{ position: 'absolute', top: verticalScale(210), left: scale(206), zIndex: 1 }}>
                <MaterialIcons name="photo-camera" color={colors.green} size={verticalScale(22)} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <ScrollView style={{ color: colors.white }}>
                    <TextInput
                        mode="flat"
                        theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }}
                        underlineColor={colors.green}
                        selectionColor={colors.green}
                        activeUnderlineColor={colors.green}
                        label="Nom et prénom"
                        style={{ height: verticalScale(60), width: scale(270), marginHorizontal: verticalScale(5), alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.2)', color: colors.white }}
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
                        maxLength={25}
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
                        value={phone}
                        maxLength={10}
                    />

                    <TouchableOpacity disabled={disable || props.auth.updating} onPress={() => updateDetails()} style={{ backgroundColor: disable || props.auth.updating ? colors.greyColour : colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(24), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Enregistrer</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    );
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initUpdateProfile
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
