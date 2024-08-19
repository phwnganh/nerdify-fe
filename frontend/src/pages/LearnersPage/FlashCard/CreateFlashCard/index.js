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
  message,
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

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Tạo flash card thành công",
    });
  };

  return (
    <>
      {contextHolder}
      <div style={{ width: "60%" }}>
        <h1 style={{ textAlign: "center" }}>TẠO HỌC PHẦN MỚI !!</h1>

        <Form
          form={form}
          initialValues={{
            items: [{}],
          }}
          onFinish={success}
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
                <Input
                  placeholder="Nhập tiêu đề"
                  // variant="borderless"
                  style={{
                    fontWeight: "600",
                    // background: "rgb(195 195 195)",
                    padding: "10px",
                  }}
                />
              </Form.Item>

              <Form.Item name="description">
                <Input
                  placeholder="Nhập mô tả" // variant="borderless"
                  style={{
                    fontWeight: "600",
                    // background: "rgb(195 195 195)",
                    padding: "10px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col
              span={12}
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    padding: "20px 50px",
                    background: "#ffa751",
                  }}
                  onClick={() => {
                    console.log(form.getFieldsValue());
                  }}
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
                  // width: "80%",
                  margin: "auto",
                }}
              >
                {fields.map((field) => (
                  <Card
                    style={{ background: "rgb(227 224 224)" }}
                    size="default"
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
                    <div
                      style={
                        {
                          // background: "rgb(236 236 236)",
                          // width: ""
                          // borderRadius: "7px",
                        }
                      }
                    >
                      <Row style={{ alignItems: "center" }}>
                        <Col span={9} style={{ margin: "10px" }}>
                          <Input
                            placeholder="Thuật ngữ"
                            variant="borderless"
                            size="large"
                            name="term"
                            style={{
                              fontWeight: "600",
                              background: "rgb(214 214 214)",
                            }}
                          />
                        </Col>
                        <Col span={9} style={{ margin: "10px" }}>
                          <Input
                            placeholder="Định nghĩa"
                            variant="filled"
                            size="large"
                            name="definition"
                            style={{
                              fontWeight: "600",
                              background: "rgb(214 214 214)",
                            }}
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
                  </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  Thêm thẻ ghi nhớ
                </Button>
                <br />
              </div>
            )}
          </Form.List>
          {/* 
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
        </Form>
      </div>
    </>
  );
}
