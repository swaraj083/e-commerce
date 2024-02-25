import React, { useEffect } from "react";
import {
  Hero,
  OfferBanner,
  Featured,
  ProductSlider,
  Categories,
} from "../components";
import { fetchAllProducts, fetchIconicProductAndFeatured } from "../redux/features/product/productSlice"
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const { featured, iconicProducts, featuredAndIconicStatus,allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIconicProductAndFeatured())
    dispatch(fetchAllProducts());
  }, [])

  return (<>
    {featuredAndIconicStatus !== "loading" && <div>
      <Hero products={allProducts} />
      {/* <OfferBanner /> */}
      {featured?.length > 0 && <Featured items={featured} />}
      {iconicProducts?.length > 0 && <ProductSlider />}
      {/* <Categories /> */}
    </div>
    }
    </>
  );
}

export default Home;
