import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { TitleCustom } from "../../../../components/Typography";

export default function ViewResultsPractice() {
  return <div style={{display: 'flex'}}>
      <Sidebar/>
      <div style={{flex: 1, padding: '20px'}}>
            <TitleCustom level={3}>KẾT QUẢ LUYỆN TẬP</TitleCustom>
            
      </div>
  </div>;
}
