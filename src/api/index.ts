import {post} from "../utils/request.ts";
import {ILoginParams} from "../types/api.ts";

export function loginApi(data: ILoginParams) {
    return post("/users/login", data);
}