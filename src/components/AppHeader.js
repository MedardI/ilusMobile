import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { colors, scaleFont, scale, verticalScale, fullWidth, constants } from '../utils';
import { useNavigation } from '@react-navigation/native';

const AppHeader = (props) => {

    return (
        <View style={{ width: fullWidth, height: verticalScale(48), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignSelf: 'center', }}>
            {
                !props.showicon ? (<TouchableOpacity style={{ width: scale(50), alignItems: 'center', height: verticalScale(48), justifyContent: 'center', }} >

                </TouchableOpacity>) : (<TouchableOpacity style={{ width: scale(50), alignItems: 'center', height: verticalScale(48), justifyContent: 'center', }} onPress={() => props.navigation()}>
                    <Icon
                        name="angle-left"
                        size={verticalScale(26)}
                        color={colors.white}
                    />
                </TouchableOpacity>)
            }
            <Text
                style={{
                    color: colors.white,
                    fontFamily: constants.OPENSANS_FONT_BOLD,
                    fontSize: scaleFont(18),
                    letterSpacing: 0.15,
                }}
            >
                {props.heading}
            </Text>
        </View>

    );
}

export default AppHeader;

