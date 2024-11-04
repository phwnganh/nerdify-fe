import { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [files, setFiles] = useState([]);

  const handleFilesUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 10 * 1024 * 1024) { // 10MB
        alert('Kích thước tệp vượt quá giới hạn 10MB');
        return;
      }
      if (!files[i].type) {
        alert('Tệp không hợp lệ.');
        return;
      }
      formData.append("files", files[i]);
    }
  
    try {
      const res = await axios.post("https://api.deustchnerd.site/api/courses/uploadfiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Upload thành công!'); 
      setFiles([]); 
    } catch (error) {
      console.error("Error uploading files:", error);
      alert('Có lỗi xảy ra trong quá trình upload.');
    }
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index)); 
  };

  const renderFilePreview = (file) => { // Này để hiện files nha mấy ní
    const fileType = file.type.split('/')[0]; 
    
    switch (fileType) {
      case 'image':
        return <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />;
      case 'audio':
        return <audio controls src={URL.createObjectURL(file)} style={{ width: '100px' }} />;
      case 'application': // Giả định là tài liệu (PDF, DOC, etc.)
        return <div>📄 {file.name}</div>; 
      default:
        return <div>📁 {file.name}</div>; 
    }
  };

  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Lấy tệp đầu tiên từ danh sách
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
      const response = await axios.post("https://api.deustchnerd.site/api/courses/uploadfiles", formData, {
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

  return (
    <div>
      <h2>Upload Nhiều Tệp</h2>
    <form onSubmit={handleFilesUpload}>
      <input
        type="file" 
        accept="*/*" // Chấp nhận tất cả loại tệp // Thay dạng file muốn chọn ở đây
        multiple
        onChange={handleFilesChange} 
      />
      <div>
        {files.length > 0 && (
          <h4>Tệp đã chọn:</h4>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {files.map((file, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {renderFilePreview(file)} {/* Hiển thị preview tương ứng với loại tệp */}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
              <div>{file.name}</div> {/* Hiển thị tên tệp */}
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Upload Nhiều tệp</button>
    </form>
    <div>
      <h2>Upload 1 Tệp</h2>
      <form onSubmit={handleFileUpload}>
        <input
          type="file" 
          accept="*/*" // Chấp nhận tất cả loại tệp // Thay dạng file muốn chọn ở đây
          onChange={handleFileChange}
        />
        <button type="submit">Upload 1</button>
      </form>
    </div>
    </div>
    
  );
}
export default UploadForm;


