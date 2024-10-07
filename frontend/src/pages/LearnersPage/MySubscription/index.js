import { useState } from "react";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import ButtonCustom from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";

export default function MySubscription() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  fetch("http://localhost:9999/users/2")
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={2}>GÓI ĐĂNG KÝ VÀ THANH TOÁN</TitleCustom>
      </div>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={5}>Trạng thái tài khoản: {user?.accountType}</TitleCustom>
        {user?.accountType === "freemium" ? (
          <div>
            <ButtonCustom buttonType="primary" style={{ padding: "20px" }} onClick={() => navigate(CLIENT_URI.PREMIUM)}>
              Nâng cấp gói Premium
            </ButtonCustom>
          </div>
        ) : (
          <div>
            <div>
              <TextCustom>
                Gói của bạn: <span style={{ fontWeight: "bold" }}>Gói Premium 6 tháng</span>
              </TextCustom>
            </div>
            <div>
              <TextCustom>
                Từ ngày: <span style={{ fontWeight: "bold" }}>29/08/2024</span> đến ngày: <span style={{ fontWeight: "bold" }}>01/03/2025</span>
              </TextCustom>
            </div>
            <div>
            <ButtonCustom buttonType="primary" style={{ padding: "20px", marginTop: '30px' }} onClick={() => navigate(CLIENT_URI.MANAGE_SUBSCRIPTION)}>
              Quản lý gói đăng ký
            </ButtonCustom>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
