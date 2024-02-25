import React from 'react';
import {styled} from "nativewind";
import {TextInput, View} from "react-native";
import TextCustom from "../Text/TextCustom";
const StyledTextInput = styled(TextInput)

const TextInputCustomOne = ({formik,title,name}) => {
    return (
        <View>
            <TextCustom>{title}</TextCustom>
            <StyledTextInput name={name}
                             onChangeText={formik.handleChange(name)}
                             onBlur={formik.handleBlur(name)}
                             value={formik.values[name]}
                             className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
        </View>
    );
};

export default TextInputCustomOne;
