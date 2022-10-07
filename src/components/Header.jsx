import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import { MdShoppingCart, MdAdd, MdLogout, MdHome, MdMenu, MdInfo, MdContactPage, MdContactMail, MdCall, MdNotes, MdMenuBook, MdShoppingBag, MdShoppingBasket, MdFoodBank, MdFastfood, MdFmdGood } from 'react-icons/md'
import { motion } from 'framer-motion';

import logo from './images/logo.png';
import account from './images/user.png';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';

const Header = () => {


    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);


    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };


    const logOut = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }
    return (
        <header className='fixed w-screen z-50 p-3 px-4 md:p-6 md:px-16 bg-gradient-to-b from-primary to-transparent' >
            {/* desktop */}
            <div className='hidden md:flex w-full h-full justify-between ' >

                <Link to={"./"}>
                    <div onClick={() => setIsMenu(false)} className='flex items-center gap-1 cursor-pointer'>
                        <img src={logo} className='w-16 object-cover' alt="logo" />
                        <p className='text-headingColor font-bold text-xl'>PetU</p>
                    </div>
                </Link>

                <div className='flex items-center justify-between'>
                    <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='flex items-center gap-10' >
                        <Link to={"./"}>
                            {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li> */}
                        </Link>
                        {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li> */}
                        {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About</li> */}
                        {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Contact</li> */}
                    </motion.ul>

                    <motion.div onClick={showCart}  whileTap={{ scale: 0.8 }} className='relative cursor-pointer flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-3xl ml-10 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                        {cartItems && cartItems.length > 0 && (<div className=' absolute -top-5 -right-3 flex items-center justify-center w-8 h-5 rounded-full bg-headingColor' >
                            <p className='text-xs text-white'>{cartItems.length}</p>
                        </div>)}
                    </motion.div>

                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.8 }} src={user ? user.photoURL : account} alt={user?.displayName} className='w-12 object-cover cursor-pointer ml-10 drop-shadow-xl rounded-full'
                            onClick={login}
                        />

                        {
                            isMenu && (
                                <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 bg-gray-100 right-0 top-15'>
                                    {
                                        user && user.email === 'sahoojayaprakash27@gmail.com' && (
                                            <Link to={"./createItem"}>
                                                <p onClick={() => setIsMenu(false)} className=' px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdAdd />New Item </p>
                                            </Link>
                                        )
                                    }

                                    {/* <p onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><HiUser />Account </p> */}

                                    <p className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor bg-gray-200 shadow-md' onClick={logOut} ><MdLogout />Log out </p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='flex md:hidden items-center justify-between' >


            <div className='relative'>
                    <motion.img whileTap={{ scale: 0.8 }} src={user ? user.photoURL : account} alt={user?.displayName} className='w-12 object-cover cursor-pointer drop-shadow-xl rounded-full'
                        onClick={login}
                    />

                    {
                        isMenu && (
                            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 shadow-xl rounded-lg flex flex-col absolute  bg-gray-100 left-0 top-15'>
                                {
                                    user && user.email === 'sahoojayaprakash27@gmail.com' && (
                                        <Link to={"./createItem"}>
                                            <p onClick={() => setIsMenu(false)} className=' px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdAdd />New Item </p>
                                        </Link>
                                    )
                                }

                                <Link to={"./"}>
                                    <li onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdHome />Home</li>
                                </Link>
                                {/* <p onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><HiUser />Account </p> */}
                                {/* <li onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdMenuBook />Menu</li> */}
                                {/* <li onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdInfo />About</li> */}
                                {/* <li onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><MdCall />Contact</li> */}



                                <p className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor  bg-gray-200' onClick={logOut}><MdLogout />Log out </p>
                            </motion.div>
                        )
                    }
                </div>

                <Link to={"./"}>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <img src={logo} className='w-16 object-cover' alt="logo" />
                        <p className='text-headingColor font-bold text-xl'>PetU</p>
                    </div>
                </Link>


                

                <motion.div onClick={showCart} whileTap={{ scale: 0.8 }} className='relative right-4 flex items-center justify-center'>
                    <MdShoppingCart className='text-textColor text-3xl  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                    {cartItems && cartItems.length > 0 && (<div className=' absolute -top-5 -right-3 flex items-center justify-center w-8 h-5 rounded-full bg-headingColor' >
                            <p className='text-xs text-white'>{cartItems.length}</p>
                        </div>)}
                </motion.div>

                
            </div>
        </header>
    )
}

export default Header
