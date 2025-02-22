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
import {useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard"},
    {
        key: "/me",
        label: "用户模块",
        icon: <UsergroupDeleteOutlined />,
        children: [
            {key: "/user", label: "用户列表", icon: <UserOutlined />},
            {key: "/menu", label: "菜单管理", icon: <MailOutlined />},
            {key: "/role", label: "角色管理", icon: <SolutionOutlined />},
            {key: "/dept", label: "部门管理", icon: <LaptopOutlined />},
        ],
    },
];

function Menu() {
    const {collapsed} = useStore();
    const navigate = useNavigate();
    const [currentMenu, setCurrentMenu] = useState(location.pathname);

    const menuClick = ({ key }: { key: string }) => {
        navigate(key);
        setCurrentMenu(key);
    };
    return (
        <div className={styles.navHeader}>
            <div className={styles.logo}>
                <img src="/imgs/logo.png" className={styles.img} alt="" />
                {collapsed ? "" : <span>企业中台</span>}
            </div>
            <MenuCom
                items={items}
                defaultSelectedKeys={[currentMenu]}
                defaultOpenKeys={["/me"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onClick={menuClick}
            />
        </div>
    );
}

export default Menu;