/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        WHITE: '#f7f7f7',
        BLACK: '#2b2b2b',
        RED: {
          DEFAULT: '#fb568a',
          100: '#fde2e8',
          200: '#fbb6c9',
          300: '#fb8aa9',
          400: '#fb5d8a',
          500: '#fb568a',
          600: '#fb4e7a',
          700: '#fb4469',
          800: '#fb3b59',
          900: '#fb3148',
        },
        YELLOW: {
          DEFAULT: '#fbcd50',
          100: '#fef8e2',
          200: '#fdf1c5',
          300: '#fceaa8',
          400: '#fce38b',
          500: '#fbcd50',
          600: '#f9b84b',
          700: '#f7a346',
          800: '#f58e41',
          900: '#f37a3c',
        },
        BLUE: {
          DEFAULT: '#34dcdd',
          100: '#e6fafa',
          200: '#bfeff0',
          300: '#99e5e6',
          400: '#73dbdc',
          500: '#34dcdd',
          600: '#2fb8c8',
          700: '#2a94b3',
          800: '#25709e',
          900: '#205c89',
        },
        PURPLE: {
          DEFAULT: '#965efd',
          100: '#f0e9fc',
          200: '#d5c9f9',
          300: '#baa8f6',
          400: '#9f88f3',
          500: '#965efd',
          600: '#7c4de9',
          700: '#623cd5',
          800: '#482bc1',
          900: '#2e1aae',
        },
      },
      animation: {
        'fade-in':
          'fade-in 0.75s cubic-bezier(0.190, 1.000, 0.220, 1.000) both',
        'slide-text-left-1': 'slide-text-left-1 14s linear infinite',
        'slide-text-left-2': 'slide-text-left-2 12s linear infinite',
        'slide-text-left-3': 'slide-text-left-3 10s linear infinite',
        'slide-text-left-4': 'slide-text-left-4 8s linear infinite',
        'slide-text-left-5': 'slide-text-left-5 6s linear infinite',
        'slide-text-right-1': 'slide-text-right-1 14s linear infinite',
        'slide-text-right-2': 'slide-text-right-2 12s linear infinite',
        'slide-text-right-3': 'slide-text-right-3 10s linear infinite',
        'slide-text-right-4': 'slide-text-right-4 8s linear infinite',
        'slide-text-right-5': 'slide-text-right-5 6s linear infinite',
        'puff-out-center':
          'puff-out-center 1.5s cubic-bezier(0.190, 1.000, 0.220, 1.000) both',
        'fade-out':
          'fade-out 0.75s cubic-bezier(0.190, 1.000, 0.220, 1.000) both',
        'clip-in-left':
          'clip-in-left 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000) both',
        'clip-in-right':
          'clip-in-right 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000) both',
        'shake-vertical':
          'shake-vertical 25s cubic-bezier(0.455, 0.030, 0.515, 0.955) both infinite',
        'scale-up-center':
          'scale-up-center 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both',
        'zoom-in-center':
          'zoom-in-center 0.7s cubic-bezier(0.190, 1.000, 0.220, 1.000) both',
        'zoom-out-center':
          'zoom-out-center 0.7s cubic-bezier(0.190, 1.000, 0.220, 1.000) both',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        'slide-text-left-1': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-left-2': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-left-3': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-left-4': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-left-5': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-left-6': {
          '0%': {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'slide-text-right-1': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'slide-text-right-2': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'slide-text-right-3': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'slide-text-right-4': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'slide-text-right-5': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'slide-text-right-6': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'puff-out-center': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
            filter: 'blur(8px)',
          },
          to: {
            transform: 'scale(1)',
            opacity: '1',
            filter: 'blur(0px)',
          },
        },
        'clip-in-left': {
          '0%': {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
          },
          to: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        'clip-in-right': {
          '0%': {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          },
          to: {
            clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
          },
        },
        'shake-vertical': {
          '0%,to': {
            transform: 'translateY(0)',
          },
          '10%,30%,50%,70%': {
            transform: 'translateY(-15px)',
          },
          '20%,40%,60%': {
            transform: 'translateY(15px)',
          },
          '80%': {
            transform: 'translateY(13.4px)',
          },
          '90%': {
            transform: 'translateY(-13.4px)',
          },
        },
        'scale-up-center': {
          '0%': {
            transform: 'scale(0.5)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
        'zoom-in-center': {
          '0%': {
            transform: 'scale(1)',
          },
          to: {
            transform: 'scale(1.1)',
          },
        },
        'zoom-out-center': {
          '0%': {
            transform: 'scale(1.1)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-animation-delay'),
    nextui(),
  ],
  daisyui: {
    themes: ['light'],
  },
};
