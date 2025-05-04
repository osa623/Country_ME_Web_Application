module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2b3945',
        secondary: '#202c37',
        light: '#fafafa',
        dark: '#111517',
      },

      fontFamily:{

      poppins: ['Poppins', 'sans-serif'],
      russoone: ['Russo One', 'sans-serif'],
      kdamThmorPro: ['Kdam Thmor Pro', 'sans-serif'],
      lorniasolid:['Londrina Solid', 'sans-serif'],
      bebasneue:['Bebas Neue', 'sans-serif'],
      bricolagegrotesque:['Bricolage Grotesque', 'sans-serif'],
      kanit:['Kanit', 'sans-serif'],
      dmsans:['DM Sans', 'sans-serif'],
      londrina:['Londrina Solid', 'sans-serif'],
      atma:['Atma', 'sans serif']

    },

    screens: {
      'sms': { 'min': '10px', 'max': '640px' },
      'mds': { 'min': '640px', 'max':'1024px'},
      'lgs': { 'min': '1025px' ,'max':'9000px'}
    
    },
    },
  },
  plugins: [],
}
