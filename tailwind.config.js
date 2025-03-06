/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
module.exports = {
  content: { files: ["./src/**/*.{html,js,jsx}"], extract },
  theme: {
    screens:{

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize,
    extend: {
      screens: {
        'xxs': "320px",

        'xs': "375px",

        's':"425px",
      },
      fontFamily: {
        title: ["roboto"],
      },
    },
  },
  plugins: [fluid],
};
