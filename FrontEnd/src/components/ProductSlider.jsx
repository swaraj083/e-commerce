import Slider from "./Slider";
import { useSelector } from "react-redux";

function ProductSlider() {
  
  const {iconicProducts} = useSelector((state)=> state.product)
  return (
    <section className="px-8 py-8">
      <h1 className="text-blue-400 mb-8 text-6xl text-center font-montserrat font-bold textShadow max-sm:text-4xl">
        Always Iconic
      </h1>
      <Slider sliderProducts={iconicProducts} />
    </section>
  );
}

export default ProductSlider;
