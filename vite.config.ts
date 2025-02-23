import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/mock/api": {
                target: "https://apifoxmock.com/m1/4599451-4249023-default",
                // target: "https://apifoxmock.com/m1/5899467-5586324-default",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/mock/, ""),
            }
        }
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
