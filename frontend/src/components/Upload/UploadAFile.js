import { useState } from "react";
import axios from "axios";

export const useAFileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = ({ file }) => {
    setFile(file); // Lấy tệp đầu tiên từ danh sách
    console.log("file: ", file.originFileObj);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Vui lòng chọn một tệp để upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Thêm tệp vào formData với key là 'file'

    try {
      const response = await axios.post("https://api.deustchnerd.site/api/courses/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Hiển thị phản hồi từ server
      alert("Upload thành công!");
    } catch (error) {
      console.error("Lỗi khi upload:", error);
      alert("Có lỗi xảy ra khi upload tệp.");
    }
  };

  return { file, handleFileChange, handleFileUpload };
};
