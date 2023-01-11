import classNames from 'classnames/bind';
import React from 'react';
import { MdClose } from 'react-icons/md';
import Button from '~/components/shared/buttons/Button';
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
        return (
            <div className={scss('message')}>
                <div className={scss('overlay')}></div>
                <div className={scss('wrapper')}>
                    <div className={scss('header')}>
                        <p>{this.props.title}</p>
                        <button onClick={this.props.handleActiveDialog}>
                            <MdClose />
                        </button>
                    </div>
                    <div className={scss('body')}>
                        <p>{this.props.message}</p>
                    </div>
                    <div className={scss('footer')}>
                        {this.props.button ? (
                            this.props.button.map((item, index) => (
                                <Button key={index} size={'tiny'} color={item.color} onClick={item.onClick}>
                                    {item.title}
                                </Button>
                            ))
                        ) : (
                            <Button size={'tiny'} color={'info'} onClick={this.props.handleActiveDialog}>
                                OK
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DialogMessage;
