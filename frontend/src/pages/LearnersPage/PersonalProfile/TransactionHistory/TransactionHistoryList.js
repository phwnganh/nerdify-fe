import { Alert, Col, Dropdown, Menu, Row, Select, Space } from "antd";
import InputCustom from "../../../../components/Input/InputCustom";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { TextCustom } from "../../../../components/Typography/TypographyCustom";
import { Option } from "antd/es/mentions";
import Sidebar from "../../../../components/Sidebar/LearnerSideBar/SideBarCustom";
import ButtonCustom from "../../../../components/Button/ButtonCustom";
import TableCustom from "../../../../components/Table/TableCustom";
import { useEffect, useState } from "react";
import { historyTransaction } from "../../../../services/LearnerService";
import moment from "moment";
import TransactionDetailModal from "./ModalToViewTransactionDetail";

export default function ViewTransactionHistoryList() {
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showTransactionDetailModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const transactionColumns = [
    {
      title: "Thông tin gói",
      dataIndex: "packageId",
      key: "packageName",
      render: (packageId) => `Gói Premium ${packageId?.packageName}`,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("DD-MM-YYYY"),
    },
    {
      title: "Tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString("vi-VN")} VNĐ`,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <EyeOutlined
            style={{ fontSize: "18px", cursor: "pointer" }}
            onClick={() => showTransactionDetailModal(record)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    try {
      historyTransaction().then((res) => {
        console.log("transaction list: ", res.data);
        setTransactions(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Title */}
        <TextCustom strong style={{ fontSize: "24px", marginBottom: "20px" }}>
          Xem Lịch Sử Giao Dịch
        </TextCustom>

        {/* Table for Transaction History */}
        <div>
          {transactions.length > 0 ? (
            <TableCustom
              dataSource={transactions}
              columns={transactionColumns}
              rowKey="id"
              pagination={{ pageSize: 4 }} // Set pagination with 4 items per page
              style={{ marginTop: "30px" }}
            />
          ) : (
            <Alert
              message="Không có lịch sử giao dịch"
              description="Hiện tại không có giao dịch nào để hiển thị."
              type="info"
              showIcon
              style={{ marginTop: "30px" }}
            />
          )}
        </div>
        <TransactionDetailModal
          visible={isModalVisible}
          onClose={handleCancelModal}
          transaction={selectedTransaction}
        />
      </div>
    </div>
  );
}
