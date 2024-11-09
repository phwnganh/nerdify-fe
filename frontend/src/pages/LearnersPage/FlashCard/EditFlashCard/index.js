import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Upload, Card, message, Typography, Dropdown, notification } from "antd";
import { CaretLeftOutlined, DeleteOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { validationRules } from "../../../../helpers/validate";
import { BASE_SERVER } from "../../../../constants";
import { getFlashcardDetail, updateFlashcard } from "../../../../services/LearnerService";
import ButtonCustom from "../../../../components/Button";

export default function EditFlashCard() {
  const navigate = useNavigate();
  const { flashcardId } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedLevel, setSelectedLevel] = useState(null);
  useEffect(() => {
    getFlashcardDetail(flashcardId)
      .then((data) => {
        setFlashcard(data.data);
        console.log("flashcard: ", data.data);

        form.setFieldsValue({
          title: data?.data?.title,
          description: data?.data?.description,
          level: data?.data?.level,
          cards: data?.data?.cards?.map((card) => ({
            _id: card._id, // include the ID if needed
            terms: card.term,
            definitions: card.definition,
          })),
        });
      })
      .catch((err) => console.error(err));
  }, [flashcardId, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSelectLevel = (key) => {
    setSelectedLevel(key);
    form.setFieldsValue({ level: key });
  };

  const handleSubmit = (values) => {
    const { title, description, cards, level } = values;
    const formattedCards = cards.map((card) => ({
      _id: card._id,
      term: card?.terms,
      definition: card?.definitions,
    }));

    const data = {
      title,
      description,
      cards: formattedCards,
      level,
    };

    updateFlashcard(flashcardId, data)
      .then((res) => {
        notification.success({
          message: res.message
        })
        messageApi.success("Cập nhật flashcard thành công!")})
      .catch((err) => {
        notification.error({
          message: err.message
        })
        const errorMessage = err.response?.data?.message || "Failed to create flashcard.";
        messageApi.error(errorMessage);
        console.error("Error:", err);
      });
    // fetch(`${BASE_SERVER}/flashcard/${flashcardId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form.getFieldsValue()),
    // })
    //   .then((response) => {
    //     response.json();
    //     messageApi.open({
    //       type: "success",
    //       content: "Chỉnh sửa thành công",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     messageApi.open({
    //       type: "error",
    //       content: "Chỉnh sửa thất bại",
    //     });
    //   })
    //   .then((data) => {
    //     console.log("duoc roi");
    //   });
  };

  const handleFlashCard = () => {
    const cards = form.getFieldValue("cards");
    cards.forEach((card) => {
      card.id = cards.indexOf(card) + 1;
    });
    // JSON.stringify(form.getFieldsValue());
  };

  const items = [
    {
      key: "A1",
      label: <div>A1</div>,
    },
    {
      key: "A2",
      label: <div>A2</div>,
    },
    {
      key: "B1",
      label: <div>B1</div>,
    },
  ];

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextHolder}
      <div style={{ width: "100%"}}>
        {/* <BreadCrumbHome /> */}
        <ButtonCustom icon={<CaretLeftOutlined />} buttonType="primary" onClick={() => navigate(-1)}>Quay lại</ButtonCustom>
        <h1 style={{ textAlign: "center" }}>CHỈNH SỬA HỌC PHẦN</h1>
        <Form
          form={form}
          onFinish={handleSubmit}
          scrollToFirstError
          initialValues={{
            title: flashcard.title,
            description: flashcard.description,
            level: flashcard.level,
            cards: flashcard.cards,
          }}
        >
          <Row>
            <Col span={12}>
              <Form.Item name="title" rules={[validationRules.required("Vui lòng nhập tiêu đề"), validationRules.maxLength(20, "Tiêu đề không quá 20 ký tự")]}>
                <Input.TextArea autoSize={{ minRows: 0, maxRows: 4 }} placeholder="Nhập tiêu đề" style={{ fontWeight: "600", padding: "10px" }} />
              </Form.Item>

              <Form.Item name="description">
                <Input.TextArea autoSize={{ minRows: 0, maxRows: 4 }} placeholder="Nhập mô tả" style={{ fontWeight: "600", padding: "10px" }} />
              </Form.Item>
              <Form.Item name="level" rules={[validationRules.required("Vui lòng chọn trình độ")]}>
                <Dropdown menu={{ items, onClick: (e) => handleSelectLevel(e.key) }} trigger={["click"]}>
                  <Button shape="default" style={{ marginRight: "10px", padding: "20px", paddingLeft: "60px", paddingRight: "60px", marginBottom: "20px" }}>
                    {selectedLevel || form.getFieldValue("level")}
                  </Button>
                </Dropdown>
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
                <Button type="primary" htmlType="submit" style={{ padding: "20px 50px", background: "#ffa751" }} onClick={handleFlashCard}>
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
                          <Form.Item name={[field.name, "terms"]} rules={[validationRules.required("Vui lòng nhập thuật ngữ!")]} noStyle>
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
                          <Form.Item name={[field.name, "definitions"]} rules={[validationRules.required("Vui lòng nhập định nghĩa!")]} noStyle>
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
                        {/* <Col span={4} style={{ margin: "20px 10px 10px 10px" }}>
                          <Form.Item name={[field.name, "fileList"]} valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                              <button style={{ border: 0, background: "none" }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </button>
                            </Upload>
                          </Form.Item>
                        </Col> */}
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
