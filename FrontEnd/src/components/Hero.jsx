import React from "react";

function Hero() {
  return (
    <section className="flex flex-row flex-wrap justify-center items-center gap-48 h-screen  max-sm:gap-5">
      <div className="flex flex-col items-center gap-10 max-sm:py-5">
        <div className="text-8xl text-center font-black max-sm:text-6xl">
          <p className="m-0 text-coral-red textShadow">Nike</p>
          <p className="m-0 text-slate-gray textShadow">Just Like it</p>
        </div>
        <button className="w-fit text-xl px-4 py-2 text-white-400 bg-coral-red rounded-full hover:pointer max-sm:text-md">
          Shop Now
        </button>
      </div>
      <div className="w-96 h-96 bg-blue-200 relative rounded-lg shadow-lg max-sm:static max-sm:w-60 max-sm:h-60  max-sm:flex max-sm:flex-row max-sm:justify-center max-sm:items-center max-sm:gap-0">
        <img
          src="./assets/Nike-sneakers-shoes_1920x1200-removebg-preview.png"
          className="absolute -left-1/2 top-[20%;] w-full max-sm:static max-sm:w-80 max-sm:left-0 max-sm:top-0 reflection"
        />
      </div>
    </section>
  );
}

export default Hero;
