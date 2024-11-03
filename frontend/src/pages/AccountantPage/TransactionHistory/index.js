// Danh sách giao dịch trong hệ thống
import React from "react";
import UserInfo from "../../../components/Header/AccountantHeader/UserInfo";
import HoverableCard from "../../../components/Card/HoverableCard";
import { BellOutlined } from "@ant-design/icons";
import TableTransaction from "../../../components/Table/TableTransaction";

const TransactionHistory = () => {
  // Dữ liệu thẻ thông tin
  const doanhThu = [
    { id: 1, title: "Tổng số giao dịch tháng này", value: "35 giao dịch", icon: <BellOutlined /> },
    { id: 2, title: "Doanh thu trong tháng", value: "1,000,000 VND", icon: <BellOutlined /> },
  ];

  const tableData2 = [
    {
      _id: "6715afaa4e73fa9c3d3e5129",
      userId: "67001a78b2d60209c98e5a21",
      packageId: {
        _id: "66fd74d06d8c890efb023393",
        packageName: "6 tháng",
        price: 299000,
        duration: 6,
        benefits: "Không có",
        discount: 10,
        updatedAt: "2024-11-02T11:11:37.274Z",
      },
      startDate: "2024-10-31T10:25:49.580Z",
      endDate: "2025-05-01T10:25:49.640Z",
      totalPrice: 299000,
      processingContent: "completed",
      createdAt: "2024-10-21T01:34:34.796Z",
      updatedAt: "2024-10-31T10:25:49.645Z",
      __v: 0,
      evidence: "https://res.cloudinary.com/dpj5uea0x/image/upload/v1729474490/images/vmxfkhdts5cx9xbpd1kl.jpg",
    },
    {
      _id: "6715afef4e73fa9c3d3e5133",
      userId: "67001a78b2d60209c98e5a21",
      packageId: {
        _id: "66fd74d06d8c890efb023393",
        packageName: "6 tháng",
        price: 299000,
        duration: 6,
        benefits: "Không có",
        discount: 10,
        updatedAt: "2024-11-02T11:11:37.274Z",
      },
      startDate: "2024-11-02T18:16:49.346Z",
      endDate: "2025-05-02T18:16:49.404Z",
      totalPrice: 299000,
      processingContent: "completed",
      createdAt: "2024-10-21T01:35:43.123Z",
      updatedAt: "2024-11-02T18:16:49.410Z",
      __v: 0,
      evidence: "https://res.cloudinary.com/dpj5uea0x/image/upload/v1729474556/images/gmgzvuzcqpqbwqimi6iw.jpg",
    },
    {
      _id: "6715b2314e73fa9c3d3e513e",
      userId: "67001a78b2d60209c98e5a21",
      packageId: {
        _id: "66fd74d06d8c890efb023393",
        packageName: "6 tháng",
        price: 299000,
        duration: 6,
        benefits: "Không có",
        discount: 10,
        updatedAt: "2024-11-02T11:11:37.274Z",
      },
      startDate: "2024-10-21T01:45:21.493Z",
      endDate: "2025-04-21T01:45:21.493Z",
      totalPrice: 299000,
      processingContent: "pending",
      createdAt: "2024-10-21T01:45:21.494Z",
      updatedAt: "2024-10-21T01:45:31.368Z",
      __v: 0,
      evidence: "https://res.cloudinary.com/dpj5uea0x/image/upload/v1729475130/images/c1imq8kba5ikiweq6e2g.jpg",
    },
  ];

  return (
    <>
      <div>
        <UserInfo />
        {/* Thẻ thông tin */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {doanhThu.map((item) => (
              <HoverableCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Bảng thông tin giao dịch */}
        <div style={{ paddingTop: "20px" }}>
          <TableTransaction tableData={tableData2} />
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
