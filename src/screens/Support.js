import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppHeader from "../components/AppHeader";
import { scaleFont, verticalScale, scale, colors, constants } from "../utils";



const Support = (props) => {

    const [number, setnumber] = useState(243978181762);
    const [email, setemail] = useState(`mailto:${"matthieuilunga@gmail.com"}`);


    const onPressMobileNumberClick = () => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };


    return (
        <View style={styles.container}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Aide" navigation={() => props.navigation.goBack()} showicon={true} />

            <View style={{ marginTop: verticalScale(30), justifyContent: 'center', width: scale(320), alignSelf: 'center' }}>

                <Image source={require("../assets/images/logo.png")} style={{ alignSelf: "center", width: scale(70), height: verticalScale(90) }} />

                <Text style={{ fontSize: scaleFont(18), marginTop: verticalScale(20), marginBottom: verticalScale(10), textAlign: 'center', color: colors.white, fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Contactez nous</Text>

                <View style={{ flexDirection: 'row', width: scale(280), justifyContent: 'space-between', alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <TouchableOpacity
                        onPress={() => onPressMobileNumberClick()}
                        style={{ marginRight: 5, flexDirection: 'row', borderColor: colors.green, borderWidth: verticalScale(2), borderRadius: verticalScale(30), width: scale(150), height: verticalScale(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name="call"
                            size={verticalScale(16)}
                            color={colors.green}
                        />
                        <Text style={{ fontSize: scaleFont(16), color: colors.green, marginLeft: scale(10) }}>Par téléphone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(email)}
                        style={{ flexDirection: 'row', borderColor: colors.green, borderWidth: verticalScale(2), borderRadius: verticalScale(30), width: scale(150), height: verticalScale(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name="md-mail-outline"
                            size={verticalScale(16)}
                            color={colors.green}
                        />
                        <Text style={{ fontSize: scaleFont(16), color: colors.green, marginLeft: scale(10) }}>Par mail</Text>
                    </TouchableOpacity>
                </View>

                <View style={{}}>
                    <Text style={{ fontSize: scaleFont(18), marginBottom: verticalScale(5), marginTop: verticalScale(20), color: colors.white, fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Addresse</Text>
                    <Text style={{ fontSize: scaleFont(14), color: colors.white, fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                        15 Avenue du Parc
                    </Text>
                    <Text style={{ fontSize: scaleFont(14), color: colors.white, fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                        Lubumbashi
                    </Text>
                </View>

            </View>
        </View>
    )
};

export default Support
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black

    },
    image: {
        width: verticalScale(100),
        height: verticalScale(100)
    }
});



