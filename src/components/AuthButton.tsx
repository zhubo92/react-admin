import {useRouteLoaderData} from "react-router-dom";
import {Button} from "antd";
import {ButtonProps} from "antd/es/button/button";

interface IProps extends ButtonProps {
    auth: string;
}

function AuthButton(props: IProps) {
    const {auth, children} = props;
    const {buttonList} = useRouteLoaderData("layout");


    if (buttonList.includes(auth)) { // 有权限
        return <Button {...props}>{children}</Button>;
    } else { // 无权限
        return <></>;
    }
}

export default AuthButton;