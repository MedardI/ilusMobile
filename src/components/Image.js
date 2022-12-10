import FastImage from 'react-native-fast-image'
import React from "react";

const Image = (props) => {
    return (
        <FastImage
            style={props.style}
            source={{
                uri: props.source.uri,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
};

export default Image;
