import classNames from 'classnames/bind';
import React from 'react';
import { BsFacebook, BsGoogle, BsInstagram, BsTwitter } from 'react-icons/bs';
import { RiEye2Line, RiEyeCloseLine } from 'react-icons/ri';
import Button from '~/components/shared/buttons/Button';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import * as service from '~/services';
import styles from './Login.module.scss';

const cb = classNames.bind(styles);

class Login extends React.Component {
    state = {
        isShowPassword: false,
        errorMessage: '',
        username: '',
        password: '',
    };

    handleShowPassword = () => {
        this.setState((prevState) => ({
            ...prevState,
            isShowPassword: !prevState.isShowPassword,
        }));
    };

    handleChangeUsername = (event) => {
        this.setState((prevState) => ({
            ...prevState,
            username: event.target.value,
        }));
    };

    handleChangePassword = (event) => {
        this.setState((prevState) => ({
            ...prevState,
            password: event.target.value,
        }));
    };

    handleLogin = async () => {
        let data = await service.UserService(this.state.username, this.state.password);
        // data has been gotten?
        console.log(data);
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
                return '';
        }
    };

    render() {
        return (
            <div className={cb('background')}>
                <div className={cb('wrapper')}>
                    <div className={cb('body')}>
                        <h2 className={cb('title')}>Đăng nhập</h2>

                        <div className={cb('message')}>
                            <p>{this.state.errorMessage}</p>
                        </div>

                        <div className={cb('row')}>
                            <p className={cb('label')}>Tên đăng nhập</p>
                            <div className={cb('input')}>
                                <input
                                    type="text"
                                    placeholder="Nhập Email hoặc SĐT..."
                                    required
                                    value={this.state.username}
                                    onChange={(event) => this.handleChangeUsername(event)}
                                />
                            </div>
                        </div>

                        <div className={cb('row')}>
                            <p className={cb('label')}>Mật khẩu</p>
                            <div className={cb('input')}>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu..."
                                    required
                                    value={this.state.password}
                                    onChange={(event) => this.handleChangePassword(event)}
                                />
                                <span className={cb('eye-btn')} onClick={this.handleShowPassword}>
                                    {this.state.isShowPassword ? <RiEye2Line /> : <RiEyeCloseLine />}
                                </span>
                            </div>
                        </div>

                        <div className={cb('forgot-password')}>
                            <TransparentButton>Quên mật khẩu?</TransparentButton>
                        </div>

                        <div className={cb('button')}>
                            <Button size={'large'} shape={'pill'} color={'primary'} onClick={this.handleLogin}>
                                <span>Đăng nhập</span>
                            </Button>
                        </div>

                        <div className={cb('other-method')}>
                            <p>
                                <span>Hoặc đăng nhập với:</span>
                            </p>
                            <div className={cb('group')}>
                                <BsFacebook className={cb('icon')} />
                                <BsGoogle className={cb('icon')} />
                                <BsTwitter className={cb('icon')} />
                                <BsInstagram className={cb('icon')} />
                            </div>
                        </div>

                        <div className={cb('register')}>
                            <p>
                                <span>Chưa có tài khoản?</span>
                                <TransparentButton>Đăng ký ngay</TransparentButton>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
