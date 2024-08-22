import React, { useRef, useState } from "react";
import { Button, Carousel, Col, Dropdown, List, Row } from "antd";
import { AudioOutlined, EditOutlined, FileOutlined, FolderAddFilled, FolderFilled, FolderOpenFilled, FolderOutlined, FullscreenOutlined, LeftOutlined, RightOutlined, ShareAltOutlined, SoundOutlined, SyncOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../components/Button";
import { TextCustom, TitleCustom } from '../../../components/Typography';
import CardCustom from '../../../components/Card';

export default function FlashCard() {
  const navigate = useNavigate();

  const flashcardContents = [
    {
      id: 1,
      terms: "cat",
      definitions: "catttt"
    }, {
      id: 2,
      terms: "dog",
      definitions: "doggggg"
    }, {
      id: 3,
      terms: "goat",
      definitions: "goattttt"
    }, {
      id: 4,
      terms: "human",
      definitions: "person"
    }, {
      id: 5,
      terms: "pig",
      definitions: "pigggg"
    }, {
      id: 6,
      terms: "frog",
      definitions: "frogss"
    }
  ]
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo folder mới
        </div>
      ),
      icon: <FolderOutlined />,
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo học phần mới
        </div>
      ),
      icon: <FileOutlined />,
    },
  ];

  const folderSelected = [
    {
      key: "1",
      icon: <FolderAddFilled/>,
      label: (
        <div>Tạo folder mới</div>
      )
    }, {
      key: "2",
      icon: <FolderOpenFilled/>,
      label: (
        <div>Thêm vào folder sẵn có</div>
      )
    }
  ]


  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardContents.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcardContents.length) % flashcardContents.length);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <TitleCustom level={2}>abc</TitleCustom>
      </div>

      <Dropdown
        menu={{ items }}
        trigger={['click']}
      >
        <ButtonCustom
          style={{
            background: "rgb(13 164 184 / 87%)",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
        >
          Tạo bộ flashcard mới
        </ButtonCustom>
      </Dropdown>

      <ButtonCustom
        style={{
          background: "#088d2b",
          color: "white",
          width: "200px",
          margin: "20px",
        }}
      >
        Kiểm tra
      </ButtonCustom>

      <ButtonCustom
        style={{ backgroundColor: '#ffe259', color: 'white', width: '200px', margin: '20px' }}
      >
        Quản lý thư mục
      </ButtonCustom>

      <div style={{backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
        <Row justify={"end"}>
          <Col>
          <Button icon={<AudioOutlined/>} shape="circle"></Button>
          </Col>
        </Row>
        <div style={{margin: '40px 0'}}>
          <TextCustom>{flashcardContents[currentIndex].terms}</TextCustom>

        </div>
        <Row justify={"space-around"} align={"middle"}>
          <Col>
          <Button icon={<LeftOutlined/>} onClick={handlePrevious} shape="circle"></Button>
          </Col>
          <Col>
          {`${(currentIndex + 1)}/${flashcardContents.length}`}
          </Col>
          <Col>
          <Button icon={<RightOutlined/>} onClick={handleNext} shape="circle"></Button>
          </Col>
        </Row>
        <Row justify={"end"} align={"end"} style={{marginTop: '20px'}}>
          <Col style={{marginRight: '20px'}}>
          <Button icon={<ShareAltOutlined />} shape="circle"></Button>
          </Col>
          <Col>
          <Button icon={<FullscreenOutlined/>} shape="circle"></Button>
          </Col>
        </Row>
      </div>
      <Row justify={"end"} align={"end"} style={{marginTop: '20px'}}>
        <Button icon={<EditOutlined/>} shape="circle"></Button>
        <Dropdown menu={{items: folderSelected}} trigger={['click']}>
        <Button icon={<FolderOutlined/>} shape="circle"></Button>
        </Dropdown>
      </Row>
     <div style={{marginTop: '20px', textAlign: 'center'}}>
      <TitleCustom level={2}>TỪ ĐIỂN</TitleCustom>
      <List dataSource={flashcardContents} renderItem={item => (
       <List.Item>
        <Row style={{ width: '100%' }} align="middle">
          <Col style={{ flex: 1, textAlign: 'left', paddingLeft: '10px' }}>
          {item.terms}
          </Col>
          <Col style={{ flex: 1, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <span style={{ marginRight: '10px' }}>{item.definitions}</span>
          <Button shape="circle" icon={<SoundOutlined />} />
          </Col>
        </Row>
       </List.Item>
      )}></List>
     </div>
    </div>
  );
}
