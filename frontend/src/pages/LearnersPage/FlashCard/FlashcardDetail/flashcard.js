// import { Button, Col, Row } from "antd";
// import { Container } from "./styled";
// import { SoundOutlined } from "@ant-design/icons";
// import ReactCardFlip from "react-card-flip";
// import CardCustom from "../../../../components/Card";

// export const FlashCard = () => {
//   return (
//     <Container>
//       <div
//         style={{
//           backgroundColor: "#e0e0e0",
//           padding: "20px",
//           borderRadius: "8px",
//           textAlign: "center",
//           cursor: "pointer",
//           transition: "transform 0.6s",
//           width: "auto",
//           height: "auto",
//           top: "auto",
//           left: "auto",
//           overflow: "hidden",
//         }}
//         onClick={toggleFlashcard}
//       >
//         <Row justify={"end"}>
//           <Col>
//             <Button
//               icon={<SoundOutlined />}
//               shape="circle"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleSpeak(flashcard?.cards[currentIndex].terms);
//               }}
//             ></Button>
//           </Col>
//         </Row>
//         <div style={{ margin: "40px 0" }}>
//           {/* <TextCustom>
//           {isFlipped
//             ? flashcard?.cards[currentIndex].definitions
//             : flashcard?.cards[currentIndex].terms}
//         </TextCustom> */}

//           <ReactCardFlip
//             isFlipped={isFlipped}
//             flipDirection="vertical"
//             infinite
//           >
//             <CardCustom>
//               What are the 5 approaches to conflict discussed in the Project
//               Human Resources Management Lesson? A.Confronting, Compromising,
//               Smoothing, Uninterested, Challenging. B.Confronting, Compromising,
//               Smoothing, Forcing, Avoiding. C.Communicating, Compromising,
//               Smoothing, Forcing, Avoiding. D.Confronting, Challenging,
//               Smoothing, Forcing, Avoiding.
//             </CardCustom>

//             <CardCustom>
//               {flashcard?.cards[currentIndex].definitions}
//             </CardCustom>
//           </ReactCardFlip>
//         </div>
//         <Row justify={"space-around"} align={"middle"}>
//           <Col>
//             <Button
//               icon={<LeftOutlined />}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handlePrevious();
//               }}
//               shape="circle"
//             ></Button>
//           </Col>
//           <Col>{`${currentIndex + 1}/${flashcard?.cards.length}`}</Col>
//           <Col>
//             <Button
//               icon={<RightOutlined />}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleNext();
//               }}
//               shape="circle"
//             ></Button>
//           </Col>
//         </Row>
//         <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
//           <Col style={{ marginRight: "20px" }}>
//             <Button icon={<ShareAltOutlined />} shape="circle"></Button>
//           </Col>
//           <Col>
//             <Button
//               icon={
//                 isFullScreen ? (
//                   <FullscreenExitOutlined />
//                 ) : (
//                   <FullscreenOutlined />
//                 )
//               }
//               shape="circle"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleFullScreen();
//               }}
//             ></Button>
//           </Col>
//         </Row>
//       </div>

//       <Row justify={"end"} align={"end"} style={{ marginTop: "20px" }}>
//         <Button
//           icon={<EditOutlined />}
//           shape="circle"
//           style={{ marginRight: "20px" }}
//         ></Button>
//         <Dropdown menu={{ items: folderSelected }} trigger={["click"]}>
//           <Button
//             icon={<FolderOutlined />}
//             shape="circle"
//             style={{ marginRight: "10px" }}
//           ></Button>
//         </Dropdown>
//       </Row>
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <TitleCustom level={2}>TỪ ĐIỂN</TitleCustom>
//         <List
//           dataSource={flashcard?.cards}
//           renderItem={(item) => (
//             <List.Item>
//               <Row style={{ width: "100%" }} align="middle">
//                 <Col
//                   style={{ flex: 1, textAlign: "left", paddingLeft: "10px" }}
//                 >
//                   <span style={{ marginRight: "15px" }}>{item.terms}</span>
//                   <Button
//                     shape="circle"
//                     icon={<SoundOutlined />}
//                     onClick={() => handleSpeak(item.terms)}
//                   />
//                 </Col>

//                 <Col
//                   style={{
//                     flex: 1,
//                     textAlign: "right",
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span style={{ marginRight: "10px" }}>
//                     {item.definitions}
//                   </span>
//                   <Button
//                     shape="circle"
//                     icon={<SoundOutlined />}
//                     onClick={() => handleSpeak(item.definitions)}
//                   />
//                 </Col>
//               </Row>
//             </List.Item>
//           )}
//         ></List>
//       </div>
//     </Container>
//   );
// };
