import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Col, Dropdown, List, Row } from "antd";
import {
  AudioOutlined,
  EditOutlined,
  FileOutlined,
  FolderAddFilled,
  FolderFilled,
  FolderOpenFilled,
  FolderOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
  SoundOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import ReactCardFlip from "react-card-flip";
import { Container, Flashcard, FlashcardFlipped } from "./styled";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
export default function FlashCardDetail() {
  const navigate = useNavigate();
  const { flashcardId } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9999/flashcard/${flashcardId}`)
      .then((data) => data.json())
      .then((data) => setFlashcard(data))
      .catch((err) => console.error(err));
  }, [flashcardId]);
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo folder mới
        </div>
      ),
      icon: <FolderOutlined />,
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo học phần mới
        </div>
      ),
      icon: <FileOutlined />,
    },
  ];

  const folderSelected = [
    {
      key: "1",
      icon: <FolderAddFilled />,
      label: <div>Tạo folder mới</div>,
    },
    {
      key: "2",
      icon: <FolderOpenFilled />,
      label: <div>Thêm vào folder sẵn có</div>,
    },
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcard?.cards.length);
    console.log(isFlipped);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + flashcard?.cards.length) % flashcard?.cards.length
    );
    console.log(isFlipped);
  };

  const toggleFlashcard = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginLeft: 235 }}>
        <BreadCrumbHome />
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <TitleCustom level={2}>{flashcard?.title}</TitleCustom>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <ButtonCustom
            style={{
              background: "rgb(13 164 184 / 87%)",
              color: "white",
              width: "200px",
              margin: "20px",
            }}
          >
            Tạo bộ flashcard mới
          </ButtonCustom>
        </Dropdown>

        <ButtonCustom
          style={{
            background: "#088d2b",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
        >
          Kiểm tra
        </ButtonCustom>

        <ButtonCustom
          style={{
            backgroundColor: "#ffe259",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
        >
          Quản lý thư mục
        </ButtonCustom>
      </div>
      <Container>
        <div
          style={{
            backgroundColor: "#e0e0e0",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.6s",
            width: isFullScreen ? "70vw" : "auto",
            height: isFullScreen ? "30vh" : "auto",
            top: isFullScreen ? "0" : "auto",
            left: isFullScreen ? "0" : "auto",
            overflow: "hidden",
          }}
          onClick={toggleFlashcard}
        >
          <Row justify={"end"}>
            <Col>
              <Button
                icon={<SoundOutlined />}
                shape="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(flashcard?.cards[currentIndex].terms);
                }}
              ></Button>
            </Col>
          </Row>
          <div style={{ margin: "40px 0" }}>
            <TextCustom>
              {isFlipped
                ? flashcard?.cards[currentIndex].definitions
                : flashcard?.cards[currentIndex].terms}
            </TextCustom>
          </div>
          <Row justify={"space-around"} align={"middle"}>
            <Col>
              <Button
                icon={<LeftOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                shape="circle"
              ></Button>
            </Col>
            <Col>{`${currentIndex + 1}/${flashcard?.cards.length}`}</Col>
            <Col>
              <Button
                icon={<RightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                shape="circle"
              ></Button>
            </Col>
          </Row>
          <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
            <Col style={{ marginRight: "20px" }}>
              <Button icon={<ShareAltOutlined />} shape="circle"></Button>
            </Col>
            <Col>
              <Button
                icon={
                  isFullScreen ? (
                    <FullscreenExitOutlined />
                  ) : (
                    <FullscreenOutlined />
                  )
                }
                shape="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullScreen();
                }}
              ></Button>
            </Col>
          </Row>
        </div>

        <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
          <Button
            icon={<EditOutlined />}
            shape="circle"
            style={{ marginRight: "20px" }}
          ></Button>
          <Dropdown menu={{ items: folderSelected }} trigger={["click"]}>
            <Button
              icon={<FolderOutlined />}
              shape="circle"
              style={{ marginRight: "10px" }}
            ></Button>
          </Dropdown>
        </Row>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <TitleCustom level={2}>TỪ ĐIỂN</TitleCustom>
          <List
            dataSource={flashcard?.cards}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: "100%" }} align="middle">
                  <Col
                    style={{ flex: 1, textAlign: "left", paddingLeft: "10px" }}
                  >
                    <span style={{ marginRight: "15px" }}>{item.terms}</span>
                    <Button
                      shape="circle"
                      icon={<SoundOutlined />}
                      onClick={() => handleSpeak(item.terms)}
                    />
                  </Col>

                  <Col
                    style={{
                      flex: 1,
                      textAlign: "right",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>
                      {item.definitions}
                    </span>
                    <Button
                      shape="circle"
                      icon={<SoundOutlined />}
                      onClick={() => handleSpeak(item.definitions)}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          ></List>
        </div>
      </Container>
    </div>
  );
}
