import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, SafeAreaView, StatusBar } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, scale, scaleFont, verticalScale } from '../utils';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const PaymentMethod = (props) => {

    const data = props?.route?.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [method, setMethod] = useState('');

    const initPayment = (method) => {
        setMethod(method);
        setModalVisible(true);
    }

    const getNumber = () => {

    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Payment" navigation={() => props.navigation.goBack()} showicon={true} />

            <TouchableOpacity activeOpacity={0.8} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(30) }}>
                <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                    {data.name}
                </Text>
                <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                        {data.duration}
                    </Text>
                    <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                        {data.amount}
                    </Text>
                </View>
            </TouchableOpacity>

            <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, marginLeft: scale(30), marginTop: verticalScale(20) }}>
            Sélectionnez votre méthode de paiement
            </Text>

            <TouchableOpacity onPress={() => initPayment("mpesa")} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/mpesa.jpeg")} style={{ width: scale(60), height: verticalScale(25), borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>M-Pesa</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => initPayment("airtel")} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/airtel.png")} style={{ width: scale(60), height: verticalScale(25), borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15) }}>Airtel Money</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => initPayment('orange')} activeOpacity={0.8} style={{ flexDirection: 'row', width: scale(320), alignSelf: 'center', height: verticalScale(50), alignItems: 'center' }}>
                <Image source={require("../assets/images/orange-money.jpeg")} style={{ width: scale(60), height: verticalScale(25), resizeMode: "contain", backgroundColor: colors.white, borderRadius: verticalScale(3) }} />
                <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, width: scale(220), marginLeft: scale(15), }}>Orange Money</Text>
                <FontAwesome name="angle-right" color={colors.white} size={verticalScale(24)} />
            </TouchableOpacity>

            <Modal visible={modalVisible} >
                <TouchableOpacity activeOpacity={.9} style={{ flex: 1, alignItems: 'center', backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <View style={{ backgroundColor: colors.black, height: verticalScale(360), width: scale(300), borderRadius: verticalScale(12), marginTop: verticalScale(100) }}>
                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(30) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: 'center' }}>{`Veuillez transférer ${data.amount} pour un abonnement de ${data.duration} sur notre portefeuille mpesa en utilisant les informations suivantes:`}</Text>

                            <View  style={{
                                display: 'flex',
                                flexDirection: "row"
                            }}>
                                <Text style={{ 
                                    color: colors.white,
                                    fontSize: scaleFont(14),
                                    fontFamily: constants.OPENSANS_FONT_BOLD,
                                    textAlign: 'center',
                                    paddingTop: 3,
                                    paddingRight: 5,
                                    marginTop: verticalScale(10) }}>
                                    Nom:
                                </Text>
                                <Text style={{ color: "#00FF00", fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: 'center', marginTop: verticalScale(10) }}>
                                    Mathieu Ilunga
                                </Text>
                            </View>
                            
                            <View style={{
                                display: 'flex',
                                flexDirection: "row"
                            }}>
                                <Text style={{ 
                                    color: colors.white, 
                                    fontSize: scaleFont(14), 
                                    fontFamily: constants.OPENSANS_FONT_BOLD, 
                                    textAlign: 'center', 
                                    paddingTop: 3,
                                    paddingRight: 5,
                                    marginTop: verticalScale(5) }}>
                                    Numero:
                                </Text>

                                <Text style={{ color: "#00FF00", fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, textAlign: 'center', marginTop: verticalScale(5) }}>
                                    097 8181 762
                                </Text>
                            </View>
                            
                            <Text style={{ 
                                marginTop:verticalScale(20),
                                color: colors.white, 
                                fontSize: scaleFont(14), 
                                fontFamily: constants.OPENSANS_FONT_BOLD, 
                                textAlign: 'center' }}>
                                Une fois cela fait, veuillez nous accorder quelques minutes pour activer votre compte.</Text>

                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: colors.green, height: verticalScale(40), width: scale(200), justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6), marginTop: verticalScale(80) }}>
                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_BOLD }} >Ok</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            </Modal>

        </View>
    );
}

export default PaymentMethod;