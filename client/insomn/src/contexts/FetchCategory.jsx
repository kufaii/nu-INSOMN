import { createContext, useState } from 'react';
import axios from '../config/index'

export const FetchCategoryContext = createContext(null);
export default function CategoryProvider({children}){
    const [cobacoba, setcobacoba] = useState(0)
    // const ambildata = setData(1)
    const ambilData = async () => {
        try {
            const hasil = await axios({
                method: 'get',
                url: '/category',
                headers:{
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(hasil.data, "<<<<< ini hasiln ambil data");

            setcobacoba(hasil.data)
            // return hasil.data
        } catch (error) {
            console.log("DUH ERROR GAN >>>>>>>>>>>>>>>",error);
        }
    }
    return (
        <FetchCategoryContext.Provider value={{cobacoba,ambilData}}>
            {children}
        </FetchCategoryContext.Provider>

    )
}
