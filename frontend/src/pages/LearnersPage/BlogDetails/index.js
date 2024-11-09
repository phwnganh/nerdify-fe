// // Path: src/services/LearnerService/BlogDetails/index.js
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Card, Typography, Tag, Button, Breadcrumb, Spin, message } from "antd";
// import { Link, useParams } from "react-router-dom";
// import { getBlogDetail, getBlogList } from "../../../services/LearnerService";
// import ReactMarkdown from "react-markdown";

// const { Title, Text, Paragraph } = Typography;

// // Styled Components for CSS-in-JS
// const Layout = styled.div`
//   display: flex;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 24px;
//   gap: 24px;
// `;

// const ContentWrapper = styled.div`
//   flex: 3;
// `;

// const Sidebar = styled.div`
//   flex: 1;
//   padding: 16px;
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   position: fixed;
//   top: 120px;
//   right: 20px;
//   width: 200px;
//   height: fit-content;
// `;

// const RelatedArticlesTitle = styled(Title)`
//   font-size: 18px;
// `;

// const RelatedArticleItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;
// `;

// const RelatedArticleImage = styled.img`
//   width: 60px;
//   height: 60px;
//   object-fit: cover;
//   margin-right: 12px;
//   border-radius: 8px;
// `;

// const RelatedArticleText = styled(Text)`
//   font-size: 14px;
//   line-height: 1.4;
// `;

// const ImageBanner = styled.div`
//   margin-top: 30px;
//   height: 450px;
//   background-size: cover;
//   background-position: center;
//   margin-bottom: 24px;
//   border-radius: 8px;
//   background-image: url("https://api.time.com/wp-content/uploads/2020/07/never-trumpers-2020-election-01.jpg?quality=85&w=1201&h=676&crop=1");
// `;

// const ContentCard = styled(Card)`
//   padding: 24px;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// `;

// const TagsWrapper = styled.div`
//   margin-bottom: 16px;
// `;

// const AuthorInfo = styled(Text)`
//   display: block;
//   margin-bottom: 24px;
// `;

// // Main Component
// const BlogDetails = () => {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [relatedBlogs, setRelatedBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch blog details
//   const fetchBlogDetails = async () => {
//     try {
//       const response = await getBlogDetail(blogId);
//       setBlog(response.data);
//     } catch (error) {
//       console.error("Error fetching blog details:", error);
//       message.error("Có lỗi xảy ra khi lấy dữ liệu blog.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all blogs and select 5 random ones
//   const fetchRelatedBlogs = async () => {
//     try {
//       const result = await getBlogList();

//       const allBlogs = result.data;

//       // Ensure each blog entry has an ID property; adjust this if necessary (e.g., relatedBlog._id)
//       const shuffled = allBlogs.sort(() => 0.5 - Math.random());
//       setRelatedBlogs(shuffled.slice(0, 5));
//     } catch (error) {
//       console.error("Error fetching related blogs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogDetails();
//     fetchRelatedBlogs();
//   }, [blogId]);

//   if (loading) return <Spin tip="Đang tải dữ liệu..." />;
//   if (!blog) return <p>Không tìm thấy bài viết.</p>;

//   return (
//     <Layout>
//       {/* Main Blog Content */}
//       <ContentWrapper>
//         <Breadcrumb>
//           <Breadcrumb.Item>
//             <Link to="/">Trang chủ</Link>
//           </Breadcrumb.Item>
//           <Breadcrumb.Item>
//             <Link to="/blog-study">Danh sách Blogs</Link>
//           </Breadcrumb.Item>
//           <Breadcrumb.Item>
//             <span style={{ color: "#F78F2E", fontWeight: "bold", textDecoration: "none" }}>{blog.title}</span>
//           </Breadcrumb.Item>
//         </Breadcrumb>
//         <ImageBanner />
//         <ContentCard bordered={false}>
//           <TagsWrapper>
//             <Tag color="blue">{blog.status}</Tag>
//             <Tag color="purple">Views: {blog.views}</Tag>
//           </TagsWrapper>
//           <Title level={2}>{blog.title}</Title>
//           <AuthorInfo type="secondary">
//             Tác giả:{" "}
//             <Button type="link" href="#">
//               Content Manager
//             </Button>
//           </AuthorInfo>
//           <Paragraph>{blog.description}</Paragraph>
//           {/* Render Markdown Content */}
//           <ReactMarkdown>{blog.content}</ReactMarkdown>
//           <Paragraph>Ngày tạo: {new Date(blog.createdAt).toLocaleDateString()}</Paragraph>
//         </ContentCard>
//       </ContentWrapper>

