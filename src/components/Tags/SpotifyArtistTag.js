const SpotifyArtistTag = (props) => {
  return (
    <div className="generic-tag spotify-artist-tag">
      <img
        className="artist-image"
        src={props.tag.image_url}
        alt="spotify-artist"
      ></img>
      <div className="artist-name">
        {props.tag.name.substr(0, 35)}
        {props.tag.name.length > 36 ? "..." : null}
      </div>
    </div>
  );
};

export default SpotifyArtistTag;
