import React, {useReducer, useRef, useEffect} from "react";
import { useSwipeable } from "../../../components/ReactSwipeable/ReactSwipeable";
import Resource from '../resource/resource';
import classes from './carousel.module.css';

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Items = props => {

  const carouselItems = useRef(null);

  useEffect(() => {
    
      let itemWidth = -260; 
      let position = props.position;

      const carousel = carouselItems.current;

      let distance = itemWidth * position;
      carousel.style.marginLeft = distance + 'px';

      // i used this return to avoid running this effect on unmount
      return () => {};
      // console.log(items.length, props.position, distance );
      
  }, [props.position]);
  
  return (
    <div
      className={classes.items}
      ref={carouselItems}
    >
      {props.children}
    </div>
  );
}

const initialState = { pos: 0, sliding: false, dir: NEXT, containerWidth: 0, windowSize: 0 };

const getOrder = ({ index, pos, numItems }) => {
    return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
  
const Carousel = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const carouselContainer = useRef();
  const numItems = props.items.length;
  const containerThreshold = (numItems * 260) - 16;

  const handleResize = e => {
    const windowSize = window.innerWidth;
    dispatch({ type: "TRACK_WINDOW_RESIZE", payload: windowSize });
  };

  window.addEventListener("resize", handleResize);

  useEffect (() => {
    const container = carouselContainer.current;
    let containerWidth = container.offsetWidth;

    console.log(containerWidth, containerThreshold, state.windowSize);

    dispatch({ type: "SET_CONTAINER_WIDTH", payload: containerWidth });

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [containerThreshold, state.windowSize]);
  
  const items = props.items
  const slide = dir => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  return (
    <div {...handlers}>
      <div className={classes.carousel}>
          { state.pos !== 0 && 
            <button 
              onClick={() => slide(PREV)}
              className={classes.arrowPrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm116-292H256v-70.9c0-10.7-13-16.1-20.5-8.5L121.2 247.5c-4.7 4.7-4.7 12.2 0 16.9l114.3 114.9c7.6 7.6 20.5 2.2 20.5-8.5V300h116c6.6 0 12-5.4 12-12v-64c0-6.6-5.4-12-12-12z"/>
              </svg>
            </button>
          }
          <div ref={carouselContainer} className={classes.itemsContainer}>
            {
              <Items 
                dir={state.dir} 
                position={state.pos} 
                sliding={state.sliding}
                childrenCount={items.length}
              >
                { items.map((resource, index) => (
                    <Resource 
                      order={getOrder({ index: index, pos: state.pos, numItems })}
                      key={index}
                      category={resource.category}
                      img={resource.img}
                      source={resource.source}
                      type={resource.type}
                      id={resource._id}
                      title={resource.title}
                      avgRating={resource.avgRating}
                      youtubelikes={resource.youtubelikes} 
                      videoCount={resource.videoCount}
                    />
                  ))
                }               
              </Items>
            }               
          </div>
        { (state.pos === (props.items.length - 1) /* && props.items.length === 1 */) || (state.containerWidth > containerThreshold ) ? 
          null : 
          <button 
            className={classes.arrowNext}
            onClick={() => slide(NEXT)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"/>
            </svg>
          </button>
        }
      </div>
    </div>
  );
};
  
  function reducer(state, { type, numItems, payload }) {
    switch (type) {
      case "reset":
        return initialState;
      case PREV:
        return {
          ...state,
          dir: PREV,
          sliding: true,
          pos: state.pos === 0 ? numItems - 1 : state.pos - 1
        };
      case NEXT:
        return {
          ...state,
          dir: NEXT,
          sliding: true,
          pos: state.pos === numItems - 1 ? 0 : state.pos + 1
        };
      case "stopSliding":
        return { ...state, sliding: false };
      case "SET_CONTAINER_WIDTH":
        return {...state, containerWidth: payload}
      case "TRACK_WINDOW_RESIZE":
        return {...state, windowSize: payload}
      default:
        return state;
    }
  }
  
  export default Carousel;