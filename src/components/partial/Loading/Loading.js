import classNames from 'classnames/bind';
import React from 'react';
import styles from './Loading.module.scss';
const scss = classNames.bind(styles);

class Loading extends React.Component {
    state = {};
    render() {
        return (
            <div className={scss('wrapper')}>
                <span className={scss('loader')}></span>
            </div>
        );
    }
}

export default Loading;
