import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/Button";
import CardCustom from "../../../../components/Card";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import FlashcardList from "../../FlashCard/FlashCardList";
import { BASE_SERVER, CLIENT_URI } from "../../../../constants";
import MyFlashCard from "../ManageFlashcard/MyFlashCard";
import Folder from "../../FlashCard/Folder";
import { TitleCustom } from "../../../../components/Typography";
import { useEffect, useState } from "react";
import ModalCustom from "../../../../components/Modal";
import { Button, message, notification } from "antd";
import InputCustom from "../../../../components/Input";
import { createFolder, getMyFolder } from "../../../../services/LearnerService";

export default function ManageFolder() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const handleDisplayModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    getMyFolder()
      .then((data) => {
        console.log("folders: ", data.data);
        setFolders(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleOk = async () => {
    if (newFolderName.trim() === "") {
      messageApi.error("Tên folder không được để trống");
      return;
    }

    try {
      const response = await createFolder({ name: newFolderName.trim() });
      messageApi.success("Tạo mới folder thành công!");
      console.log("new folder: ", response);
      const newFolder = response.data;
      setFolders((prevFolders) => [...prevFolders, newFolder]);
      setIsOpenModal(false);
      setNewFolderName("");
    } catch (error) {
      console.error("Lỗi khi tạo folder:", error);
      messageApi.error("Không thể tạo folder. Vui lòng thử lại sau.");
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {contextHolder}
      <Sidebar />
      <ModalCustom
        title="Thêm folder mới"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div style={{ marginTop: "20px" }}>
            <Button key={"cancel"} style={{ marginRight: "20px" }} onClick={handleCancel}>
              Hủy
            </Button>
            <ButtonCustom buttonType="primary" key="add" onClick={handleOk}>
              Tạo mới
            </ButtonCustom>
          </div>,
        ]}
      >
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <InputCustom value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="Nhập tên folder mới"></InputCustom>
        </div>
      </ModalCustom>
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TitleCustom level={2} style={{ margin: 0 }}>
              Quản lý thư mục
            </TitleCustom>
            <ButtonCustom buttonType="primary" onClick={handleDisplayModal}>
              Thêm folder mới
            </ButtonCustom>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Folder folders={folders} />
          </div>

          {/* <ButtonCustom buttonType="primary" onClick={() => navigate(`${CLIENT_URI.FLASH_CARD}`)} style={{ marginTop: "20px" }}>
            Xem tất cả
          </ButtonCustom> */}
        </CardCustom>
      </div>
    </div>
  );
}
