import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import CardCustom from "../../../../components/Card";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import FlashcardList from "../../FlashCard/FlashCardList";
import { CLIENT_URI } from "../../../../constants";
import MyFlashCard from "../../FlashCard/MyFlashCard";
import Folder from "../../FlashCard/Folder";

export default function ManageFolder() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="Quản lý thư mục" style={{ backgroundColor: "white" }}>
          <Folder />
          <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom>
        </CardCustom>
      </div>
    </div>
  );
}
