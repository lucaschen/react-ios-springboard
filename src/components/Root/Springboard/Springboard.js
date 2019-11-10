import React, { useRef, useState } from "react";
import styled from "styled-components";

import Folder from "./Folder";
import ios11DefaultWallpaper from "./ios-11-default-wallpaper.jpg";
import OpenFolderBackdrop from "./OpenFolderBackdrop";

const Wrapper = styled.div`
  background-image: url(${ios11DefaultWallpaper});
  background-position: center center;
  background-size: auto 100%;
  box-sizing: border-box;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 1.25rem 1rem;
  grid-template-columns: repeat(4, 1fr);
  height: 60rem;
  padding: 2rem;
  position: relative;
  width: 30rem;
`;

const Springboard = ({ folders }) => {
  const wrapperRef = useRef();
  const [openedFolderId, setOpenedFolderId] = useState(null);

  return (
    <Wrapper ref={wrapperRef}>
      <OpenFolderBackdrop isVisible={openedFolderId !== null} onClose={() => setOpenedFolderId(null)} />
      {folders.map(folder => (
        <Folder
          folder={folder}
          isOpened={openedFolderId === folder.id}
          key={folder.id}
          onOpen={() => setOpenedFolderId(folder.id)}
          parentRef={wrapperRef}
        />
      ))}
    </Wrapper>
  );
};

export default Springboard;
