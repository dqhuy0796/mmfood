import classNames from 'classnames/bind';
import React from 'react';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/buttons/Button';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import { userService } from '~/services';
import _ from 'lodash';
import config from '~/config';
// redux and actions
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
// styles
import styles from './Login.module.scss';
import { withRouter } from './withRouter';

const cb = classNames.bind(styles);
class Login extends React.Component {
    state = {
        content: [
            {
                name: 'phone',
                label: 'Số điện thoại',
                required: true,
                type: 'tel',
            },
            {
                name: 'password',
                label: 'Mật khẩu',
                required: true,
                type: 'password',
            },
        ],
        data: {},
        message: '',
    };

    handleOnChangeInput = (event, id) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [id]: event.target.value,
            },
        }));
    };

    handleLogin = async (data) => {
        let response = await userService.loginService(data);
        if (response) {
            this.setState((prevState) => ({
                ...prevState,
                message: response.message,
            }));
            if (!_.isEmpty(response.result)) {
                this.props.login(response.result);
                this.props.navigate(config.routes.home);
            }
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.data.phone && this.state.data.password) {
            this.handleLogin(this.state.data);
        }
    };

    render() {
        return (
            <div className={cb('background')}>
                <form className={cb('wrapper')} onSubmit={this.handleSubmit}>
                    <ul className={cb('header')}>
                        <li>
                            <h2>Đăng nhập</h2>
                        </li>
                        <li className={cb('message')}>
                            <p>{this.state.message}</p>
                        </li>
                    </ul>
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
                        <li>
                            <TransparentButton>Quên mật khẩu?</TransparentButton>
                        </li>
                    </ul>
                    <ul className={cb('footer')}>
                        <li>
                            <label>
                                <input type={'submit'} hidden />
                                <Button size={'large'} shape={'pill'} color={'primary'}>
                                    <span>Đăng nhập</span>
                                </Button>
                            </label>
                        </li>
                        <li>
                            <p>
                                <span>Chưa có tài khoản?</span>
                                <TransparentButton to={config.routes.register}>Đăng ký ngay</TransparentButton>
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

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Login));
