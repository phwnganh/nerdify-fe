// import React, { useState } from "react";
// import { Table, Button, Modal, Form, Input, Checkbox, InputNumber, Popconfirm, Space, message, Dropdown, Menu } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// // Initial Data
// const initialPackages = [{ key: "1", name: "Gói 1", price: 100000 }];
// const initialBenefits = [{ key: "1", name: "Lợi ích 1" }];

// const TablePremiumPack = () => {
//   const [packages, setPackages] = useState(initialPackages);
//   const [benefits, setBenefits] = useState(initialBenefits);
//   const [selectedBenefits, setSelectedBenefits] = useState({});
//   const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
//   const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
//   const [editingPackage, setEditingPackage] = useState(null);
//   const [form] = Form.useForm();

//   // Handle adding or editing packages
//   const handlePackageSubmit = (values) => {
//     const { price, months } = values;
//     const totalPrice = price * months; // Calculate total price
//     const newPackageData = { ...values, totalPrice };

//     if (editingPackage) {
//       setPackages((prev) => prev.map((pkg) => (pkg.key === editingPackage.key ? { ...pkg, ...newPackageData } : pkg)));
//     } else {
//       if (packages.length >= 5) {
//         message.warning("Tối đa chỉ được thêm 5 gói.");
//         return;
//       }
//       const newPackage = { key: `${packages.length + 1}`, ...newPackageData };
//       setPackages((prev) => [...prev, newPackage]);
//     }
//     setIsPackageModalOpen(false);
//     form.resetFields();
//     setEditingPackage(null);
//   };

//   // Handle adding new benefits
//   const handleBenefitSubmit = (values) => {
//     const newBenefit = { key: `${benefits.length + 1}`, ...values };
//     setBenefits((prev) => [...prev, newBenefit]);
//     setIsBenefitModalOpen(false);
//     form.resetFields();
//   };

//   // Handle checkbox toggle
//   const handleCheckboxChange = (packageKey, benefitKey) => {
//     const key = `${packageKey}-${benefitKey}`;
//     setSelectedBenefits((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   // Delete package
//   const handleDeletePackage = (key) => {
//     setPackages((prev) => prev.filter((pkg) => pkg.key !== key));
//   };

//   // Delete benefit
//   const handleDeleteBenefit = (key) => {
//     setBenefits((prev) => prev.filter((benefit) => benefit.key !== key));
//   };

//   // Open modal to edit package
//   const handleEditPackage = (pkg) => {
//     setEditingPackage(pkg);
//     form.setFieldsValue(pkg);
//     setIsPackageModalOpen(true);
//   };

//   // Helper function to generate the menu items dynamically
//   const getPackageMenuItems = (pkg) => [
//     {
//       key: "edit",
//       label: <div onClick={() => handleEditPackage(pkg)}>Sửa</div>,
//     },
//     {
//       key: "delete",
//       label: (
//         <Popconfirm title="Bạn có chắc muốn xóa gói này?" onConfirm={() => handleDeletePackage(pkg.key)}>
//           Xóa
//         </Popconfirm>
//       ),
//     },
//   ];

//   // Table columns
//   const columns = [
//     {
//       title: "Lợi Ích",
//       dataIndex: "name",
//       key: "benefit",
//       width: "20%",
//     },
//     ...packages.map((pkg) => ({
//       title: (
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>{pkg.name}</span>
//             <div style={{ borderTop: "1px solid #d9d9d9", marginTop: 5, marginBottom: 5 }}></div>
//             <div style={{ fontWeight: "bold", color: "red" }}>{pkg.price.toLocaleString()} VND / Tháng</div>
//             <div>Tổng giá: {pkg.totalPrice?.toLocaleString()} VND</div>
//           </div>
//           <Dropdown
//             menu={{
//               items: getPackageMenuItems(pkg),
//             }}
//             trigger={["click"]}
//           >
//             <Button
//               style={{
//                 backgroundColor: "#f3743b",
//                 color: "black",
//                 fontWeight: "600",
//                 border: "1px solid #d9d9d9",
//               }}
//               type="link"
//             >
//               Hành Động
//             </Button>
//           </Dropdown>
//         </div>
//       ),
//       key: pkg.key,
//       render: (_, benefit) => <Checkbox checked={selectedBenefits[`${pkg.key}-${benefit.key}`] || false} onChange={() => handleCheckboxChange(pkg.key, benefit.key)} />,
//     })),
//     {
//       title: "Hành Động",
//       key: "actions",
//       render: (_, benefit) => (
//         <Space size="small">
//           <Popconfirm title="Bạn có chắc muốn xóa lợi ích này?" onConfirm={() => handleDeleteBenefit(benefit.key)}>
//             <Button type="link" danger>
//               Xóa
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ marginBottom: 16 }}>
//         <Button
//           style={{ backgroundColor: "#4CAF50", color: "white" }}
//           onClick={() => {
//             setEditingPackage(null);
//             form.resetFields();
//             setIsPackageModalOpen(true);
//           }}
//           disabled={packages.length >= 5}
//         >
//           Thêm Gói Mới
//         </Button>
//         <Button style={{ backgroundColor: "#2196F3", color: "white" }} onClick={() => setIsBenefitModalOpen(true)}>
//           Thêm Lợi Ích Mới
//         </Button>
//       </Space>

