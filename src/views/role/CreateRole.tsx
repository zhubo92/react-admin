import {Form, Modal, Input, message} from "antd";
import {useState, RefObject, useImperativeHandle} from "react";
import {IRole} from "@/types/api";
import {createRoleApi, updateRoleApi} from "@/api";

interface IProps {
    ref: RefObject<{ openModal: (type: string, role?: IRole | { parentId: string }) => void }>;
    update: () => void;
}

function CreateRole({ref, update}: IProps) {
    useImperativeHandle(ref, () => ({openModal}));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<string>("create");
    const [form] = Form.useForm();

    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (action === "create") {
            await createRoleApi(form.getFieldsValue());
            message.success("创建成功");
        } else if (action === "edit") {
            await updateRoleApi(form.getFieldsValue());
            message.success("编辑成功");
        }
        handleCancel();
        update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const openModal = (type: string, role?: IRole | { parentId: string }) => {
        setAction(type);
        setIsModalOpen(true);
        if (role) {
            form.setFieldsValue(role);
        }
    };

    return (
        <>
            <Modal
                title={action === "create" ? "创建角色" : "编辑角色"}
                open={isModalOpen}
                width={500}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} labelAlign="right" style={{marginTop: "30px"}} labelCol={{span: 6}}>
                    <Form.Item hidden name="_id">
                        <Input />
                    </Form.Item>
                    <Form.Item label="角色名称" name="roleName" rules={[{required: true, message: "请输入角色名称"}]}>
                        <Input placeholder="请输入角色名称" />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input placeholder="请输入备注" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreateRole;
