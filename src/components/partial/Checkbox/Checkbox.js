import classNames from 'classnames/bind';
import React from 'react';
import styles from './Checkbox.module.scss';
const scss = classNames.bind(styles);

class Checkbox extends React.Component {
    state = {};

    handleOnChange = (key, e) => {
        this.props.onChange(key, e.target.checked);
    };

    render() {
        const { option, checked } = this.props;
        return (
            <label className={scss('wrapper')}>
                <span>{option.label}</span>
                <input
                    hidden
                    type={'checkbox'}
                    checked={checked}
                    onChange={(e) => this.handleOnChange(option.key, e)}
                />
                <span className={scss('checkmark')}></span>
            </label>
        );
    }
}

export default Checkbox;
