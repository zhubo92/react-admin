import {Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType} from "antd";
import {deleteRoleApi, getRoleListApi} from "@/api";
import {IRole, IRoleSearchParams} from "@/types/api.ts";
import {formatTime} from "@/utils";
import {useAntdTable} from "ahooks";
import CreateRole from "./CreateRole.tsx";
import {useRef} from "react";
import SetPermission from "./SetPermission.tsx";

function Role() {
    const columns: TableColumnsType<IRole> = [
        {title: "角色名称", dataIndex: "roleName", key: "roleName", align: "center"},
        {title: "备注", dataIndex: "remark", key: "remark", align: "center"},
        {
            title: "创建时间", dataIndex: "createTime", key: "createTime", render: (text) => {
                return formatTime(text);
            }, align: "center"
        },
        {
            title: "更新时间", dataIndex: "updateTime", key: "updateTime", render: (text) => {
                return formatTime(text);
            }, align: "center"
        },
        {
            title: "操作", key: "action", width: "200", render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                        <Button type="primary" onClick={() => handleSetPermission(record)}>设置权限</Button>
                        <Button danger onClick={() => handleDel(record._id)}>删除</Button>
                    </Space>
                );
            }, align: "center"
        },
    ];
    const [form] = Form.useForm();
    const roleRef = useRef<{ openModal: (type: string, role?: IRole | { parentId: string }) => void; }>({
        openModal: (type: string, role?: IRole | { parentId: string }) => {
            console.log(type, role);
        }
    });
    const perRef = useRef<{ openModal: (role: IRole) => void; }>({
        openModal: (role: IRole) => {
            console.log(role);
        }
    });

    const getRoleList = async ({current, pageSize}: {
        current: number,
        pageSize: number
    }, formData: IRoleSearchParams) => {
        const {list, page} = await getRoleListApi({...formData, pageNum: current, pageSize});
        return {
            list,
            total: page.total,
        };
    };

    const handleSetPermission = (record: IRole) => {
        perRef.current?.openModal(record);
    };

    const handleCreate = () => {
        roleRef.current?.openModal("create");
    };

    const handleEdit = (record: IRole) => {
        roleRef.current?.openModal("edit", record);
    };

    const handleDel = async (_id: string) => {
        Modal.confirm({
            title: "删除角色信息",
            content: "确定删除该角色吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: async () => {
                await deleteRoleApi({_id});
                message.success("删除成功！");
                search.submit();
            },
        });
    };

    const {tableProps, search} = useAntdTable(getRoleList, {
        form,
        defaultPageSize: 5
    });

    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="menuName" label="角色名称">
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item name="menuState" label="角色状态">
                    <Select placeholder="请选择角色状态" style={{width: 180}}>
                        <Select.Option value={1}>启用</Select.Option>
                        <Select.Option value={2}>禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div>
                        <Button type="primary" className="mr10" onClick={search.submit}>查询</Button>
                        <Button onClick={search.reset}>重置</Button>
                    </div>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">角色列表</div>
                    <div className="action">
                        <Button onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table<IRole>
                    key={new Date().getTime()}
                    bordered
                    rowKey="_id"
                    columns={columns}
                    expandable={{
                        defaultExpandAllRows: true
                    }}
                    {...tableProps}
                />
            </div>

            <CreateRole ref={roleRef} update={search.submit} />

            <SetPermission ref={perRef} update={search.submit} />
        </div>
    );
}

export default Role;