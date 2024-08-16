import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Typography,
  Card,
  Space,
} from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
export default function CreateFlashCard() {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [form] = Form.useForm();

  return (
    <div style={{ width: "60%" }}>
      <h1 style={{ textAlign: "center" }}>TẠO HỌC PHẦN MỚI !!</h1>

      <Form
        form={form}
        initialValues={{
          items: [{}],
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề",
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề" variant="filled" />
            </Form.Item>

            <Form.Item name="description">
              <Input placeholder="Nhập mô tả" variant="filled" />
            </Form.Item>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ padding: "20px 50px", background: "#ffa751" }}
              >
                Tạo và ôn luyện
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Thẻ ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <DeleteOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  {/* <Row> */}
                  <div
                    style={{
                      background: "rgb(236 236 236)",
                      width: "100%",
                      borderRadius: "7px",
                    }}
                  >
                    <Row style={{ alignItems: "center" }}>
                      <Col span={1}></Col>
                      <Col span={8} style={{ margin: "10px" }}>
                        <Input
                          placeholder="Thuật ngữ"
                          variant="borderless"
                          size="large"
                          name="term"
                        />
                      </Col>
                      <Col span={8} style={{ margin: "10px" }}>
                        <Input
                          placeholder="Định nghĩa"
                          variant="borderless"
                          size="large"
                          name="definition"
                        />
                      </Col>
                      <Col span={4} style={{ margin: "20px 10px 10px 10px" }}>
                        <Form.Item
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                        >
                          <Upload action="/upload.do" listType="picture-card">
                            <button
                              style={{
                                border: 0,
                                background: "none",
                              }}
                              type="button"
                            >
                              <PlusOutlined />
                              <div
                                style={{
                                  marginTop: 8,
                                }}
                              >
                                Upload
                              </div>
                            </button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  {/* </Row> */}
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                Thêm thẻ ghi nhớ
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
