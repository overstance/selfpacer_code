import React from 'react'
// import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';

export const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  // note: requires embed url from embed code
  return <iframe title="embedded media" controls src={props.src} allow="autoplay; encrypted-media" />;
};

const Image = (props) => {
  /* if (!!props.src) {
    return <img alt="embedded media" src={props.src} />;
  } else if (!!props.src && !!props.source) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <figcaption>{props.source}</figcaption>
    </figure>
    return element;
  } */
  // console.log({props});
  if (!!props.src && !!props.source && !!props.caption) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <figcaption>{props.source}</figcaption>
      <figcaption>{props.caption}</figcaption>
    </figure>
    return element;
  } else if (!!props.src && !!props.source) {
    let element =
    <figure>
      <img alt="embedded media" src={props.src} />
      <figcaption>{props.source}</figcaption>
    </figure>
    return element;
  } else if (!!props.src) {
    return <img alt="embedded media" src={props.src} />;
  }
  return null
};

const Video = (props) => {
  // return <iframe controls src={props.src} />;

  // note: requires embed url from embed code
  return <iframe title="embedded media" src={props.src} frameborder="0" allow="autoplay; encrypted-media"></iframe>
};

const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const {source} = entity.getData();
  const {caption} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} source={source} caption={caption}/>;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }


  return media;
};