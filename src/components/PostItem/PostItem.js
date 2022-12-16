import classNames from 'classnames/bind';
import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PostItem.module.scss';
import _ from 'lodash';
import { postService } from '~/services';
import { toast, ToastContainer } from 'react-toastify';

const cb = classNames.bind(styles);

class Post extends React.Component {
    state = {
        dialog: {
            active: false,
        },
        modal: {
            active: false,
        },
        currentPost: {},
        dataPosts: [],
        menu: [],
    };

    render() {
        return (
            <div className={cb('wrapper')}>
                <div className={cb('image')}>
                    <img src={this.props.data.imageUrl} alt={this.props.data.title} />
                </div>
                <div className={cb('container')}>
                    <div className={cb('content')}>
                        <h1>{this.props.data.title}</h1>
                        <p className={cb('overview')}>{this.props.data.overview}</p>
                        <p className={cb('content')}>{this.props.data.content}</p>
                    </div>
                </div>
                <div className={cb('action')}>
                    <button onClick={() => this.props.handleActiveModal(this.props.data)}>
                        <BiEditAlt />
                    </button>
                    <button onClick={() => this.props.handleActiveDialog(this.props.data)}>
                        <RiDeleteBin5Line />
                    </button>
                </div>

                {/* <div className={cb('container')}>
                    <h1>{this.props.data.title}</h1>
                    <div className={cb('image')}>
                        <img src={this.props.data.imageUrl} alt={this.props.data.title} />
                        <p className={cb('overview')}>{this.props.data.overview}</p>
                    </div>
                    <p className={cb('content')}>{this.props.data.content}</p>
                </div>
                <div className={cb('action')}>
                    <button onClick={() => this.props.handleActiveModal(this.props.data)}>
                        <BiEditAlt />
                    </button>
                    <button onClick={() => this.props.handleActiveDialog(this.props.data)}>
                        <RiDeleteBin5Line />
                    </button>
                </div> */}
            </div>
        );
    }
}
export default Post;
