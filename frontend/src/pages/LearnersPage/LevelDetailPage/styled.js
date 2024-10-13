// import styled from "styled-components";
// export const ScrollablePhaseDiv = styled.div`
//   overflow-x: auto;
//   white-space: nowrap;
//   padding: 16px 0;
//   margin: 0 auto;
//   max-width: 100%;
//   scrollbar-width: thin; /* For Firefox */
//   scrollbar-color: #ffe259 transparent; /* For Firefox */

//   &::-webkit-scrollbar {
//     height: 8px;
//   }

//   &::-webkit-scrollbar-track {
//     background-color: transparent; /* Scrollbar track color */
//   }
// `;

// export const ButtonToDoExam = styled.button`
//   color: #ffffff;
//   background-color: #be6004;
//   border-color: #be6004;
//   border-radius: 12px;
//   border-width: 20px;
// `;

// export const BackgroundCard = styled.div``;

// export const ButtonPhase = styled.button`
//   color: white;
//   background-color: ${(props) =>
//     props.active ? "#ff855d" : "#ffa751"}; /* Màu thay đổi khi active */
//   border: none;
//   padding: 8px 16px; /* Thu nhỏ padding */
//   margin-right: 16px;
//   border-radius: 8px; /* Bo góc nhẹ */
//   font-size: 14px; /* Thu nhỏ font */
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${(props) =>
//       props.active ? "#ff6b3d" : "#ffb76e"}; /* Đổi màu khi hover */
//   }
// `;

import styled from "styled-components";

export const ScrollablePhaseDiv = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
  margin: 0 auto;
  max-width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #ffe259 transparent;
  height: 150px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ButtonToDoExam = styled.button`
  color: #ffffff;
  background-color: #be6004;
  border-color: #be6004;
  border-radius: 12px;
  border-width: 20px;
`;

export const BackgroundCard = styled.div``;

export const ButtonPhase = styled.button`
  display: inline-block;
  color: white;
  background-color: ${(props) => (props.active ? "#ff855d" : "#ffa751")};
  border: none;
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 30%;
  height: 150px;
`;