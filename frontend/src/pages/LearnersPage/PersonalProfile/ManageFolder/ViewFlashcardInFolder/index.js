import { useEffect, useState } from "react";
import CardCustom from "../../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../../components/Typography";
import { Alert, Col, Row } from "antd";
import ButtonCustom from "../../../../../components/Button";
import { CaretLeftOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../../../constants";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMyFolderDetail, getPublicFlashcardList } from "../../../../../services/LearnerService";

export default function FlashcardsInFolder() {
  const [flashcards, setFlashcards] = useState([]);    
  const navigate = useNavigate();
  const {folderId} = useParams();    
  const handleViewFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.FLASH_CARD}/${id}`);
  };
  useEffect(() => {
      getMyFolderDetail(folderId).then(res => {
            setFlashcards(res?.data?.flashcards);
      })
  }, [folderId]);
  return (
    <div>
      <Row>
        <ButtonCustom icon={<CaretLeftOutlined />} buttonType="primary" onClick={() => navigate(-1)}>Quay lại</ButtonCustom>
      </Row>
      {flashcards.length === 0 ? (
        <Alert
          message="Không có flashcard nào trong thư mục này."
          type="info"
          showIcon
          style={{ marginTop: "20px" }}
        />
      ) : (
        <Row gutter={[24, 24]} style={{ paddingTop: "30px" }}>
          {flashcards.map((flashcard) => (
            <Col span={12} key={flashcard._id}>
              <CardCustom style={{ background: "rgb(240, 242, 245)" }}>
                <div>
                  <TitleCustom style={{ margin: "0px" }} level={3}>
                    {flashcard?.title}
                  </TitleCustom>
                  <TitleCustom level={5}>Trình độ {flashcard?.level}</TitleCustom>
                  <TextCustom>{flashcard?.cards?.length} thuật ngữ</TextCustom>
                  <span style={{ marginLeft: "10px" }}>
                    {flashcard?.isPublic ? <UnlockOutlined /> : <LockOutlined />}
                  </span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <ButtonCustom buttonType="primary" onClick={() => handleViewFlashcardDetail(flashcard._id)}>
                    Xem chi tiết
                  </ButtonCustom>
                </div>
              </CardCustom>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
