import { useEffect, useState } from "react";
import CardCustom from "../../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../../components/Typography";
import { Alert, Col, Modal, notification, Row, Space } from "antd";
import ButtonCustom from "../../../../../components/Button";
import { CaretLeftOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../../../constants";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMyFolderDetail, getPublicFlashcardList, removeFlashcardInFolder } from "../../../../../services/LearnerService";

export default function FlashcardsInFolder() {
  const [flashcards, setFlashcards] = useState([]);    
  const navigate = useNavigate();
  const {folderId} = useParams();    
  const handleViewFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.VIEW_FLASHCARD_IN_FOLDER_DETAIL}/${id}`);
  };
  useEffect(() => {
      getMyFolderDetail(folderId).then(res => {
            setFlashcards(res?.data?.flashcards);
      })
  }, [folderId]);

  const handleDeleteFlashcard = async(flashcardId) => {
    try {
      const res = await removeFlashcardInFolder(folderId, flashcardId);
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== flashcardId));
      notification.success({
        message: "Xóa flashcard thành công!"
      })
    } catch (error) {
      notification.error({
        message: "Xóa flashcard thất bại!"
      })
    }
  }

  const showDeleteConfirm = (folderId, flashcardId, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Bạn có chắc chắn xóa flashcard này?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => handleDeleteFlashcard(flashcardId),
    });
  };
  return (
    <div>
      <Row>
        <ButtonCustom icon={<CaretLeftOutlined />} buttonType="primary" onClick={() => navigate(-1)}>Quay lại</ButtonCustom>
      </Row>
      <Space direction="vertical" style={{ width: "100%" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
              <div style={{ display: "flex", gap: "10px" }}>
                <ButtonCustom buttonType="primary" onClick={() => handleViewFlashcardDetail(flashcard._id)}>
                  Xem chi tiết
                </ButtonCustom>
                <ButtonCustom buttonType="primary" onClick={(e) => showDeleteConfirm(folderId, flashcard?._id, e)}>
                  Xóa
                </ButtonCustom>
              </div>
            </div>
          </CardCustom>
        </Col>
      ))}
    </Row>
  )}
</Space>


    </div>
  );
}
