import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCustom from "./TableCustom";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TableExercise = () => {
  const [courseLevels, setCourseLevels] = useState([]);
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Learners',
      dataIndex: 'learners',
      key: 'learners',
    },
    {
      title: 'Phases',
      dataIndex: 'phases',
      key: 'phases',
    },
    {
      title: 'Final Exam',
      dataIndex: 'finalExam',
      key: 'finalExam',
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
      title: 'Actions',
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
      <TableCustom
        columns={columns}
        dataSource={courseLevels}
        pagination={{ pageSize: 5 }}
        style={{ minWidth: '100%' }}
      />
    </div>

  );
};

export default TableExercise;
