import React, { Component } from 'react';
import classes from './Explore.css';
import ExploreHeaderNav from './ExploreHeaderNav/ExploreHeaderNav';
import TestIcon from '../../assets/images/camera-retro.svg';
import eyeIcon from '../../assets/images/eye.svg';

class Explore extends Component {
    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    Header
                </div>
                <div className={classes.main}>
                    <div>
                        <div className={classes.NavContainer}>
                            <h3>Filter By Categories</h3>
                            <ExploreHeaderNav />
                        </div>
                        <div className={classes.ContainerFluid}>
                            <ul className={classes.Row}>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                            <div className={classes.Caption}>
                                                <span className={classes.SubjectSpan}>Culinary art</span>
                                            </div>
                                            <div className={classes.ViewCounter}>
                                                <div>
                                                    <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                                </div>
                                            </div>
                                        </a>

                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={classes.Subject}>
                                    <div className={classes.SubjectWrapper2}>
                                        <a>
                                            <img className={classes.SubjectIcon} src={TestIcon} alt="test icon" />
                                        </a>
                                        <div className={classes.Caption}>
                                            <span className={classes.SubjectSpan}>Culinary art</span>
                                        </div>
                                        <div className={classes.ViewCounter}>
                                            <div>
                                                <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
                <div className={classes.aside1 + ' ' + classes.aside}>Aside 1</div>
                <div className={classes.aside2 + ' ' + classes.aside}>Aside 2</div>
                <div className={classes.footer}>Footer</div>
            </div>
        )
    }
};

export default Explore;

