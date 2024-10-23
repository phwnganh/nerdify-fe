import { TitleCustom } from "../../../components/Typography";
import { SearchOutlined } from "@ant-design/icons";
import InputCustom from "../../../components/Input";

import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import FlashcardList from "./FlashCardList";
import { Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import { CLIENT_URI } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlashcardList, searchFlashcard } from "../../../services/LearnerService";
export default function Flashcard() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const fetchAllFlashcards = async () => {
    try {
      const res = await getFlashcardList();
      setFlashcards(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch = async (query) => {
    try {
      if(query.trim() !== ""){
        const res = await searchFlashcard(query);
        setFlashcards(res?.data);
      }else{
        fetchAllFlashcards();
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
   fetchAllFlashcards()
  }, []);

  const onInputChange = e => {
    const query = e.target.value;
    setInputText(query);
    handleSearch(query);
  }
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <Row justify="space-between" align="middle">
        <Col>
          <TitleCustom level={2}>Chọn bộ flashcard để học</TitleCustom>
        </Col>
        <Col>
          <ButtonCustom onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)} buttonType="primary" style={{ padding: "20px" }}>
            Tạo bộ flashcard mới
          </ButtonCustom>
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <InputCustom
          placeholder="Tìm kiếm flashcard"
          style={{
            width: "300px",
            marginBottom: "20px",
          }}
          value={inputText}
          onChange={onInputChange}
          suffix={<SearchOutlined />}
        />
      </div>
      <FlashcardList flashcards={flashcards}/>
    </div>
  );
}
