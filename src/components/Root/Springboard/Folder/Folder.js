import React, { useRef } from "react";
import { animated } from "react-spring";
import styled from "styled-components";

import useInterpolatedStyles from "./_useInterpolatedStyles";
import facebookLogo from "./facebook-logo.png";
import messengerLogo from "./messenger-logo.png";
import whatsappLogo from "./whatsapp-logo.png";

const AppIcon = styled(animated.img)`
  border-radius: 0.25rem;
  height: auto;
  width: 100%;
`;

const FolderIcons = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const FolderName = styled.span`
  color: white;
  margin-top: 0.5rem;
`;

const OpenedFolderName = styled(animated.span)`
  color: white;
  font-size: 2.5rem;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled(animated.div)`
  align-items: center;
  display: flex;
  flex-flow: column-reverse nowrap;
  user-select: none;

  :hover {
    cursor: pointer;
  }
`;

const Folder = ({ folder, isOpened, onOpen: pushOpen, parentRef }) => {
  const folderIconsRef = useRef();

  const { appIconStyle, folderIconsStyle, openedFolderNameStyle } = useInterpolatedStyles({
    folderIconsRef,
    isOpened,
    parentRef
  });

  return (
    <Wrapper onClick={pushOpen}>
      <FolderName>{folder.name}</FolderName>
      <OpenedFolderName style={openedFolderNameStyle}>{folder.name}</OpenedFolderName>
      <FolderIcons ref={folderIconsRef} style={folderIconsStyle}>
        <AppIcon src={facebookLogo} style={appIconStyle} />
        <AppIcon src={messengerLogo} style={appIconStyle} />
        <AppIcon src={whatsappLogo} style={appIconStyle} />
      </FolderIcons>
    </Wrapper>
  );
};

export default Folder;
