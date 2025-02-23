import styles from "./index.module.less";
import {Button, Dropdown, MenuProps, Switch} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import storage from "../../utils/storage.ts";
import {useStore} from "../../store";

function Header() {
    const {collapsed, updateCollapsed, isDark, updateTheme} = useStore();
    const items: MenuProps["items"] = [
        {
            key: "email",
            label: "邮箱：zhubo0327@gmail.com",
        },
        {
            key: "logout",
            label: "退出",
        },
    ];

    const onClick = ({key}: { key: string }) => {
        if (key === "logout") {
            storage.remove("token");
            location.href = "/login";
        }
    };

    const toggleCollapsed = () => {
        updateCollapsed();
    };

    const handleSwitch = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.dataset.theme = "dark";
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.dataset.theme = "light";
            document.documentElement.classList.remove("dark");
        }
        updateTheme(isDark);
    };

    return (
        <div className={styles.navHeader}>
            <div className={styles.left}>
                <div>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapsed}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <Switch checkedChildren="暗黑" unCheckedChildren="明亮" style={{marginRight: "20px"}} checked={isDark} onChange={handleSwitch} />
                <Dropdown menu={{items, onClick}} trigger={["click"]}>
                    <span className={styles.nickName}>admin</span>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;