import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  selectedItem,
  textProperty,
  valueProperty
}) => {
  return (
    <div className="list-group pt-3">
      {items.map((item) => (
        <button
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          type="button"
          className={
            item === selectedItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
