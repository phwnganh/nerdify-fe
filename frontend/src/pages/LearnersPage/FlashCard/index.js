import { useEffect, useState } from "react";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import { SearchOutlined } from "@ant-design/icons";
import InputCustom from "../../../components/Input";
import { Col, Row } from "antd";
import CardCustom from "../../../components/Card";
import ButtonCustom from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:9999/flashcard")
      .then((res) => res.json())
      .then((data) => {
        console.log("flashcards: ", data);
        setFlashcards(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.FLASH_CARD}/${id}`)
  }
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome/>
      <TitleCustom level={2}>Chọn bộ flashcard để học</TitleCustom>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <InputCustom
          placeholder="Tìm kiếm flashcard"
          //     onChange={handleInputChange}
          //     value={inputValue}
          style={{
            width: "300px",
          }}
          suffix={<SearchOutlined />}
        />
      </div>
      <Row gutter={[24, 24]}>
        {flashcards?.map((flashcard, index) => (
          <Col span={12} style={{marginTop: '20px'}}>
            <CardCustom>
              <div style={{}}>
                <TitleCustom level={4}>{flashcard?.title}</TitleCustom>
                <TextCustom>{flashcard?.cards?.length} thuật ngữ</TextCustom>
              </div>
              <div style={{marginTop: '10px'}}>
              <ButtonCustom buttonType="primary" onClick={() => handleViewFlashcardDetail(flashcard?.id)}>Xem chi tiết</ButtonCustom>
                
              </div>
            </CardCustom>
          </Col>
        ))}
      </Row>
    </div>
  );
}
