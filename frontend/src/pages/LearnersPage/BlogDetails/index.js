import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Typography, Tag, Button, Breadcrumb, Spin, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { getBlogDetail, getBlogList } from "../../../services/LearnerService";

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
  position: fixed;
  top: 120px;
  right: 20px;
  width: 200px;
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

// Main Component
const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog details
  const fetchBlogDetails = async () => {
    try {
      const response = await getBlogDetail(blogId);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      message.error("Có lỗi xảy ra khi lấy dữ liệu blog.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all blogs and select 5 random ones
  const fetchRelatedBlogs = async () => {
    try {
      const result = await getBlogList();

      const allBlogs = result.data;

      // Ensure each blog entry has an ID property; adjust this if necessary (e.g., relatedBlog._id)
      const shuffled = allBlogs.sort(() => 0.5 - Math.random());
      setRelatedBlogs(shuffled.slice(0, 5));
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchRelatedBlogs();
  }, [blogId]);

  if (loading) return <Spin tip="Đang tải dữ liệu..." />;
  if (!blog) return <p>Không tìm thấy bài viết.</p>;

  return (
    <Layout>
      {/* Main Blog Content */}
      <ContentWrapper>
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
          <Paragraph>Ngày tạo: {new Date(blog.createdAt).toLocaleDateString()}</Paragraph>
        </ContentCard>
      </ContentWrapper>

      {/* Sidebar for Related Articles */}
      <Sidebar>
        <RelatedArticlesTitle level={4}>Bài viết khác</RelatedArticlesTitle>
        {relatedBlogs.map((relatedBlog, index) => (
          <Link to={`/blog-study/${relatedBlog.id || relatedBlog._id}`} key={index} style={{ textDecoration: "none" }}>
            <RelatedArticleItem>
              <RelatedArticleImage src={relatedBlog.image || "https://via.placeholder.com/60"} />
              <RelatedArticleText>{relatedBlog.title}</RelatedArticleText>
            </RelatedArticleItem>
          </Link>
        ))}
      </Sidebar>
    </Layout>
  );
};

export default BlogDetails;
