import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import CardCustom from "../../../../components/Card";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import FlashcardList from "../../FlashCard/FlashCardList";
import { CLIENT_URI } from "../../../../constants";
import MyFlashCard from "./MyFlashCard";
import FlashcardHistory from "./FlashcardHistory";

export default function ManageFlashcard() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="Lịch sử học flashcard" style={{ backgroundColor: "white" }}>
          <FlashcardHistory />
          {/* <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom> */}
        </CardCustom>
        {/* <CardCustom title="Quản lý bộ flashcard" style={{ backgroundColor: "white" }}>
          <MyFlashCard />
          <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom>
        </CardCustom> */}
        <CardCustom
  title={
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>Quản lý bộ flashcard</span>
      <ButtonCustom
        onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}
        buttonType="primary"
        style={{ padding: "10px 20px" }}
      >
        Tạo bộ flashcard mới
      </ButtonCustom>
    </div>
  }
  style={{ backgroundColor: "white" }}
>
  <MyFlashCard />
</CardCustom>
      </div>
    </div>
  );
}
