import React, { version } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, scale, scaleFont, verticalScale } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SubscriptionScreen = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Abonnement" navigation={() => props.navigation.goBack()} showicon={true} />

            <ScrollView>

                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod", {
                    name: "FORFAIT DE BASE",
                    amount: '$10.00',
                    duration: "1 MOIS"
                })} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                    FORFAIT DE BASE
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            1 MOIS
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $10.00
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod",{
                    name: "FORFAIT DE DÉPART",
                    amount: '$25.00',
                    duration: "3 MOIS"
                })} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                     FORFAIT DE DÉPART
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            3 MOIS
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $25.00
                        </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod",{
                    name: "FORFAIT STANDARD",
                    amount: '$50.00',
                    duration: "6 MOIS"
                })} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                     FORFAIT STANDARD
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            6 MOIS
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $50.00
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod",{
                    name: "FORFAIT SUPER ÉCONOMISEUR",
                    amount: '$100.00',
                    duration: "12 MOIS"
                })} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                    FORFAIT SUPER ÉCONOMISEUR
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            12 MOIS
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $100.00
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{ marginLeft: scale(30), paddingBottom: verticalScale(50) }}>

                    <Text style={{ width: scale(160), marginTop: verticalScale(30), fontSize: scaleFont(24), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>Pourquoi s'abonner?</Text>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(50) , paddingRight: 20}}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Accédez au contenu Full HD.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(20), paddingRight: 20}}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Téléchargement gratuit de films et de séries.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(20), paddingRight: 20 }}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Regarder du contenu exclusif.</Text>
                    </View>

                </View>
            </ScrollView>

        </View>
    );
}

export default SubscriptionScreen;