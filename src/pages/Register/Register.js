import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/Button';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { userService } from '~/services';
// redux and actions
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
//styles
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import _ from 'lodash';

const scss = classNames.bind(styles);

class Register extends React.Component {
    state = {
        content: [
            {
                key: 'phoneNumber',
                label: 'Số điện thoại',
                required: true,
                type: 'tel',
            },
            {
                key: 'email',
                label: 'Email',
                required: true,
                type: 'email',
            },
            {
                key: 'password',
                label: 'Mật khẩu',
                required: true,
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                type: 'password',
            },
            {
                key: 'confirmPassword',
                label: 'Xác nhận mật khẩu',
                required: true,
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                type: 'password',
            },
            {
                key: 'name',
                label: 'Họ và tên',
                required: true,
                type: 'text',
            },
        ],
        data: {},
        message: '',
        agree: false,
    };

    // event handler
    handleOnChangeInput = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [key]: value,
            },
        }));
    };

    handleOnChangeConditionState = () => {
        this.setState((prevState) => ({
            ...prevState,
            agree: !prevState.agree,
        }));
    };

    //process api
    handleRegister = async (data) => {
        let response = await userService.registerService(data);
        if (response) {
            this.setState((prevState) => ({
                ...prevState,
                message: response.message,
            }));
        }
        if (response.code === 0) {
            this.props.login(data);
            this.props.navigate(routes.home);
        }
    };

    handleShowErrorMessage = (code) => {
        switch (code) {
            case 5:
                return 'Tài khoản hoặc mật khẩu không đúng';
            case 6:
                return 'Không để trống tài khoản và mật khẩu';
            default:
                return;
        }
    };

    handleValidate = () => {
        const { password, confirmPassword } = this.state.data;
        if (!this.state.agree) {
            this.setState((prevState) => ({
                ...prevState,
                message: 'Đồng ý với điều khoản và điều kiện',
            }));
            return false;
        }
        if (!_.isEmpty(password) && !_.isEmpty(confirmPassword)) {
            if (password === confirmPassword) {
                return true;
            } else {
                this.setState((prevState) => ({
                    ...prevState,
                    message: 'Nhập lại mật khẩu không khớp',
                }));
                return false;
            }
        }
        return false;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidate()) {
            this.handleRegister(this.state.data);
        }
    };

    render() {
        const { data, content, message } = this.state;
        return (
            <div className={scss('background')}>
                <form className={scss('wrapper')} onSubmit={this.handleSubmit}>
                    <ul className={scss('header')}>
                        <li>
                            <h2>Đăng ký</h2>
                        </li>
                        <li className={scss('message')}>
                            <p>{message}</p>
                        </li>
                    </ul>
                    <ul className={scss('body')}>
                        {content.map((item, index) => (
                            <li key={index}>
                                <RowInput option={item} value={data[item.key]} onChange={this.handleOnChangeInput} />
                            </li>
                        ))}

                        <li className={scss('condition')}>
                            <label>
                                <div className={scss('check')}>
                                    {this.state.agree && (
                                        <span>
                                            <GiCheckMark />
                                        </span>
                                    )}
                                </div>
                                <input
                                    hidden
                                    type={'checkbox'}
                                    value={this.state.agree}
                                    onChange={this.handleOnChangeConditionState}
                                />
                            </label>
                            <p>Đồng ý với điều khoản và điều kiện sử dụng của MMFood</p>
                        </li>
                    </ul>
                    <ul className={scss('footer')}>
                        <li>
                            <label>
                                <input type={'submit'} hidden />
                                <Button size={'full'} shape={'pill'} color={'primary'}>
                                    <span>Đăng ký</span>
                                </Button>
                            </label>
                        </li>

                        <li>
                            <p>
                                <span>Đã có tài khoản?</span>
                                <TransparentButton to={routes.login}>Đăng nhập</TransparentButton>
                            </p>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogged: state.auth.isLogged,
    user: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Register));
