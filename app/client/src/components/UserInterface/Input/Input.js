import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                name={props.name}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((option, i) => (
                        <option key={i} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}<span>{props.labelspan}</span></label>
            {inputElement}
            <div className={classes.ValidationErrors}>{props.errorMessage}</div>
        </div>
    );

};

input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    elementConfig: PropTypes.object,
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.object,
    touched: PropTypes.bool
  };
  
  input.defaultProps = {
    type: 'text'
  };


export default input;