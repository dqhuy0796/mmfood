import classNames from 'classnames/bind';
import React from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '~/components/shared/buttons/IconButton';
import styles from './BaseRightSideModal.module.scss';

const cb = classNames.bind(styles);

class BaseRightSideModal extends React.Component {
    state = {};

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'overlay';
    }

    render() {
        return (
            <div className={cb('modal')}>
                <div className={cb('overlay')}></div>
                <div className={cb('wrapper')}>
                    <div className={cb('header')}>
                        <span>{this.props.title}</span>
                        <IconButton size={'tiny'} color={'transparent'} onClick={this.props.handleCollapseModal}>
                            <MdClose />
                        </IconButton>
                    </div>
                    <div className={cb('body')}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default BaseRightSideModal;
