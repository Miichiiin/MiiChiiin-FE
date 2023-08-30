/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    options: {
        whitelist: ['antd'], // Giữ các lớp CSS của Antd không bị xóa
      },
};
