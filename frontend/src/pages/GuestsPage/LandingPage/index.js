import React from "react";
import { Col, Row, Card, List, Avatar } from "antd";
import ButtonCustom from "../../../components/Button";
import landingPageImg from "../../../assets/landingPage/landingPage.png";
import landingPageImg2 from "../../../assets/landingPage/landingPage2.png";
import landingPageImg3 from "../../../assets/landingPage/landingPage3.png";
import listening from "../../../assets/landingPage/listening.png";
import speaking from "../../../assets/landingPage/speaking.png";
import reading from "../../../assets/landingPage/reading.png";
import writing from "../../../assets/landingPage/writing.png";
import sample from "../../../assets/landingPage/sample.png";
import { CheckOutlined, StarFilled } from "@ant-design/icons";
const { Meta } = Card;
export const LandingPage = () => {
  const skills = [
    {
      img: listening,
      title: "Kỹ năng nghe",
    },
    {
      img: speaking,
      title: "Kỹ năng nói",
    },
    {
      img: reading,
      title: "Kỹ năng đọc",
    },
    {
      img: writing,
      title: "Kỹ năng viết",
    },
  ];

  const benefit = [
    "Bài tập 4 kỹ năng đầy đủ theo trình độ",
    "Bài tập từ vựng và ngữ pháp theo trình độ",
    "Được giáo viên chữa bài viết cẩn thận",
    "Bộ từ vựng flashcard theo chủ đề",
  ];

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

  const feedbacks = [
    {
      name: "Tuan",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim pharetra fermentum faucibus tortor nulla viverra tellus pretium vitae. Vel consectetur",
      stars: 5,
    },
    {
      name: "Tuan2",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim pharetra fermentum faucibus tortor nulla viverra tellus pretium vitae. Vel consectetur",
      stars: 4,
    },
    {
      name: "Tuan3",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim pharetra fermentum faucibus tortor nulla viverra tellus pretium vitae. Vel consectetur",
      stars: 3,
    },
    {
      name: "Tuan4",
      content:
        "Lorem ipsum dolor sit amet consectetur. Enim pharetra fermentum faucibus tortor nulla viverra tellus pretium vitae. Vel consectetur",
      stars: 2,
    },
  ];
  return (
    <div>
      <Row style={{ marginTop: "100px" }}>
        <Col span={16}>
          <h2 style={{ fontSize: "50px" }}>
            Học tiếng đức
            <br />
            trực tuyến hiệu quả
            <br />
            cùng các bài tập
            <br />
            theo trình độ
          </h2>
          <p style={{ fontSize: "20px", color: "grey" }}>
            Cung cấp các bài tập 4 kỹ năng nghe, nói, đọc, viết cùng từ vựng,
            ngữ pháp theo trình độ.
          </p>
          <ButtonCustom
            buttonType="primary"
            style={{
              padding: "30px 20px",
              fontSize: "22px",
              fontWeight: "600",
            }}
            // onClick={() => navigate(CLIENT_URI.LOGIN)}
          >
            HỌC THỬ MIỄN PHÍ
          </ButtonCustom>
          <Row>
            <Col span={6}>
              <p
                style={{
                  fontSize: "22px",
                  margin: "10px 0px",
                  color: "#F3D512",
                  fontWeight: "700",
                }}
              >
                1000+
              </p>
              <b style={{ fontSize: "20px" }}>Bài tập</b>
            </Col>
            <Col span={6}>
              <p
                style={{
                  fontSize: "22px",
                  margin: "10px 0px",
                  color: "#467AE2",
                  fontWeight: "700",
                }}
              >
                5000+
              </p>
              <b style={{ fontSize: "20px" }}>Học viên</b>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <img
            src={landingPageImg2}
            style={{
              zIndex: "-1",
              position: "absolute",
              top: "100px",
              width: "115%",
            }}
            alt="Landing page 2"
          />
          <img src={landingPageImg} alt="Landing page" />
        </Col>
      </Row>

      <Row style={{ marginTop: "100px" }}>
        {skills.map((skill) => (
          <Col
            span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={skill.img} alt={skill.title} width={70} />
            <h2>{skill.title}</h2>
          </Col>
        ))}
      </Row>

      <Row style={{ marginTop: "100px" }}>
        <Col span={8}>
          <img src={landingPageImg3} alt="Landing page 3" />
        </Col>
        <Col span={16}>
          <h2 style={{ textAlign: "center", fontSize: "40px" }}>
            Trang Web cung cấp
          </h2>
          <p style={{ fontSize: "25px", color: "grey" }}>
            Cung cấp các bài tập 4 kỹ năng nghe, nói, đọc, viết cùng từ vựng,
            ngữ pháp theo trình độ.
          </p>
          <ul style={{ listStyleType: "none", padding: "0px" }}>
            {benefit.map((b) => (
              <li style={{ fontSize: "20px", margin: "10px 0px" }}>
                <CheckOutlined style={{ color: "#38EC56" }} /> &emsp; {b}
              </li>
            ))}
          </ul>
          <ButtonCustom
            buttonType="primary"
            style={{ padding: "20px 30px", fontSize: "22px" }}
            // onClick={() => navigate(CLIENT_URI.LOGIN)}
          >
            BẮT ĐẦU NGAY
          </ButtonCustom>
        </Col>
      </Row>
      {/* Khoa hoc */}
      <div>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>KHÓA HỌC</h2>
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
      {/* Blog */}
      <div>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>BLOG</h2>
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
                <p>
                  Title content da sd asd fadgasd sadf g hd dsfs dr rwg dfg rs
                  tgfdg etd gfd gret dfg
                </p>
              </Card>
            </List.Item>
          )}
        />
      </div>
      {/* Feedback */}
      <div>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>FEEDBACK</h2>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={feedbacks}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: "330px" }}>
                <Row>
                  <Col span={4}>
                    <Avatar src={sample} size={42} />
                  </Col>
                  <Col>
                    <Row>
                      <b>{item.name}</b>
                    </Row>
                    <Row>
                      {Array.from({ length: item.stars }).map((_, index) => (
                        <StarFilled
                          style={{ color: "#FFCC33", fontSize: "20px" }}
                        />
                      ))}
                    </Row>
                  </Col>
                </Row>
                <p>{item.content}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <div
        style={{
          background: "#FFCD26",
          height: "250px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "40px",
            padding: "50px 0px 0px 0px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Đăng ký ngay để nhận ưu đãi lên đến 50%
        </p>
        <ButtonCustom
          buttonType="primary"
          style={{
            fontSize: "30px",
            fontWeight: "600",
            padding: "30px 30px",
          }}
          // onClick={() => navigate(CLIENT_URI.LOGIN)}
        >
          Đăng ký
        </ButtonCustom>
      </div>
    </div>
  );
};
