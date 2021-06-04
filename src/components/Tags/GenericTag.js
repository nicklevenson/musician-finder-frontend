import helpers from "../../globalHelpers";

const GenericTag = (props) => {
  return (
    <div className="generic-tag">
      {helpers.titleize(props.tag)}
      {props.editable ? (
        <button
          className="delete-button"
          onClick={(e) => props.removeGenre(e, props.tag)}
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default GenericTag;
