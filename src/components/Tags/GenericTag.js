import helpers from "../../globalHelpers";

const GenericTag = (props) => {
  return (
    <div className="generic-tag">
      {helpers.titleize(props.tag)}
      {props.editable ? (
        <button
          className="delete-button"
          onClick={(e) => props.removeTag(e, props.tag)}
          aria-label="remove this item"
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default GenericTag;
