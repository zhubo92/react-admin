import {Form, Modal, message, Tree, TreeProps, TreeDataNode} from "antd";
import {useState, RefObject, useImperativeHandle, useEffect} from "react";
import {IMenu, IPermission, IRole} from "../../types/api";
import {getMenuListApi, updatePermissionApi,} from "../../api";

interface IProps {
    ref: RefObject<{ openModal: (role: IRole) => void }>;
    update: () => void;
}

function CreateRole({ref, update}: IProps) {
    useImperativeHandle(ref, () => ({openModal}));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [permission, setPermission] = useState<IPermission>();
    const [role, setRole] = useState<IRole>();
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [menuList, setMenuList] = useState<IMenu[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        getMenuList();
    }, []);

    const getMenuList = async () => {
        const data = await getMenuListApi();
        setMenuList(data);
    };

    const handleOk = async () => {
        if (permission) {
            await updatePermissionApi(permission);
            message.success("设置成功！");
        }
        handleCancel();
        update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const openModal = (role: IRole) => {
        setRole(role);
        setCheckedKeys(role.permissionList.checkedKeys || []);
        setIsModalOpen(true);
        form.setFieldsValue(role);
    };

    const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
        console.log(checkedKeys, info);
        setCheckedKeys(checkedKeys as string[]);
        const checkedKeysTemp: string[] = [];
        const halfCheckedKeysTemp: string[] = [];
        (info.checkedNodes as unknown as IMenu[]).forEach((item) => {
            if (item.menuType === 2) {
                checkedKeysTemp.push(item._id);
            } else {
                halfCheckedKeysTemp.push(item._id);
            }
        });
        setPermission({
            _id: role?._id || "",
            permissionList: {
                checkedKeys: checkedKeysTemp,
                halfCheckedKeys: halfCheckedKeysTemp.concat(info.halfCheckedKeys as string[]),
            }
        });
    };

    return (
        <>
            <Modal title="设置权限" open={isModalOpen} width={600} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} labelAlign="right" style={{marginTop: "30px"}} labelCol={{span: 6}}>
                    <Form.Item label="角色名称">
                        <div>{form.getFieldValue("roleName")}</div>
                    </Form.Item>
                    <Form.Item label="权限" rules={[{required: true, message: "请输入角色名称"}]}>
                        <Tree
                            checkable
                            defaultExpandAll
                            onCheck={onCheck}
                            treeData={menuList as unknown as TreeDataNode[]}
                            checkedKeys={checkedKeys}
                            fieldNames={{
                                key: "_id",
                                children: "children",
                                title: "menuName"
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreateRole;
