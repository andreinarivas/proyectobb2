/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'white': '#FFFBFA',
        'black':'#1B1B1E',
        'blue':'#729EA1',
        'yellow':'#F6AE2D'

      }, 
      
    },
    
    
  },
  plugins: [],
}

