import styles from "./index.module.less";
import {Menu as MenuCom, MenuProps} from "antd";
import {useStore} from "../../store";
import {useState} from "react";
import {
    HomeOutlined,
    LaptopOutlined,
    MailOutlined,
    SolutionOutlined,
    UsergroupDeleteOutlined, UserOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard"},
    {
        key: "/user",
        label: "用户模块",
        icon: <UsergroupDeleteOutlined />,
        children: [
            {key: "/userList", label: "用户列表", icon: <UserOutlined />},
            {key: "/menuList", label: "菜单管理", icon: <MailOutlined />},
            {key: "/roleList", label: "角色管理", icon: <SolutionOutlined />},
            {key: "/deptList", label: "部门管理", icon: <LaptopOutlined />},
        ],
    },
];

function Menu() {
    const {collapsed} = useStore();
    const [currentMenu, setCurrentMenu] = useState("1");

    const menuClick = () => {
    };
    return (
        <div className={styles.navHeader}>
            <div className={styles.logo}>
                <img src="/imgs/logo.png" className={styles.logo} alt="" />
                {collapsed ? "" : <span>企业中台</span>}
            </div>
            <MenuCom
                items={items}
                defaultSelectedKeys={[currentMenu]}
                defaultOpenKeys={["/user"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onClick={menuClick}
            />
        </div>
    );
}

export default Menu;