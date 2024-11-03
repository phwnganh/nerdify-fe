import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../../constants";

import { Alert, Col, Image, Row, Space } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { getMyFolderDetail } from "../../../../services/LearnerService";

export default function Folder({ folders }) {
  const navigate = useNavigate();

  const handleClickFolderDetail = async (folderId) => {
    navigate(CLIENT_URI.VIEW_FLASHCARDS_IN_FOLDER + "/" + folderId);
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {folders.length === 0 ? (
          <Alert message="Không có thư mục nào!" type="info" showIcon style={{ marginTop: "20px" }} />
        ) : (
          <>
            {" "}
            {folders?.map((folder, index) => (
              <CardCustom style={{ background: "rgb(240, 242, 245)" }} onClick={() => handleClickFolderDetail(folder._id)}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginLeft: "15px" }}>
                      <TitleCustom style={{ margin: "0px" }} level={4}>
                        {folder?.name}
                      </TitleCustom>
                      <div style={{ marginTop: "10px" }}>
                        <TextCustom>
                          Có <span style={{ fontWeight: "bold" }}>{folder?.flashcardCount > 0 ? folder?.flashcardCount : 0}</span> bộ flashcards
                        </TextCustom>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                <ButtonCustom buttonType="primary" style={{ margin: "10px", alignItem: "center" }} onClick={() => navigate(`${CLIENT_URI.EDIT_FLASH_CARD}/${flashcard.id}`)}>
                  Chỉnh sửa
                </ButtonCustom>
                <ButtonCustom buttonType="primary" style={{ margin: "10px" }}>
                  Xóa
                </ButtonCustom>
              </div> */}
                </div>
              </CardCustom>
            ))}
          </>
        )}
      </Space>
    </div>
  );
}
