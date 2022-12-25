import classNames from 'classnames/bind';
import React from 'react';
import styles from './Subtitle.module.scss';

const css = classNames.bind(styles);

class Subtitle extends React.Component {
    render() {
        return (
            <p className={css('subtitle')}>
                <span>{this.props.text}</span>
            </p>
        );
    }
}

export default Subtitle;
