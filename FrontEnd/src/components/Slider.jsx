import { useState } from "react";
import { Link } from "react-router-dom";

function Slider({sliderProducts}) {
  const host=process.env.SERVER_URL+"/uploads/";;
  const [curLastIndex, setCurLastIndex] = useState(3);
  const len = sliderProducts.length;

  const leftSlideHandler = (e) => {
    if (!(curLastIndex <= 3)) {
      setCurLastIndex(curLastIndex - 1);
    }
  };

  const rightSlideHandler = (e) => {
    if (!(curLastIndex >= len)) {
      setCurLastIndex(curLastIndex + 1);
    }
  };

  return (
    <>
      {sliderProducts.length > 0 && (
        <div className="flex flex-row justify-center items-center gap-5 my-4">
          <button
            className="chevron bg-white-400 w-20 h-20 flex justify-center items-center rounded-full max-sm:hidden shadow-md"
            onClick={leftSlideHandler}
          >
            {curLastIndex > 3 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="30"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            )}
            {curLastIndex <= 3 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="30"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#9a9da2"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            )}
          </button>
          <div className="overflow-hidden w-[924px;] max-sm:overflow-x-scroll max-sm:w-full">
            <div
              className="flex flex-row nowrap gap-2 transition duration-1000 ease-in-out"
              style={{
                transform: `translateX(${(curLastIndex - 3) * -308}px)`,
              }}
            >
              {sliderProducts.length > 0 &&
                sliderProducts.map((item) => {
                  return (
                    <Link key={item._id} to={`product/${item._id}`}  className="w-[300px] h-[300px] max-sm:w-80 max-sm:h-80">
                    <img
                      key={item.id}
                      src={host+item.thumbnail}
                      alt={item.name}
                      className="w-[300px] max-w-[300px] h-[300px] max-h-[300px] max-sm:w-80 max-sm:h-80 box-border shadow-md"
                    />
                    </Link>
                  );
                })}
            </div>
          </div>
          <button
            className="bg-white-400 w-20 h-20 flex justify-center items-center rounded-full max-sm:hidden shadow-md"
            onClick={rightSlideHandler}
          >
            {curLastIndex < len && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="30"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            )}

            {curLastIndex === len && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="30"
                viewBox="0 0 320 512"
              >
                <path
                  fill="#9a9da2"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default Slider;
