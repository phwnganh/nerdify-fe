import { useEffect, useState } from "react";
import { TextCustom, TitleCustom } from "../../../components/Typography/TypographyCustom";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE, BASE_SERVER, CLIENT_URI } from "../../../constants";
import { useAuth } from "../../../hooks";
import moment from 'moment'
import { getCurrentPremiumPackage } from "../../../services/LearnerService";
export default function MySubscription() {
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const {user} = useAuth();
  const accountType = user?.accountType;
  const [currentPackage, setCurrentPackage] = useState();
  console.log("accountType: ", user?.accountType?.endDate);
  useEffect(() => {
    getCurrentPremiumPackage().then(res => {
      setCurrentPackage(res.data);
    })
  }, [])
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={2}>GÓI ĐĂNG KÝ VÀ THANH TOÁN</TitleCustom>
      </div>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={5}>Trạng thái tài khoản: {accountType?.type}</TitleCustom>
        {accountType?.type ===  ACCOUNT_TYPE.FREEMIUM ? (
          <div>
            <ButtonCustom buttonType="primary" style={{ padding: "20px" }} onClick={() => navigate(CLIENT_URI.PREMIUM)}>
              Nâng cấp gói Premium
            </ButtonCustom>
          </div>
        ) : (
          <div>
            <div>
              <TextCustom>
                Gói của bạn: <span style={{ fontWeight: "bold" }}>Gói Premium {currentPackage?.packageName}</span>
              </TextCustom>
            </div>
            <div>
              <TextCustom>
                Từ ngày: <span style={{ fontWeight: "bold" }}>{moment(accountType?.startDate).format("DD-MM-YYYY")}</span> đến ngày: <span style={{ fontWeight: "bold" }}>{moment(accountType?.endDate).format("DD-MM-YYYY")}</span>
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
