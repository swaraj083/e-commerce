import React from "react";

function Footer() {
  return (
    <footer className="relative bg-slate-950 mt-4 flex flex-row justify-between text-slate-50 px-10 py-20 max-sm:flex-col max-sm:gap-y-5">
      <div className="flex flex-row justify-center w-3/4 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:w-full max-sm:gap-y-5">
        <div className="text-lg w-1/3 text-center max-sm:w-full">
          <p>
            <b>Find a Store</b>
          </p>
          <p>
            <b>Become a Member</b>
          </p>
          <p>
            <b>Send us a Feedback</b>
          </p>
        </div>
        <div className="text-lg w-1/3 text-center max-sm:w-full">
          <p>
            <b>Get Help</b>
          </p>
          <p>Order Status</p>
          <p>Delivery</p>
          <p>Returns</p>
          <p>Payment Options</p>
          <p>Contact Us</p>
        </div>
        <div className="text-lg w-1/3 text-center max-sm:w-full">
          <p>
            <b>About Nike</b>
          </p>
          <p>News</p>
          <p>Careers</p>
          <p>Investors</p>
          <p>Sustainability</p>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2 mr-10 max-sm:items-center">
        <img
          src="./assets/icons/facebook.svg"
          alt="facebook"
          className="p-2 w-10 h-10 bg-slate-gray hover:bg-slate-50 rounded-full hover:pointers"
        />
        <img
          src="./assets/icons/instagram.svg"
          alt="instagram"
          className="p-2 w-10 h-10 bg-slate-gray hover:bg-slate-50 rounded-full hover:pointers"
        />
        <img
          src="./assets/icons/twitter.svg"
          alt="twitter"
          className="p-2 w-10 h-10 bg-slate-gray hover:bg-slate-50 rounded-full hover:pointers"
        />
      </div>
      <div className="absolute bottom-2 left-2 flex flex-row gap-1 max-sm:static text-center">
        <p className="text-sm">
          <img
            src="./assets/icons/copyright-sign.svg"
            alt="copyright"
            className="inline"
          />{" "}
          2023 Nike, Inc. All Rights Reserved By Devil030503
        </p>
      </div>
    </footer>
  );
}

export default Footer;
