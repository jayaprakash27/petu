import React, { useState, useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'
import { motion } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import CartItem from './CartItem';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';



const CartContainer = () => {

    const [tot, setTot] = useState(0);
    const [flag, setFlag] = useState(1);

    

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartItems, cartShow }, dispatch] = useStateValue();

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item){
            return accumulator + item.qty * item.price ;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag])

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });
        localStorage.setItem('cartItems', JSON.stringify([]));
    }


    const showCart = () => {
    dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
    });
}
    return (
        <motion.div initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 100}}  className='fixed flex top-0 right-0 w-full md:w-375 h-screen bg-gray-50 drop-shadow-md flex-col z-[101]'>
            <div  className='w-full flex items-center p-4 justify-between'>
                <motion.div onClick={showCart} className='px-2 rounded-full py-2 flex items-center gap-2 cursor-pointer hover:drop-shadow-md transition-all duration-100 ease-in-out text-white  bg-gray-700' whileTap={{scale : 0.75}}>
                <MdOutlineKeyboardBackspace/>
                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Cart</p>
                <motion.p onClick={clearCart} whileTap={{scale: 0.8}} className='px-2 rounded-full py-2 flex items-center gap-2 cursor-pointer hover:drop-shadow-md transition-all duration-100 ease-in-out text-white  bg-gray-700'>Clear<RiRefreshFill /></motion.p>
            </div>
            {/* Cart Bottom */}
            <div className=' bg-gray-700 w-full  h-full rounded-t-[2rem] flex flex-col'>
                {cartItems && cartItems.length > 0 ? (
                    <div  className=' w-full h-340 md:h-42 px-4 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                    {/* Cart Item */}
                    {cartItems && cartItems.map( (item) => (
                        <CartItem 
                        key={item?.id} 
                        item={item}
                        setFlag = {setFlag}
                        flag = {flag}
                         />
                    ))}
                </div>
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-50 font-semibold text-lg'>Cart is empty.</div>
                )}
                { cartItems.length > 0 ?
                <div className='w-full gap-3 flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-end justify-center px-8 py-2'>
                    <div className='w-full flex flex-col items-center justify-center px-8 py-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-300 text-lg'>Sub Total</p>
                        <p className='text-gray-300 text-lg'>{"\u20B9"} {tot}</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-300 text-lg'>Delivery</p>
                        <p className='text-gray-300 text-lg'>{"\u20B9"} 29</p>
                    </div>

                    <div className='w-full border-b border-gray-600'></div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-300 text-lg'>Total</p>
                        <p className='text-gray-300 text-lg'>{"\u20B9"} {tot + 29}</p>
                    </div>
                    </div>
                    {
                        user ? (
                            <motion.button whileTap={{scale: 0.85}} className='w-full h-auto flex justify-center items-center bg-gradient-to-t mb-4 from-orange-500 to-orange-700 rounded-full'>
                        <p className=' text-white py-2 text-lg uppercase'>Check out</p>
                    </motion.button>
                        ) : (<motion.button whileTap={{scale: 0.85}} className='w-full h-auto flex justify-center items-center bg-gradient-to-t mb-4 from-orange-500 to-orange-700 rounded-full'>
                        <p onClick={login} className=' text-white py-2 text-lg uppercase'>Login to checkout</p>
                    </motion.button>)
                    }
                </div>: <div></div> }
            </div>

        </motion.div>
    )
}

export default CartContainer
