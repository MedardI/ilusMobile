import React, {useState} from 'react';
import { View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Env from "../env";

const TileLists = (props) => {
    const heading = props?.route?.params?.param1;
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    if (!loaded){
        const type = props?.route?.params?.param3;
        const genre = props?.route?.params?.param2;

        if (type === 'movies'){
            if (genre === 'recent'){

            } else {
                const movies = props.movies.discover.data;
                if (movies){
                    const filteredMovies = (props.movies.discover.data.filter(d => d.genreId == genre) || [])[0];
                    setData(filteredMovies?.list || []);
                    setLoaded(true);
                }
            }
        } else if (type === 'series'){
            if (genre === 'recent'){

            } else {
                const series = props.series.discover.data;
                if (series){
                    const filteredSeries = (props.series.discover.data.filter(d => d.genreId == genre) || [])[0];
                    setData(filteredSeries?.list || []);
                    setLoaded(true);
                }
            }
        } else if (type === 'kids') {
            if (genre === 'recent'){

            } else {
                const movies = props.kids.discover.data;
                if (movies){
                    const filteredMovies = (props.kids.discover.data.filter(d => d.genreId == genre) || [])[0];
                    setData(filteredMovies?.list || []);
                    setLoaded(true);
                }
            }
        }
    }

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.92)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading={heading} navigation={() => props.navigation.goBack()} showicon={true} />

            <FlatList
                data={data}
                numColumns={2}
                style={{ alignSelf: 'center', marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(10), marginVertical: verticalScale(10) }} >
                            <Image source={{
                                uri: getPosterURL(item.poster)
                            }} style={{ height: verticalScale(120), width: scale(150), borderRadius: verticalScale(6), opacity: 0.6 }} />
                            <View style={{ position: 'absolute', bottom: verticalScale(0), width: scale(150), backgroundColor: 'rgba(0,0,0,0.8)', borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }}>
                                <Text style={{ marginLeft: scale(5), color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                    {item.name}</Text>
                                <View style={{ alignSelf: 'center', width: scale(140), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                        {item.runtime}</Text>
                                    <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                        {item.year}</Text>
                                </View>


                            </View>
                        </TouchableOpacity>
                    )
                }}

            />

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({

    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        movies: state.movies,
        series: state.series,
        kids: state.kids,
        misc: state.misc
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TileLists);
