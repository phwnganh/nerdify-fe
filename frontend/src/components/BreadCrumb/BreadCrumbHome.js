import React, { useState } from "react";
import { BreadCrumbCustom, BreadCrumbItem } from ".";
import { useNavigate } from "react-router-dom";
export default function BreadCrumbHome() {
  const [breadcrumb, setBreadCrumb] = useState([]);
  const navigate = useNavigate();
  const handleClick = (path) => {
    if (path === "/courses") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/course-phase", label: "Courses" },
      ]);
    } else if (path === "/flashcards") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/flashcards", label: "Flashcards" },
      ]);
    } else if (path === "/all-exercises") {
      setBreadCrumb([
        { path: "/", label: "Home" },
        { path: "/course-phase", label: "Courses" },
        { path: "/all-exercises", label: "Exercise" },
      ]);
    }else if(path === "/one-exercise"){
      setBreadCrumb([
            {path: "/", label: "Home"},
            {path: "/course-phase", label: "Courses"},
            {path: "/one-exercise", label: "Exercise"}
      ])
    }
    navigate(path);
  };

  return (
    <div>
      <BreadCrumbCustom>
        {breadcrumb.map((item) => (
          <BreadCrumbItem key={item.path}>
            <a href="" onClick={() => handleClick(item.path)}>
              {item.label}
            </a>
          </BreadCrumbItem>
        ))}
      </BreadCrumbCustom>
    </div>
  );
}
