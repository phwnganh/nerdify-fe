import BreadCrumbHome from "../../../../components/BreadCrumb/BreadCrumbHome";
import ButtonCustom from "../../../../components/Button";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import { Input } from "antd";
export default function WritingExercises() {
  const writingContent = [
    {
      id: 1,
      contentName: `Tìm các từ sai chính tả, các câu sai ngữ pháp và các từ không săp xếp 
đúng trật tự trong câu. `,
      paragraph: `In meiner Freizeit spiele ich hauptsächlich Fußball. Das ist mein Lieblingssport, weil ich immer viel Spaß habe und wir alle gewinnen wollen. Außerdem ist meine Lieblings-fußballmannschaft AS Rom, eine von den besten italienischen und europäischen Mannschaften. Auch wenn sie in Rom spielt und ich in Vietnam wohne, gelingt es mir manchmal, ins Stadion zu gehen, um meine Mannschaft zu unterstützen. Natürlich ist es keine Besonderheit für einen Jungen, Fußball zu spielen, denn man weiß ja, dass fast alle Jungs Fußball lieben.`,
    },
  ];


  return (
    <div style={{ padding: "24px" }}>
      <BreadCrumbHome />
      <TitleCustom level={2} style={{ fontWeight: "bold" }}>
        BÀI TẬP VIẾT 1: lorem ipsum
      </TitleCustom>
      <div>
        <TextCustom style={{ color: "red", fontWeight: "bold" }}>
          {writingContent[0].contentName}
        </TextCustom>
      </div>
      <div style={{ padding: "30px" }}>
        <TextCustom style={{ paddingTop: "12px" }}>
          {writingContent[0].paragraph}
        </TextCustom>
      </div>
      <div>
        <Input.TextArea
          showCount
          maxLength={1000}
          placeholder="Điền câu trả lời của bạn tại đây"
          rows={10}
        />
      </div>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <ButtonCustom
          buttonType="secondary"
          style={{ marginRight: "100px", padding: "23px" }}
        >
          Nộp bài
        </ButtonCustom>
      </div>
    </div>
  );
}
