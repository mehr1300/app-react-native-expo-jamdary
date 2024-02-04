import React from 'react';
import { Text, View,TextInput } from 'react-native';
import { styled } from 'nativewind';
import {useDispatch, useSelector} from "react-redux";
import {
    increment,
} from './redux/features/counterSlice';
const StyledView = styled(View)
const StyledText = styled(Text)

const Index = () => {

    const {value , status} = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <StyledView className="bg-gray-400 iransans flex-1 items-center justify-center w-full space-y-3 p-10">
            <StyledText onPress={()=>{dispatch(increment())}} className="text-slate-800 flex text-2xl font-bold iranSans">جمع داری اموال</StyledText>
            <StyledText className="text-slate-800 flex text-2xl font-bold iranSans">{value}</StyledText>
        </StyledView>
    );
}

export default Index;
