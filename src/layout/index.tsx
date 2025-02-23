import styles from "./index.module.less";
import {Layout as LayoutCom, Watermark} from "antd";
import {Navigate, Outlet, useLocation, useRouteLoaderData} from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import {useStore} from "@/store";
import Menu from "./menu";
import {getUserInfoApi} from "@/api";
import {useEffect} from "react";

const {Sider} = LayoutCom;

function Layout() {
    // 无需权限页面路由
    const staticPathList = ["/welcome", "/login", "/403", "/404"];

    const {collapsed, updateUserInfo} = useStore();
    const {pathname} = useLocation();
    const {menuPathList} = useRouteLoaderData("layout");

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const data = await getUserInfoApi();
        updateUserInfo(data);
    };

    // 无权限访问
    if (menuPathList && !menuPathList.includes(pathname) && !staticPathList.includes(pathname)) {
        return <Navigate to="/403" />;
    }

    return (
        <Watermark content="React 19">
            <LayoutCom style={{minHeight: "100vh"}}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu />
                </Sider>
                <LayoutCom>
                    <Header />
                    <div className={styles.content}>
                        <div className={styles.wrapper}>
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </LayoutCom>
            </LayoutCom>
        </Watermark>
    );
}

export default Layout;