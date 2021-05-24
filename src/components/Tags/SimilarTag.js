import helpers from "../../globalHelpers";

const SimilarTag = (props) => {
  return (
    <div className="generic-tag similar-tag">{helpers.titleize(props.tag)}</div>
  );
};

export default SimilarTag;
