import React from 'react';
import Youtube from './Youtube';
import { TwitterTweetEmbed } from 'react-twitter-embed';
// import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';

export const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      /* props: {
        imageBlockSelected: imageBlockSelected
      } */
    };
  }

  return null;
}

const Audio = (props) => {
  // note: requires embed url from embed code
  return <iframe title="embedded media" controls src={props.src} allow="autoplay; encrypted-media" />;
};

const Image = (props) => {
  if (!!props.src && !!props.source && !!props.caption) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <figcaption>{props.source}</figcaption>
      <p>{props.caption}</p>
    </figure>
    return element;
  } else if (!!props.src && !!props.source) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <figcaption>{props.source}</figcaption>
    </figure>
    return element;
  } else if (!!props.src && !!props.caption) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <p>{props.caption}</p>
    </figure>
    return element;
  } else if (!!props.src) {
    return <img alt="embedded media" src={props.src} />;
  }
  return null
};

const Video = (props) => {
  return <iframe title="embedded media" src={props.src} frameborder="0" allow="autoplay; encrypted-media"></iframe>
};

class Media extends React.Component {

  render() {
    const {block, contentState} = this.props;
    // const {imageBlockSelected} = this.props.blockProps;
    const type = contentState.getEntity(block.getEntityAt(0)).getType();
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    const src = data.src;
    const source = data.source;
    const caption = data.caption;
    const youtubeVideoId = data.youtubeVideoId;
    const tweetId = data.tweetId;
    // const publicId = data.publicId;

    let media;
    if (type === 'audio') {
      media = <Audio src={src} />;
    } else if (type === 'image') {
      media = 
      <Image 
        src={src} source={source} 
        caption={caption} 
      /> 
    } else if (type === 'video') {
      media = <Video src={src} />;
    } else if (type === 'youtube') {
      media = <Youtube youtubeVideoId={youtubeVideoId}/>
    } else if (type === 'twitter') {
      media =
      <TwitterTweetEmbed
        tweetId={tweetId}
      /> 
    }
     return media;
  }
};