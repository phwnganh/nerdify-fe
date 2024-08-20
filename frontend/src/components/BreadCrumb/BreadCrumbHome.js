import React, { useEffect, useState } from "react";
import { BreadCrumbCustom, BreadCrumbItem } from ".";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export default function BreadCrumbHome() {
  const [breadcrumb, setBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { exerciseType } = useParams();

  useEffect(() => {
    if (location.pathname === "/level-detail") {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: "/level-detail", label: "Trình độ" },
      ]);
    } else if (location.pathname.startsWith("/one-exercise")) {
      setBreadCrumb([
        { path: "/", label: "Trang chủ" },
        { path: "/level-detail", label: "Trình độ" },
        { path: location.pathname, label: `Bài tập ${exerciseType}` }, // Display exercise type
      ]);
    }
  }, [location.pathname, exerciseType]);

  const handleClick = (path) => {
    if (path === "/flashcards") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/flashcards", label: "Flashcards" },
      ]);
    }
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
            <a href="" onClick={() => handleClick(item.path)}>
              {item.label}
            </a>
          </BreadCrumbItem>
        ))}
      </BreadCrumbCustom>
    </div>
  );
}
