import { useEffect, useState } from "react";
import ButtonCustom from "../../../components/Button";
import ModalCustom from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
export default function ModalRequireToLogin(open) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  console.log("isOpen", isOpen);
  return (
    <div>
      <ModalCustom
        centered
        closeIcon={null}
        open={isOpen}
        footer={null}
        width={1000}
      >
        <p style={{ textAlign: "center", fontSize: "30px" }}>
          Bạn cần đăng nhập để tiếp tục học
        </p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <ButtonCustom
            buttonType="primary"
            style={{
              padding: "15px 40px",
              borderRadius: "5px",
              width: "150px",
            }}
            onClick={() => {
              navigate(CLIENT_URI.LOGIN);
            }}
            closable={true}
          >
            Đăng nhập
          </ButtonCustom>
          <ButtonCustom
            type="default "
            style={{
              padding: "15px 40px",
              borderRadius: "5px",
              width: "150px",
            }}
            onClick={() => {
              setIsOpen(false);
              //   navigate(CLIENT_URI.LANDING_PAGE);
            }}
          >
            Để sau
          </ButtonCustom>
        </div>
      </ModalCustom>
    </div>
  );
}
