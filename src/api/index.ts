import {post, get} from "../utils/request.ts";
import {
    ICreateMenuParams,
    ICreateUserParams, IDept, IDeptSearchParams,
    ILoginParams, IMenu, ISearchParams, IUpdateMenuParams,
    IUpdateUserParams,
    IUser,
    IUserSearchParams,
    ResultData
} from "../types/api.ts";

// 登录
export function loginApi(data: ILoginParams) {
    return post("/users/login", data);
}

// 获取用户列表
export function getUserListApi(params: IUserSearchParams) {
    return get<ResultData<IUser>>("/users/list", params);
}

// 创建用户
export function createUserApi(params: ICreateUserParams) {
    return post("/users/create", params);
}

// 创建用户
export function editUserApi(params: IUpdateUserParams) {
    return post("/users/edit", params);
}

// 删除和批量删除用户
export function delUserApi(params: { userIds: number[] }) {
    return post("/users/delete", params);
}

// 获取部门列表
export function getDeptListApi(params: IDeptSearchParams) {
    return get<IDept[]>("/dept/list", params);
}

// 添加部门
export function createDeptApi(params: IDept) {
    return post("/dept/create", params);
}

// 修改部门
export function updateDeptApi(params: IDept) {
    return post("/dept/edit", params);
}

// 删除部门
export function deleteDeptApi(params: { _id: string }) {
    return post("/dept/delete", params);
}

export function getAllUserListApi() {
    return get<IUser[]>("/users/all/list");
}

// 获取角色
export function getRoleListApi() {
    return get("/roles/list");
}

// 菜单模块
// 创建菜单参数
export function createMenuApi(params: ICreateMenuParams) {
    return post("/menu/create", params);
}

// 更新菜单参数
export function updateMenuApi(params: IUpdateMenuParams) {
    return post("/menu/edit", params);
}

// 菜单list
export function getMenuListApi(params?: ISearchParams) {
    return get<IMenu[]>("/menu/list", params);
}

// 删除菜单
export function deleteMenuApi(params: { _id: string }) {
    return post("/menu/delete", params);
}