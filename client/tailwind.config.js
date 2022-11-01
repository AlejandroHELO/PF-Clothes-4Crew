/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            animation: {
                fadeAnim: 'fadeKeyframe 0.5s ease-out',
            },
            keyframes: {
                fadeKeyframe: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}
