import React from "react";
import { Col, Row, Card, List } from "antd";
import ButtonCustom from "../../../components/Button";
import sample from "../../../assets/landingPage/sample.png";
import homepageImg from "../../../assets/homePage/homepage.png";
const { Meta } = Card;
export const HomePage = () => {
  const course = [
    {
      title: "Bài tập trình độ A1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
  ];
  return (
    <div>
      <div
        style={{
          background: "rgb(246 136 75)",
          borderRadius: "20px",
          marginTop: "40px",
        }}
      >
        <Row>
          <Col span={18} style={{ width: "100px", padding: "50px" }}>
            <p
              style={{
                fontSize: "40px",
                color: "white",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Odio lectus et pharetra
              egestas arcu eget magnis a.
            </p>

            <p
              style={{
                fontSize: "20px",
                color: "white",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Odio lectus et pharetra
              egestas arcu eget magnis a.
            </p>
          </Col>
          <Col>
            <img src={homepageImg} alt="homepage" style={{ width: "100px" }} />
          </Col>
        </Row>
      </div>

      <div>
        <h2
          style={{
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          KHÓA HỌC
        </h2>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={course}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{ width: "330px" }}
                cover={<img alt="example" src={sample} />}
              >
                <Meta
                  // avatar={<Avatar src={sample} />}
                  title={item.title}
                  // description={"This is the description"}
                />
                <p>Title content</p>

                <ButtonCustom
                  buttonType="primary"
                  style={{ width: "100%" }}
                  // onClick={() => navigate(CLIENT_URI.LOGIN)}
                >
                  Bắt đầu
                </ButtonCustom>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
