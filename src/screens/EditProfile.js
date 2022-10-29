import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import { TextInput } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const EditProfile = (props) => {

    const [phoneNumber, sethoneNumber] = useState("912345678");
    const [name, setname] = useState("Mark Jhonson");
    const [email, setemail] = useState("markjhonson@email.com");
    const Logo = require("../assets/images/LoginImage.jpeg")
    const [disable, setdisable] = useState(true)

    const handlenameChange = (text) => {
        setdisable(false)
        setname(text)
    }
    const handleemailChange = (text) => {
        setdisable(false)
        setemail(text)
    }
    const handlePhoneChange = (text) => {
        setdisable(false)
        sethoneNumber(text)
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
                        onChangeText={(text) => handlenameChange(text)}
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
                        onChangeText={(text) => handleemailChange(text)}
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
                        value={phoneNumber}
                        maxLength={10}
                    />

                    <TouchableOpacity disabled={disable} onPress={() => props.navigation.navigate("Profile")} style={{ backgroundColor: disable ? colors.greyColour : colors.green, height: verticalScale(40), width: scale(280), alignSelf: 'center', borderRadius: verticalScale(20), marginTop: verticalScale(24), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Enregistrer</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    );
}

export default EditProfile;
