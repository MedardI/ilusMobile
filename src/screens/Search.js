import React, { useState, useEffect } from 'react';
import { Animated, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Keyboard, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { colors, scaleFont, scale, verticalScale, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moviesdata, genredata, recentsearches, popularsearches, fullHeight } from '../utils/Data';
import AppHeader from '../components/AppHeader';
import Env from "../env";
import { initSearch } from '../actions/misc';

const RenderEmptyComponent = (searchTerm) => {
    console.log(searchTerm);
    return (
        <View style={{
            flex: 1,
            justifyContent: "flex-start"}}>
            <Text style={{
                color: colors.white,
                textAlign: "center",
                paddingHorizontal: 15,
                fontSize: scaleFont(14)
            }}>
                
            {searchTerm && searchTerm.length >=3 ? "Aucun résultat n'a été trouvé correspondant à vos critères de recherche": "Entrez 3 caractères ou plus dans le champ de recherche ci-dessus pour trouver des films, des séries, etc."}</Text>
        </View>
    )
};

const Search = (props) => {
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeout, setTimeOut] = useState(null);
    const [data, setData] = useState([]);

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };
    
    const onSearch = (term) => {
        setSearchTerm(term);
        if (timeout) clearTimeout(timeout);
    
        if (term && term.length >= 3) {
            if (!loading) setLoading(true);
            setTimeOut(setTimeout(() => search(term), 500));
        }else {
            setData([]);
            setLoading(false);
        }
    };
    
    const search = (term) => {
        if (!loading && !data.length) setLoading(true);

        if (!searching){
            setSearching(true);
            initSearch(term).then((response) => {
                setData(response.data || []);
            }).catch(error => {
                setData([]);
            })
            .finally(() => {
                setSearching(false);
                setLoading(false);
            })
        } else {
            if (timeout) clearTimeout(timeout);
            setTimeOut(setTimeout(() => search(term), 500));
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>

                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />
                <AppHeader heading={'Search'} navigation={() => props.navigation.goBack()} showicon={true} />
                <Text
                    style={{
                        color: colors.white,
                        fontSize: scaleFont(22),
                        letterSpacing: 0.5,
                        textAlignVertical: 'center',
                        marginLeft: scale(20),
                        fontFamily: constants.OPENSANS_FONT_SEMI_BOLD,
                        marginTop: verticalScale(10),
                    }}
                >
                    Qu'aimeriez-vous</Text>


                <Text
                    style={{
                        color: colors.white,
                        fontSize: scaleFont(22),
                        letterSpacing: 0.5,
                        textAlignVertical: 'center',
                        marginLeft: scale(20),
                        fontFamily: constants.OPENSANS_FONT_SEMI_BOLD,
                    }}
                >regarder aujourd'hui? </Text>
                <View style={{ flexDirection: "row", marginHorizontal: scale(20), marginTop: verticalScale(20), borderRadius: verticalScale(6), backgroundColor: colors.black }}>
                        <TouchableOpacity activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', width: scale(40), }}>
                            <MaterialIcons name='search' color={colors.green} size={verticalScale(28)} />
                        </TouchableOpacity>
                        <TextInput
                            onChangeText={onSearch}
                            style={{ flex: 1, marginRight: scale(5), color: colors.white }}
                            placeholder="Rechercher des films, Séries, Genre & Plus..."
                            placeholderTextColor={colors.greyColour}
                        />
                    </View>


                    <View style={{ marginTop: verticalScale(10), marginHorizontal: scale(18) }}>
                    {
                            loading && !data.length? (
                                <View style={{
                                    flex: 1,
                                    marginTop: 20,
                                    alignSelf: "center",
                                    justifyContent: "flex-start",
                                    flexDirection: "row",
                                    height: fullHeight
                                }}>
                                    <ActivityIndicator style={{
                                        marginLeft: 15
                                    }} size="large" color={colors.green}/>
                                </View>
                            ) : (
                                <FlatList
                                    data={data}
                                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                                    numColumns={3}
                                    refreshing={loading}
                                    ListEmptyComponent={RenderEmptyComponent(searchTerm)}
                                    style={{ alignSelf: 'center', marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(10), marginVertical: verticalScale(10) }} >
                                                <Image source={{
                                                    uri: getPosterURL(item.poster)
                                                }} style={{ height: verticalScale(120), width: scale(90), borderRadius: verticalScale(6) }} />
                                            </TouchableOpacity>
                                )
                            }}

                        />
                            )
                        }
                    </View>
            </TouchableOpacity>
        </View>
    );
}

export default Search;