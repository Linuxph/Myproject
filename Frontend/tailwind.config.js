export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          zoomRotateIn: {
            '0%': { transform: 'scale(1) rotate(0deg)', filter:'blur(0px)', opacity:1 },
            '50%':{transform: 'scale(9) rotate(180deg)', filter:'blur(10px)', opacity:0},
            '100%': { transform: 'scale(1) rotate(360deg)', filter:'blur(0px)', opacity:1 },
          },
          zoomRotateOut: {
            '0%': { transform: 'scale(1) ' },
            '50%':{transform: 'scale(9) '},
            '100%': { transform: 'scale(1) ' },
          },
        },
        animation: {
          zoomRotateIn: 'zoomRotateIn 4s ease-in-out forwards',
          zoomRotateOut: 'zoomRotateOut 4s ease-in-out forwards',
        },
      },
    },
    plugins: [],
  }