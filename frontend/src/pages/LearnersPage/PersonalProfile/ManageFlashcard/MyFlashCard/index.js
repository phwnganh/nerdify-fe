import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../../../constants";

import { Alert, Col, Image, Modal, Row, Space } from "antd";
import CardCustom from "../../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../../components/Typography";
import ButtonCustom from "../../../../../components/Button";
import { getAllFlashcards, getFlashcardList, getPublicFlashcardList, removeFlashcard } from "../../../../../services/LearnerService";
import { useAuth } from "../../../../../hooks";

export default function MyFlashCard() {
  const [flashcards, setFlashcards] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getAllFlashcards()
      .then((data) => {
        const myFlashcards = data.data.filter((flashcard) => flashcard?.createdBy === user?.id && flashcard?.isPublic === false);
        console.log("flashcards: ", myFlashcards);
        setFlashcards(myFlashcards);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteFlashcard = async (flashcardId, e) => {
    try {
      const res = await removeFlashcard(flashcardId);
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== flashcardId));
      e.stopPropagation();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFlashCard = async (flashcardId, e) => {
    e.stopPropagation();
    navigate(`${CLIENT_URI.EDIT_FLASH_CARD}/${flashcardId}`);
  };

  const showDeleteConfirm = (flashcardId, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Bạn có chắc chắn xóa flashcard này?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => handleDeleteFlashcard(flashcardId),
    });
  };

  const handleClickFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.VIEW_MY_FLASHCARD_DETAIL}/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {flashcards.length === 0 ? (
          <Alert message="Không có bộ flashcard nào!" type="info" showIcon style={{ marginTop: "20px" }} />
        ) : (
          <>
            {flashcards?.map((flashcard, index) => (
              <CardCustom style={{ background: "rgb(240, 242, 245)" }} onClick={() => handleClickFlashcardDetail(flashcard?._id)}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image style={{ alignContent: "center" }} width={70} height={70} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div style={{ marginLeft: "15px" }}>
                      <TitleCustom style={{ margin: "0px" }} level={3}>
                        {flashcard?.title}
                      </TitleCustom>
                      <TitleCustom level={5}>Trình độ {flashcard?.level}</TitleCustom>
                      <TextCustom>{flashcard?.cards?.length} thuật ngữ</TextCustom>
                    </div>
                  </div>

                  <div>
                    <ButtonCustom buttonType="primary" style={{ margin: "10px", alignItem: "center" }} onClick={(e) => handleEditFlashCard(flashcard?._id, e)}>
                      Chỉnh sửa
                    </ButtonCustom>
                    <ButtonCustom buttonType="primary" style={{ margin: "10px" }} onClick={(e) => showDeleteConfirm(flashcard?._id, e)}>
                      Xóa
                    </ButtonCustom>
                  </div>
                </div>
              </CardCustom>
            ))}
          </>
        )}
      </Space>
    </div>
  );
}
