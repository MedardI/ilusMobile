import React, { version, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, fullHeight, scale, scaleFont, verticalScale } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { useFocusEffect } from '@react-navigation/native';
import {
    initPaymentMethods,
    initSubscription
} from "../actions/misc"
import { diffInDays } from '../api/helper';

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
                const packages = props.misc.paymentMethods.plans;
                if (!packages.length){
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
        return props.misc.paymentMethods.plans;
    }

    const goBack = () => {
        if (!props.auth.isNewRegistration) props.navigation.goBack();
        else props.navigation.navigate("BottomTab");
    }

    const updatePackage = (id, name, amount, duration) => {
        props.initSubscription(id);
        props.navigation.navigate("PaymentMethod", {
            id,
            name,
            amount,
            duration
        })
    }

    const isCurrentSubscription = (id) => {
        return props.auth?.user?.subscription?.braintree_id === id;
    }

    const getRemainingDays = () => {
        let diff = diffInDays(new Date(), props.auth.user.period_end ? new Date(props.auth.user.period_end): null);
        return diff ? diff : 0;
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Abonnement" navigation={() => goBack()} showicon={true} />

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
                        <TouchableOpacity key={packages.id} activeOpacity={0.8} onPress={() => updatePackage(
                            packages.plan_id,
                            packages.meta.name.toUpperCase(),
                            `${packages.meta.currency}${packages.plan_amount}`,
                            `${packages.meta.duration} ${packages.meta.type.toUpperCase()}`
                        )} style={{ 
                            height: verticalScale(90), 
                            width: scale(320), 
                            borderRadius: verticalScale(12), 
                            backgroundColor: isCurrentSubscription(packages.plan_id)? colors.primary : colors.green, 
                            alignSelf: 'center',
                            position: "relative",
                            marginTop: verticalScale(10) }}>
                            {
                                isCurrentSubscription(packages.plan_id) ?
                                (<MaterialIcons
                                    style={{
                                       position: 'absolute',
                                       top: 5,
                                       right: 5,
                                    }}
                                    name="check-circle" color={colors.green} size={verticalScale(25)} />) : null
                            }
                            <Text style={{ marginLeft: scale(20), marginTop: verticalScale(20), color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                            {packages.meta.name.toUpperCase()}
                            </Text>
                            <View style={{ width: scale(280), marginTop: verticalScale(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontSize: scaleFont(16), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                                    {`${packages.meta.duration} ${packages.meta.type.toUpperCase()}`}
                                </Text>
                                <Text style={{ fontSize: scaleFont(18), color: colors.white, fontFamily: constants.OPENSANS_FONT_BOLD }}>
                                    {`${packages.meta.currency}${packages.plan_amount}`}
                                </Text>
                            </View>
                            {
                                isCurrentSubscription(packages.plan_id) ?
                                (<View style={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                    color: colors.statementGreenColour,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    fontSize: scaleFont(12)
                                }}>Votre abonnement actuel</Text>
                                <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: scaleFont(11),
                                    color: getRemainingDays() > 3 ? colors.green : colors.primary_red
                                }}>{`(${getRemainingDays()} jours restant`})</Text>
                                </View>) : null
                            }
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
        initPaymentMethods,
        initSubscription
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        misc: state.misc,
        auth: state.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);