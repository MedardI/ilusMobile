import React, { version, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, fullHeight, scale, scaleFont, verticalScale } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { useFocusEffect } from '@react-navigation/native';
import {
    initPaymentMethods
} from "../actions/misc"

const SubscriptionScreen = (props) => {

    const [fetching, setFetching] = useState(false);

    if (!props.misc.paymentMethods.fetching
        && fetching){
        setFetching(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            let updated = false;
            if (!updated){
                const packages = props.misc.paymentMethods.packages;
                if (!Object.keys(packages).length){
                    setFetching(true);
                }
                props.initPaymentMethods();
            }
            return () => {
                updated = true;
            };
        }, [])
    );

    const getPackages = () => {
        const packages = props.misc.paymentMethods.packages;
        if (packages && Object.keys(packages).length){
            const all = [];
            Object.keys(packages).forEach(key => {
                if (packages.hasOwnProperty(key)){
                    all.push({
                        ...packages[key],
                        code: key
                    });
                }
            })

            return all;
        }

        return [];
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Abonnement" navigation={() => props.navigation.goBack()} showicon={true} />

            {
                (fetching)? (
                    <View style={{
                        flex: 1,
                        alignSelf: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        height: fullHeight
                    }}>
                        <ActivityIndicator style={{
                            marginLeft: 15
                        }} size="large" color={colors.primary}/>
                    </View>
                ): null
            }

            <ScrollView>

                {getPackages().map((packages) => {
                    return (
                        <TouchableOpacity key={packages.code} activeOpacity={0.8} onPress={() => props.navigation.navigate("PaymentMethod", {
                            name: packages.name.toUpperCase(),
                            amount: `${packages.currency}${packages.amount}`,
                            duration: `${packages.duration} ${packages.type.toUpperCase()}`
                        })} style={{ height: verticalScale(90), width: scale(320), borderRadius: verticalScale(12), backgroundColor: colors.green, alignSelf: 'center', marginTop: verticalScale(10) }}>
                            <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                            {packages.name.toUpperCase()}
                            </Text>
                            <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                                    {`${packages.duration} ${packages.type.toUpperCase()}`}
                                </Text>
                                <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                                    {`${packages.currency}${packages.amount}`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}

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

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initPaymentMethods
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        misc: state.misc,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);