import {Button, Form, FormProps} from "antd";
import {ReactNode} from "react";

interface IProps extends FormProps {
    children: ReactNode;
    search: {
        submit: () => void;
        reset: () => void;
    }
}

function SearchForm({children, form, layout, search, initialValues}: IProps) {
    return (
        <Form className="search-form" layout={layout} form={form} initialValues={initialValues}>
            {children}
            <Form.Item>
                <div>
                    <Button type="primary" className="mr10" onClick={search.submit}>查询</Button>
                    <Button onClick={search.reset}>重置</Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default SearchForm;