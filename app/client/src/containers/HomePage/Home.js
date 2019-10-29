import React, { Component } from 'react';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from './button';
import ActionCard from './actionCard';
import Footer from './footer';
import * as actions from '../../store/actions/index';
import VisitorSkillSelect from '../../components/visitorSkillSelect/skillSelect';

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.visitorSelectSkillModal = React.createRef();
    this.exploreButton = React.createRef();
  }

  state = {
    showVisitorSkillSelect: false
  }

  componentDidMount() {
    /* const logoInitial = document.querySelectorAll("#homeLogoInitial_stroke path");
        console.log(logoInitial);

        for (let i = 0; i < logoInitial.length; i++) {
            console.log(`letter ${i} is ${logoInitial[i].getTotalLength()}`);
        } */
    window.scroll(0, 0);
    this.props.onSetIsSiteHome();
  }

  componentWillUnmount() {
    this.props.onUnsetIsSiteHome();
  }

  showVisitorSkillSelect = () => {
    this.setState({ showVisitorSkillSelect: true }, () => {
      this.visitorSelectSkillModal.current.focus();
    });
  }

  closeVisitorSkillSelectOnClick = () => {
    this.setState({ showVisitorSkillSelect: false }, () => {
      this.exploreButton.current.focus();
    });
  }

  closeVisitorSkillSelectOnKey = (event) => {
    if (event.key === 'Tab' || event.key === 'Enter') {
      this.setState({ showVisitorSkillSelect: false }, () => {
        this.exploreButton.current.focus();
      });
    }
  }

  render() {
    let inspireTexts = this.props.inspireTexts;
    let displayedText;

    if(inspireTexts.length > 0) {
      let inspireTextsShuffled = shuffleArray(inspireTexts);
      displayedText = inspireTextsShuffled[0].inspireText;
    } else {
      displayedText = "Capture your inner genius."
    }
    
    let currentDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let actionCards = [
      {
        artType: 'skill',
        action: 'learn',
        buttonLink: '/skills',
        message: 'Learn new skills or improve on existing ones, while you collect resources for later review.'
      },
      {
        artType: 'collection',
        action: 'view',
        buttonLink: '/collections',
        message: 'View and pin curated collections, remember to share that efficient collection of yours as well.'
      },
      {
        artType: 'facilitate',
        action: 'facilitate',
        buttonLink: '/facilitate',
        message:
          'Use your highly developed skill to help facilitate growth in others.'
      },
      {
        artType: 'blog',
        action: 'read',
        buttonLink: '/blog',
        message:
          'Read and discuss relevant subjects on human capital development.'
      }
    ];

    let actions = actionCards.map((action, i) => (
      <ActionCard
        key={i}
        actionLink={action.buttonLink}
        action={action.action}
        artType={action.artType}>
        {action.message}
      </ActionCard>
    ));

    return (
      <div className={classes.pageWrapper}>
        <div className={classes.backdrop} />
        <div className={classes.gradientBack} />
        <header className={classes.headerContainer}>
          <div className={classes.header}>
            <div className={classes.homeIcon}>
              <svg aria-label="home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z" />
              </svg>
            </div>
            <div className={classes.helloUser}>
              {this.props.isAuthenticated && this.props.userName ? (
                <React.Fragment>
                  <span>Hello,</span>
                  <div>{this.props.userName}</div>
                </React.Fragment>
              ) : (
                <h2>Login</h2>
              )}
            </div>
            <nav className={classes.userOrLoginIcon}>
              {this.props.isAuthenticated && this.props.userName ? 
                <Link 
                className={classes.userProfile} 
                to="/profile"
                role="menuitem"
                arial-label="go to profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M15.999 0C7.162 0 0 7.164 0 16s7.162 16 15.999 16C24.837 32 32 24.837 32 16S24.837 0 15.999 0zm0 6.194c3.136 0 5.679 2.543 5.679 5.677 0 3.136-2.543 5.679-5.679 5.679-3.129 0-5.681-2.543-5.681-5.679 0-3.134 2.552-5.677 5.681-5.677zm0 22.193c-3.786 0-7.181-1.713-9.451-4.396 1.213-2.289 3.583-3.859 6.354-3.859.156 0 .311.025.458.07.837.27 1.716.45 2.638.45.924 0 1.809-.18 2.637-.45.15-.044.307-.07.462-.07 2.766 0 5.141 1.57 6.352 3.859-2.269 2.682-5.662 4.396-9.45 4.396z" />
                  </svg>
                </Link> :
                <Link 
                  to="/login" 
                  className={classes.login}
                  role="menuitem"
                  arial-label="login"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.251 17.343h-3.282c-.258 0-.469-.211-.469-.468v-1.563c0-.259.211-.47.469-.47h3.282c.69 0 1.249-.559 1.249-1.25V6.094c0-.692-.559-1.251-1.249-1.251h-3.282c-.258 0-.469-.211-.469-.468V2.813c0-.259.211-.47.469-.47h3.282C18.32 2.343 20 4.022 20 6.094v7.499c0 2.07-1.68 3.75-3.749 3.75zm-1.837-7.852L7.853 2.929c-.586-.586-1.603-.176-1.603.665v3.749H.938c-.52 0-.938.419-.938.938v3.749c0 .52.418.938.938.938H6.25v3.749c0 .84 1.017 1.25 1.603.664l6.562-6.562c.362-.367.362-.961-.001-1.328z" />
                  </svg>
                </Link>
              }
            </nav>
          </div>
        </header>
        <div className={classes.mainContainer}>
          <main className={classes.body}>
            <div className={classes.logoWork}>
              <div className={classes.logoAnimated}>
                <svg
                  id="homeLogoInitial_stroke"
                  className={classes.homeLogoInitialStroke}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 266 72">
                  <path d="M254.288 18.992c-4.33 0-8.272.247-11.889 2.947-3.262 2.437-5.581 5.904-6.277 9.946-.974 5.656-1.949 11.312-2.924 16.968-.403 2.339.293 5.115 3.372 4.265 3.494-.964 3.305-5.957 3.782-8.737.768-4.463.888-9.815 3.37-13.753 2.006-3.185 5.801-5.253 9.545-5.253 3.044 0 8.442 1.184 9.767-2.673 1.659-4.999-6.383-3.71-8.746-3.71z" />
                  <path d="M231.059 20.057c2.58 1.175 4.084 3.748 4.559 6.438.756 4.278-1.814 8.731-5.145 11.219-3.93 2.936-8.347 2.555-12.987 2.554-2.237 0-8.493 1.287-8.771-2.428-.263-3.533 3.366-3.965 5.939-3.965h9.158c1.566 0 2.998-.573 4.046-1.768 2.309-2.634 1.149-6.606-2.58-6.606-4.909 0-9.352-.41-13.544 2.554-3.461 2.448-5.72 6.962-5.117 11.209.569 4.011 3.774 6.932 7.774 7.344 2.339.24 4.771.049 7.116.049 1.993 0 4.348-.362 6.314.075 3.008.668 2.248 4.465.191 5.769-1.277.813-2.844.594-4.286.594h-9.551c-4.136 0-8.268-1.1-11.064-4.357-3.07-3.58-3.712-8.123-2.83-12.648 1.873-9.633 10.238-16.542 19.935-17.005 3.556-.002 7.505-.549 10.843.972z" />
                  <path d="M194.381 53.038c-4.203 0-9.091.673-12.969-1.351-3.35-1.748-5.575-5.222-5.851-8.979-.152-2.072.234-4.047.585-6.08.347-2.011.574-4.109 1.225-6.054 1.462-4.372 4.867-8.07 9.016-10.042 4.544-2.158 9.761-1.542 14.638-1.542 2.385 0 6.352.039 5.143 3.71-1.292 3.928-7.058 2.673-10.075 2.673-4.207 0-8.288 1.542-10.89 5.012-2.515 3.355-3.776 8.003-1.598 11.875 2.209 3.925 6.229 4.341 10.288 4.341 2.325 0 8.41-1.036 7.675 3.218-.797 3.589-4.314 3.219-7.187 3.219z" />
                  <path d="M171.309 52.129c-.31 1.735-2.119 3.108-3.857 3.023-2.786-.138-2.549-2.809-2.208-4.794.825-4.796 1.652-9.591 2.478-14.386 1.678-9.742-9.741-13.507-16.482-7.902-3.312 2.753-5.558 7.024-5.141 11.434.454 4.802 4.449 7.144 8.898 7.144 2.297 0 8.757-1.207 8.226 3.035-.497 3.974-5.068 3.348-7.905 3.348-4.818 0-9.469.455-13.252-3.086-3.712-3.474-3.007-8.412-2.24-12.875 1.547-9 8.937-17.618 18.604-18.083 4.404-.211 9.205.8 12.227 4.312 3.171 3.686 4.039 7.919 3.451 12.666-.93 5.388-1.837 10.781-2.799 16.164z" />
                  <path d="M118.644 52.97c-1.985.006-5.801.944-7.244-1.07-1.71-2.386.952-5.108 3.306-5.309 4.485-.382 8.615.706 12.574-2.015 3.527-2.423 5.191-6.302 5.302-10.491.102-3.821-2.652-7.564-6.426-8.392-4.41-.968-8.608.739-11.703 3.903-2.648 2.706-3.201 6.166-3.812 9.711-1.123 6.519-2.246 13.037-3.368 19.555-.409 2.371-.817 4.741-1.225 7.111-.184 1.067-.39 2.041-1.168 2.861-1.765 1.857-5.338 1.563-5.418-1.447-.031-1.16.377-2.434.573-3.563.515-2.994 1.031-5.986 1.545-8.979 1.021-5.924 2.042-11.849 3.061-17.772 1.529-8.873 7.982-15.947 16.904-17.77 9.594-1.959 17.957 5.099 17.541 14.84-.372 8.73-5.002 17.875-14.641 18.772-1.931.059-3.868.049-5.801.055z" />
                  <path d="M89.406 28.32c-3.399 2.824-6.023 7.75-4.887 12.292 1.326 5.297 5.909 6.04 10.602 6.04 2.415 0 7.486-.414 6.13 3.71-1.29 3.925-7.045 2.674-10.058 2.674-4.593 0-8.862 2.342-10.508 6.836-1.11 3.032-.132 8.305-3.711 9.835-2.412 1.032-4.387-.801-3.967-3.241 1.874-10.876 3.747-21.75 5.621-32.626 1.427-8.282 8.319-14.647 16.871-14.647h9.102c1.172 0 2.359-.022 3.152 1.005 1.744 2.258-.803 5.361-3.253 5.379-5.158-.001-10.815-.814-15.094 2.743z" />
                  <path d="M65.207 51.205c-.814-1.184-.845-2.55-.61-3.914.782-4.543 1.565-9.086 2.348-13.63 1.177-6.836 2.355-13.671 3.532-20.507.379-2.203.759-4.405 1.138-6.608.156-.897.235-1.828.708-2.626 1.212-2.051 5.013-2.983 5.852-.091.263.907-.036 1.912-.191 2.815-.4 2.323-.801 4.647-1.202 6.971-1.178 6.845-2.358 13.69-3.536 20.534-.45 2.61-.9 5.222-1.349 7.832-.16.93-.494 1.976-.456 2.932.088 2.191 2.656 1.099 3.413 2.661 1.156 2.386-1.486 5.468-3.846 5.491-2.165-.002-4.421.149-5.801-1.86z" />
                  <path d="M62.068 20.057c2.579 1.174 4.08 3.749 4.556 6.438.756 4.275-1.812 8.735-5.143 11.219-3.934 2.933-8.343 2.555-12.989 2.554-2.219 0-8.508 1.287-8.77-2.428-.248-3.535 3.357-3.965 5.939-3.965h9.159c1.57 0 2.993-.575 4.045-1.768 2.32-2.631 1.141-6.606-2.58-6.606-4.91 0-9.352-.41-13.544 2.554-3.46 2.447-5.723 6.964-5.118 11.209.571 4.01 3.772 6.931 7.774 7.344 2.34.24 4.772.049 7.116.049 1.995 0 4.348-.362 6.316.075 3.008.668 2.243 4.463.192 5.769-1.277.813-2.847.594-4.288.594h-9.55c-4.135 0-8.27-1.1-11.063-4.357-3.073-3.582-3.715-8.122-2.833-12.648 1.877-9.633 10.237-16.542 19.936-17.005 3.558-.002 7.505-.548 10.845.972z" />
                  <path d="M10.891 31.566c1.921 4.14 7.979 2.849 11.625 3.747 3.913.962 7.214 4.664 7.712 8.665.298 2.401-.074 4.839-.266 7.238-.128 1.606.062 3.683-1.105 4.978-1.875 2.082-5.275 1.004-5.527-1.776-.198-2.183.586-4.366.244-6.569-.294-1.888-1.444-3.654-2.978-4.774-3.551-2.59-8.391-1.078-12.08-3.686-7.625-5.392-4.922-17.277 2.752-21.084 4.175-2.071 9.936-1.649 14.433-2.004 2.363-.186 6.527-.641 5.877 3.144-.72 4.203-7.518 3.476-10.519 3.786-3.764.389-9.015.007-10.369 4.509-.302 1.322-.38 2.575.201 3.826z" />
                  <path d="M3.452 50.261c.862-1.197 2.202-1.445 3.571-1.595 3.165-.349 6.329-.697 9.492-1.046 2.371-.261 6.308-.492 5.438 3.233-.396 1.69-1.688 2.58-3.327 2.862-2.481.428-5.051.557-7.554.833-2.288.252-7.78 1.988-8.321-1.786-.065-.864.194-1.797.701-2.501z" />
                  <path
                    className={classes.logoPowerRed}
                    d="M33.477 19.264c.153 4.124 6.292 3.424 6.396-.469.114-4.266-6.402-3.645-6.396.469z"
                  />
                  <path
                    className={classes.logoHeadGreen}
                    d="M9.036 12.786c.157 4.124 6.292 3.423 6.396-.469.114-4.268-6.405-3.646-6.396.469z"
                  />
                </svg>
              </div>
            </div>
            <article className={classes.inspireBoard}>
              <div className={classes.date}>{currentDate}</div>
              <div className={classes.inspireText}>{displayedText}</div>
            </article>
            <nav className={classes.exploreBlock}>
              { this.props.userSpec !== '' ?
                <Button buttonLink="/explore">
                  <div className={classes.explore}>
                    <span>explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.089 9.088c-.505.504-.505 1.32 0 1.824.502.504 1.32.504 1.824 0s.504-1.321 0-1.824c-.504-.504-1.322-.504-1.824 0zm.912-9.087C4.478.001 0 4.477 0 10s4.478 9.999 10.001 9.999C15.522 19.999 20 15.523 20 10S15.522.001 10.001.001zm5.085 5.97l-2.66 5.819c-.128.282-.354.507-.636.636l-5.82 2.66c-.671.307-1.362-.386-1.056-1.057l2.66-5.82c.129-.281.355-.508.636-.636l5.82-2.659c.671-.308 1.363.385 1.056 1.057z" />
                    </svg>
                  </div>
                </Button>
                :
                <Button 
                  isButton
                  homeButtonClicked={this.showVisitorSkillSelect}
                  exploreButton={this.exploreButton}
                >
                  <div className={classes.explore}>
                    <span>explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.089 9.088c-.505.504-.505 1.32 0 1.824.502.504 1.32.504 1.824 0s.504-1.321 0-1.824c-.504-.504-1.322-.504-1.824 0zm.912-9.087C4.478.001 0 4.477 0 10s4.478 9.999 10.001 9.999C15.522 19.999 20 15.523 20 10S15.522.001 10.001.001zm5.085 5.97l-2.66 5.819c-.128.282-.354.507-.636.636l-5.82 2.66c-.671.307-1.362-.386-1.056-1.057l2.66-5.82c.129-.281.355-.508.636-.636l5.82-2.659c.671-.308 1.363.385 1.056 1.057z" />
                    </svg>
                  </div>
                </Button>
              }
            </nav>
            {actions}
          </main>
          <Footer />
        </div>
        { this.state.showVisitorSkillSelect ?
          <VisitorSkillSelect 
            closeSkillSelectOnClick={this.closeVisitorSkillSelectOnClick}
            closeSkillSelectOnKey={this.closeVisitorSkillSelectOnKey}
            show={this.state.showVisitorSkillSelect}
            skillSelectModal={this.visitorSelectSkillModal}
          />
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.user.name,
  inspireTexts: state.admin1.inspireTexts,
  userSpec: state.auth.userSpecialization
});

const mapDispatchToProps = dispatch => ({
  onSetIsSiteHome: () => dispatch(actions.setIsSiteHome()),
  onUnsetIsSiteHome: () => dispatch(actions.unsetIsSiteHome()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
