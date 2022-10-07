import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {storage} from '../firebase.config';


import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';

import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank } from 'react-icons/md';
import { categories, vegns } from './utils/data';
import Loader from './Loader';
import { saveItem } from './utils/firebaseFunctions';

const CreateContainer = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [vegn, setVegn] = useState(null);
    const [fields, setFields] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);
    const [alertSts, setAlertSts] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [{ foodItems }, dispatch] = useStateValue();

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true);
            setMsg('Error while uploading: Try again!');
            setAlertSts('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);

            }, 4000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                setFields(true);
                setMsg('Image uploaded successfully!');
                setAlertSts('success')
                setTimeout(() => {
                    setFields(false);
                }, 4000)
            })
        })
    }
    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('Image deleted successfully!');
                setAlertSts('success')
                setTimeout(() => {
                    setFields(false);
                }, 4000)
        })
    }   
    const saveDetails = () => {
        setIsLoading(true);
        try {
            if(!title || !price || !category || !imageAsset){
            setFields(true);
            setMsg('Required fields can not be empty!');
            setAlertSts('danger');
            setTimeout(() => {
                setFields(false);
            setIsLoading(false);
            }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    vegn: vegn,
                    price: price,
                    qty: 1,
                };
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                console.log(data);
                setMsg('Data uploaded Successfully!');
                setAlertSts('success');
                clearData();
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setIsLoading(false);
            setMsg('Error while uploading: Try again!');
            setAlertSts('danger');
            setTimeout(() => {
                setFields(false);

            }, 4000);
        }

        fetchData();
    };

    const clearData = () =>{
        setTitle('');
        setImageAsset(null);
        setPrice("");
        setCategory('others');
        setVegn('');
    };

    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            dispatch({
                type : actionType.SET_FOOD_ITEMS,
                foodItems : data,
            })
        })

        console.log('hello');
    }

    return (
        <div className='w-full h-auto min-h-screen flex items-center justify-center '>
            <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex gap-4 flex-col items-center justify-center '>
                {
                    fields && (
                        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={`w-full p-2 rounded-lg text-center font-semibold ${alertSts === 'danger' ? 'bg-red-300 text-red-800' : 'bg-emerald-200 text-emerald-800'}`}>
                            {msg}
                        </motion.p>
                    )
                }

                <div className='w-full py-2 border-b border-gray-300 flex items-center justify-center gap-2'>
                    <MdFastfood />
                    <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Name of the Food item..." className='w-full bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor' />
                </div>

                <div className='w-full'>
                    <select className='w-full bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor py-2 flex items-center justify-center gap-2' onChange={(e) => setVegn(e.target.value)}>
                        
                        { vegns && vegns.map(itm => (
                            <option key={itm.id} value={itm.urlParamName}>{itm.name}</option>
                        )) }
                    </select>
                </div>

                <div className='w-full'>
                    <select className='w-full bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor py-2 flex items-center justify-center gap-2' onChange={(e) => setCategory(e.target.value)}>
                        
                        { categories && categories.map(item => (
                            <option key={item.id} value={item.urlParamName}>{item.name}</option>
                        )) }
                    </select>
                </div>

                <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-500 w-full h-225 md:h-420 cursor-pointer rounded-lg'>{
                    isLoading ? <Loader/> : <div>
                        {!imageAsset ? (<>
                        <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                            <div className=' gap-2 w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700'>
                                <MdCloudUpload className=' text-3xl '/>
                                <p>Click here to upload a picture.</p>
                            </div>
                            <input type="file" name="uploadimage" id="uploadimage" accept='image/*' onChange={uploadImage} className='w-0 h-o' />
                        </label>
                        </>) : (
                            <>
                            <div className='relative h-full'><img src={imageAsset} alt="uploaded image" className='h-48 w-48 ' />
                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-150 transition-all ease-in-out' onClick={deleteImage}>
                                <MdDelete className='text-white'/></button></div>
                            </>
                        )}
                    </div>
                }</div>
                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full py-2 border-b border-gray-400 flex items-center gap-2'>
                        {'\u20B9'}
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder='Price' className='w-full bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor' />
                    </div>
                </div>
                <div className='flex items-center w-full'>
                    <button type='button' className='ml-0 md:ml-auto md:w-auto w-full border-none outline-none bg-orange-500 px-12 py-2 rounded-lg text-lg text-white font-semibold hover: shadow-md hover:bg-orange-600' onClick={saveDetails}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateContainer
