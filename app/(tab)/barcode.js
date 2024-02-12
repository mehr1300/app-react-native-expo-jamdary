import React from 'react';
import ViewCustom from "../../src/components/View/ViewCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";

const barcode = () => {

    // const {value, status} = useSelector((state) => state.counter);
    // const dispatch = useDispatch();
    // const test = (input) => {
    //     console.log(input)
    // }

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-8">
            <ViewCustom className ="bg-white w-full py-10 px-4 space-y-4 rounded-2xl">
                <TextInputCustom keyboardType='numeric' className="border border-gray-400 w-full p-1.5 rounded"/>

                <ViewCustom className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom className="text-slate-800 flex text-lg">جستجوی بارکد</TextCustom>
                </ViewCustom>
            </ViewCustom>

        </ViewCustom>
    );
}

export default barcode;

