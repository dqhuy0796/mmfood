import classNames from 'classnames/bind';
import React from 'react';
import styles from './RealtimeClock.module.scss';

const cb = classNames.bind(styles);

class RealtimeClock extends React.Component {
    state = {
        time: new Date(),
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: new Date(),
            });
        }, 1000);
    }

    componentWillUnmount() {}

    handleDisplayNumberFormat = (value) => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    render() {
        return (
            <span className={cb('clock')}>
                <p>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getHours())}</span>
                    <span>:</span>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getMinutes())}</span>
                    <span>:</span>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getSeconds())}</span>
                </p>
                <p>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getDate())}</span>
                    <span>/</span>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getMonth() + 1)}</span>
                    <span>/</span>
                    <span>{this.handleDisplayNumberFormat(this.state.time.getFullYear())}</span>
                </p>
            </span>
        );
    }
}

export default RealtimeClock;
