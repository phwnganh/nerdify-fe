import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants";

import { Col, Image, Row, Space } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";

export default function MyFlashCard() {
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

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {flashcards?.map((flashcard, index) => (
          <CardCustom style={{ background: "rgb(240, 242, 245)" }}>
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
                <ButtonCustom buttonType="primary" style={{ margin: "10px", alignItem: "center" }} onClick={() => navigate(`${CLIENT_URI.EDIT_FLASH_CARD}/${flashcard.id}`)}>
                  Chỉnh sửa
                </ButtonCustom>
                <ButtonCustom buttonType="primary" style={{ margin: "10px" }}>
                  Xóa
                </ButtonCustom>
              </div>
            </div>
          </CardCustom>
        ))}
      </Space>
    </div>
  );
}
