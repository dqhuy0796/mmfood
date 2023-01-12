import classNames from 'classnames/bind';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import styles from './Timeline.module.scss';
const scss = classNames.bind(styles);

class Timeline extends React.Component {
    state = {};

    render() {
        return (
            <ul className={scss('timeline')}>
                {this.props.data.map((item, index) => (
                    <TimeNode key={index} data={item} />
                ))}
            </ul>
        );
    }
}

const TimeNode = (props) => {
    let content = 'Không xác định';
    switch (props.data.code) {
        case 0:
            content = 'Chờ xử lý';
            break;
        case 1:
            content = 'Đã xác nhận';
            break;
        case 2:
            content = 'Đang giao hàng';
            break;
        case 3:
            content = 'Giao hàng thành công';
            break;
        case 4:
            content = 'Đã hủy';
            break;
        default:
            break;
    }

    let date = props.data.time.slice(0, 10);
    let time = props.data.time.slice(11, 16);

    return (
        <div className={scss('time-node')}>
            <div className={scss('icon')}>
                <span>
                    <BsCheckLg />
                </span>
            </div>
            <div className={scss('description')}>
                <p className={scss('content')}>{content}</p>
                <p className={scss('time')}>
                    <span>{time}</span>
                    <span>{date}</span>
                </p>
            </div>
        </div>
    );
};

export default Timeline;
