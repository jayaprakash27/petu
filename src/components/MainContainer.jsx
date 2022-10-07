import React from 'react';
import Eating from './images/eating.png';
import Herobg from './images/herobg.png';

import { heroPData } from './utils/data';

import { MdDeliveryDining } from 'react-icons/md';


const MainContainer = () => {
    return (
        <div className='px-6 grid grid-cols-1 md:grid-cols-2 gap-2 p-2'>
            <div className='p-4 h-96 flex-1'>
                <div className='flex h-8 w-48 bg-white text-orange-500 rounded-full'>
                    <div className="flex h-8 bg-orange-500 w-24 text-white rounded-full justify-center items-center"> <MdDeliveryDining />Xpress </div>
                    <div className="flex h-8 w-20 text-orange-500 rounded-full justify-center items-center"> delivery </div>
                </div>
                <div className='flex flex-col py-16'>
                    <div className='text-black text-xl'>All we care about is your</div>
                    <div className='text-xl font-bold'><div className='text-6xl text-orange-500'>Tummy <br /> {`&`} U.</div></div>

                </div>
                <img className='relative w-80 -top-64 -scale-1 -right-60 z-10' src={Eating} alt="" />
            </div>

            <div className='relative flex items-center py-2 flex-1'>
                <img src={Herobg} className=' h-680 top-96 md:top-12 scale-80 md:scale-125  -right-12 rotate-180 w-680' alt="" />
                <div className=' gap-4 w-full left-0 px-20 py-4 h-full absolute top-0  flex items-center justify-center'>
                    
                    { heroPData && heroPData.map(n =>(
                        <div key={n.id} className='w-240 p-2 bg-cardOverlay flex justify-between h-28 hover:scale-110 duration-100 transition-all ease-in-out cursor-pointer flex-col items-center rounded-2xl backdrop-blur-md'>
                        <img src={n.imgSrc} className='w-40 -mt-12' alt="" />
                        <p className='text-base font-semibold text-textColor'>{n.fname}</p>
                        <p className='text-sm font-semibold text-headingColor'> {'\u20B9'} {n.fprice} </p>
                     </div>
                    )) }
                    {/*<div className='w-190 p-2 bg-cardOverlay flex justify-between h-28 flex-col hover:scale-110 duration-100 transition-all ease-in-out cursor-pointer items-center rounded-2xl backdrop-blur-md'>
                        <img src={Hakka} className='w-40 -mt-12' alt="" />
                        <p className='text-base font-semibold text-textColor'>Hakka Noodles</p>
                        <p className='text-sm font-semibold text-headingColor'> {'\u20B9'} 55 </p>
                    </div>

                    <div className='w-190 p-2 bg-cardOverlay flex justify-between flex-col hover:scale-110 duration-100 transition-all ease-in-out cursor-pointer items-center rounded-2xl backdrop-blur-md h-28'>
                        <img src={Burger1} className='w-40 -mt-12' alt="" />
                        <p className='text-base font-semibold text-textColor'>Burger</p>
                        <p className='text-sm font-semibold text-headingColor'> {'\u20B9'} 75 </p> 
                    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default MainContainer
