import React, {useEffect, useState} from 'react';
import ViewCustom from "../../../src/components/View/ViewCustom";
import TextCustom from "../../../src/components/Text/TextCustom";
import TextInputCustom from "../../../src/components/TextInput/TextInputCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearResultProduct, clearTypeProduct, searchAsyncProduct} from "../../../src/features/redux/productSlice";
import {useSegments} from "expo-router";

const barcode = () => {


    const [barcode,setBarcode] = useState("")

    const {type, loading, result} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const searchBarcode = () => {
        console.log(barcode)
        dispatch(searchAsyncProduct({product_code : barcode}))
    }

    const segments = useSegments();

    useEffect(()=>{
        dispatch(clearResultProduct())
        dispatch(clearTypeProduct())
        setBarcode("")
    },[segments])

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-8">
            <ViewCustom className ="bg-white w-full py-10 px-4 space-y-4 rounded-2xl">
                <TextInputCustom value={barcode} onChangeText={(barcode)=>{setBarcode(barcode)}} keyboardType='numeric' className="border border-gray-400 w-full p-1.5 rounded"/>

                <ViewCustom  className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom onPress={()=>{searchBarcode()}} className="text-slate-800 flex text-lg">جستجوی بارکد</TextCustom>
                </ViewCustom>
            </ViewCustom>

            {type === "code_not_valid" && setTimeout(() => {
            }, 2000) && (
                <ViewCustom  className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom className="text-slate-800 flex text-lg">این کد برای هیچ سازمانی ثبت نشده است</TextCustom>
                </ViewCustom>
            )}

            {type === "new_code" &&
                (
                    <ViewCustom className="w-full flex justify-center items-center">
                        <ViewCustom  className="w-full bg-gray-300 rounded p-1 justify-center items-center">
                            <TextCustom className="text-slate-800 flex text-lg">این کد قابل استفاده است</TextCustom>

                            <ViewCustom  className="w-full  rounded p-1 justify-center items-center mt-3">
                                <TextCustom className="text-slate-800 flex ">این کد متعلق است</TextCustom>
                                <TextCustom className="text-slate-800 flex text-lg">{result.organization_title}</TextCustom>
                            </ViewCustom>
                        </ViewCustom>
                        <ViewCustom  className="w-full bg-green-500 rounded p-1 justify-center items-center mt-4">
                            <TextCustom className="text-slate-800 flex text-lg">  ثبت کالا با این کد</TextCustom>
                        </ViewCustom>
                    </ViewCustom>
                )
            }


            {/*{type === "exist_product" && setTimeout(() => {*/}
            {/*}, 9000) && (*/}

            {/*    <div className="w-full px-6">*/}
            {/*        <div className="relative overflow-x-auto border dark:border-gray-600 sm:rounded-lg w-full">*/}
            {/*            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">*/}
            {/*                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">*/}
            {/*                <tr>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        نام کالا*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        کد کالا*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        سازمان*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        گروه*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        دسته*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        واحد گیرنده*/}
            {/*                    </th>*/}
            {/*                    <th scope="col" className="px-2 py-3">*/}
            {/*                        عملیات*/}
            {/*                    </th>*/}
            {/*                </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                <tr className="odd:bg-white text-xs odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700">*/}
            {/*                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">*/}
            {/*                        {result.product.product_name}*/}
            {/*                    </th>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        {result.product.product_code}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        {result.product.organization_title}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        {result.product.product_group_title}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        {result.product.product_category_title}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        {result.product.receiver_user}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 py-4">*/}
            {/*                        <div className="flex flex-row gap-1">*/}
            {/*                            <div className="flex flex-row items-center justify-center bg-sky-400 hover:bg-sky-500 rounded cursor-pointer ">*/}
            {/*                                <Link to={'/product/' + result.product.product_code} className="p-2 text-white">*/}
            {/*                                    مشاهده*/}
            {/*                                </Link>*/}
            {/*                            </div>*/}
            {/*                            <div className="flex flex-row items-center justify-center bg-fuchsia-400 hover:bg-fuchsia-500 rounded cursor-pointer ">*/}
            {/*                                <Link to={'/change-status-product/' + result.product.product_id} className="p-2 text-white">*/}
            {/*                                    تغییر وضعیت کالا</Link>*/}
            {/*                            </div>*/}
            {/*                            <div className="flex flex-row items-center justify-center bg-emerald-400 hover:bg-emerald-500 rounded cursor-pointer ">*/}
            {/*                                <Link to={`/add-product/edit/${result.product.product_id}`} className="p-2 text-white">*/}
            {/*                                    ویرایش*/}
            {/*                                </Link>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </td>*/}
            {/*                </tr>*/}


            {/*                </tbody>*/}
            {/*            </table>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*)}*/}


        </ViewCustom>
    );
}

export default barcode;

