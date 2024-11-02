import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Typography, Tag, Button, Breadcrumb, Spin, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams, Link } from "react-router-dom";
import BreadCrumbHome from "../../../components/BreadCrumb/BreadCrumbHome";

const { Title, Text, Paragraph } = Typography;

// Styled Components for CSS-in-JS
const Layout = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const RelatedArticlesTitle = styled(Title)`
  font-size: 18px;
`;

const RelatedArticleItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const RelatedArticleImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 12px;
  border-radius: 8px;
`;

const RelatedArticleText = styled(Text)`
  font-size: 14px;
  line-height: 1.4;
`;

const ImageBanner = styled.div`
  margin-top: 30px;
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

const BreadcrumbItemOrange = styled(Breadcrumb.Item)`
  color: orange;
`;

// Main Component
const BlogDetails = () => {
  const { blogId } = useParams(); // Lấy blog ID từ URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy chi tiết blog
  const fetchBlogDetails = async () => {
    try {
      console.log(blogId);
      const response = await fetch(`http://localhost:80/api/blogs/${blogId}`);
      // console.log("response", response);
      const result = await response.json();

      if (result.success) {
        setBlog(result.data);
      } else {
        message.error("Lỗi khi lấy chi tiết blog: " + result.message);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      message.error("Có lỗi xảy ra khi lấy dữ liệu blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [blogId]);

  if (loading) return <Spin tip="Đang tải dữ liệu..." />;

  if (!blog) return <p>Không tìm thấy bài viết.</p>;

  return (
    <Layout>
      {/* Main Blog Content */}
      <ContentWrapper>
        {/* Breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/blog-study">Danh sách Blogs</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ color: "#F78F2E", fontWeight: "bold", textDecoration: "none" }}>{blog.title}</span>
          </Breadcrumb.Item>
        </Breadcrumb>

        <ImageBanner />

        <ContentCard bordered={false}>
          <TagsWrapper>
            <Tag color="blue">{blog.status}</Tag>
            <Tag color="purple">Views: {blog.views}</Tag>
          </TagsWrapper>

          <Title level={2}>{blog.title}</Title>

          <AuthorInfo type="secondary">
            Tác giả:{" "}
            <Button type="link" href="#">
              Content Manager
            </Button>
          </AuthorInfo>

          <Paragraph>{blog.description}</Paragraph>

          {/* <StyledQuote>{blog.description.slice(0, 100)}...</StyledQuote> */}

          <Paragraph>Ngày tạo: {new Date(blog.createdAt).toLocaleDateString()}</Paragraph>
        </ContentCard>
      </ContentWrapper>

      {/* Sidebar for Related Articles */}
      <Sidebar>
        <RelatedArticlesTitle level={4}>Bài viết khác</RelatedArticlesTitle>
        <RelatedArticleItem>
          <RelatedArticleImage src="https://via.placeholder.com/60" />
          <RelatedArticleText>10 Kênh Podcast Miễn Phí Giúp Học Tiếng Đức Dễ Dàng Hơn</RelatedArticleText>
        </RelatedArticleItem>
        <RelatedArticleItem>
          <RelatedArticleImage src="https://via.placeholder.com/60" />
          <RelatedArticleText>12 cụm từ tiếng Đức kỳ lạ nên biết</RelatedArticleText>
        </RelatedArticleItem>
        <RelatedArticleItem>
          <RelatedArticleImage src="https://via.placeholder.com/60" />
          <RelatedArticleText>10 cách học tiếng Anh nhanh và hiệu quả</RelatedArticleText>
        </RelatedArticleItem>
      </Sidebar>
    </Layout>
  );
};

export default BlogDetails;
