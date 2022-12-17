import React, {useState} from 'react';
import { View, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import Image from "../components/Image";
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Env from "../env";
import {
    getMovies,
    initMovies
} from "../actions/movies";
import {allGenres} from "../utils/Data";
import {
    getSeries,
    initSeries
} from "../actions/series";

const TileLists = (props) => {
    const heading = props?.route?.params?.param1;
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [fetch, setFetch] = useState(true);
    const type = props?.route?.params?.param3;
    const genre = props?.route?.params?.param2;

    if (!loaded){

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

    const convertRunTime = (time) => {
        const hours = Math.floor(time / 60);
        const min = Math.floor(time) - (hours * 60);

        return `${hours}h ${min}'`;
    };

    const load = async () => {
        let genreName = '';
        let page = 1;
        if (data.length >= 50) {
            page = Math.floor(data.length/50) + 1;
        }
        if (fetch){
            if (props.misc.genre.list){
                const found = props.misc.genre.list.find(g => g.id === genre);
                if (found) {
                    genreName = found.name;
                    if (allGenres[genreName]) genreName = allGenres[genreName];
                }
            }

            if (type === 'movies'){
                await getMovies(genreName, page).then((response) => {
                    let movies = response.data.movies;
                    if (page === 1){
                        setData(movies.data);
                    } else {
                        setData([...data, ...movies.data]);
                    }
                    if (page === 1){
                        props.initMovies(response, genre);
                    }
                    setFetch(movies.data.length === 50);
                }).catch((error) => {
                    console.log(error);
                });
            } else if (type === 'series'){
                await getSeries(genreName, page).then((response) => {
                    let series = response.data.series;
                    console.log(series);
                    if (page === 1){
                        setData(series.data);
                    } else {
                        setData([...data, ...series.data]);
                    }
                    if (page === 1){
                        props.initSeries(response, genre);
                    }
                    setFetch(series.data.length === 50);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.92)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading={heading} navigation={() => props.navigation.goBack()} showicon={true} />

            <FlatList
                data={data}
                numColumns={3}
                onEndReached={load}
                style={{ alignSelf: 'center', marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: type === 'movies'? {
                            ...item, type: 'movie'
                            }: item })} style={{ marginHorizontal: scale(10), marginVertical: verticalScale(10) }} >
                            <Image source={{
                                uri: getPosterURL(item.poster)
                            }} style={{ height: verticalScale(120), width: scale(90), borderRadius: verticalScale(6), opacity: 0.6 }} />
                            {/*<View style={{ position: 'absolute', bottom: verticalScale(0), width: scale(150), backgroundColor: 'rgba(0,0,0,0.8)', borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }}>*/}
                            {/*    <Text style={{ marginLeft: scale(5), color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>*/}
                            {/*        {item.name}</Text>*/}
                            {/*    <View style={{ alignSelf: 'center', width: scale(140), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>*/}
                            {/*        {*/}
                            {/*            item.runtime ? (*/}
                            {/*                <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>*/}
                            {/*                    {convertRunTime(item.runtime)}</Text>*/}
                            {/*            ): null*/}
                            {/*        }*/}
                            {/*        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>*/}
                            {/*            {item.year}</Text>*/}
                            {/*    </View>*/}


                            {/*</View>*/}
                        </TouchableOpacity>
                    )
                }}

            />

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initMovies,
        initSeries
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
