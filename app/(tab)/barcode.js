import React, {useEffect, useState} from 'react';
import ViewCustom from "../../src/components/View/ViewCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";
import {useDispatch, useSelector} from "react-redux";
import {searchAsyncProduct} from "../../src/features/redux/productSlice";

const barcode = () => {


    const [barcode,setBarcode] = useState("")

    const {type, loading, result} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const searchBarcode = () => {
        console.log(barcode)
        dispatch(searchAsyncProduct({product_code : barcode}))
    }

    useEffect(()=>{
        console.log(result)
    },[result])

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-8">
            <ViewCustom className ="bg-white w-full py-10 px-4 space-y-4 rounded-2xl">
                <TextInputCustom value={barcode} onChangeText={(barcode)=>{setBarcode(barcode)}} keyboardType='numeric' className="border border-gray-400 w-full p-1.5 rounded"/>

                <ViewCustom  className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom onPress={()=>{searchBarcode()}} className="text-slate-800 flex text-lg">جستجوی بارکد</TextCustom>
                </ViewCustom>
            </ViewCustom>

            {type === "new_code" &&
                (
                    <div className="items-center justify-center flex flex-col gap-5">
                            <span className="flex flex-row gap-2 text-emerald-500">
                                <FaCheck className="" size={20}/>
                                 <span>این کد قابل استفاده است</span>
                            </span>
                        <div className="flex flex-row gap-1">
                            <span className="text-emerald-900 dark:text-white">این کد متعلق به </span>
                            <span className="text-emerald-500">{result.organization_title}</span>
                            <span className="text-emerald-900"> است</span>
                        </div>
                        <Link to={`/add-product/add/${formik.values.product_code}`}
                              className="bg-emerald-50 border border-emerald-500 rounded p-1.5 px-4 flex flex-row items-center justify-center
                                   text-emerald-500 hover:bg-emerald-500 hover:text-white hover:cursor-pointer">
                            ثبت کالا با این کد
                        </Link>
                    </div>
                )
            }

            { result && result.product && (
                <ViewCustom  className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom className="text-slate-800 flex text-lg">{result.product.product_code}</TextCustom>
                </ViewCustom>
            ) }

        </ViewCustom>
    );
}

export default barcode;

