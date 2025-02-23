import {getPermissionListApi} from "../api";
import {getMenuPath} from "../utils";

async function authLoader() {
    const {menuList, buttonList} = await getPermissionListApi();
    const menuPathList = getMenuPath(menuList);

    return {
        menuList,
        menuPathList,
        buttonList
    };
}

export default authLoader;