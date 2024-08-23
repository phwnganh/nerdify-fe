import ButtonCustom from "../../../../components/Button";

export default function NavigateButton({
  currentPartIndex,
  totalParts,
  onPrevious,
  onNext,
  onSubmit,
}) {
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <ButtonCustom
        buttonType="secondary"
        style={{ marginRight: "100px", padding: "23px" }}
        onClick={onPrevious}
        disabled={currentPartIndex === 0}
      >
        Phần trước
      </ButtonCustom>
      <ButtonCustom
        buttonType="secondary"
        style={{ marginRight: "100px", padding: "23px" }}
        onClick={onNext}
        disabled={currentPartIndex === totalParts - 1}
      >
        Phần tiếp theo
      </ButtonCustom>
      {onSubmit ? (
        <ButtonCustom
          buttonType="secondary"
          style={{ padding: "23px" }}
          onClick={onSubmit}
        >
          Nộp bài
        </ButtonCustom>
      ) : (
        <>
          <ButtonCustom
            buttonType="secondary"
            style={{ marginRight: "100px", padding: "23px" }}
          >
            Làm lại bài kiểm tra
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            style={{ marginRight: "100px", padding: "23px" }}
          >
            Quay về luyện tập
          </ButtonCustom>
        </>
      )}
    </div>
  );
}
