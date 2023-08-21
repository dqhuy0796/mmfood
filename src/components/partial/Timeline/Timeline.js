import classNames from 'classnames/bind';
import React from 'react';
import styles from './Timeline.module.scss';
const scss = classNames.bind(styles);

class Timeline extends React.Component {
    state = {};

    render() {
        const { data } = this.props;
        return (
            <ul className={scss('timeline')}>
                {data.map((item, index) => (
                    <TimeNode key={index} data={item} />
                ))}
                {[1, 2, 3, 4].slice(0, 4 - data.length).map((index) => (
                    <TimeNode key={index} />
                ))}
            </ul>
        );
    }
}

const TimeNode = ({ data }) => {
    return (
        <li className={scss('timenode', data ? 'complete' : null)}>
            <div className={scss('timestamp')}>
                <span>{data ? data.createdAt.slice(0, 10) : 'yyyy-MM-dd'}</span>
                <span>{data ? data.createdAt.slice(11, 16) : 'hh:mm'}</span>
            </div>
            <div className={scss('description')}>
                <span>{data ? data.stateDesc : 'Đang chờ'}</span>
            </div>
        </li>
    );
};

export default Timeline;
