/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Orbitron', 'ui-sans-serif', 'system-ui'],
                body: ['Inter', 'ui-sans-serif', 'system-ui'],
                bebas: ['Bebas Neue', 'cursive'],
            },
            animation: {
                'fade-up': 'fade-up 0.6s ease-out both',
                'fade-in': 'fade-in 0.2s ease-out',
                'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
            },
            keyframes: {
                'fade-up': {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3px)' },
                }
            }
        },
    },
    plugins: [],
}
