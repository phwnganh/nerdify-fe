import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import CardCustom from "../../../../components/Card";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import FlashcardList from "../../FlashCard/FlashCardList";
import { CLIENT_URI } from "../../../../constants";
import MyFlashCard from "../../FlashCard/MyFlashCard";

export default function ManageFlashcard() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="Lịch sử học flashcard" style={{ backgroundColor: "white" }}>
          <FlashcardList />
          <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom>
        </CardCustom>
        <CardCustom title="Quản lý bộ flashcard" style={{ backgroundColor: "white" }}>
          <MyFlashCard />
          <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom>
        </CardCustom>
      </div>
    </div>
  );
}
