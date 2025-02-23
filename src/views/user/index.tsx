import {Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType} from "antd";
import {delUserApi, getUserListApi} from "../../api";
import {IUser, IUserSearchParams} from "../../types/api.ts";
import {formatTime} from "../../utils";
import {useAntdTable} from "ahooks";
import {useRef, useState} from "react";
import CreateUser from "./CreateUser.tsx";
import SearchForm from "../../components/SearchForm.tsx";
import AuthButton from "../../components/AuthButton.tsx";

function User() {
    const columns: TableColumnsType<IUser> = [
        {
            title: "用户ID",
            dataIndex: "userId",
            key: "userId",
            align: "center"
        },
        {
            title: "用户名称",
            dataIndex: "userName",
            key: "userName",
            align: "center"
        },
        {
            title: "用户邮箱",
            dataIndex: "userEmail",
            key: "userEmail",
            align: "center"
        },
        {
            title: "用户角色",
            dataIndex: "role",
            key: "role",
            align: "center",
            render(role: number) {
                return {0: "超级管理员", 1: "管理员", 2: "体验管理员", 3: "普通用户",}[role];
            },
        },
        {
            title: "用户状态",
            dataIndex: "state",
            key: "state",
            align: "center",
            render(state: number) {
                return {1: "在职", 2: "离职", 3: "试用期",}[state];
            },
        },
        {
            title: "注册时间",
            dataIndex: "createTime",
            key: "createTime",
            align: "center",
            render(createTime: string) {
                return formatTime(createTime);
            },
        },
        {
            title: "操作",
            key: "address",
            align: "center",
            render(record: IUser) {
                return (
                    <Space>
                        <Button type="text" onClick={() => handleEdit(record)}>
                            编辑
                        </Button>
                        <Button type="text" danger onClick={() => handleDel(record.userId)}>
                            删除
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const userRef = useRef<{
        openModal: (type: string, user?: IUser) => void;
    }>({
        openModal: (type: string, user?: IUser) => {
            console.log(type, user);
        }
    });
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const getUserList = async ({current, pageSize}: {
        current: number,
        pageSize: number
    }, formData: IUserSearchParams) => {
        const {list, page} = await getUserListApi({...formData, pageNum: current, pageSize});
        return {
            list,
            total: page.total,
        };
    };

    const handleCreate = () => {
        userRef.current?.openModal("create");
    };

    const handleEdit = (record: IUser) => {
        userRef.current?.openModal("edit", record);
    };

    const handleDel = async (_id: number) => {
        Modal.confirm({
            title: "删除用户信息",
            content: "确定删除该用户吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                handleSubmitDelete([_id]);
            },
        });
    };

    const handleSubmitDelete = async (userIds: number[]) => {
        await delUserApi({userIds});
        message.success("删除成功！");
        setSelectedRowKeys([]);
        search.reset();
    };

    const handlePatchConfirm = () => {
        if(selectedRowKeys.length === 0) {
            message.error("请选择要删除的用户！");
            return;
        }
        Modal.confirm({
            title: "删除确认",
            content: "确定删除这些用户吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                handleSubmitDelete(selectedRowKeys);
            },
        });
    };

    const {tableProps, search} = useAntdTable(getUserList, {
        form,
        defaultPageSize: 5
    });

    return (
        <div>
            <SearchForm layout="inline" form={form} initialValues={{state: 1}} search={search}>
                <Form.Item name="userId" label="用户ID">
                    <Input placeholder="请输入用户ID" />
                </Form.Item>
                <Form.Item name="userName" label="用户名">
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item name="state" label="状态">
                    <Select style={{width: 120}}>
                        <Select.Option value={0}>所有</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
            </SearchForm>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">用户列表</div>
                    <div className="action">
                        {/* 实现通过权限控制按钮显示 */}
                        <AuthButton auth="user@create" type="primary" onClick={handleCreate}>新增</AuthButton>
                        <Button type="primary" danger onClick={handlePatchConfirm}>批量删除</Button>
                    </div>
                </div>
                <Table<IUser>
                    key={new Date().getTime()}
                    bordered
                    rowKey="userId"
                    columns={columns}
                    rowSelection={{
                        type: "checkbox",
                        selectedRowKeys,
                        onChange: (selectedRowKeys) => {
                            setSelectedRowKeys(selectedRowKeys as number[]);
                        }
                    }}
                    expandable={{
                        defaultExpandAllRows: true
                    }}
                    {...tableProps}
                />
            </div>

            <CreateUser ref={userRef} update={search.submit} />
        </div>
    );
}

export default User;