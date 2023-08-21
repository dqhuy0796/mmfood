import classNames from 'classnames/bind';
import React from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '~/components/shared/IconButton';
import styles from './BaseRightSideModal.module.scss';

const scss = classNames.bind(styles);

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
            <div className={scss('modal')}>
                <div className={scss('overlay')}></div>
                <div className={scss('wrapper')}>
                    <div className={scss('header')}>
                        <span>{this.props.title}</span>
                        <IconButton size={'tiny'} color={'transparent'} onClick={this.props.handleCollapseModal}>
                            <MdClose />
                        </IconButton>
                    </div>
                    <div className={scss('body')}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default BaseRightSideModal;
