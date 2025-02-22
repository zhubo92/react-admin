import {Form, Input, message, Modal, Select, TreeSelect} from "antd";
import {RefObject, useImperativeHandle, useState} from "react";
import {IDept, IUser} from "../../types/api.ts";
import {createDeptApi, getAllUserListApi, getDeptListApi, updateDeptApi} from "../../api";

interface IProps {
    ref: RefObject<{ openModal: (type: string, dept?: IDept | {parentId: string}) => void }>;
    update: () => void;
}

function CreateDept({ref, update}: IProps) {
    useImperativeHandle(ref, () => ({
        openModal
    }));

    const [form] = Form.useForm();
    const [deptList, setDeptList] = useState<IDept[]>([]);
    const [userList, setUserList] = useState<IUser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState("create");

    const getDeptList = async () => {
        const data = await getDeptListApi(form.getFieldsValue());
        setDeptList(data);
    };

    const getAllUserList = async () => {
        const data = await getAllUserListApi();
        setUserList(data);
    };

    const handleOk = async () => {
        const result = await form.validateFields();
        if(!result) return;
        if(action === "create") {
            await createDeptApi(form.getFieldsValue());
            message.success("创建成功！");
        } else {
            await updateDeptApi(form.getFieldsValue());
            message.success("编辑成功！");
        }
        handleCancel();
        update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const openModal = (type: string, dept?: IDept | {parentId: string}) => {
        console.log(dept, "dept", type, "type");
        getDeptList();
        getAllUserList();
        setAction(type);
        if(dept) {
            form.setFieldsValue(dept);
        }
        setIsModalOpen(true);
    };
    return (
        <Modal title={action === "create" ? "创建部门" : "编辑部门"} width="800px" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} labelAlign="right" labelCol={{span: 4}}>
                <Form.Item hidden name="_id">
                    <div></div>
                </Form.Item>
                <Form.Item label="上级部门" name="parentId">
                    <TreeSelect
                        treeData={deptList}
                        treeDefaultExpandAll
                        fieldNames={{label: "deptName", value: "_id"}}
                        allowClear
                        placeholder="请选择上级部门"
                    ></TreeSelect>
                </Form.Item>
                <Form.Item label="部门名称" name="deptName" rules={[{required: true, message: "请输入部门名称"}]}>
                    <Input placeholder="请输入部门名称"></Input>
                </Form.Item>
                <Form.Item label="负责人" name="userName" rules={[{required: true, message: "请选择负责人"}]}>
                    <Select>
                        {userList.map(item => (
                            <Select.Option value={item._id} key={item._id}>{item.userName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateDept;