import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../../constants";

import { Alert, Col, Image, Modal, notification, Row, Space, Pagination } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { getMyFolderDetail, removeFolder } from "../../../../services/LearnerService";

export default function Folder({ folders: initialFolders }) {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(initialFolders);
  const [currentPage, setCurrentPage] = useState(1);
  const foldersPerPage = 4;

  // Handle folder navigation
  const handleClickFolderDetail = async (folderId) => {
    navigate(CLIENT_URI.VIEW_FLASHCARDS_IN_FOLDER + "/" + folderId);
  };

  // Handle folder deletion
  const handleDeleteFolder = async (folderId, e) => {
    try {
      await removeFolder(folderId);
      setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
      notification.success({
        message: "Xóa folder thành công!"
      });
    } catch (error) {
      notification.error({
        message: "Xóa folder thất bại!"
      });
    }
  };

  // Confirm delete modal
  const showDeleteConfirm = (folderId, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Bạn có chắc chắn xóa folder này?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => handleDeleteFolder(folderId)
    });
  };

  // Reset folders when initialFolders changes
  useEffect(() => {
    setFolders(initialFolders);
  }, [initialFolders]);

  // Calculate folders to display for the current page
  const startIndex = (currentPage - 1) * foldersPerPage;
  const paginatedFolders = folders.slice(startIndex, startIndex + foldersPerPage);

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {folders.length === 0 ? (
          <Alert
            message="Không có thư mục nào!"
            type="info"
            showIcon
            style={{ marginTop: "20px" }}
          />
        ) : (
          <>
            {paginatedFolders.map((folder, index) => (
              <CardCustom
                key={index}
                style={{ background: "rgb(240, 242, 245)" }}
                onClick={() => handleClickFolderDetail(folder._id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginLeft: "15px" }}>
                      <TitleCustom style={{ margin: "0px" }} level={4}>
                        {folder?.name}
                      </TitleCustom>
                      <div style={{ marginTop: "10px" }}>
                        <TextCustom>
                          Có{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {folder?.flashcardCount > 0 ? folder?.flashcardCount : 0}
                          </span>{" "}
                          bộ flashcards
                        </TextCustom>
                      </div>
                    </div>
                  </div>
                  <ButtonCustom
                    buttonType="primary"
                    style={{ margin: "10px" }}
                    onClick={(e) => showDeleteConfirm(folder?._id, e)}
                  >
                    Xóa
                  </ButtonCustom>
                </div>
              </CardCustom>
            ))}
            <Pagination
              current={currentPage}
              pageSize={foldersPerPage}
              total={folders.length}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginTop: "20px", textAlign: "center" }}
            />
          </>
        )}
      </Space>
    </div>
  );
}
