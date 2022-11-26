import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import { colors, scale, scaleFont, verticalScale, constants } from '../utils';
import CustomSlider from '../containers/Carousel/CustomSlider'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialColors, continuemovies, genredata, moviesdata, carouseldataSeries, continueseries, MoviesData, SeriesData } from '../utils/Data';
import {bindActionCreators} from "redux";
import {
    initDiscover as initDiscoverKids
} from "../actions/kids";
import {
    initDiscover as initDiscoverSeries
} from "../actions/series";
import {
    initDiscover as initDiscoverMovies
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
    const [fetchingSeries, setFetchingSeries] = useState(false);
    const [fetchingKids, setFetchingKids] = useState(false);

    const getBackDropURL = (image) => {
        return `${Env.cloudFront}/backdrops/${image}`;
    };

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

    const moviesLoading = props.movies.fetching;
    const seriesLoading = props.series.fetching;
    const kidsLoading = props.kids.fetching;

    const seriesGenres = (props.misc.genre?.list || []).filter(g => g.kind === 'series');
    const moviesGenres = (props.misc.genre?.list || []).filter(g => g.kind === 'movie');

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
                                                            uri: getBackDropURL(item.backdrop)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: item.current_time, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item})} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
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
                                            data={item.list}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image
                                                            source={{
                                                                uri: getBackDropURL(item.backdrop)
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
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image  source={{
                                                            uri: getBackDropURL(item.backdrop)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: item.current_time, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
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
                                            data={item.list}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image  source={{
                                                            uri: getBackDropURL(item.backdrop)
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
                                    (<CustomSlider data={props.series.discover.top} />): (<View/>)
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
                                                            uri: getBackDropURL(item.backdrop)
                                                        }} style={{ height: verticalScale(80), width: scale(130), borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }} />
                                                        <View style={{ width: item.current_time, borderTopWidth: verticalScale(2), borderColor: colors.primary_red }}>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ position: 'absolute', top: verticalScale(60), left: scale(90), zIndex: 1 }}>
                                                            <MaterialIcons name="play-circle-outline" color={colors.green} size={verticalScale(40)} />
                                                        </TouchableOpacity>
                                                        <View style={{ backgroundColor: '#303030', paddingLeft: scale(10), borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6) }}>
                                                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
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
                                            data={item.list}
                                            horizontal
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item })} style={{ marginHorizontal: scale(6) }} >
                                                        <Image source={{
                                                            uri: getBackDropURL(item.backdrop)
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
        initGenre
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
