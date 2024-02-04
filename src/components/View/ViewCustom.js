import React from 'react';
import {styled} from "nativewind";
import {View} from "react-native";
const StyledView = styled(View)

const ViewCustom = (props) => {
    return (
        <StyledView {...props}>{props.children}</StyledView>
    );
};

export default ViewCustom;
