import {ComponentType, JSX, Suspense} from "react";
import {Spin} from "antd";

const lazyLoad = (Component: ComponentType): JSX.Element => {
    return (
        <Suspense fallback={<Spin size="small" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} />}>
            <Component />
        </Suspense>
    );
};

export default lazyLoad;