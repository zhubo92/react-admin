import styles from "./index.module.less";
import {Button, Dropdown, MenuProps} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import storage from "../../utils/storage.ts";
import {useStore} from "../../store";

function Header() {
    const {collapsed, updateCollapsed} = useStore();
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

    const onClick = ({key}: {key: string}) => {
        if(key === "logout") {
            storage.remove("token");
            location.href = "/login";
        }
    };

    const toggleCollapsed = () => {
        updateCollapsed();
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
                <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                    <span className={styles.nickName}>admin</span>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;