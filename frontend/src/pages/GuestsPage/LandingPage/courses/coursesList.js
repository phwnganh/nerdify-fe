import { Card, List } from "antd";
import sample from "../../../../assets/landingPage/sample.png";
import ButtonCustom from "../../../../components/Button";
const { Meta } = Card;

export const CoursesList = () => {
  const course = [
    {
      title: "Bài tập trình độ A1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
  ];
  return (
    <div>
      <h2 style={{ fontSize: "40px", textAlign: "center" }}>KHÓA HỌC</h2>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={course}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ width: "330px" }}
              cover={<img alt="example" src={sample} />}
            >
              <Meta
                // avatar={<Avatar src={sample} />}
                title={item.title}
                // description={"This is the description"}
              />
              <p>Title content</p>

              <ButtonCustom
                buttonType="primary"
                style={{ width: "100%" }}
                // onClick={() => navigate(CLIENT_URI.LOGIN)}
              >
                Bắt đầu
              </ButtonCustom>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