//       <Table dataSource={benefits} columns={columns} pagination={false} rowKey="key" bordered />

//       <Modal title={editingPackage ? "Chỉnh Sửa Gói" : "Thêm Gói Mới"} open={isPackageModalOpen} onCancel={() => setIsPackageModalOpen(false)} footer={null}>
//         <Form form={form} layout="vertical" onFinish={handlePackageSubmit}>
//           <Form.Item name="name" label="Tên Gói" rules={[{ required: true, message: "Vui lòng nhập tên gói!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="price" label="Giá mỗi tháng (VND)" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
//             <InputNumber style={{ width: "100%" }} min={0} />
//           </Form.Item>
//           <Form.Item name="months" label="Số tháng" rules={[{ required: true, message: "Vui lòng nhập số tháng!" }]}>
//             <InputNumber style={{ width: "100%" }} min={1} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editingPackage ? "Lưu" : "Thêm"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal title="Thêm Lợi Ích Mới" open={isBenefitModalOpen} onCancel={() => setIsBenefitModalOpen(false)} footer={null}>
//         <Form form={form} layout="vertical" onFinish={handleBenefitSubmit}>
//           <Form.Item name="name" label="Tên Lợi Ích" rules={[{ required: true, message: "Vui lòng nhập tên lợi ích!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Thêm
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TablePremiumPack;

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox, InputNumber, Popconfirm, Space, message, Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Initial Data
const initialPackages = [{ key: "1", name: "Gói 1", price: 100000 }];
const initialBenefits = [{ key: "1", name: "Lợi ích 1" }];

