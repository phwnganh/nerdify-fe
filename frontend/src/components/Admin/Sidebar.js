import { Col, Row } from "antd";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <Row >
        <Link to={"/"}>
          <div className="logo">
            <img
              src={logo}
              alt="Deustch Nerd"
              style={{ width: "100px", height: "50px", paddingTop: "15px" }}
            />  
          </div>
          </Link>
    </Row>
    );
  }
