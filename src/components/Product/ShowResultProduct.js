import React from 'react';
import {View} from "react-native";
import TextCustom from "../Text/TextCustom";
import {Link} from "expo-router";

const ShowResultProduct = ({result}) => {
    return (
        <View className={`bg-sky-600/10 p-4 border border-gray-400 rounded w-full`}>
            <View
                className={`flex flex-row justify-between items-center p-1 pb-1.5 border-b-[1.5px] border-dashed border-sky-700`}>
                <TextCustom
                    className={`text-lg text-sky-600`}>
                    {result.product_name}
                </TextCustom>
                <TextCustom className="text-slate-800 flex">{result.product_code}</TextCustom>
            </View>

            <View className=" pt-2">

                <TextCustom className="text-slate-800 flex">{result.organization_title}</TextCustom>

                <View className=" pt-2">
                    <TextCustom className="text-slate-800 flex">
                        <TextCustom className="text-gray-600"> گروه :</TextCustom>
                        <TextCustom>{result.product_group_title}</TextCustom>
                    </TextCustom>
                    <TextCustom className="text-slate-800 flex">
                        <TextCustom className="text-gray-600">دسته :</TextCustom>
                        <TextCustom>  {result.product_category_title}</TextCustom>
                    </TextCustom>
                    <TextCustom className="text-slate-800 flex">
                        <TextCustom className="text-gray-600">وضعیت :</TextCustom>
                        <TextCustom>{result.product_status_title}</TextCustom>
                    </TextCustom>
                </View>
            </View>

            <View className="flex flex-row items-center w-full mt-2">
                <View className="w-1/2 pr-1">
                    <Link className="w-full text-center rounded-full py-2 px-4 bg-green-700 text-white border-r-8 border-green-600"
                        href={{
                            pathname: "product/addProduct",
                            params: {
                                product_id: result.product_id,
                                product_code: result.product_code
                            }
                        }}>
                        <TextCustom>ویرایش</TextCustom>
                    </Link>
                </View>
                <View className="w-1/2 pr-1">
                    <Link className="w-full text-center rounded-full py-2 px-4 bg-sky-600 text-white border-r-8 border-sky-700"
                        href={{
                            pathname: "product/showProduct",
                            params: {
                                product_id: result.product_id,
                                product_code: result.product_code
                            }
                        }}>
                        <TextCustom>مشاهده</TextCustom>
                    </Link>
                </View>

            </View>

        </View>
    );
};

export default ShowResultProduct;