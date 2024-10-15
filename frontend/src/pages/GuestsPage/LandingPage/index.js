import React, { useState } from "react";
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
import beginner from "../../../assets/landingPage/beginner.jpg";
import vocabularyTip from "../../../assets/landingPage/tiphoctuvunghieuqua.png";
import certificate from "../../../assets/landingPage/BI-QUYET-DAT-DIEM-CAO-TRONG-PHAN-THI-VIET-TIENG-DUC-TELC-B1-1-min-scaled.jpg";
import { CheckOutlined, StarFilled } from "@ant-design/icons";
import { Courses } from "./courses/coursesList";
import { ModalPremium } from "../../LearnersPage/PremiumPage/ModalPremium";

//test modal
import ModalCreateAccount from "../../../components/Admin/ModalCreateAccount";
import { Button } from "antd";

//test table user
import TableUser from "../../../components/Table/TableUser";

export const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

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

  const benefit = ["Bài tập 4 kỹ năng đầy đủ theo trình độ.", "Bài tập từ vựng và ngữ pháp theo trình độ.", "Được giáo viên chữa bài viết cẩn thận.", "Bộ từ vựng flashcard theo chủ đề."];

  const feedbacks = [
    {
      name: "Bài tập rất hữu ích và thực tế",
      content: "Các bài tập trong giáo trình giúp tôi rèn luyện tốt ngữ pháp và từ vựng. Phương pháp học rất trực quan, đặc biệt là phần bài tập nghe, giúp tôi tự tin hơn khi nói tiếng Đức.",
      stars: 5,
    },
    {
      name: "Giáo trình chất lượng cao",
      content:
        "Tôi rất thích cách bài tập được thiết kế theo chủ đề và bám sát thực tiễn. Điều này giúp tôi không chỉ học tiếng Đức mà còn hiểu thêm về văn hóa Đức. Các bài tập từ vựng phong phú và có độ khó tăng dần rất hợp lý.",
      stars: 5,
    },
    {
      name: "Phù hợp cho người mới bắt đầu",
      content:
        "Tôi là người mới bắt đầu học tiếng Đức, và giáo trình này thực sự rất dễ tiếp cận. Các bài tập từ cơ bản đến nâng cao giúp tôi theo kịp tiến độ và không cảm thấy quá khó khăn khi mới học.",
      stars: 5,
    },
    {
      name: "Bài tập phong phú và đa dạng",
      content:
        "Tôi rất ấn tượng với sự đa dạng của bài tập trong giáo trình tiếng Đức này. Các dạng bài khác nhau như trắc nghiệm, điền từ, và bài tập luyện nói giúp tôi có cái nhìn toàn diện và cải thiện mọi kỹ năng tiếng Đức.",
      stars: 5,
    },
    {
      name: "Hỗ trợ tốt cho việc tự học",
      content: "Bài tập trong giáo trình rất tốt cho những ai tự học tiếng Đức như tôi. Các bài tập có phần gợi ý và đáp án kèm theo, giúp tôi tự kiểm tra được kiến thức của mình.",
      stars: 5,
    },
  ];

  const blog = [
    {
      title: "Hướng Dẫn Học Tiếng Đức Cho Người Mới Bắt Đầu",
      image: beginner,
      description: "Blog cung cấp lộ trình học tiếng Đức cơ bản, bao gồm các bước khởi đầu từ việc làm quen với bảng chữ cái, phát âm và ngữ pháp nền tảng.",
    },
    {
      title: "10 Cách Học Từ Vựng Tiếng Đức Hiệu Quả",
      image: vocabularyTip,
      description: "Bài viết chia sẻ những phương pháp ghi nhớ từ vựng tiếng Đức nhanh chóng và dễ dàng, phù hợp cho mọi trình độ học viên.",
    },
    {
      title: "Bí Quyết Đạt Điểm Cao Trong Kỳ Thi Chứng Chỉ Tiếng Đức",
      image: certificate,
      description: "Chia sẻ kinh nghiệm ôn tập và làm bài thi các chứng chỉ tiếng Đức phổ biến như Goethe, TELC, TestDaF để đạt kết quả cao.",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <ModalPremium />
      <Row style={{ marginTop: "100px" }}>
        <Col span={16}>
          <h2 style={{ fontSize: "50px" }}>
            Học tiếng Đức
            <br />
            trực tuyến hiệu quả
            <br />
            cùng các bài tập
            <br />
            theo trình độ.
          </h2>
          <p style={{ fontSize: "20px", color: "grey" }}>Cung cấp các bài tập 4 kỹ năng nghe, nói, đọc, viết cùng từ vựng, ngữ pháp theo trình độ.</p>
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

      {/* ================================================================================= TEST AREA ================================================================================= */}
      {/* button test add new account of admin */}
      <div>
        <Button type="primary" onClick={showModal}>
          Thêm mới tài khoản
        </Button>
        <ModalCreateAccount isVisible={isModalVisible} onClose={handleClose} />
      </div>
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <TableUser />
      </div>

      {/* Skills */}
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
      {/* Benefit */}
      <Row style={{ marginTop: "100px" }}>
        <Col span={8}>
          <img src={landingPageImg3} alt="Landing page 3" />
        </Col>
        <Col span={16}>
          <h2 style={{ textAlign: "center", fontSize: "40px" }}>Trang Web Cung Cấp</h2>
          <p style={{ fontSize: "25px", color: "grey" }}>Cung cấp các bài tập 4 kỹ năng nghe, nói, đọc, viết cùng từ vựng, ngữ pháp theo trình độ.</p>
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
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>CÁC BÀI TẬP THEO TRÌNH ĐỘ </h2>
        <div
          style={{
            marginLeft: "8px",
            marginRight: "8px",
          }}
        >
          <Courses />
        </div>
      </div>
      {/* Blog */}
      <div>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>BLOG</h2>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={blog}
          renderItem={(item) => (
            <List.Item>
              <div style={{ border: "1px solid #e8e8e8", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "16px" }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </List.Item>
          )}
        />
      </div>
      {/* Feedback - think about carousel */}
      <div>
        <h2
          style={{
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          FEEDBACK
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        >
          <List
            grid={{
              gutter: 16, // Adjust the space between cards
              column: 3, // Set the number of columns to 3 (like the image)
            }}
            dataSource={feedbacks}
            renderItem={(item) => (
              <List.Item>
                <Card style={{ width: "330px", textAlign: "center" }}>
                  <Row gutter={[16, 16]} justify="center" align="middle">
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
                            key={index} // Added key to each StarFilled component
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
          Đăng ký ngay để nhận ưu đãi lên đến 30%
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
