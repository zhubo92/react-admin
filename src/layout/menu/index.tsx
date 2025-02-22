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
    {key: "/dashboard", icon: <HomeOutlined />, label: "仪表盘"},
    {
        key: "/person",
        label: "人员模块",
        icon: <UsergroupDeleteOutlined />,
        children: [
            {key: "/user", label: "用户管理", icon: <UserOutlined />},
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
        <div className={styles.menu}>
            <div className={styles.logo}>
                <div className={styles.img}>
                    <img src="/imgs/logo.png" alt="" />
                </div>
                {collapsed ? "" : <div>企业中台</div>}
            </div>
            <MenuCom
                items={items}
                defaultSelectedKeys={[currentMenu]}
                defaultOpenKeys={["/person"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onClick={menuClick}
            />
        </div>
    );
}

export default Menu;