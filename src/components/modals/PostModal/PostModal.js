import classNames from 'classnames/bind';
import React from 'react';
import Button from '~/components/shared/buttons/Button';
import RowInput from '~/components/partial/RowInput';
import BaseCenterModal from '~/components/modals/BaseCenterModal';
import styles from './PostModal.module.scss';
import _ from 'lodash';
const cb = classNames.bind(styles);

class PostModal extends React.Component {
    state = {
        content: [],
        data: {},
        message: '',
    };

    componentDidMount() {
        this.handleInit();
        this.handleMapOrCreateInput();
    }
    componentWillUnmount() {}
    //process data
    handleInit = async () => {
        this.setState((prevState) => ({
            ...prevState,
            data: this.props.data,
        }));
    };
    handleMapOrCreateInput = () => {
        this.setState((prevState) => ({
            ...prevState,
            content: [
                {
                    name: 'title',
                    label: 'Tiêu đề',
                    required: true,
                    type: 'text',
                },
                {
                    name: 'imageUrl',
                    label: 'imageUrl',
                    type: 'image',
                },
                {
                    name: 'overview',
                    label: 'Tổng quan',
                    required: true,
                    type: 'text',
                },
                {
                    name: 'content',
                    label: 'Nội dung',
                    required: true,
                    type: 'text',
                },
                {
                    name: 'author',
                    label: 'Tác giả',
                    required: true,
                    type: 'text',
                },
            ],
        }));
    };
    //handle event
    handleOnChangeInput = (event, id) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [id]: event.target.value,
            },
        }));
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (_.isEmpty(this.props.data)) {
            console.log('On Create User:', this.state.data);
            this.props.handleCreatePost(this.state.data);
        } else {
            console.log('On Update User:', this.state.data);
            this.props.handleUpdatePost(this.state.data);
        }
    };

    render() {
        return (
            <BaseCenterModal title={this.props.title} handleActiveModal={this.props.handleActiveModal}>
                <form className={cb('container')} onSubmit={this.handleSubmit}>
                    {this.state.message && <p className={cb('message')}>{this.state.message}</p>}
                    <ul className={cb('body')}>
                        {this.state.content.map((item, index) => (
                            <li key={index}>
                                <RowInput
                                    option={item}
                                    value={this.state.data[item.name]}
                                    onChange={(e) => this.handleOnChangeInput(e, item.name)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className={cb('footer')}>
                        <input id="submit-btn" type={'submit'} hidden />
                        <label htmlFor="submit-btn">
                            <Button size={'large'} color={'primary'}>
                                {_.isEmpty(this.props.data) ? 'Thêm mới' : 'Xác nhận sửa'}
                            </Button>
                        </label>

                        <Button size={'large'} color={'white'} onClick={this.props.handleActiveModal}>
                            Hủy
                        </Button>
                    </div>
                </form>
            </BaseCenterModal>
        );
    }
}

export default PostModal;
