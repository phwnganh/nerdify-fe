import React, { useEffect, useState } from "react";
import { BreadCrumbCustom, BreadCrumbItem } from ".";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import storage, { getStorage, setStorage } from "../../library/storage";
import { CLIENT_URI } from "../../constants";
export default function BreadCrumbHome() {
  const [breadcrumb, setBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { exerciseType, courseId, flashcardId, blogId } = useParams();

  useEffect(() => {
    if (courseId) {
      setStorage("courseId", courseId);
    }
    if (flashcardId) {
      setStorage("flashcardId", flashcardId);
    }
    if (blogId) {
      setStorage("blogId", blogId);
    }
    // console.log("courseId:", storedCourseId);
    // console.log("flashcardId", stotedFlashcardId);
  }, [courseId, flashcardId, blogId]);

  const storedCourseId = courseId || getStorage("courseId");
  const stotedFlashcardId = flashcardId || getStorage("flashcardId");
  useEffect(() => {
    if (location.pathname.startsWith(CLIENT_URI.LEVEL_DETAIL)) {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: location.pathname, label: "Trình độ" },
      ]);
    } else if (location.pathname.startsWith(CLIENT_URI.ONE_EXERCISE)) {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: `${CLIENT_URI.LEVEL_DETAIL}/${storedCourseId}`, label: "Trình độ" },
        { path: location.pathname, label: `Bài tập ${exerciseType}` }, // Display exercise type
      ]);
    } else if (location.pathname === CLIENT_URI.FLASH_CARD) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ",
        },
        {
          path: location.pathname,
          label: "Flashcard",
        },
      ]);
    } else if (location.pathname.startsWith(CLIENT_URI.FLASH_CARD)) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ",
        },
        {
          path: CLIENT_URI.FLASH_CARD,
          label: "Các bộ flashcards",
        },
        {
          path: location.pathname,
          label: "Flashcard",
        },
      ]);
    } else if (location.pathname === CLIENT_URI.CREATE_FLASH_CARD) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ",
        },
        {
          path: CLIENT_URI.FLASH_CARD,
          label: "Các bộ flashcards",
        },
        {
          path: location.pathname,
          label: "Tạo flashcard mới",
        },
      ]);
    } else if (location.pathname.startsWith(CLIENT_URI.EDIT_FLASH_CARD)) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ",
        },
        {
          path: `${CLIENT_URI.FLASH_CARD}/${stotedFlashcardId}`,
          label: "Flashcard",
        },
        {
          path: location.pathname,
          label: "Chỉnh sửa flashcard",
        },
      ]);
    } else if (location.pathname === CLIENT_URI.BLOG_STUDY) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ"
        },
        {
          path: location.pathname,
          label: "Danh Sách Blogs"
        }
      ])
    } else if (location.pathname.startsWith(CLIENT_URI.BLOG_STUDY)) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ"
        },
        {
          path: CLIENT_URI.BLOG_STUDY,
          label: "Danh Sách Blogs"
        },
        {
          path: `${CLIENT_URI.BLOG_STUDY}/${blogId}`,
          label: "Blog Cụ Thể"
        }
      ])
    }else if(location.pathname === CLIENT_URI.LEARNING_PROGRESS){
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ"
        },
        {
          path: `${CLIENT_URI.LEVEL_DETAIL}/${storedCourseId}`,
          label: "Trình độ"
        },
        {
          path: location.pathname,
          label: "Tiến độ học tập"
        }
      ])
    }
  }, [location.pathname, exerciseType]);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <BreadCrumbCustom>
        {breadcrumb.map((item) => (
          <BreadCrumbItem key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.path);
              }}
            >
              {item.label}
            </a>
          </BreadCrumbItem>
        ))}
      </BreadCrumbCustom>
    </div>
  );
}
