import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import {fileURLToPath} from "url";
import {visualizer} from "rollup-plugin-visualizer";
import inspect from "vite-plugin-inspect";
import * as path from "node:path";
import * as fs from "node:fs";

// 预加载添加了懒加载的路由的文件
function prefetchLazyPlugins() {
    return {
        name: "vite-plugin-prefetch-lazy",
        closeBundle() {
            // 读取 index.html 文件内容
            const htmlPath = path.resolve("dist/index.html");
            const html = fs.readFileSync(htmlPath, "utf-8");
            // 避免重复添加
            if(html.includes("prefetch")) return;

            // 需要预加载的文件路径
            const needPrefetchFiles = ["src/views/user/index.tsx", "src/views/role/index.tsx", "src/views/dept/index.tsx"];
            // 对应的实际打包后的js文件路径
            const prefetchUrls: string[] = [];

            // 读取 manifest 文件内容
            const manifestPath = path.resolve("dist/.vite/manifest.json");
            if(!manifestPath) return;
            const manifestJson = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
            if(!manifestJson) return;

            // 找到需要预加载的文件路径
            needPrefetchFiles.forEach((file) => {
                if(manifestJson[file]?.file) prefetchUrls.push("/" + manifestJson[file].file);
            });

            if (prefetchUrls.length === 0) return;

            let prefetchStr = "";
            let isFirst = true;
            prefetchUrls.forEach((url) => {
                prefetchStr += isFirst ? "  " : "    ";
                prefetchStr += `<link rel="prefetch" as="script" href="${url}">\r\n`;
                isFirst = false;
            });

            // 添加到 head 标签最后
            const newHtml = html.replace("</head>", `${prefetchStr}</head>`);
            // 重新写入 index.html
            fs.writeFileSync(htmlPath, newHtml);
        }
    };
}

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    console.log(env, "env");
    console.log(mode, "mode");

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
                open: false, // 构建后自动打开报告
            }),
            prefetchLazyPlugins()
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
