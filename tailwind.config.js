/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'custom-gradient': 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      // }
        // backgroundImage: {
        //     'custom-gradient': 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
        //   }
        backgroundImage: {
          'custom-gradient': 'linear-gradient(85.2deg, rgba(23, 53, 39,1) 7.5%, rgba(34,139,34,1) 88.7%)'
      }
      
        
      
    },
  },
  plugins: [],
}

