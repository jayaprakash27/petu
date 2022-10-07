import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdAddShoppingCart } from "react-icons/md";
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';


const RowContainer = ({ data }) => {

  
  const [items, setItems] = useState([]);

  
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
  });
  localStorage.setItem('cartItems', JSON.stringify(items));
  }

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      className={` bg-orange-50 scroll-smooth flex gap-8 p-4 w-full min-h-[280px] my-12 overflow-x-hidden scrollbar-none justify-center flex-wrap
      `}
    >
      {data &&
        data.map((item) => (
          <div key={item.id} className="w-full flex justify-between flex-col min-w-[280px] md:w-300 md:min-w-[300px] h-auto bg-cardOverlay rounded-lg p-4 gap-2 shadow-md backdrop-blur-xl hover:bg-gray-200 transition-all duration-150 ease-in-out">
            <div className=" w-full gap-4 flex items-center justify-between bg-transparent">
              <img
                src={item.imageURL}
                alt={item.title}
                className=" max-w-[150px] hover:scale-110 transition-all ease-in-out duration-75 max-h-40 drop-shadow-lg"
              />
              <motion.div
                whileTap={{ scale: 0.7 }}
                onClick={ () => 
                  setItems([...cartItems, item])}
                className="w-10 h-10 flex justify-center items-center text-white hover:bg-orange-600 cursor-pointer hover:shadow-md transition-all duration-100 rounded-full bg-orange-500"
              >
                <MdAddShoppingCart />
              </motion.div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex gap-2 items-start justify-center">
                <div className={`w-[20px] flex justify-center items-center h-[20px] border ${item.vegn === 'nonveg' ? 'border-red-600' : item.vegn === 'egg' ? 'border-yellow-600' : 'border-green-600'} bg-transparent`}>
                <div className={`w-[8px] h-[8px] rounded-full ${item.vegn === 'nonveg' ? 'bg-red-600' : item.vegn === 'egg' ? 'bg-yellow-600' : 'bg-green-600'}`}>
                </div>
                </div>
                {
                  item.vegn === 'nonveg' ? "Non Veg" : (item.vegn === 'egg' ? 'Only Egg' : 'Veg')
                }
              </div>
            <div className="w-full flex flex-col items-end justify-center">
              <p className="text-textColor font-semibold text-base md:text-md">
                {item.title}
              </p>
              <p className="text-lg font-semibold text-headingColor">
                
                {"\u20B9"} {item.price}
              </p>
            </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
