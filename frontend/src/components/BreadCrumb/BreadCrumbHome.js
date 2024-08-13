import React, { useEffect, useState } from "react";
import { BreadCrumbCustom, BreadCrumbItem } from ".";
import { useLocation, useNavigate } from "react-router-dom";
export default function BreadCrumbHome() {
  const [breadcrumb, setBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/level-detail'){
      setBreadCrumb([
        {path: "/", label: "Trang chủ"},
        {path: "/level-detail", label: "Trình độ"}
      ])
    }
  }, [location.pathname])
  const handleClick = (path) => {
    if (path === "/flashcards") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/flashcards", label: "Flashcards" },
      ]);
    } else if (path === "/all-exercises") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/level-detail", label: "Trình độ" },
        { path: "/one-exercise", label: "Bài tập" },
      ]);
    }
    navigate(path);
  };

  return (
    <div>
      <BreadCrumbCustom>
        {breadcrumb.map((item) => (
          <BreadCrumbItem key={item.path} className={location.pathname === item.path ? "active" : ""}>
            <a href="" onClick={() => handleClick(item.path)}>
              {item.label}
            </a>
          </BreadCrumbItem>
        ))}
      </BreadCrumbCustom>
    </div>
  );
}
