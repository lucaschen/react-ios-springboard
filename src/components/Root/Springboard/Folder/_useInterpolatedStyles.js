import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

import { REM_IN_PX } from "#root/config/styled-components";
import interpolate from "#root/helpers/interpolate";

const FOLDER_ICONS_CLOSED_SIZE_REM = 5;
const FOLDER_ICONS_OPENED_SIZE_REM = 25;

const BORDER_RADIUS_CLOSED_REM = 0.25;
const BORDER_RADIUS_OPENED_REM =
  (FOLDER_ICONS_OPENED_SIZE_REM / FOLDER_ICONS_CLOSED_SIZE_REM) * BORDER_RADIUS_CLOSED_REM;
const GRID_GAP_CLOSED_REM = 0.25;
const GRID_GAP_OPENED_REM = 2;
const OPENED_FOLDER_NAME_SHOW_DELAY_MS = 500;
const OPENED_FOLDER_NAME_OFFSET_REM = 22;
const PADDING_CLOSED_REM = 0.5;
const PADDING_OPENED_REM = 2;
const SPRING_CONFIG = { friction: 40, tension: 400 };

const getMiddle = element => {
  let middleLeft = 0,
    middleTop = 0;
  if (element) {
    const wrapperBoundingClientRect = element.getBoundingClientRect();
    middleLeft = wrapperBoundingClientRect.width / 2;
    middleTop = wrapperBoundingClientRect.height / 2;
  }
  return { middleLeft, middleTop };
};

const getRelativeRect = (element, wrapper) => {
  if (!element || !wrapper) return { height: 0, left: 0, top: 0, width: 0 };
  const elementBoundingClientRect = element.getBoundingClientRect();
  const wrapperBoundingClientRect = wrapper.getBoundingClientRect();
  return {
    height: elementBoundingClientRect.height,
    left: elementBoundingClientRect.left - wrapperBoundingClientRect.left,
    top: elementBoundingClientRect.top - wrapperBoundingClientRect.top,
    width: elementBoundingClientRect.width
  };
};

const useInterpolatedStyles = ({ folderIconsRef, isOpened, parentRef }) => {
  const mainSpring = useSpring({ config: SPRING_CONFIG, openAmount: isOpened ? 1 : 0 });

  const folderIconsRectRef = useRef({});
  const parentRectRef = useRef({});

  useEffect(() => {
    folderIconsRectRef.current = getRelativeRect(folderIconsRef.current, parentRef.current);
    parentRectRef.current = getMiddle(parentRef.current);
  }, []);

  const i = mainSpring.openAmount.interpolate.bind(mainSpring.openAmount);
  const { middleLeft, middleTop } = parentRectRef.current;

  const folderIconsSize = i(
    openAmount => `${interpolate(FOLDER_ICONS_CLOSED_SIZE_REM, FOLDER_ICONS_OPENED_SIZE_REM, openAmount)}rem`
  );

  const appIconStyle = {
    borderRadius: i(openAmount => `${interpolate(BORDER_RADIUS_CLOSED_REM, BORDER_RADIUS_OPENED_REM, openAmount)}rem`)
  };

  const folderIconsStyle = {
    left: i(openAmount =>
      openAmount === 0
        ? "auto"
        : interpolate(
            folderIconsRectRef.current.left,
            middleLeft - (FOLDER_ICONS_OPENED_SIZE_REM * REM_IN_PX) / 2,
            openAmount
          )
    ),
    gridGap: i(openAmount => `${interpolate(GRID_GAP_CLOSED_REM, GRID_GAP_OPENED_REM, openAmount)}rem`),
    height: folderIconsSize,
    padding: i(openAmount => `${interpolate(PADDING_CLOSED_REM, PADDING_OPENED_REM, openAmount)}rem`),
    position: i(openAmount => (openAmount === 0 ? "static" : "absolute")),
    top: i(openAmount =>
      openAmount === 0
        ? "auto"
        : interpolate(
            folderIconsRectRef.current.top,
            middleTop - (FOLDER_ICONS_OPENED_SIZE_REM * REM_IN_PX) / 2,
            openAmount
          )
    ),
    width: folderIconsSize
  };

  const openedFolderNameSpring = useSpring({
    config: SPRING_CONFIG,
    delay: isOpened ? OPENED_FOLDER_NAME_SHOW_DELAY_MS : 0,
    from: { opacity: 0 },
    to: { opacity: isOpened ? 1 : 0 }
  });

  const openedFolderNameStyle = {
    left: `${middleLeft}px`,
    opacity: openedFolderNameSpring.opacity,
    top: `${middleTop - OPENED_FOLDER_NAME_OFFSET_REM * REM_IN_PX}px`
  };

  return { appIconStyle, folderIconsStyle, openedFolderNameStyle };
};

export default useInterpolatedStyles;
