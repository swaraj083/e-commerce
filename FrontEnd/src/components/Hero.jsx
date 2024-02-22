import React, { useRef } from "react";
import { useSelector } from "react-redux";


const host = "http://localhost:5000/uploads/"

const Box = ({top,left,product}) => {
  return (
    <div style={{top:`${top}%`,left:`${left}%`}} className={`absolute overflow-hidden w-60 h-60 bg-blue-300 rounded-2xl transition duration-1000 group hover:scale-110 shadow-xl max-sm:w-24 max-sm:h-24`}>
        <img src={host+product?.thumbnail} className="w-60 h-60 opacity-0 rounded-2xl transition duration-1000 group-hover:opacity-100 group-hover:scale-110 max-sm:w-24 max-sm:h-24" />
      </div>
  )
}

const Hero = () => {
  const {allProducts} = useSelector(state => state.product)
  const positions = [[5,0],[12,52],[70,8],[0,78],[74,50],[42,28],[54,84]]
  const hero = useRef(null);


  const mouseMoveHandler = (e) =>{
    const hero = document.getElementById("hero");
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX/window.innerWidth;
    const yDecimal = mouseY/window.innerHeight;

    const maxX = hero.offsetWidth - window.innerWidth,
        maxY = hero.offsetHeight - window.innerHeight;
  
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
  hero.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })
  }
  return (
    <section className="relative overflow-hidden flex flex-col flex-wrap justify-center items-center gap-2 h-[92vh] text-[500px] font-bold font-montserrat  max-sm:gap-5 max-sm:text-9xl"  onMouseMove={mouseMoveHandler}>
      <h1 className="text-blue-200 textShadow">Nike</h1>
      <h1 className="text-blue-200 textShadow text-center text-6xl md:hidden">Just Like It</h1>
    <section id="hero" className="absolute w-full h-full flex flex-col flex-wrap justify-center items-center gap-2 text-xl">
      { allProducts.length>0 &&
        positions.map((pos,idx)=>{
          return (
            <Box key={idx} top={pos[0]} left={pos[1]} product={allProducts[Math.floor(Math.random(1)*10)]} />
          )
        })
      }
    </section>
    </section>
  );
}

const HeroV0 = () => {
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