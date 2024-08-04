import styled from "styled-components";
export const ScrollablePhaseDiv = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 16px 0;
  margin: 0 auto;
  max-width: 100%;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #ffe259 transparent; /* For Firefox */

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Scrollbar track color */
  }
`;
