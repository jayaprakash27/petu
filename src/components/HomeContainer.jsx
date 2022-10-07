import React, { useState, useEffect } from "react";
import MainContainer from "./MainContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "./context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const HomeContainer = () => {
  const [{ foodItems, user, cartShow }, dispatch] = useStateValue();
  const [filterr, setFilterr] = useState("beverages");
  const [messg, setMessg] = useState("Hello");
  const [meal, setMeal] = useState("Dinner");


  const lunchF = ['thali', 'biryani'];
  const breakF = ['insnacks'];
  const evenF = ['chinese','pizza', 'burger'];
  const dinnerF = ['mainc', 'biryani'];

  useEffect(() => {
    var hour = new Date().getHours();
    if((hour >= 5)  && (hour <= 11)){
        setMessg('Good Morning');
        setFilterr(breakF[Math.floor(Math.random() * breakF.length)]);
        setMeal('Breakfast');
    } else if((hour >= 12) && (hour <=16)){
        setMessg('Good Afternoon');
        setFilterr(lunchF[Math.floor(Math.random() * lunchF.length)]);
        setMeal('Lunch');
    } else if((hour >= 17) && (hour <=20)){
        setMessg('Good Evening');
        setFilterr(evenF[Math.floor(Math.random() * evenF.length)]);
        setMeal('Evening snacks');
    } else if((hour >= 21)) {
        setMessg('Good Evening');
        setFilterr(dinnerF[Math.floor(Math.random() * dinnerF.length)]);
        setMeal('dinner');
    } else {
      setMessg('Good Evening');
      setFilterr('');
      setMeal('none');
  }
}, [user]);

useEffect(() => {}, [cartShow]);

  return (
    <div className="w-auto h-auto flex flex-col justify-center">
      <MainContainer />
      <section className="w-full p-4 relative top-8">
        <div className="w-full flex items-center justify-between">
          <p className=" text-xl font-semibold capitalize relative text-gray-800 before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-100">
            {messg}, {user?.displayName} ! 
            {(meal == 'none') ? " We only deliver cold drinks at this hour!" :`Here's our recommendation for your ${meal}. ${(meal == 'dinner') ? "Please add your preferred bread from breads section" : ""}`}
            
            
          </p>
        </div>
        <RowContainer
          data = {foodItems?.filter((n) => (n.category === filterr)).sort(() => 0.5 - Math.random()).slice(0, 1).concat(foodItems?.filter((n) => (n.category === 'beverages')).sort(() => 0.5 - Math.random()).slice(0, 1))}
        />
      </section>
      {(meal == 'none') ? "" : 
      <MenuContainer id='menu' />}
      { cartShow && (
      <CartContainer />) }
      <div className="flex flex-col text-center">
      Developed by <a  target="__blank" className="text-blue-700 underline-offset-2" href="https://www.linkedin.com/in/jayaprakash-sahoo-759052202/">Jayaprakash Sahoo</a>
      </div>
      </div>
  );
};

export default HomeContainer;
