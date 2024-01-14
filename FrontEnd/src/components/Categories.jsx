import React from "react";

function Categories() {
  return (
    <section className="my-4">
      <h1 className="text-slate-gray m-0 text-4xl font-montserrat font-medium max-sm:text-2xl">
        Categories
      </h1>
      <div className="flex flex-row gap-8 flex-wrap justify-center items-center m-4">
        <img
          src="./assets/categories/child.jfif"
          alt=""
          srcSet=""
          className="w-[350px;] h-[575px;] max-sm:w-full max-sm:h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:pointer"
        />
        <img
          src="./assets/categories/men.jfif"
          alt=""
          srcSet=""
          className="w-[350px;] h-[575px;] max-sm:w-full max-sm:h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:pointer"
        />
        <img
          src="./assets/categories/women.jfif"
          alt=""
          srcSet=""
          className="w-[350px;] h-[575px;] max-sm:w-full max-sm:h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:pointer"
        />
      </div>
    </section>
  );
}

export default Categories;
