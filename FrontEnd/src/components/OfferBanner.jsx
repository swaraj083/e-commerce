import React from "react";

function OfferBanner() {
  return (
    <section className="relative bg-coral-red text-white-400 flex flex-col justify-center items-center py-10 shadow-xl">
      <p className="text-xl max-sm:text-lg">Kids Carnival</p>
      <p className="text-8xl max-sm:text-6xl">50% OFF*</p>
      <p className="text-xl max-sm:text-lg">on Kids Wear</p>
      <p className="absolute bottom-2 right-2 text-md max-sm:text-sm">
        *T&C Apply
      </p>
    </section>
  );
}

export default OfferBanner;
