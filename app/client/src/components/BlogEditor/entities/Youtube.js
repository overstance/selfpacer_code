import React, {Component} from 'react';
import YouTube from 'react-youtube';

class YoutubeEmbed extends Component {

    _onReady(event) {
        event.target.pauseVideo();
    }

    render() {
      const opts = {
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 0
        }
      };
   
      return (
        <YouTube
          videoId={this.props.youtubeVideoId}
          opts={opts}
          onReady={this._onReady}
        />
      );
    }
}

export default YoutubeEmbed;