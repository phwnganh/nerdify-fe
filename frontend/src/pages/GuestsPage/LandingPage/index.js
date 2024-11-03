import React, { useState, useEffect } from "react";
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
import { CLIENT_URI } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { getBlogList } from "../../../services/LearnerService";

export const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const isUserLoggedIn = () => {
    // Giả sử bạn có hàm để kiểm tra người dùng đăng nhập
    return !!localStorage.getItem("userToken");
  };

  const fetchBlogs = async () => {
    try {
      const result = await getBlogList();
      const sortedBlogs = result.data
        .sort((a, b) => b.views - a.views) // Sắp xếp theo số lượng view giảm dần
        .slice(0, 3); // Lấy top 3
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    if (isUserLoggedIn()) {
      navigate(`/blog-study/${blogId}`);
    } else {
      navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
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
            onClick={() => navigate(CLIENT_URI.LOGIN)}
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
          <ButtonCustom buttonType="primary" style={{ padding: "20px 30px", fontSize: "22px" }} onClick={() => navigate(CLIENT_URI.LOGIN)}>
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
        {blogs.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={blogs}
            renderItem={(item) => (
              <List.Item>
                <div onClick={() => handleBlogClick(item._id)} style={{ cursor: "pointer" }}>
                  <Card
                    hoverable
                    cover={
                      <img src={item.image || "https://www.seoclerk.com/pics/000/787/824/51099d50ed6a0c6fa4e74f1260db024b.png"} alt={item.title} style={{ height: "150px", objectFit: "cover" }} />
                    }
                  >
                    <Card.Meta title={item.title} description={item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description} />
                  </Card>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* Feedback - think about carousel */}
      <div>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>FEEDBACK</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        >
          <List
            grid={{ gutter: 16, column: 3 }} // Updated to 4 columns
            dataSource={feedbacks}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{
                    width: "100%", // Ensures card takes up available space
                    minHeight: "80px", // Sets consistent minimum height for cards
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
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
                          <StarFilled key={index} style={{ color: "#FFCC33", fontSize: "20px" }} />
                        ))}
                      </Row>
                    </Col>
                  </Row>
                  <p>{item.content.length > 100 ? `${item.content.slice(0, 100)}...` : item.content}</p>
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
          onClick={() => navigate(CLIENT_URI.LOGIN)}
        >
          Đăng ký
        </ButtonCustom>
      </div>
    </div>
  );
};
