import React from "react";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "./constants";
import Todo from "../components/Todo.component";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
};

// const todoStyles = {
//   display: "inline-block",
//   transform: "rotate(-7deg)",
//   WebkitTransform: "rotate(-7deg)",
// };

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  function renderItem() {
    const todoStyles = {
      display: "inline-block",
      transform: "rotate(-7deg)",
      WebkitTransform: "rotate(-7deg)",
      width: item.width,
    };

    switch (itemType) {
      case ItemTypes.TODO:
        return pug`
          div(style = todoStyles)
            Todo(todo=item.todo)
        `;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
export default CustomDragLayer;
