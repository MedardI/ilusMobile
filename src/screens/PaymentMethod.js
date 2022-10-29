import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, scale, scaleFont, verticalScale } from '../utils';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const PaymentMethod = (props) => {
    const [modalVisible, setmodalVisible] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Payment" navigation={() => props.navigation.goBack()} showicon={true} />

            <TouchableOpacity activeOpacity={0.8} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(30) }}>
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

            <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, marginLeft: scale(30), marginTop: verticalScale(20) }}>
                Select any method to Pay
            </Text>

            <TouchableOpacity onPress={() => setmodalVisible(true)} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/paypal.png")} style={{ width: scale(60), height: verticalScale(25), borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>PayPal</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setmodalVisible(true)} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/gpay.png")} style={{ width: scale(60), height: verticalScale(25), borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>Google Pay</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setmodalVisible(true)} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/phonepay.png")} style={{ width: scale(60), height: verticalScale(25), resizeMode: "contain", backgroundColor: colors.white, borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15), }}>Phone Pay</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setmodalVisible(true)} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/creditcard.jpeg")} style={{ width: scale(60), height: verticalScale(25), resizeMode: "center", backgroundColor: colors.white, borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>Credit or Debit Card</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setmodalVisible(true)} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/stripe.png")} style={{ width: scale(60), height: verticalScale(25), borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>Stripe</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <Modal visible={modalVisible} >
                <TouchableOpacity activeOpacity={1} onPress={() => setmodalVisible(false)} style={{ flex: 1, alignItems: 'center', backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <View style={{ backgroundColor: colors.black, height: verticalScale(360), width: scale(300), borderRadius: verticalScale(12), marginTop: verticalScale(100) }}>
                        {/* <MaterialIcons name="close" color={colors.white} size={verticalScale(24)} /> */}
                        <View style={{ alignSelf: 'center', marginTop: verticalScale(30), justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="check-circle" color={colors.green} size={verticalScale(180)} />
                        </View>
                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(30) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(20), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: 'center' }}>Hurray!</Text>
                            <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: "center" }}>Payment Succesfull.</Text>
                            <Text style={{ color: "#00FF00", fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: 'center', marginTop: verticalScale(10) }}>Your Subscription has Started!</Text>

                        </View>
                    </View>

                    <TouchableOpacity onPress={() => { setmodalVisible(false), setTimeout(() => { props.navigation.navigate("BottomTab") }, 200) }} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(200), justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), marginTop: verticalScale(80) }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_BOLD }} >Back To Home</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            </Modal>

        </View>
    );
}

export default PaymentMethod;