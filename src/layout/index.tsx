import styles from "./index.module.less";
import {Layout as LayoutCom} from "antd";
import {Outlet} from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import {useStore} from "../store";
import Menu from "./menu";
import {getUserInfoApi} from "../api";
import {useEffect} from "react";

const {Sider} = LayoutCom;

function Layout() {
    const {collapsed, updateUserInfo} = useStore();

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const data = await getUserInfoApi();
        updateUserInfo(data);
    };

    return (
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
    );
}

export default Layout;