import ButtonCustom from "../../../../components/Button";

export default function NavigateButton({
  currentPartIndex,
  totalParts,
  onPrevious,
  onNext,
  onSubmit,
  mark,
  isCheckpointQuiz,
  onRetry,
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
          {isCheckpointQuiz && mark < 50 ? (
            <>
              <ButtonCustom
                buttonType="secondary"
                style={{ marginRight: "100px", padding: "23px" }}
                onClick={onRetry}
              >
                Làm lại bài kiểm tra
              </ButtonCustom>
              <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
                Quay về luyện tập
              </ButtonCustom>
            </>
          ) : isCheckpointQuiz && mark >= 50 ? (
            <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
              Chuyển sang phase tiếp theo
            </ButtonCustom>
          ) : (
            <ButtonCustom buttonType="secondary" style={{ padding: "23px" }}>
              Chuyển sang phase tiếp theo
            </ButtonCustom>
          )}
        </>
      )}
    </div>
  );
}
