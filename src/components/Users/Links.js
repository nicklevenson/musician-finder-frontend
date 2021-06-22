import { Icon } from "semantic-ui-react";
export const Links = (props) => {
  const {
    soundcloud_link,
    bandcamp_link,
    spotify_link,
    apple_music_link,
    youtube_link,
    instagram_link,
  } = props.user;
  return (
    <div className="links">
      {soundcloud_link ? (
        <a href={soundcloud_link} target="blank">
          <Icon name="soundcloud" />
        </a>
      ) : null}
      {bandcamp_link ? (
        <a href={bandcamp_link} target="blank">
          <Icon name="bandcamp" />
        </a>
      ) : null}
      {spotify_link ? (
        <a href={spotify_link} target="blank">
          <Icon name="spotify" />{" "}
        </a>
      ) : null}
      {apple_music_link ? (
        <a href={apple_music_link} target="blank">
          <Icon name="apple" />
        </a>
      ) : null}
      {youtube_link ? (
        <a href={youtube_link} target="blank">
          <Icon name="youtube" />{" "}
        </a>
      ) : null}
      {instagram_link ? (
        <a href={instagram_link} target="blank">
          <Icon name="instagram" />{" "}
        </a>
      ) : null}
    </div>
  );
};
