import styled from "styled-components";

export const ScrollablePhaseDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
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
  flex: 0 0 auto;
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
