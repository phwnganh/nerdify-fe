import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { emailToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!emailToken) return;
    verifyEmail({ emailToken })
      .then((resp) => {
        navigate("/login", {
          state: {
            email: resp.data.email,
          },
          replace: true,
        });
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [emailToken]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      ) : (
        <Result
          status="error"
          title="Xác thực email không thành công!"
          subTitle={error}
        />
      )}
    </div>
  );
};

export default VerifyEmailPage;
