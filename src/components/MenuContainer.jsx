import React, { useEffect, useState } from "react";
import { categories } from "./utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "./context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("pizza");
  
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);
  return (
    <section className="w-full p-4 relative top-8" id="menu">
      <div className="w-full flex items-center">
        <p className=" text-xl font-semibold capitalize relative text-gray-800 before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-100">
          Our hot dishes for your LARGE cravings!
        </p>
      </div>

      <div className="flex w-full items-center justify-start lg:justify-center gap-8 mt-6 overflow-x-scroll scrollbar-none">
        {categories &&
          categories.map((category) => (
            <motion.div
              whileTap={{ scale: 0.7 }}
              key={category.id}
              onClick = {() => setFilter(category.urlParamName)}
              className={`group px-2 ${
                filter === category.urlParamName ? "bg-orange-600" : "bg-white"
              } hover:bg-orange-600 min-w-[100px] h-12 m-3 text-center cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center transition-all duration-100 ease-in-out`}
            >
              <div
                className={` ${
                  filter === category.urlParamName
                    ? "text-white"
                    : "text-orange-600"
                } group-hover:text-white`}
              >
                {category.name}
              </div>
            </motion.div>
          ))}

          <div className="w-full">
          </div>
      </div>
      <RowContainer 
            data = {foodItems?.filter((n) => n.category === filter)}
             />
    </section>
  );
};

export default MenuContainer;
