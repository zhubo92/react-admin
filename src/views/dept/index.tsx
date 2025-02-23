import {Button, Form, Input, message, Modal, Space, Table, TableColumnsType} from "antd";
import {useEffect, useRef, useState} from "react";
import {deleteDeptApi, getDeptListApi} from "@/api";
import {IDept} from "@/types/api.ts";
import {formatTime} from "@/utils";
import CreateDept from "./CreateDept.tsx";

function Dept() {
    const columns: TableColumnsType<IDept> = [
        {title: "部门名称", dataIndex: "deptName", key: "deptName", width: "200", align: "center"},
        {title: "负责人", dataIndex: "userName", key: "userName", width: "150", align: "center"},
        {title: "创建时间", dataIndex: "createTime", key: "createTime", render: text => formatTime(text), align: "center"},
        {title: "更新时间", dataIndex: "updateTime", key: "updateTime", render: text => formatTime(text), align: "center"},
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            width: "200",
            align: "center",
            render: (_, record) => {
                return <Space>
                    <Button type="primary" onClick={() => handleSubCreate(record._id)}>新增</Button>
                    <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button danger onClick={() => handleDel(record._id)}>删除</Button>
                </Space>;
            },
        },
    ];

    const deptRef = useRef<{ openModal: (type: string, dept?: IDept | { parentId: string }) => void; }>({
        openModal: (type: string, dept?: IDept | { parentId: string }) => {
            console.log(dept, type);
        }
    });
    const [list, setList] = useState<IDept[]>([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getDeptList();
    }, []);

    const getDeptList = async () => {
        setLoading(true);
        const data = await getDeptListApi(form.getFieldsValue());
        setList(data);
        setLoading(false);
    };

    const handleSubCreate = (_id: string) => {
        deptRef.current?.openModal("create", {parentId: _id});
    };

    const handleEdit = (record: IDept) => {
        deptRef.current?.openModal("edit", record);
    };

    const handleDel = async (_id: string) => {
        Modal.confirm({
            title: "删除部门信息",
            content: "确定删除该部门吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: async () => {
                await deleteDeptApi({_id});
                message.success("删除成功！");
                await getDeptList();
            },
        });
    };

    const handleReset = () => {
        form.resetFields();
        getDeptList();
    };

    const handleCreate = () => {
        deptRef.current?.openModal("create");
    };

    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="deptName" label="部门名称">
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item>
                    <div>
                        <Button type="primary" className="mr10" onClick={getDeptList}>查询</Button>
                        <Button onClick={handleReset}>重置</Button>
                    </div>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">部门列表</div>
                    <div className="action">
                        <Button onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table<IDept>
                    loading={loading}
                    key={new Date().getTime()}
                    rowKey="_id"
                    columns={columns}
                    dataSource={list}
                    expandable={{
                        defaultExpandAllRows: true
                    }}
                />
            </div>
            <CreateDept ref={deptRef} update={getDeptList} />
        </div>
    );
}

export default Dept;