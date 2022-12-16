import classNames from 'classnames/bind';
import React from 'react';
import Button from '~/components/shared/buttons/Button';
import RowInput from '~/components/partial/RowInput';
import BaseCenterModal from '~/components/modals/BaseCenterModal';
import styles from './UserModal.module.scss';
import _ from 'lodash';
const cb = classNames.bind(styles);

class UserModal extends React.Component {
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
        if (_.isEmpty(this.props.data)) {
            this.setState((prevState) => ({
                ...prevState,
                content: [
                    {
                        name: 'phone',
                        label: 'Số điện thoại',
                        placeholder: '09xx xxx xxx',
                        required: true,
                        type: 'tel',
                    },
                    {
                        name: 'email',
                        label: 'Email',
                        placeholder: 'example@email.com',
                        required: true,
                        type: 'email',
                    },
                    {
                        name: 'password',
                        label: 'Mật khẩu',
                        required: true,
                        type: 'password',
                    },
                    {
                        name: 'name',
                        label: 'Họ và tên',
                        placeholder: 'Nguyễn Văn A',
                        required: true,
                    },
                    {
                        name: 'avatarUrl',
                        label: 'Avatar',
                        type: 'image',
                    },
                    {
                        name: 'birth',
                        label: 'Ngày sinh',
                        type: 'date',
                    },
                    {
                        name: 'address',
                        label: 'Địa chỉ',
                        required: true,
                        type: 'address',
                    },
                    {
                        name: 'role',
                        label: 'Loại tài khoản',
                        required: false,
                    },
                ],
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                content: [
                    {
                        name: 'phone',
                        label: 'Số điện thoại',
                        placeholder: '09xx xxx xxx',
                        required: true,
                        type: 'tel',
                    },
                    {
                        name: 'email',
                        label: 'Email',
                        placeholder: 'example@email.com',
                        required: true,
                        type: 'email',
                    },
                    {
                        name: 'name',
                        label: 'Họ và tên',
                        placeholder: 'Nguyễn Văn A',
                        required: true,
                    },
                    {
                        name: 'avatarUrl',
                        label: 'Avatar',
                        type: 'image',
                    },
                    {
                        name: 'birth',
                        label: 'Ngày sinh',
                        type: 'date',
                    },
                    {
                        name: 'address',
                        label: 'Địa chỉ',
                        required: true,
                        type: 'address',
                    },
                    {
                        name: 'role',
                        label: 'Loại tài khoản',
                        required: false,
                    },
                ],
            }));
        }
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
            this.props.handleCreateUser(this.state.data);
        } else {
            console.log('On Update User:', this.state.data);
            this.props.handleUpdateUser(this.state.data);
        }
    };
    handleValidate = () => {
        let arrRequiredField = ['phone', 'email', 'name', 'address'];
        for (let i = 0; i < arrRequiredField.length; i++) {
            if (!this.state.data[arrRequiredField[i]]) {
                this.setState((prevState) => ({
                    ...prevState,
                    message: `Bạn quên chưa tạo ${arrRequiredField[i]}`,
                }));
                return false;
            }
        }
        return true;
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
                                {_.isEmpty(this.props.data) ? 'Tạo tài khoản' : 'Xác nhận sửa'}
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

export default UserModal;
