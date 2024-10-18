import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../../constants";

import { Col, Image, Row, Space } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";

export default function Folder({folders}) {
  const navigate = useNavigate();
 

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {folders?.map((folder, index) => (
          <CardCustom style={{ background: "rgb(240, 242, 245)" }} >
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginLeft: "15px" }}>
                  <TitleCustom style={{ margin: "0px" }} level={4}>
                    {folder?.name}
                  </TitleCustom>
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
      </Space>
    </div>
  );
}
