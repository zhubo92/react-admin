import styles from "./index.module.less";
import {Menu as MenuCom, MenuProps} from "antd";
import {useStore} from "../../store";
import {ComponentType, useEffect, useState} from "react";
import * as Icons from "@ant-design/icons";
import {useLocation, useNavigate, useRouteLoaderData} from "react-router-dom";
import * as React from "react";
import {IMenu} from "../../types/api.ts";

type MenuItem = Required<MenuProps>["items"][number];

function Menu() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [menuList, setMenuList] = useState<MenuItem[]>([]);
    const {collapsed, isDark} = useStore();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const data = useRouteLoaderData("layout");

    useEffect(() => {
        const treeMenuList = getTreeMenu(data.menuList);
        setMenuList(treeMenuList);
        setSelectedKeys([pathname]);
    }, []);

    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            label,
            key,
            icon,
            children,
        } as MenuItem;
    }

    function createIcon(name?: string) {
        if (!name) return <></>;
        const customerIcons = Icons as unknown as Record<string, ComponentType>;
        const icon = customerIcons[name];
        if (!icon) return <></>;
        return React.createElement(icon);
    }

    const getTreeMenu = (menuList: IMenu[], treeList: MenuItem[] = []) => {
        menuList.forEach((item) => {
            if (item.menuType === 1 && item.menuState === 1) {
                if (item.buttons) {
                    return treeList.push(getItem(item.menuName, item.path, createIcon(item.icon)));
                }
                treeList.push(
                    getItem(item.menuName, item.path, createIcon(item.icon), getTreeMenu(item.children || []))
                );
            }
        });
        return treeList;
    };

    const menuClick = ({key}: { key: string }) => {
        navigate(key);
        setSelectedKeys([key]);
    };
    return (
        <div className={styles.menu}>
            <div className={styles.logo}>
                <div className={styles.img}>
                    <img src="/imgs/logo.png" alt="" />
                </div>
                {collapsed ? "" : <div>企业中台</div>}
            </div>
            <MenuCom
                items={menuList}
                selectedKeys={selectedKeys}
                mode="inline"
                theme={isDark ? "dark" : "light"}
                inlineCollapsed={collapsed}
                onClick={menuClick}
            />
        </div>
    );
}

export default Menu;