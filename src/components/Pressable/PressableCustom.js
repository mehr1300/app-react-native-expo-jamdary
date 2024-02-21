import React from 'react';
import {styled} from "nativewind";
import {Pressable } from "react-native";
const StyledPressable = styled(Pressable)

const PressableCustom = (props) => {
    return (
        <StyledPressable {...props}>{props.children}</StyledPressable>
    );
};

export default PressableCustom;
