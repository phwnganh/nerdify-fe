import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../../constants";
import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import { Col, Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import Flashcard from "./FlashcardCustom";
import { getFlashcardList } from "../../../../services/LearnerService";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

export default function FlashcardList({flashcards}) {
  // const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //  getFlashcardList()
  //     .then((data) => {
  //       console.log("flashcards: ", data);
  //       setFlashcards(data.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const handleViewFlashcardDetail = (id) => {
    navigate(`${CLIENT_URI.FLASH_CARD}/${id}`);
  };
  return (
    <div>
      <Row gutter={[24, 24]} style={{paddingTop: '30px'}}>
        {flashcards?.map((flashcard, index) => (
          <Col span={12}>
            <CardCustom style={{ background: "rgb(240, 242, 245)" }}>
              <div>
                <TitleCustom style={{ margin: "0px" }} level={3}>
                  {flashcard?.title}
                </TitleCustom>
                <TitleCustom level={5}>Trình độ {flashcard?.level}</TitleCustom>
                <TextCustom>{flashcard?.cards?.length} thuật ngữ</TextCustom><span style={{marginLeft: '10px'}}>{flashcard?.isPublic ? <UnlockOutlined/> : <LockOutlined/>}</span>
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
    </div>
  );
}
