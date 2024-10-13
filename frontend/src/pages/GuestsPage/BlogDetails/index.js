//sample data from api
// const dataSample = {
//   data: {
//     _id: "6706d47e09b1c0b43cb240fc",
//     title: "Learning German 123",
//     description:
//       "This course is designed for learners aiming to achieve C1 level proficiency in German. It includes detailed lessons on grammar, vocabulary, and advanced communication skills. Additionally, the course offers numerous exercises to reinforce understanding and improve fluency. Each module of the course focuses on real-life scenarios to help learners apply what they’ve learned in practical settings.",
//     createdBy: "6706bd968b22c99d1f5ccfe5",
//     status: "Active",
//     views: 5,
//     createdAt: "2024-10-09T19:07:42.898Z",
//     updatedAt: "2024-10-13T04:55:12.850Z",
//     __v: 0,
//   },
//   success: true,
//   message: "Fetched blog details",
// };
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Card, Typography, Tag, Button } from "antd";

const { Title, Text, Paragraph } = Typography;

// Styled components for CSS-in-JS
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const ImageBanner = styled.div`
  height: 450px;
  background-size: cover;
  background-position: center;
  margin-bottom: 24px;
  border-radius: 8px;
  background-image: url("https://api.time.com/wp-content/uploads/2020/07/never-trumpers-2020-election-01.jpg?quality=85&w=1201&h=676&crop=1");
`;

const ContentCard = styled(Card)`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TagsWrapper = styled.div`
  margin-bottom: 16px;
`;

const AuthorInfo = styled(Text)`
  display: block;
  margin-bottom: 24px;
`;

const StyledQuote = styled.blockquote`
  border-left: 4px solid #1890ff;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  color: #1890ff;
`;

const BlogDetails = () => {
  return (
    <Container>
      <ImageBanner />

      <ContentCard bordered={false}>
        <TagsWrapper>
          <Tag color="blue">Election</Tag>
          <Tag color="blue">Politics</Tag>
        </TagsWrapper>

        <Title level={2}>Revenge of the Never Trumpers</Title>

        <AuthorInfo type="secondary">
          Tác giả:{" "}
          <Button type="link" href="#">
            Ahmad Sultani
          </Button>
        </AuthorInfo>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
          Lorem Ipsum.
        </Paragraph>

        <Title level={3}>#1. What is Lorem Ipsum?</Title>

        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </Paragraph>

        <StyledQuote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</StyledQuote>

        <Paragraph>
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Paragraph>

        <TagsWrapper>
          <Tag color="blue">#Election</Tag>
          <Tag color="blue">#People</Tag>
          <Tag color="blue">#Election2020</Tag>
          <Tag color="blue">#Trump</Tag>
          <Tag color="blue">#Joe</Tag>
        </TagsWrapper>
      </ContentCard>
    </Container>
  );
};

export default BlogDetails;
