import { Icon } from "semantic-ui-react";
export const Links = (props) => {
  return (
    <div className="links">
      {props.user.soundcloud_link ? <Icon name="soundcloud" /> : null}
      {props.user.bandcamp_link ? <Icon name="bandcamp" /> : null}
      {props.user.spotify_link ? <Icon name="spotify" /> : null}
      {props.user.apple_music_link ? <Icon name="apple" /> : null}
      {props.user.youtube_link ? <Icon name="youtube" /> : null}
      {props.user.instagram_link ? <Icon name="instagram" /> : null}
    </div>
  );
};
