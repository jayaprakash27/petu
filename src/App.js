import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header, CreateContainer, HomeContainer } from './components';
import { useStateValue } from './components/context/StateProvider';
import { getAllFoodItems } from './components/utils/firebaseFunctions';
import { actionType } from './components/context/reducer';

const App = () => {
    const [{ foodItems }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            dispatch({
                type : actionType.SET_FOOD_ITEMS,
                foodItems : data,
            })
        })
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <AnimatePresence exitBeforeEnter>
            <div className='w-screen  overflow-hidden h-auto flex flex-col bg-primary' >
            <Header />

            <main className='mt-24 p-8 w-full'>
                <Routes>
                    <Route path='/*' element={<HomeContainer />} />
                    <Route path='/createItem' element={<CreateContainer />} />
                </Routes>
            </main>
        </div>
        </AnimatePresence>
    )
}

export default App
