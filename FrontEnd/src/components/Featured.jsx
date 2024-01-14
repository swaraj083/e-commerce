import React from "react";
import { Link } from "react-router-dom";

function Featured({ items }) {
  const host="http://localhost:5000/uploads/";
  return (
    <section className="my-4">
      <h1 className="text-slate-gray m-0 text-4xl font-montserrat font-medium max-sm:text-2xl">
        Featured
      </h1>
      <div className="flex flex-row gap-8 flex-wrap justify-center items-center m-4">
        {
          items.map((item) => {
            return (
              <Link key={item._id} to={item.destURL}>
                <img
                  src={host+item.thumbnail}
                  alt={item.title}
                  srcSet=""
                  className="w-[350px;] h-[575px;] max-sm:w-full max-sm:h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                />
              </Link>
            )
          })
        }
      </div>
    </section>
  );
}

export default Featured;
