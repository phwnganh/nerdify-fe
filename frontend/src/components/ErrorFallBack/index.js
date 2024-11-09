import ButtonCustom from "../Button";
import { TitleCustom } from "../Typography";

export default function ErrorFallBack ({ resetErrorBoundary }){
      return (
            <div role="alert">
                  <div style={{textAlign: 'center'}}>
                        <TitleCustom level={2}>Có lỗi xảy ra</TitleCustom>
                        <ButtonCustom buttonType="primary" onClick={resetErrorBoundary}>Thử lại</ButtonCustom>
                  </div>
            </div>
      )
}