import React from 'react';
import defaultAvatar from '~/assets/images/default-avatar.jpg';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import config from '~/config';
import { withRouter } from '~/hoc/withRouter';
//redux
import { logout } from '~/redux/actions/authActions';
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
import styles from './AccountDropdown.module.scss';

const css = classNames.bind(styles);

class AccountDropdown extends React.Component {
    state = {};

    handleLogOut = () => {
        this.props.logout();
        if (
            this.props.location.pathname === config.routes.checkout ||
            this.props.location.pathname === config.routes.account
        ) {
            this.props.navigate(config.routes.home);
        }
    };

    render() {
        const currentUser = this.props.currentUser;
        return (
            <div className={css('wrapper')}>
                {this.props.isLoggedIn ? (
                    <Link className={css('avatar')} to={config.routes.account}>
                        <img src={currentUser.avatarUrl || defaultAvatar} alt={currentUser.name || currentUser.phone} />
                    </Link>
                ) : (
                    <div className={css('icon')}>
                        <BiUser />
                    </div>
                )}

                <div className={css('dropdown')}>
                    <ul>
                        {this.props.isLoggedIn ? (
                            <>
                                <li>
                                    <Link className={css('dropdown-link')} to={config.routes.account}>
                                        Tài khoản
                                    </Link>
                                </li>
                                <li>
                                    <Link className={css('dropdown-link')} to={config.routes.account}>
                                        Đơn hàng
                                    </Link>
                                </li>
                                <li>
                                    <div className={css('dropdown-link')} onClick={this.handleLogOut}>
                                        Đăng xuất
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className={css('dropdown-link')} to={config.routes.login}>
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link className={css('dropdown-link')} to={config.routes.register}>
                                        Đăng ký
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(AccountDropdown));