const TablePremiumPack = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [benefits, setBenefits] = useState(initialBenefits);
  const [selectedBenefits, setSelectedBenefits] = useState({});
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null); // State for editing benefit
  const [form] = Form.useForm();

  // Handle adding or editing packages
  const handlePackageSubmit = (values) => {
    const { price, months } = values;
    const totalPrice = price * months; // Calculate total price
    const newPackageData = { ...values, totalPrice };

    if (editingPackage) {
      setPackages((prev) => prev.map((pkg) => (pkg.key === editingPackage.key ? { ...pkg, ...newPackageData } : pkg)));
    } else {
      if (packages.length >= 5) {
        message.warning("Tối đa chỉ được thêm 5 gói.");
        return;
      }
      const newPackage = { key: `${packages.length + 1}`, ...newPackageData };
      setPackages((prev) => [...prev, newPackage]);
    }
    setIsPackageModalOpen(false);
    form.resetFields();
    setEditingPackage(null);
  };

  // Handle adding or editing benefits
  const handleBenefitSubmit = (values) => {
    if (editingBenefit) {
      // Update existing benefit
      setBenefits((prev) => prev.map((benefit) => (benefit.key === editingBenefit.key ? { ...benefit, ...values } : benefit)));
    } else {
      // Add new benefit
      const newBenefit = { key: `${benefits.length + 1}`, ...values };
      setBenefits((prev) => [...prev, newBenefit]);
    }
    setIsBenefitModalOpen(false);
    form.resetFields();
    setEditingBenefit(null);
  };

  // Open modal to edit benefit
  const handleEditBenefit = (benefit) => {
    setEditingBenefit(benefit);
    form.setFieldsValue(benefit);
    setIsBenefitModalOpen(true);
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (packageKey, benefitKey) => {
    const key = `${packageKey}-${benefitKey}`;
    setSelectedBenefits((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Delete package
  const handleDeletePackage = (key) => {
    setPackages((prev) => prev.filter((pkg) => pkg.key !== key));
  };

  // Delete benefit
  const handleDeleteBenefit = (key) => {
    setBenefits((prev) => prev.filter((benefit) => benefit.key !== key));
  };

  // Open modal to edit package
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    form.setFieldsValue(pkg);
    setIsPackageModalOpen(true);
  };

  // Helper function to generate the menu items dynamically
  const getPackageMenuItems = (pkg) => [
    {
      key: "edit",
      label: <div onClick={() => handleEditPackage(pkg)}>Sửa</div>,
    },
    {
      key: "delete",
      label: (
        <Popconfirm title="Bạn có chắc muốn xóa gói này?" onConfirm={() => handleDeletePackage(pkg.key)}>
          Xóa
        </Popconfirm>
      ),
    },
  ];

  // Table columns
  const columns = [
    {
      title: "Lợi Ích",
      dataIndex: "name",
      key: "benefit",
      width: "20%",
    },
    ...packages.map((pkg) => ({
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>{pkg.name}</span>
            <div
              style={{
                borderTop: "1px solid #d9d9d9",
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>
            <div style={{ fontWeight: "bold", color: "red" }}>{pkg.price.toLocaleString()} VND / Tháng</div>
            <div>Tổng giá: {pkg.totalPrice?.toLocaleString()} VND</div>
          </div>
          <Dropdown menu={{ items: getPackageMenuItems(pkg) }} trigger={["click"]}>
            <Button
              style={{
                backgroundColor: "#f3743b",
                color: "black",
                fontWeight: "600",
                border: "1px solid #d9d9d9",
              }}
              type="link"
            >
              Hành Động
            </Button>
          </Dropdown>
        </div>
      ),
      key: pkg.key,
      render: (_, benefit) => <Checkbox checked={selectedBenefits[`${pkg.key}-${benefit.key}`] || false} onChange={() => handleCheckboxChange(pkg.key, benefit.key)} />,
    })),
    {
      title: "Hành Động",
      key: "actions",
      render: (_, benefit) => (
        <Space size="small">
          <Button
            style={{
              fontWeight: "600",
              border: "1px solid #d9d9d9",
            }}
            type="link"
            onClick={() => handleEditBenefit(benefit)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm title="Bạn có chắc muốn xóa lợi ích này?" onConfirm={() => handleDeleteBenefit(benefit.key)}>
            <Button
              style={{
                fontWeight: "600",
                border: "1px solid #d9d9d9",
              }}
              type="link"
              danger
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          style={{ backgroundColor: "#4CAF50", color: "white" }}
          onClick={() => {
            setEditingPackage(null);
            form.resetFields();
            setIsPackageModalOpen(true);
          }}
          disabled={packages.length >= 5}
        >
          Thêm Gói Mới
        </Button>
        <Button style={{ backgroundColor: "#2196F3", color: "white" }} onClick={() => setIsBenefitModalOpen(true)}>
          Thêm Lợi Ích Mới
        </Button>
      </Space>
      <Table dataSource={benefits} columns={columns} pagination={false} rowKey="key" bordered />
      <Modal title={editingPackage ? "Chỉnh Sửa Gói" : "Thêm Gói Mới"} open={isPackageModalOpen} onCancel={() => setIsPackageModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handlePackageSubmit}>
          <Form.Item name="name" label="Tên Gói" rules={[{ required: true, message: "Vui lòng nhập tên gói!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá mỗi tháng (VND)" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="months" label="Số tháng" rules={[{ required: true, message: "Vui lòng nhập số tháng!" }]}>
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingPackage ? "Lưu" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title={editingBenefit ? "Chỉnh Sửa Lợi Ích" : "Thêm Lợi Ích Mới"} open={isBenefitModalOpen} onCancel={() => setIsBenefitModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleBenefitSubmit}>
          <Form.Item name="name" label="Tên Lợi Ích" rules={[{ required: true, message: "Vui lòng nhập tên lợi ích!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBenefit ? "Lưu" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TablePremiumPack;
