import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import {fileURLToPath} from "url";
import {visualizer} from "rollup-plugin-visualizer";
import inspect from "vite-plugin-inspect";
import * as path from "node:path";
import * as fs from "node:fs";

// 需要提前请求的文件
const needPrefetchFiles = ["src/views/user/index.tsx", "src/views/role/index.tsx", "src/views/dept/index.tsx"];

const prefetchUrls: string[] = [];

function pushPrefetchUrls() {
    const manifestUrl = path.resolve("dist/.vite/manifest.json");
    if(!manifestUrl) return;
    const manifestJson = JSON.parse(fs.readFileSync(manifestUrl, "utf8"));
    if(!manifestJson) return;
    needPrefetchFiles.forEach((file) => {
         if(manifestJson[file]?.file) prefetchUrls.push("/" + manifestJson[file].file);
    });
    console.log(prefetchUrls, "prefetchUrls");
}

pushPrefetchUrls();

// 提前请求懒加载路由的文件
function prefetchLazyPlugins(paths: string[]) {
    return {
        name: "vite-plugin-prefetch-lazy",
        transformIndexHtml(html: string) {
            if (paths.length === 0) return html;
            let prefetchStr = "";
            paths.forEach((path) => {
                prefetchStr += `<link href="${path}" rel="prefetch" as="script" />`;
            });
            return html.replace("</head>", `${prefetchStr}</head>`);
        }
    };
}

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    console.log(env, "env");

    return {
        build: {
            // 生成 manifest.json 文件，打包文件映射
            manifest: true,
            rollupOptions: {
                output: {
                    // 分包
                    // 把相关依赖打到一个js文件中去
                    manualChunks: {
                        "react-vendor": ["react", "react-dom", "react-router-dom"],
                        "antd-vendor": ["antd"],
                        "echarts-vendor": ["echarts"],
                    }
                }
            }
        },
        plugins: [
            inspect(),
            react(),
            visualizer({
                open: true, // 构建后自动打开报告
            }),
            prefetchLazyPlugins(prefetchUrls)
        ],
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
    };
});