//       {/* Sidebar for Related Articles */}
//       <Sidebar>
//         <RelatedArticlesTitle level={4}>Bài viết khác</RelatedArticlesTitle>
//         {relatedBlogs.map((relatedBlog, index) => (
//           <Link to={`/blog-study/${relatedBlog.id || relatedBlog._id}`} key={index} style={{ textDecoration: "none" }}>
//             <RelatedArticleItem>
//               <RelatedArticleImage src={relatedBlog.image || "https://via.placeholder.com/60"} />
//               <RelatedArticleText>{relatedBlog.title}</RelatedArticleText>
//             </RelatedArticleItem>
//           </Link>
//         ))}
//       </Sidebar>
//     </Layout>
//   );
// };

// export default BlogDetails;

// Path: src/services/LearnerService/BlogDetails/index.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Typography, Tag, Button, Breadcrumb, Spin, message, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import { getBlogDetail, getBlogList } from "../../../services/LearnerService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { Title, Text, Paragraph } = Typography;

// Styled Components for CSS-in-JS
const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const ContentWrapper = styled.div`
  margin-bottom: 48px;
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

const RelatedArticlesSection = styled.div`
  margin-top: 48px;
`;

const RelatedArticlesTitle = styled(Title)`
  font-size: 24px;
  margin-bottom: 24px;
`;

const RelatedArticleCard = styled(Card)`
  margin-bottom: 24px;
`;

const RelatedArticleImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const RelatedArticleText = styled(Text)`
  font-size: 16px;
  line-height: 1.4;
`;

const StyledBlockquote = styled.blockquote`
  font-size: 14px;
  font-style: italic;
  border-left: 4px solid #f78f2e; /* Use your brand's primary color */
  margin: 24px 0;
  padding: 0 16px;
  //color light dark
  color: #555555;
  background-color: #f9f9f9;
  border-radius: 4px;
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

  // Fetch all blogs and select 3 random ones
  const fetchRelatedBlogs = async () => {
    try {
      const result = await getBlogList();

      const allBlogs = result.data;

      // Exclude the current blog from related blogs
      const otherBlogs = allBlogs.filter((b) => b._id !== blogId);

      let selectedBlogs = [];

      if (otherBlogs.length <= 4) {
        // If less than or equal to 3 blogs, use them all
        selectedBlogs = otherBlogs;
      } else {
        // Shuffle the array
        const shuffledBlogs = otherBlogs.sort(() => 0.5 - Math.random());
        // Get first 3 blogs
        selectedBlogs = shuffledBlogs.slice(0, 4);
      }

      setRelatedBlogs(selectedBlogs);
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
            <Tag color="blue">{blog.status ? "Hoạt Động" : "Không Hoạt Động"}</Tag>
            <Tag color="purple">Views: {blog.views}</Tag>
          </TagsWrapper>
          <AuthorInfo type="secondary">
            Tác giả:{" "}
            <Button type="link" href="#">
              Quản lý nội dung
            </Button>
          </AuthorInfo>
          <StyledBlockquote>{blog.description}</StyledBlockquote>
          {/* Render Markdown Content */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
          <Paragraph
            style={{
              marginTop: " 40px",
            }}
          >
            Ngày tạo: {new Date(blog.createdAt).toLocaleDateString()}
          </Paragraph>
        </ContentCard>
      </ContentWrapper>

      {/* Related Articles Section */}
      <RelatedArticlesSection>
        <RelatedArticlesTitle level={3}>Bài viết khác</RelatedArticlesTitle>
        <Row gutter={[16, 16]}>
          {relatedBlogs.map((relatedBlog) => (
            <Col xs={24} sm={12} md={8} lg={6} key={relatedBlog._id}>
              <Link to={`/blog-study/${relatedBlog._id}`} style={{ textDecoration: "none" }}>
                <RelatedArticleCard hoverable>
                  <RelatedArticleImage src={relatedBlog.image || "https://www.seoclerk.com/pics/000/787/824/51099d50ed6a0c6fa4e74f1260db024b.png"} alt={relatedBlog.title} />
                  <RelatedArticleText strong>{relatedBlog.title}</RelatedArticleText>
                </RelatedArticleCard>
              </Link>
            </Col>
          ))}
        </Row>
      </RelatedArticlesSection>
    </Layout>
  );
};

export default BlogDetails;
