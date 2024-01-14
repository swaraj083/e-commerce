import Slider from "./Slider";
import { useSelector } from "react-redux";

function ProductSlider() {
  
  const {iconicProducts} = useSelector((state)=> state.product)
  return (
    <section>
      <h1 className="text-slate-gray m-0 text-4xl font-montserrat font-medium max-sm:text-2xl">
        Always Iconic
      </h1>
      <Slider sliderProducts={iconicProducts} />
    </section>
  );
}

export default ProductSlider;
