import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ModalCustom from './components/Modal';
import Navbar from './components/Header';
import BreadCrumbHome from './components/BreadCrumb/BreadCrumbHome';
import InputCustom from './components/Input';
import Footer from './components/Footer';
import ViewLevelDetail from './pages/LearnersPage/LevelDetailPage';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm để mở Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="App">
      {/*test cac component */}
      <Navbar/>
      <BreadCrumbHome/>
      {/* <h1>Test Modal</h1>
      <button onClick={showModal}>Open Modal</button>
      <ModalCustom
        title="Example Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Không có footer
      >
        This is a modal content
      </ModalCustom> */}
      <ViewLevelDetail/>
      <Footer/>
    </div>
  );
}

export default App;
