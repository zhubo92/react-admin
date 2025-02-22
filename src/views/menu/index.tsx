import {Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType} from "antd";
import {useEffect, useRef, useState} from "react";
import {deleteMenuApi, getMenuListApi} from "../../api";
import {IMenu} from "../../types/api.ts";
import {formatTime} from "../../utils";
import CreateMenu from "./CreateMenu.tsx";

function Menu() {
    const columns: TableColumnsType<IMenu> = [
        {title: "菜单名称", dataIndex: "menuName", key: "menuName", align: "center"},
        {title: "菜单图标", dataIndex: "icon", key: "icon", align: "center"},
        {
            title: "菜单类型", dataIndex: "menuType", key: "menuType", render: (text: number) => {
                return {1: "菜单", 2: "按钮", 3: "页面"}[text];
            }, align: "center"
        },
        {title: "权限标识", dataIndex: "menuCode", key: "menuCode", align: "center"},
        {title: "路由地址", dataIndex: "path", key: "path", align: "center"},
        {title: "组件名称", dataIndex: "component", key: "component", align: "center"},
        {
            title: "创建时间", dataIndex: "createTime", key: "createTime", render: (text) => {
                return formatTime(text);
            }, align: "center"
        },
        {
            title: "操作", key: "action", width: "200", render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => {
                            handleSubCreate(record._id);
                        }}>新增</Button>
                        <Button type="primary" onClick={() => {
                            handleEdit(record);
                        }}>编辑</Button>
                        <Button danger onClick={() => {
                            handleDel(record._id);
                        }}>删除</Button>
                    </Space>
                );
            }, align: "center"
        },
    ];

    const menuRef = useRef<{ openModal: (type: string, dept?: IMenu | { parentId: string }) => void; }>({
        openModal: (type: string, dept?: IMenu | { parentId: string }) => {
            console.log(dept, type);
        }
    });
    const [list, setList] = useState<IMenu[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        getMenuList();
    }, []);

    const getMenuList = async () => {
        const data = await getMenuListApi(form.getFieldsValue());
        setList(data);
    };

    const handleSubCreate = (_id: string) => {
        menuRef.current?.openModal("create", {parentId: _id});
    };

    const handleEdit = (record: IMenu) => {
        menuRef.current?.openModal("edit", record);
    };

    const handleDel = async (_id: string) => {
        Modal.confirm({
            title: "删除菜单信息",
            content: "确定删除该菜单吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                handleDelOk(_id);
            },
        });
    };

    const handleDelOk = async (_id: string) => {
        await deleteMenuApi({_id});
        message.success("删除成功！");
        getMenuList();
    };

    const handleReset = () => {
        form.resetFields();
        getMenuList();
    };

    const handleCreate = () => {
        menuRef.current?.openModal("create");
    };

    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="menuName" label="菜单名称">
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item name="menuState" label="菜单状态">
                    <Select placeholder="请选择菜单状态" style={{width: 180}}>
                        <Select.Option value={1}>启用</Select.Option>
                        <Select.Option value={2}>禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div>
                        <Button type="primary" className="mr10" onClick={getMenuList}>查询</Button>
                        <Button type="primary" onClick={handleReset}>重置</Button>
                    </div>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">菜单列表</div>
                    <div className="action">
                        <Button onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table<IMenu>
                    key={new Date().getTime()}
                    bordered
                    rowKey="_id"
                    columns={columns}
                    dataSource={list}
                    expandable={{
                        defaultExpandAllRows: true
                    }}
                    pagination={false}
                />
            </div>
            <CreateMenu ref={menuRef} update={getMenuList} />
        </div>
    );
}

export default Menu;