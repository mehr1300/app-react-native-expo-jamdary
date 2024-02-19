import React from 'react';
import {styled} from "nativewind";
import {ScrollView} from "react-native";
const StyledScrollView = styled(ScrollView)

const ScrollViewCustom = (props) => {
    return (
        <StyledScrollView {...props}>{props.children}</StyledScrollView>
    );
};

export default ScrollViewCustom;
