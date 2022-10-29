import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, } from 'react-native';
import AppHeader from '../components/AppHeader';
import { colors, constants, fullWidth, scale, scaleFont, verticalScale } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { moviesdata, ratingList, topPicksMovies, episdoesdummy, seriesdata } from '../utils/Data';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import Video from 'react-native-video';

const VideoPlayer = (props) => {


    const data = props?.route?.params.param1
    const ismovie = props?.route?.params?.param2
    const [WishList, setWishList] = useState(false)
    const [download, setdownload] = useState(false)
    const [Clips, setClips] = useState(true)
    const [Seasons, setSeasons] = useState(true)
    const [Reviews, setReviews] = useState(false)
    const [selectedId, setSelectedId] = useState(0);
    const [name, setname] = useState(data.name)
    const [image, setimage] = useState(data.banner)
    const seasoncount = data.duration.split("")[0]
    var seasonitem = []
    for (let i = 0; i < seasoncount; i++) {
        seasonitem.push(1)
    }

    console.log(data, ismovie)



    const wishlist = () => {
        setWishList(!WishList)
        WishList ?
            showMessage({
                backgroundColor: colors.primary_red,
                message: "File Removed from WishList",
                type: "danger"
            }) : showMessage({
                backgroundColor: colors.green,
                message: "File Added to WishList",
                type: "danger"
            })




    }

    const downloaditem = () => {
        setdownload(!download)
        download ?
            showMessage({
                backgroundColor: colors.primary_red,
                message: "Download Stopped",
                type: "info",
            }) : showMessage({
                backgroundColor: colors.green,
                message: "Download Started",
                type: "info",
            })

    }


    const Item = ({ index, onPress, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[{ paddingHorizontal: scale(10), }]}>
            <Text style={[{ fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }, textColor]}>Season {index + 1}</Text>
        </TouchableOpacity >
    );



    const renderItem = ({ item, index }) => {
        console.log(item, index)
        const color = index === selectedId ? colors.white : colors.greyColour;

        return (
            <Item
                index={index}
                onPress={() => setSelectedId(index)}
                textColor={{ color }}
            />
        );
    };


    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} hidden={false} translucent={false}
            />
            <View style={{}} >
                <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}   // Can be a URL or a local file.
                    controls={false}
                    style={{ width: scale(360), height: verticalScale(200), }} />
            </View>
            <View style={{ position: 'absolute', zIndex: 1, top: verticalScale(40) }}>
                <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
            </View>

            <View style={{ alignSelf: 'center', flex: 1 }}>
                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} style={{}}>

                    <View style={{ width: scale(340), justifyContent: 'center', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(5) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(22), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>{data.name}</Text>
                            <TouchableOpacity onPress={() => downloaditem()} style={{ justifyContent: 'center', alignItems: 'center', marginRight: scale(10) }} >
                                <MaterialIcons name="file-download" color={download ? colors.green : colors.greyColour} size={verticalScale(26)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginRight: scale(6) }}>{data.duration}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.genre}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.year}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.language}</Text>


                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(20), marginTop: verticalScale(10) }}>

                    </View>

                    <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(5) }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: verticalScale(15), }}>
                        <TouchableOpacity onPress={() => { setClips(true), setReviews(false), setSeasons(true) }} style={{ marginLeft: scale(20) }}>
                            <Text style={{ color: Clips ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >{ismovie ? "Clips" : "Seasons"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setClips(false), setReviews(true), setSeasons(false) }} style={{ marginLeft: scale(20) }}>
                            <Text style={{ color: Reviews ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        ismovie ? Clips && (

                            <View>
                                <FlatList
                                    style={{ marginTop: verticalScale(10), marginHorizontal: scale(18) }}
                                    data={moviesdata}
                                    horizontal
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                                <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                            </TouchableOpacity>
                                        )
                                    }}
                                />

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
                                        >TOP PICKS FOR YOU</Text>

                                        <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Continue Watching", param2: topPicksMovies })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                            <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>


                                    <FlatList
                                        style={{ marginTop: verticalScale(10), marginBottom: verticalScale(40), }}
                                        data={topPicksMovies}
                                        horizontal
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: true })} style={{ marginHorizontal: scale(6) }} >
                                                    <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />

                                </View>

                            </View>

                        ) : Seasons && (
                            <View>
                                <FlatList
                                    style={{ marginHorizontal: scale(15), marginTop: verticalScale(15) }}
                                    horizontal
                                    data={seasonitem}
                                    renderItem={renderItem}

                                />

                                <FlatList
                                    horizontal
                                    style={{ marginTop: verticalScale(15) }}
                                    data={episdoesdummy}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={{ marginHorizontal: scale(6) }} >
                                                <Image source={data.banner} style={{ height: verticalScale(110), width: scale(130), borderRadius: verticalScale(6), opacity: 0.5 }} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: verticalScale(5) }}>
                                                    <MaterialIcons name="play-arrow" color={colors.white} size={verticalScale(22)} />
                                                    <View>
                                                        <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                            S{selectedId + 1} E{index + 1} </Text>
                                                        <Text style={{ color: colors.white, fontSize: scaleFont(10), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                            Lorem ipsum dolor
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}

                                />


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
                                        >SERIES YOU MAY LIKE</Text>

                                        <TouchableOpacity onPress={() => props.navigation.navigate('TileList', { param1: "Series You May Like", param2: seriesdata })} activeOpacity={0.6} style={{ justifyContent: "center", alignItems: 'center', }}>
                                            <MaterialIcons name="chevron-right" size={verticalScale(24)} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>


                                    <FlatList
                                        style={{ marginTop: verticalScale(10), marginBottom: verticalScale(30), }}
                                        data={seriesdata}
                                        horizontal
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.navigate("PlayerScreen", { param: item, ismovie: false })} style={{ marginHorizontal: scale(6) }} >
                                                    <Image source={item.banner} style={{ height: verticalScale(100), width: scale(80), borderRadius: verticalScale(6) }} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>





                            </View>
                        )


                    }



                    {
                        Reviews && (
                            <View style={{ marginHorizontal: scale(18), marginTop: verticalScale(10), marginBottom: verticalScale(40) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'row', backgroundColor: colors.green, borderRadius: verticalScale(20), width: scale(50), height: verticalScale(25), justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: colors.white, fontSize: scaleFont(14) }}>4.3</Text>
                                        <MaterialIcons name="star" color={colors.white} size={verticalScale(14)} />
                                    </View>
                                    <Text style={{ color: colors.white, fontSize: scaleFont(14), marginLeft: scale(10) }}> 102 People rated</Text>

                                </View>

                                <FlatList
                                    style={{ marginTop: verticalScale(20) }}
                                    data={ratingList}
                                    renderItem={({ item }) => {
                                        var items = []
                                        for (let i = 0; i < item.stars; i++) {
                                            items.push(1)
                                        }

                                        return (
                                            <View style={{ marginVertical: verticalScale(10), width: scale(330), alignSelf: 'center', }}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Image source={item.photo} style={{ width: verticalScale(40), height: verticalScale(40), borderRadius: verticalScale(100), resizeMode: "stretch" }} />
                                                    <View style={{ width: scale(180), marginLeft: scale(20) }}>
                                                        <Text style={{ color: colors.white }}>
                                                            {item.name}
                                                        </Text>
                                                        <Text style={{ color: colors.white }}>
                                                            {item.date}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', width: scale(90), justifyContent: 'flex-end', }}>
                                                        {
                                                            items.map(a => {
                                                                return (
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                                                                        <MaterialIcons name="star" color={colors.green} size={verticalScale(16)} />
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>

                                                </View>
                                                <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(5) }}>
                                                    {item.review}
                                                </Text>
                                            </View>
                                        )
                                    }}
                                />


                            </View>
                        )
                    }
                </ScrollView>
            </View>


            {
                Reviews && (

                    <TouchableOpacity onPress={() => props.navigation.navigate("ReviewPage", { param1: name, param2: image })} style={{ flexDirection: 'row', backgroundColor: colors.green, borderRadius: verticalScale(20), justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: verticalScale(10), left: scale(130), paddingHorizontal: scale(20), paddingVertical: verticalScale(10) }}>
                        <MaterialIcons name="add" size={verticalScale(20)} color={colors.white} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(5) }}>Add Review</Text>
                    </TouchableOpacity>
                )
            }


        </View>
    );
}

export default VideoPlayer;