import classNames from 'classnames/bind';
import _ from 'lodash';
import React from 'react';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/Button';
import Loading from '~/components/partial/Loading';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import { userService } from '~/services';
// redux and actions
import { connect } from 'react-redux';
import { login } from '~/redux/actions/authActions';
// styles
import styles from './Login.module.scss';

const scss = classNames.bind(styles);
class Login extends React.Component {
    state = {
        data: {},
        message: '',
        isNowLoading: false,
        content: [
            {
                key: 'phone',
                label: 'Số điện thoại',
                required: true,
                type: 'tel',
            },
            {
                key: 'password',
                label: 'Mật khẩu',
                required: true,
                type: 'password',
            },
        ],
    };

    handleOnChangeInput = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [key]: value,
            },
        }));
    };

    handleLogin = async (data) => {
        try {
            this.setState({ isNowLoading: true });
            const response = await userService.loginService(data);
            if (response) {
                this.setState((prevState) => ({
                    ...prevState,
                    isNowLoading: false,
                    message: response.message,
                }));

                if (!_.isEmpty(response.result)) {
                    this.props.login({
                        user: response.result,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                    });

                    this.props.navigate(routes.home);
                }
            }
        } catch (error) {
            this.setState((prevState) => ({
                ...prevState,
                isNowLoading: false,
                message: 'Oops... Có lỗi xảy ra!',
            }));
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.data.phone && this.state.data.password) {
            this.handleLogin(this.state.data);
        }
    };

    render() {
        const { content, data, message } = this.state;
        return (
            <div className={scss('background')}>
                <form className={scss('wrapper')} onSubmit={this.handleSubmit}>
                    <ul className={scss('header')}>
                        <li>
                            <h2>Đăng nhập</h2>
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

                        <li>
                            <TransparentButton>Quên mật khẩu?</TransparentButton>
                        </li>
                    </ul>
                    <ul className={scss('footer')}>
                        <li>
                            <label>
                                <input type={'submit'} hidden />
                                <Button size={'full'} shape={'pill'} color={'primary'}>
                                    <span>Đăng nhập</span>
                                </Button>
                            </label>
                        </li>
                        <li>
                            <p>
                                <span>Chưa có tài khoản?</span>
                                <TransparentButton to={routes.register}>Đăng ký ngay</TransparentButton>
                            </p>
                        </li>
                    </ul>
                </form>

                {this.state.isNowLoading && <Loading />}
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

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Login));
