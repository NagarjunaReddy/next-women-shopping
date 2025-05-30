// global styles
import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/chatbot.scss";

// types
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import React, { Fragment } from "react";

import { wrapper } from "../store";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
console.log('is Prod:::', isProduction);
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--main-font",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <style jsx global>{`
      :root {
        --main-font: ${poppins.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </Fragment>
);

export default wrapper.withRedux(MyApp);
