/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
    colors:{
      blue:{
        bg:"#031931",
        grad1:"#394A5B",
        grad2:"#112233",
        grad3:"#5F6C7A"
      },
      green:{
        grad1:"#18BB9C",
        grad2:"#09394B",
        gard3:"#1A8770"
      },
      gray:{
        skill:"#6D7782",
        light:"#D2D2D2"
      },
      gold:"#FAD700",
      
    }
  },
  },
  plugins: [],
}