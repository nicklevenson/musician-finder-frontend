const SpotifyArtistTag = (props) => {
  return (
    <div className="generic-tag spotify-artist-tag">
      <img className="artist-image" src={props.tag.image_url}></img>
      {/* <div className="artist-name">{props.tag.name}</div> */}
    </div>
  );
};

export default SpotifyArtistTag;
