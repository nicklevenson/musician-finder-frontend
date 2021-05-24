const SpotifyArtistTag = (props) => {
  return (
    <div className="generic-tag spotify-artist-tag">
      <img className="artist-image" src={props.tag.image_url}></img>
      <div className="artist-name">
        {props.tag.name.substr(0, 19)}
        {props.tag.name.length > 20 ? "..." : null}
      </div>
    </div>
  );
};

export default SpotifyArtistTag;
