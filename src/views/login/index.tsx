import {Button, Form, Input} from "antd";
import {loginApi} from "../../api";
import {ILoginParams} from "../../types/api.ts";
import storage from "../../utils/storage.ts";
import styles from "./index.module.less";

function Login() {
    const onFinish = async (values: ILoginParams) => {
        const data = await loginApi(values);
        console.log(data);
        storage.set("token", data);
    };
    return <div className={styles.login}>
        <div className={styles.loginWrapper}>
            <div className={styles.title}>系统登录</div>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Please input your username!"}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" block htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>;
}

export default Login;