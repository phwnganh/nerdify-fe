import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, List, Row, Modal, Select, message, Image } from "antd";
import {
  EditOutlined,
  FileOutlined,
  FolderAddFilled,
  FolderOpenFilled,
  FolderOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftOutlined,
  LockOutlined,
  MinusCircleOutlined,
  RightOutlined,
  ShareAltOutlined,
  SoundOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import { Container } from "./styled";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ModalCustom from "../../../../components/Modal";
import InputCustom from "../../../../components/Input";
import ReactCardFlip from "react-card-flip";
import { BASE_SERVER } from "../../../../constants";
import { Option } from "antd/es/mentions";
import { addFlashcardToFolder, getFlashcardDetail, getMyFolder, updateFlashcardStatus } from "../../../../services/LearnerService";
import { useAuth } from "../../../../hooks";
import moment from "moment";

export default function FlashCardDetail() {
  const navigate = useNavigate();
  const { flashcardId } = useParams();
  const { user } = useAuth();

  const [flashcard, setFlashcard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlippedNormal, setIsFlippedNormal] = useState(false);
  const [isFlippedModal, setIsFlippedModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [numberOfCard, setNumberOfCard] = useState("");
  const [isVisibleFolderList, setIsVisibleFolderList] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const displayModalToChooseFolders = () => {
    console.log("Modal is opening");
    setIsVisibleFolderList(true);
  };

  const handleOkToChooseFolders = () => {
    if (!selectedFolderId) {
      message.error("Vui lòng chọn một folder trước khi thêm.");
      return;
    }
    addFlashcardToFolder(selectedFolderId, flashcardId)
      .then((res) => {
        message.success("Thêm vào folder thành công!");
        setIsVisibleFolderList(false); // Close modal on success
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Flashcard đã tồn tại trong folder.";
        message.error(errorMessage);
        console.error("Error:", err);
      });

    // setIsVisibleFolderList(false);
  };

  const handleCancelToChooseFolders = () => {
    setIsVisibleFolderList(false);
  };

  const handleSelectFolder = (key) => {
    setSelectedFolder(key);
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    navigate(`${CLIENT_URI.TEST_FLASH_CARD}/${flashcardId}/${numberOfCard}`);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (flashcardId) {
      getFlashcardDetail(flashcardId)
        .then((data) => {
          setFlashcard(data.data);
          setIsPublic(data.data.isPublic);
        })
        .catch((err) => console.error(err));
    }
  }, [flashcardId]);

  const handleChangStatus = () => {
    const newStatus = !isPublic;
    console.log(isPublic);

    updateFlashcardStatus(flashcardId, newStatus)
      .then((res) => {
        setIsPublic(newStatus);
        message.success("Cập nhật trạng thái flashcard thành công!");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Không thể cập nhật trạng thái flashcard.";
        message.error(errorMessage);
        console.error("Error:", err);
      });
  };

  useEffect(() => {
    getMyFolder()
      .then((data) => {
        setFolders(data.data);
        console.log("folders:", folders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const items = [
    {
      key: "1",
      label: <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>Tạo folder mới</div>,
      icon: <FolderOutlined />,
    },
    {
      key: "2",
      label: <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>Tạo học phần mới</div>,
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
      label: <div>Thêm vào folder của tôi</div>,
    },
  ];

  const handleNext = () => {
    setIsFlippedNormal(false);
    setIsFlippedModal(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcard?.cards.length);
  };

  const handlePrevious = () => {
    setIsFlippedNormal(false);
    setIsFlippedModal(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcard?.cards.length) % flashcard?.cards.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsFlippedModal(false);
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleOnChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setNumberOfCard(inputValue);
    }
  };

  const renderFlashcardContent = (isFlipped, setIsFlipped) => {
    const toggleFlashcard = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection="orientation">
        {/* Front of the card */}
        <div
          key="front"
          style={{
            backgroundColor: "#e0e0e0",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.6s",
            backgroundColor: "#e0e0e0",
            height: "250px",
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
                  handleSpeak(flashcard?.cards[currentIndex].term);
                }}
              />
            </Col>
          </Row>
          <div style={{ margin: "40px 0" }}>
            <TextCustom>{flashcard?.cards[currentIndex].term}</TextCustom>
          </div>
          <Row justify={"space-around"} align={"middle"}>
            <Col>
              <Button
                icon={<LeftOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                  setIsFlipped(false);
                }}
                shape="circle"
              />
            </Col>
            <Col>{`${currentIndex + 1}/${flashcard?.cards.length}`}</Col>
            <Col>
              <Button
                icon={<RightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                  setIsFlipped(false);
                }}
                shape="circle"
              />
            </Col>
          </Row>
          <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
            <Col style={{ marginRight: "20px" }}>{/* <Button icon={<ShareAltOutlined />} shape="circle" /> */}</Col>
            <Col>
              <Button
                icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                shape="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullScreen();
                }}
              />
            </Col>
          </Row>
        </div>
        {/* Back of the card */}
        <div
          key="back"
          style={{
            backgroundColor: "#e0e0e0",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.6s",
            height: "250px",
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
                  handleSpeak(flashcard?.cards[currentIndex].definition);
                }}
              />
            </Col>
          </Row>
          <div style={{ margin: "40px 0" }}>
            <TextCustom>{flashcard?.cards[currentIndex].definition}</TextCustom>
          </div>
          <Row justify={"space-around"} align={"middle"}>
            <Col>
              <Button
                icon={<LeftOutlined />}
                onClick={(e) => {
                  //                 e.stopPropagation();
                  handlePrevious();
                  setIsFlipped(false);
                }}
                shape="circle"
              />
            </Col>
            <Col>{`${currentIndex + 1}/${flashcard?.cards.length}`}</Col>
            <Col>
              <Button
                icon={<RightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                  setIsFlipped(false);
                }}
                shape="circle"
              />
            </Col>
          </Row>
          <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
            <Col style={{ marginRight: "20px" }}>{/* <Button icon={<ShareAltOutlined />} shape="circle" /> */}</Col>
            <Col>
              <Button
                icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                shape="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullScreen();
                }}
              />
            </Col>
          </Row>
        </div>
      </ReactCardFlip>
    );
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginLeft: 235 }}>
        <BreadCrumbHome />
      </div>
      {/* Test Modal */}
      <ModalCustom
        title="Nhập số lượng câu"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        footer={[
          <ButtonCustom key="submit" buttonType="primary" onClick={handleOk} disabled={!(numberOfCard > 0 && numberOfCard <= flashcard?.cards.length)}>
            Bắt đầu làm bài
          </ButtonCustom>,
        ]}
        centered
      >
        <TextCustom style={{ display: "flex", alignItems: "center" }}>
          Số lượng câu hỏi : &nbsp;
          <InputCustom
            onChange={handleOnChange}
            style={{
              width: "90px",
              textAlign: "center",
              padding: "0",
            }}
            addonAfter={`/ ${flashcard?.cards.length}`}
          />
        </TextCustom>
      </ModalCustom>
      {/* Full Screen Modal */}
      <Modal
        visible={isFullScreen}
        onCancel={() => {
          toggleFullScreen();
          setIsFlippedModal(false);
        }}
        footer={null}
        width={"80%"}
        bodyStyle={{ padding: 0 }}
        centered
      >
        {renderFlashcardContent(isFlippedModal, setIsFlippedModal)}
      </Modal>
      <ModalCustom
        title="Chọn folder có sẵn"
        visible={isVisibleFolderList}
        onOk={handleOkToChooseFolders}
        onCancel={handleCancelToChooseFolders}
        footer={[
          <div style={{ marginTop: "20px" }}>
            <Button key={"cancel"} style={{ marginRight: "20px" }} onClick={handleCancelToChooseFolders}>
              Hủy
            </Button>
            <ButtonCustom buttonType="primary" key="add" onClick={handleOkToChooseFolders}>
              Thêm vào folder
            </ButtonCustom>
          </div>,
        ]}
      >
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <Select placeholder="Vui lòng chọn folder dưới đây" style={{ width: 250 }} onChange={(value) => setSelectedFolderId(value)}>
            {folders.map((folder) => (
              <Option key={folder._id} value={folder._id}>
                {folder.name}
              </Option>
            ))}
          </Select>
        </div>
      </ModalCustom>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <TitleCustom level={2}>{flashcard?.title}</TitleCustom>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <TitleCustom level={4}>Trình độ {flashcard?.level}</TitleCustom>
        </div>
        <ButtonCustom
          style={{
            background: "rgb(13 164 184 / 87%)",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
          onClick={displayModalToChooseFolders}
        >
          Thêm vào folder của tôi
        </ButtonCustom>
        <ButtonCustom
          style={{
            background: "#088d2b",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
          onClick={showModal}
        >
          Kiểm tra
        </ButtonCustom>
      </div>
      <Container>
        {/* Render flashcard content */}
        {renderFlashcardContent(isFlippedNormal, setIsFlippedNormal)}
        {/* Button edit and add to folder */}
        <Row justify={"space-between"} align={"middle"} style={{ marginTop: "20px" }}>
          <Col>
            <div>
              <TextCustom style={{ fontSize: "12px" }}>Tạo bởi</TextCustom>
            </div>
            <div>
              <TextCustom style={{ fontWeight: "bold", fontSize: "16px", color: "#ffa751" }}>{flashcard?.createdBy === user?.id ? user?.fullName : "Anonymous Users"}</TextCustom>
            </div>
            <div>
              <TextCustom style={{ fontSize: "12px" }}>Đã tạo {moment(user?.updatedAt).format("DD-MM-YYYY")}</TextCustom>
            </div>
          </Col>
          <Col>
            {/* <Button icon={<MinusCircleOutlined />} shape="circle" style={{ marginRight: "20px" }}></Button> */}
            {/* <Dropdown menu={{ items: folderSelected }} trigger={["click"]}> */}
            {/* <Button icon={<FolderOutlined />} shape="circle" style={{ marginRight: "10px" }} onClick={displayModalToChooseFolders}></Button> */}
            {/* </Dropdown> */}
          </Col>
        </Row>
        {/* List word and definition */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <TitleCustom level={2}>TỪ ĐIỂN</TitleCustom>
          <List
            dataSource={flashcard?.cards}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: "100%" }} align="middle">
                  <Col
                    style={{
                      flex: 1,
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  >
                    <Button style={{ marginRight: "15px" }} shape="circle" icon={<SoundOutlined />} onClick={() => handleSpeak(item.term)} />
                    <span style={{ marginRight: "15px" }}>{item.term}</span>
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
                    <span style={{ marginRight: "10px" }}>{item.definition}</span>
                    <Image
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                        borderRadius: "8px", // Optional: make it look more polished
                        objectFit: "cover", 
                      }}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Button shape="circle" icon={<SoundOutlined />} onClick={() => handleSpeak(item.definition)} style={{ marginLeft: "10px" }} />
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
