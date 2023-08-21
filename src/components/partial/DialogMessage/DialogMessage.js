import classNames from 'classnames/bind';
import React from 'react';
import { MdClose } from 'react-icons/md';
import Button from '~/components/shared/Button';
import styles from './DialogMessage.module.scss';

const scss = classNames.bind(styles);

class DialogMessage extends React.Component {
    state = {
        isActive: true,
    };

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'overlay';
    }

    render() {
        const { title, message, onConfirm, onCancel, onToggle } = this.props;
        return (
            <div className={scss('dialog', 'overlay')}>
                <div className={scss('wrapper')}>
                    <div className={scss('header')}>
                        <p className={scss('title')}>{title}</p>
                        <button onClick={onToggle}>
                            <MdClose />
                        </button>
                    </div>
                    <div className={scss('body')}>
                        <p>{message}</p>
                    </div>
                    <div className={scss('footer')}>
                        {onCancel && (
                            <Button size={'tiny'} onClick={onCancel}>
                                Hủy
                            </Button>
                        )}
                        {onConfirm && (
                            <Button size={'tiny'} color={'red'} onClick={onConfirm}>
                                Xác nhận
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DialogMessage;
