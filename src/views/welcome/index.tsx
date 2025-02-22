import styles from "./index.module.less";

function Welcome() {

    return (
        <div className={styles.welcome}>
            <div className={styles.content}>
                <div className={styles.title}>欢迎使用</div>
                <div className={styles.subTitle}>React-admin/18/19企业中台通用管理系统</div>
                <div className={styles.desc}>React19、Zustand 、Antd、TypeScript</div>
            </div>
            <div className={styles.img}></div>
        </div>
    );
}


export default Welcome;