import { TitleCustom } from "../../../components/Typography";
import { SearchOutlined } from "@ant-design/icons";
import InputCustom from "../../../components/Input";

import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import FlashcardList from "./FlashCardList";
import { Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import { CLIENT_URI } from "../../../constants";
import { useNavigate } from "react-router-dom";
export default function Flashcard() {
  const navigate = useNavigate();
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
          suffix={<SearchOutlined />}
        />
      </div>
      <FlashcardList />
    </div>
  );
}
