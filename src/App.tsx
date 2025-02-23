import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ConfigProvider, theme} from "antd";
import {useStore} from "./store";

function App() {
    const {isDark} = useStore();
    return (
        <ConfigProvider theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
                colorPrimary: "#1677ff"
            }
        }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export default App; 
