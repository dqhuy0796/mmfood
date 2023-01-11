import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/buttons/Button';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import config from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { userService } from '~/services';
// redux and actions
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
//styles
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const scss = classNames.bind(styles);

class Register extends React.Component {
    state = {
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
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                type: 'password',
            },
            {
                name: 'confirmPassword',
                label: 'Xác nhận mật khẩu',
                required: true,
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                type: 'password',
            },
            {
                name: 'name',
                label: 'Họ và tên',
                placeholder: 'Nguyễn Văn A',
                required: true,
            },
            {
                name: 'address',
                label: 'Địa chỉ',
                required: true,
                type: 'address',
            },
        ],
        data: {},
        message: '',
        agree: false,
    };

    // event handler
    handleOnChangeInput = (event, id) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [id]: event.target.value,
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
            this.props.navigate(config.routes.home);
        }
    };
    handleShowErrorMessage = (code) => {
        switch (code) {
            case 1:
                return 'Tài khoản hoặc mật khẩu không đúng';
            case 2:
                return 'Tài khoản không hợp lệ';
            case 3:
                return 'Không để trống tài khoản và mật khẩu';
            default:
                return;
        }
    };
    handleValidate = () => {
        if (!this.state.agree) {
            this.setState((prevState) => ({
                ...prevState,
                message: 'Đồng ý với điều khoản và điều kiện',
            }));
            return false;
        }
        if (this.state.data.password && this.state.data.confirmPassword) {
            if (this.state.data.password === this.state.data.confirmPassword) {
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
        return (
            <div className={scss('background')}>
                <form className={scss('wrapper')} onSubmit={this.handleSubmit}>
                    <ul className={scss('header')}>
                        <li>
                            <h2>Đăng ký</h2>
                        </li>
                        <li className={scss('message')}>
                            <p>{this.state.message}</p>
                        </li>
                    </ul>
                    <ul className={scss('body')}>
                        {this.state.content.map((item, index) => (
                            <li key={index}>
                                <RowInput
                                    option={item}
                                    value={this.state.data[item.name]}
                                    onChange={(e) => this.handleOnChangeInput(e, item.name)}
                                />
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
                                <Button widthfull size={'large'} shape={'pill'} color={'primary'}>
                                    <span>Đăng ký</span>
                                </Button>
                            </label>
                        </li>

                        <li>
                            <p>
                                <span>Đã có tài khoản?</span>
                                <TransparentButton to={config.routes.login}>Đăng nhập</TransparentButton>
                            </p>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Register));
