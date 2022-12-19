import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Image from "../components/Image";
import { colors, scale, scaleFont, verticalScale, constants } from '../utils';
import CustomSlider from '../containers/Carousel/CustomSlider'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    MaterialColors,
    allGenres
} from '../utils/Data';
import {bindActionCreators} from "redux";
import {
    initDiscover as initDiscoverKids
} from "../actions/kids";
import {
    initDiscover as initDiscoverSeries,
    initFetchSeries
} from "../actions/series";
import {
    initDiscover as initDiscoverMovies,
    initFetchMovies
} from "../actions/movies";
import {
    initGenre
} from "../actions/misc";

import {connect} from "react-redux";
import Env from "../env";

const Dashboard = (props) => {
    const [moviesTab, setmoviesTab] = useState(true);
    const [seriesTab, setseriesTab] = useState(false);
    const [animationTab, setanimationTab] = useState(false);

    const [fetchingMovies, setFetchingMovies] = useState(false);
    const [fetchedExtraMovies, setFetchedExtraMovies] = useState(false);
    const [fetchedExtraSeries, setFetchedExtraSeries] = useState(false);
    const [fetchingSeries, setFetchingSeries] = useState(false);
    const [fetchingKids, setFetchingKids] = useState(false);

    const getBackDropURL = (image) => {
        return `${Env.cloudFront}/backdrops/${image}`;
    };

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    if (props.movies.discover.fetched
        && !fetchedExtraMovies && moviesTab){
        setFetchedExtraMovies(true);
        props.movies.discover.data.map((data) => {
            if (data.list.length < 4){
                const genreName = allGenres[data.genre];
                props.initFetchMovies(genreName, data.genreId);
            }
        });
    }

    if (props.series.discover.fetched
        && !fetchedExtraSeries && seriesTab){
        setFetchedExtraSeries(true);
        props.series.discover.data.map((data) => {
            if (data.list.length < 4){
                const genreName = allGenres[data.genre];
                console.log(genreName);
                if (genreName && data.genreId){
                    props.initFetchSeries(genreName, data.genreId);
                }
            }
        });
    }

    useEffect( () => {
        if (!props.movies.discover.fetched && !fetchingMovies){
            setFetchingMovies(true);
            props.initDiscoverMovies();
        }
        if (!props.series.discover.fetched && !fetchingSeries){
            setFetchingSeries(true);
            props.initDiscoverSeries();
        }
        if (!props.kids.discover.fetched && !fetchingKids){
            setFetchingKids(true);
            props.initDiscoverKids();
        }

        if (!props.misc.genre?.list?.length && !props.misc.genre.fetching){
            props.initGenre();
        }
    }, []);

    const getRecentWidth = (current, total) => {
        const full = scale(130);
        if (current && total){
            return (current * full)/ total;
        }
        return 0;
    };

    const moviesLoading = props.movies.fetching;
    const seriesLoading = props.series.fetching;
    const kidsLoading = props.kids.fetching;

    const kidsFriendlyGenre = [
        'Action',
        'Aventure',
        'Animation',
        'Famille',
        'Musique',
        'Comédie',
        'Fantaisie'
    ];

    const seriesGenres = (props.misc.genre?.list || []).filter(g => g.kind === 'series');
    const moviesGenres = (props.misc.genre?.list || []).filter(g => g.kind === 'movie');
    const kidsGenres = (props.misc.genre?.list || []).filter((g) => g.kind === 'series' && kidsFriendlyGenre.includes(g.name));

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(15), alignItems: 'center', height: verticalScale(50), }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { setmoviesTab(true), setseriesTab(false), setanimationTab(false) }} style={{ marginLeft: scale(0), alignItems: 'center', }}>
                        <Text style={{ color: moviesTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, textAlignVertical: 'center' }} >Films</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(true), setanimationTab(false) }} style={{ marginLeft: scale(20) }}>
                        <Text style={{ color: seriesTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }} >Séries</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setmoviesTab(false), setseriesTab(false), setanimationTab(true) }} style={{ marginLeft: scale(20) }}>
                        <Text style={{ color: animationTab ? colors.green : colors.greyColour, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD }} >Jeunesse</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {moviesTab && (
                moviesLoading ? (
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        flexDirection: "row",
                        padding: 10
                    }}>
                        <ActivityIndicator color={colors.green} size="large" />
                    </View>
                ) : (
                    <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                        <View>
                            {
                                props.movies.discover.top.length ?
                                    (<CustomSlider data={props.movies.discover.top} />): (<View/>)
                            }

                        </View>

                        {
                            props.movies.discover.recent.length ?
                                (
                                    <View>
                                        <View
                                            style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >CONTINUER À REGARDER</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "continuer à regarder", param2: 'recent', param3: 'movies' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>

                                        <FlatList
                                            data={props.movies.discover.recent}
                                            horizontal
                                            style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={{
                                                            uri: getPosterURL(item.poster)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: getRecentWidth(item.current_time, item.duration_time), borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item})} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text
                                                                numberOfLines={2}
                                                                style={{ width: scale(130), color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                                {item.name}
                                                            </Text>
                                                            <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                                                {item.genre}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />

                                    </View>
                                ): (<View/>)
                        }


                        {
                            moviesGenres.length ?
                                (<View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(15), marginHorizontal: scale(20) }}>
                                        <Text
                                            style={{
                                                color: colors.white,
                                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                fontSize: scaleFont(13),
                                                opacity: 0.7,
                                                marginTop: verticalScale(4)
                                            }}
                                        >EXPLOREZ PAR GENRES </Text>

                                    </View>

                                    <FlatList
                                        style={{ marginTop: verticalScale(10), marginHorizontal: scale(15) }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={moviesGenres}
                                        renderItem={({ item, index}) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => props.navigation.navigate('TileList', { param1: item.name, param2: item.id, param3: 'movies' })}
                                                    activeOpacity={0.6}
                                                    style={{ backgroundColor: MaterialColors[index], marginHorizontal: scale(4), borderRadius: verticalScale(6), justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(7), paddingVertical: scale(7) }} >
                                                    <Text style={{ color: colors.white, textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, opacity: 0.9 }}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />

                                </View>): (<View/>)
                        }

                        <FlatList
                            data={props.movies.discover.data}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >{item.genre}</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.genre, param2: item.genreId, param3: 'movies' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>


                                        <FlatList
                                            style={{ marginTop: verticalScale(10), }}
                                            data={item.list.slice(0,10)}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: {...item, type: 'movie'} })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image
                                                            source={{
                                                                uri: getPosterURL(item.poster)
                                                            }}
                                                            style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />
                    </ScrollView>
                )
            )}



            {
                seriesTab && (
                    seriesLoading ? (
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                flexDirection: "row",
                                padding: 10
                            }}>
                                <ActivityIndicator color={colors.green} size="large" />
                            </View>
                        ):
                        (
                    <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                        <View>
                            {
                                props.series.discover.top.length ?
                                    (<CustomSlider data={props.series.discover.top} />): (<View/>)
                            }

                        </View>

                        {
                            props.series.discover.recent.length ?
                                (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >CONTINUER À REGARDER</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continuer à regarder", param2: 'recent', param3: 'series' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>

                                        </View>

                                        <FlatList
                                            data={props.series.discover.recent}
                                            horizontal
                                            style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: { id: item.series_id, currentEpisode: item.episode_id } })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image  source={{
                                                            uri: getPosterURL(item.poster)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: getRecentWidth(item.current_time, item.duration_time), borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{ width: scale(130), backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text
                                                                numberOfLines={2}
                                                                style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                                {item.name}
                                                            </Text>
                                                            <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                                                {item.genre}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />

                                    </View>

                                ): (<View/>)
                        }

                        {
                            seriesGenres.length ?
                                (<View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(15), marginHorizontal: scale(20) }}>
                                        <Text
                                            style={{
                                                color: colors.white,
                                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                fontSize: scaleFont(13),
                                                opacity: 0.7,
                                                marginTop: verticalScale(4)
                                            }}
                                        >EXPLOREZ PAR GENRES </Text>

                                    </View>

                                    <FlatList
                                        style={{ marginTop: verticalScale(10), marginHorizontal: scale(15) }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={seriesGenres}
                                        renderItem={({ item, index}) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => props.navigation.navigate('TileList', { param1: item.name, param2: item.id, param3: 'series' })}
                                                    activeOpacity={0.6}
                                                    style={{ backgroundColor: MaterialColors[index], marginHorizontal: scale(4), borderRadius: verticalScale(6), justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(7), paddingVertical: scale(7) }} >
                                                    <Text style={{ color: colors.white, textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, opacity: 0.9 }}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />

                                </View>): (<View/>)
                        }


                        <FlatList
                            data={props.series.discover.data}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >{item.genre}</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.genre, param2: item.genreId, param3: 'series' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>


                                        <FlatList
                                            style={{ marginTop: verticalScale(10), }}
                                            data={item.list.slice(0,10)}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image  source={{
                                                            uri: getPosterURL(item.poster)
                                                        }} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />




                    </ScrollView>
                        )
                )
            }

            {
                animationTab && (
                    kidsLoading? (
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                flexDirection: "row",
                                padding: 10
                            }}>
                                <ActivityIndicator color={colors.green} size="large" />
                            </View>
                        )
                        :
                        (
                    <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
                        <View>
                            {
                                props.series.discover.top.length ?
                                    (<CustomSlider data={props.kids.discover.top} />): (<View/>)
                            }
                        </View>

                        {
                            props.kids.discover.recent.length ?
                                (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: verticalScale(15) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >CONTINUER À REGARDER</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continuer à regarder", param2: 'recent', param3: 'kids' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>

                                        </View>

                                        <FlatList
                                            data={props.kids.discover.recent}
                                            horizontal
                                            style={{ marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={{
                                                            uri: getPosterURL(item.poster)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: getRecentWidth(item.current_time, item.duration_time), borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{width: scale(130), backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text
                                                                numberOfLines={2}
                                                                style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                                {item.name}
                                                            </Text>
                                                            <Text style={{ color: colors.greyColour, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginBottom: verticalScale(5) }}>
                                                                {item.genre}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                                :(<View/>)
                        }

                        {
                            kidsGenres.length ?
                                (<View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(15), marginHorizontal: scale(20) }}>
                                        <Text
                                            style={{
                                                color: colors.white,
                                                fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                fontSize: scaleFont(13),
                                                opacity: 0.7,
                                                marginTop: verticalScale(4)
                                            }}
                                        >EXPLOREZ PAR GENRES </Text>

                                    </View>

                                    <FlatList
                                        style={{ marginTop: verticalScale(10), marginHorizontal: scale(15) }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={kidsGenres}
                                        renderItem={({ item, index}) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => props.navigation.navigate('TileList', { param1: item.name, param2: item.id, param3: 'kids' })}
                                                    activeOpacity={0.6}
                                                    style={{ backgroundColor: MaterialColors[index], marginHorizontal: scale(4), borderRadius: verticalScale(6), justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(7), paddingVertical: scale(7) }} >
                                                    <Text style={{ color: colors.white, textAlignVertical: "center", fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, opacity: 0.9 }}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />

                                </View>): (<View/>)
                        }

                        <FlatList
                            data={props.kids.discover.data}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: verticalScale(15), marginHorizontal: scale(18) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(2) }}>
                                            <Text
                                                style={{
                                                    color: colors.white,
                                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                                    fontSize: scaleFont(13),
                                                    opacity: 0.7,
                                                    marginTop: verticalScale(4)
                                                }}
                                            >{item.genre}</Text>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: item.genre, param2: item.genreId, param3: 'kids' })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>


                                        <FlatList
                                            style={{ marginTop: verticalScale(10), }}
                                            data={item.list.slice(0,10)}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={{
                                                            uri: getPosterURL(item.poster)
                                                        }} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                )
                            }}
                        />

                    </ScrollView>
                        )
                )
            }

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initDiscoverMovies,
        initDiscoverSeries,
        initDiscoverKids,
        initGenre,
        initFetchMovies,
        initFetchSeries
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        movies: state.movies,
        series: state.series,
        kids: state.kids,
        misc: state.misc
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
