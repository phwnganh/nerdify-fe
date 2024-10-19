import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCustom from "./TableCustom";
import { Button, Input, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const TableExercise = () => {
  const [loading, setLoading] = useState(true);
  const handleEdit = (record) => {
  };

  const handleDelete = (id) => {
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số người học',
      dataIndex: 'learners',
      key: 'learners',
      sorter: (a, b) => a.learners.length - b.learners.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: 'Số giai đoạn',
      dataIndex: 'phases',
      key: 'phases',
      sorter: (a, b) => a.phases.length - b.phases.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: 'Loại',
      dataIndex: 'accountType',
      key: 'accountType',
      filters: [
        { text: 'Free', value: 'Free' },
        { text: 'Premium', value: 'Premium' },
      ],
      onFilter: (value, record) => record.accountType.includes(value),
    },

    // {
    //   title: 'Created At',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    // },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updatedAt',
    //   key: 'updatedAt',
    // },
    {
      title: '',
      key: 'actions',
      render: (text, record) => (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            onClick={() => handleDelete(record._id)}
            icon={<DeleteOutlined />} danger
          />
        </span>
      ),
    }

  ];
  const [courseLevels, setCourseLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/courses/levels');
        setCourseLevels(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course levels:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/levels")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.error("error", err));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (

    <div style={{ width: '100%', height: '100%', marginTop: '10px', overflowX: 'auto' }}>

      <Input
        placeholder="Tìm kiếm bằng tiêu đề"
        prefix={<SearchOutlined />}
        style={{ marginBottom: '30px', width: 'auto' }}
        status="warning"
      />
      <TableCustom
        columns={columns}
        dataSource={courses}
        pagination={{ pageSize: 5 }}
        style={{ minWidth: '100%' }}
      />

    </div>

  );
};

export default TableExercise;
