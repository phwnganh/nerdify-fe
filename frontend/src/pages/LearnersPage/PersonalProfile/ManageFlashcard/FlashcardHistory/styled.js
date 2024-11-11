import styled from "styled-components";

export const Container = styled.div`
  margin-left: 200px;
  margin-right: 200px;
  padding-left: 40px;
  padding-right: 40px;
`;
export const Flashcard = styled.div`
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.6s;
`

export const FlashcardFlipped = styled.div`
      background-color: #e0e0e0;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
`

export const Zoomed = styled.div`
transform: scale(1.5);
transition: transform 0.3s ease-in-out;
transform: translate(-50%, -50%) scale(1.5);
`
