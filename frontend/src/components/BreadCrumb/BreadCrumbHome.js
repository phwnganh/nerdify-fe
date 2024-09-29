import React, { useEffect, useState } from "react";
import { BreadCrumbCustom, BreadCrumbItem } from ".";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import storage, { getStorage, setStorage } from "../../library/storage";
export default function BreadCrumbHome() {
  const [breadcrumb, setBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { exerciseType, courseId, flashcardId } = useParams();

  useEffect(() => {
    if (courseId) {
      setStorage("courseId", courseId);
    }
    if(flashcardId){
      setStorage("flashcardId", flashcardId);
    }
    console.log("courseId:", storedCourseId);
    console.log("flashcardId", stotedFlashcardId);
    
  }, [courseId, flashcardId]);

  const storedCourseId = courseId || getStorage("courseId");
  const stotedFlashcardId = flashcardId || getStorage("flashcardId");
  useEffect(() => {
    if (location.pathname.startsWith("/level-detail")) {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: location.pathname, label: "Trình độ" },
      ]);
    } else if (location.pathname.startsWith("/one-exercise")) {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: `/level-detail/${storedCourseId}`, label: "Trình độ" },
        { path: location.pathname, label: `Bài tập ${exerciseType}` }, // Display exercise type
      ]);
    } else if (location.pathname === "/flash-card") {
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
    } else if (location.pathname.startsWith("/flash-card")) {
      setBreadCrumb([
        {
          path: "/",
          label: "Trang chủ",
        },
        {
          path: "/flash-card",
          label: "Các bộ flashcards",
        },
        {
          path: location.pathname,
          label: "Flashcard",
        },
      ]);
    }else if(location.pathname === "/create-flash-card"){
      setBreadCrumb([
        {
          path: '/',
          label: "Trang chủ"
        }, {
          path: `/flash-card/${stotedFlashcardId}`,
          label: "Flashcard"
        }, {
          path: location.pathname,
          label: "Tạo flashcard mới"
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
          <BreadCrumbItem
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
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
