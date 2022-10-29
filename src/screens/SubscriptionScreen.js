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
            <AppHeader heading="Subscription" navigation={() => props.navigation.goBack()} showicon={true} />

            <ScrollView>


                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod")} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                        STARTER PACK
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            3 MONTH
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $9.99
                        </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod")} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                        STANDARD PACK
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            6 MONTH
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $14.99
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod")} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                        SUPER SAVER PACK
                    </Text>
                    <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            12 MONTH
                        </Text>
                        <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                            $24.99
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{ marginLeft: scale(30), paddingBottom: verticalScale(50) }}>

                    <Text style={{ width: scale(160), marginTop: verticalScale(30), fontSize: scaleFont(24), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>Why Upgrade To premium?</Text>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(50) }}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Get Access to Full HD Content.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(20) }}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Free Downloading Of Movies & Series.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(20) }}>
                        <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Watch Exclusive Content.</Text>
                    </View>

                </View>
            </ScrollView>

        </View>
    );
}

export default SubscriptionScreen;