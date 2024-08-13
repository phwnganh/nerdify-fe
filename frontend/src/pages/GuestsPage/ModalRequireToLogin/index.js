import ButtonCustom from '../../../components/Button'
import ModalCustom from '../../../components/Modal'
function ModalRequireToLogin(){
      return(
            <div>
             <ModalCustom centered closeable={false} bodyStyle={{textAlign: 'center', backgroundColor: '#E0E0E0', padding: '20px'}}>
                  <p>Bạn cần đăng nhập để tiếp tục học</p>
                  <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <ButtonCustom buttonType="primary">Đăng nhập</ButtonCustom>
                        <ButtonCustom type="default">Để sau</ButtonCustom>
                  </div>
            </ModalCustom>
            </div>
           
      )
}