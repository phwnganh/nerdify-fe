import { TitleCustom } from "../../../components/Typography";
import { SearchOutlined } from "@ant-design/icons";
import InputCustom from "../../../components/Input";

import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";
import FlashcardList from "./FlashCardList";
export default function Flashcard() {
  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome/>
      <TitleCustom level={2}>Chọn bộ flashcard để học</TitleCustom>
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
