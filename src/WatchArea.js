import React from "react";
import axios from "axios";
import SearchArea from "./SearchArea";
import ErrorBoundary from "./ErrorBoundary";

class WatchArea extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

 componentDidMount() {
   throw new Error();
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env.API_KEY}&part=snippet,contentDetails,statistics,status,player&id=${this.props.id}`
      )
      .then((res) => {
        const item = res.data.items[0];
        this.setState({
          title: item.snippet.title,
          views: item.statistics.viewCount,
          description: item.snippet.description,
          channel: item.snippet.channelTitle,
          like: item.statistics.likeCount,
          loading: false,
          url: item.id,
        });
      })
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    if (this.state.loading) {
      return <h1 className="loader">loading … </h1>;
    }

    const { title, views, description, channel, like, url } = this.state;

    return (
     
      <div className="watch-area">
        <div>
          <SearchArea/>
          <div className="player">
            <iframe
              title={title}
              width="1050"
              height="450"
              src={`//www.youtube.com/embed/${url}`}
              frameBorder="0"
              allow=" autoplay encrypted-media; "
              allowFullScreen
            ></iframe>
          </div>
          <h1>{title}</h1>
          <div className="video-stats">
            <div>{views} Views</div>
            <div>{like} Likes</div>
          </div>
          <div className="channel-name">{channel} Channel</div>

          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function WatchAreaWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WatchArea {...props} />
    </ErrorBoundary>
  );
}

