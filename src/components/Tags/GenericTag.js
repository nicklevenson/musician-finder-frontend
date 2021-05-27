import helpers from "../../globalHelpers";

const GenericTag = (props) => {
  return <div className="generic-tag">{helpers.titleize(props.tag)}</div>;
};

export default GenericTag;
