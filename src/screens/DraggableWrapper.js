import React from 'react';
import Draggable from 'react-native-draggable';

const DraggableWrapper = ({
  x = 0,
  y = 0,
  renderSize = 100,
  renderColor = '#32CD32',
  renderText = 'Drag me',
  isCircle = true,
  onShortPressRelease = () => {},
}) => {
  return (
    <Draggable
      x={x}
      y={y}
      renderSize={renderSize}
      renderColor={renderColor}
      renderText={renderText}
      isCircle={isCircle}
      onShortPressRelease={onShortPressRelease}
    />
  );
};

export default DraggableWrapper;
