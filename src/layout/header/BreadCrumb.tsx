import {Breadcrumb} from "antd";
import {useLocation, useRouteLoaderData} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import {findTreeNode} from "../../utils";

function BreadCrumb() {
    const {pathname} = useLocation();
    const {menuList} = useRouteLoaderData("layout");

    const [items, setItems] = useState<(string | ReactNode)[]>([]);

    useEffect(() => {
        setItems([<a href="/welcome">首页</a>, ...findTreeNode(menuList, pathname, [])]);
    }, [pathname]);

    return (

        <Breadcrumb
            items={items.map((item, index) => ({title: item, key: index}))}
        />
    );
}

export default BreadCrumb;