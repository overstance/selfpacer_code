import React, {Component} from 'react';
import classes from './ScrollButton.module.css';

class ScrollButton extends Component {

    constructor(props) {
        super(props);

        // set default state
        this.state = {intervalId: 0, show: false};

        // bind
        this.handleScroll = this.handleScroll.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show !== this.state.show;
    }

    componentDidMount() {
        this.handleScroll(); // initialize state

        // Add all listeners which can start scroll
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // Remove all listeners which was registered
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    /* state = {
          intervalId: 0,
          show: false
        //   scrollOffset: 0
    }; */

    scrollStep() {
      if (window.pageYOffset === 0) {
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }

    handleScroll() {
        if (window.pageYOffset > this.props.showUnder) {
            if (!this.state.show) {
                this.setState({show: true});
            }
        } else {
            if (this.state.show) {
                this.setState({show: false});
            }
        }
    }
    
    render () {

        return ( this.state.show ? 
            <svg xmlns="http://www.w3.org/2000/svg" 
            onClick={ () => { this.scrollToTop(); }} 
            className={classes.Scroll}
            viewBox="0 0 50 50">
                <path fill="#40FF70" d="M50 40c0 5.5-4.5 10-10 10H10C4.5 50 0 45.5 0 40V10C0 4.5 4.5 0 10 0h30c5.5 0 10 4.5 10 10v30z"/>
                <path fill="#FFF" d="M37 14.2H13c-1.989 0-3.601-1.612-3.601-3.601C9.399 8.612 11.011 7 13 7h24c1.988 0 3.6 1.612 3.6 3.6s-1.612 3.6-3.6 3.6zm-.97 11.235l-9.334-9.334c-.933-.934-2.461-.934-3.394 0l-9.334 9.334c-.933.933-.616 1.697.703 1.697h6.728V39.4c0 1.988 1.611 3.6 3.601 3.6 1.988 0 3.6-1.611 3.6-3.6V27.132h6.728c1.319 0 1.636-.765.702-1.697z"/>
            </svg>
            : null
        )
     }

  } 

  export default ScrollButton;