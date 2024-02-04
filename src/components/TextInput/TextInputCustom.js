import React from 'react';
import {styled} from "nativewind";
import {TextInput} from "react-native";
const StyledTextInput = styled(TextInput)

const TextInputCustom = (props) => {
    return (
        <StyledTextInput {...props}/>
    );
};

export default TextInputCustom;
