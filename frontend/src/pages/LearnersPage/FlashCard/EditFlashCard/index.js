import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Card,
  message,
  Typography,
} from "antd";
import { DeleteOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

export default function EditFlashCard() {
  const { flashcardId } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch(`http://localhost:9999/flashcard/${flashcardId}`)
      .then((response) => response.json())
      .then((data) => {
        setFlashcard(data);
      })
      .catch((err) => console.error(err));
  }, [flashcardId]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = () => {
    fetch(`http://localhost:9999/flashcard/${flashcardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((response) => {
        response.json();
        messageApi.open({
          type: "success",
          content: "Chỉnh sửa thành công",
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: "error",
          content: "Chỉnh sửa thất bại",
        });
      })
      .then((data) => {
        console.log("duoc roi");
      });
  };

  const handleFlashCard = () => {
    const cards = form.getFieldValue("cards");
    cards.forEach((card) => {
      card.id = cards.indexOf(card) + 1;
    });
    // JSON.stringify(form.getFieldsValue());
  };

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextHolder}
      <div style={{ width: "60%" }}>
        <h1 style={{ textAlign: "center" }}>TẠO HỌC PHẦN MỚI !!</h1>
        <Form
          form={form}
          onFinish={handleSubmit}
          scrollToFirstError
          initialValues={{
            title: flashcard.title,
            description: flashcard.description,
            cards: flashcard.cards,
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
                  {
                    max: 20,
                    message: "Tiêu đề không quá 20 ký tự",
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 0, maxRows: 4 }}
                  placeholder="Nhập tiêu đề"
                  style={{ fontWeight: "600", padding: "10px" }}
                />
              </Form.Item>

              <Form.Item name="description">
                <Input.TextArea
                  autoSize={{ minRows: 0, maxRows: 4 }}
                  placeholder="Nhập mô tả"
                  style={{ fontWeight: "600", padding: "10px" }}
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
                  style={{ padding: "20px 50px", background: "#ffa751" }}
                  onClick={handleFlashCard}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="cards">
            {(fields, { add, remove, move }) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16,
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
                      <div>
                        <MenuOutlined onClick={() => move()} />
                        &ensp;
                        <DeleteOutlined
                          onClick={() => {
                            remove(field.name);
                            // setCardIdCounter(cardIdCounter - 1);/
                          }}
                        />
                      </div>
                    }
                  >
                    <div>
                      <Row style={{ alignItems: "center" }}>
                        <Col span={9} style={{ margin: "10px" }}>
                          <Form.Item
                            name={[field.name, "terms"]}
                            rules={[
                              {
                                required: true,
                                message: "Làm ơn nhập thuật ngữ!",
                              },
                            ]}
                            noStyle
                          >
                            <Input.TextArea
                              autoSize={{ minRows: 0, maxRows: 3 }}
                              placeholder="Thuật ngữ"
                              style={{
                                fontWeight: "600",
                                background: "rgb(214 214 214)",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={9} style={{ margin: "10px" }}>
                          <Form.Item
                            name={[field.name, "definitions"]}
                            rules={[
                              {
                                required: true,
                                message: "Làm ơn nhập định nghĩa!",
                              },
                            ]}
                            noStyle
                          >
                            <Input.TextArea
                              autoSize={{ minRows: 0, maxRows: 4 }}
                              placeholder="Định nghĩa"
                              style={{
                                fontWeight: "600",
                                background: "rgb(214 214 214)",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4} style={{ margin: "20px 10px 10px 10px" }}>
                          <Form.Item
                            name={[field.name, "fileList"]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload action="/upload.do" listType="picture-card">
                              <button
                                style={{ border: 0, background: "none" }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </button>
                            </Upload>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    // add({ id: cardIdCounter + 1 });
                    // setCardIdCounter(cardIdCounter + 1);
                    // console.log(fields);
                  }}
                  block
                >
                  Thêm thẻ ghi nhớ
                </Button>
                <br />
              </div>
            )}
          </Form.List>

        </Form>
      </div>
    </>
  );
}
