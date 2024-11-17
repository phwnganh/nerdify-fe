import { useEffect, useState } from "react";
import CardCustom from "../../../../../components/Card/CardCustom";
import { TextCustom, TitleCustom } from "../../../../../components/Typography/TypographyCustom";
import { Alert, Col, Row, Pagination } from "antd";
import ButtonCustom from "../../../../../components/Button/ButtonCustom";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../../../constants";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllFlashcards, getPublicFlashcardList, viewFlashcardHistory } from "../../../../../services/LearnerService";
import { useAuth } from "../../../../../hooks";

export default function FlashcardHistory() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Show 2 flashcards per page
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.VIEW_FLASHCARD_HISTORY_DETAIL}/${id}`);
  };

  useEffect(() => {
    getAllFlashcards()
      .then((data) => {
        const userId = user?.id;
        const filteredFlashcards = data?.data?.filter(flashcard => flashcard.isPublic || flashcard.createdBy === userId);
        const sortedFlashcards = filteredFlashcards.sort((a, b) => {
          const lastAccessA = a.historyLearning.length > 0 
            ? new Date(a.historyLearning.at(-1)) 
            : new Date(0); // Set to a very old date if no access history
          const lastAccessB = b.historyLearning.length > 0 
            ? new Date(b.historyLearning.at(-1)) 
            : new Date(0);
          return lastAccessB - lastAccessA; // Sort descending by date
        });

        setFlashcards(sortedFlashcards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate flashcards for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const flashcardsToDisplay = flashcards.slice(startIndex, endIndex);

  return (
    <div>
      {flashcards.length === 0 ? (
        <Alert message="Không có bộ flashcard nào!" type="info" showIcon />
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ paddingTop: "30px" }}>
            {flashcardsToDisplay.map((flashcard, index) => (
              <Col span={12} key={index}>
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
                    <ButtonCustom buttonType="primary" onClick={() => handleViewFlashcardDetail(flashcard?._id)}>
                      Xem chi tiết
                    </ButtonCustom>
                  </div>
                </CardCustom>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={flashcards.length}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </>
      )}
    </div>
  );
}
