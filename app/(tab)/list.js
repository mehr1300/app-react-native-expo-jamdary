import React, {useEffect, useState} from 'react';
import ViewCustom from "../../src/components/View/ViewCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {getAsyncProductList} from "../../src/features/redux/productSlice";
import ScrollViewCustom from "../../src/components/ScrollView/ScrollViewCustom";
import {FlatList, SafeAreaView} from "react-native";

const list = () => {

    const {page, productList, count, errorList, loadingList} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [perPage, setPerPage] = useState(50)
    const [numberPage, setNumberPage] = useState(1)

    useEffect(() => {
        dispatch(getAsyncProductList({row_per_page: parseInt(perPage), page_number: parseInt(numberPage)}))

    }, [perPage, numberPage])


    return (
        <SafeAreaView>
            <ScrollViewCustom className="p-4 ">
                {productList && productList.length > 0 && productList.map((value, index) => {
                    return (
                        <ViewCustom key={value.product_code} className="bg-gray-200 p-4 border border-gray-400 rounded mb-4 ">
                            <ViewCustom key={index} className="flwe flex-row justify-between items-center p-1 border-b border-gray-400">
                                <TextCustom className="text-slate-800 flex">{value.product_code}</TextCustom>
                                <TextCustom className="text-slate-800 flex text-lg">
                                    {value.product_name}
                                </TextCustom>
                            </ViewCustom>

                            <ViewCustom key={index} className=" pt-2">

                                <TextCustom className="text-slate-800 flex">{value.organization_title}</TextCustom>

                                <ViewCustom key={index} className=" pt-2">
                                    <TextCustom className="text-slate-800 flex">
                                        <TextCustom className="text-gray-600"> گروه :</TextCustom>
                                        <TextCustom>{value.product_group_title}</TextCustom>
                                    </TextCustom>
                                    <TextCustom className="text-slate-800 flex">
                                        <TextCustom className="text-gray-600">دسته :</TextCustom>
                                        <TextCustom>  {value.product_category_title}</TextCustom>
                                    </TextCustom>
                                    <TextCustom className="text-slate-800 flex">
                                        <TextCustom className="text-gray-600">وضعیت :</TextCustom>
                                        <TextCustom>{value.product_status_title}</TextCustom>
                                    </TextCustom>
                                </ViewCustom>
                            </ViewCustom>


                        </ViewCustom>
                    )
                })}
            </ScrollViewCustom>
        </SafeAreaView>
    );
}

export default list;


