import _ from 'lodash';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Loading from '~/components/partial/Loading';
import routes from '~/config';
import { withRouter } from '~/hoc/withRouter';
import NavbarItem from './NavbarItem';
// redux and actions
import { connect } from 'react-redux';
import { logout } from '~/redux/actions/authActions';
import { fetchSearchProducts } from '~/redux/actions/preloadActions';
//styles
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
const scss = classNames.bind(styles);

const menu = [
    {
        title: 'sản phẩm',
        path: routes.product,
        menu: [
            {
                title: 'đồ ăn',
                path: routes.food,
            },
            {
                title: 'đồ uống',
                path: routes.drink,
            },
            {
                title: 'lẩu',
                path: routes.hotpot,
            },
            {
                title: 'khác',
                path: routes.others,
            },
        ],
    },
    {
        title: 'khuyến mãi',
        path: routes.promotion,
    },
    {
        title: 'về chúng tôi',
        path: routes.about,
    },
];

class Navbar extends React.Component {
    state = {
        isNowLoading: false,
    };

    handleLogOut = () => {
        this.setState({ isNowLoading: true });

        this.props.logout();

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);

        if (this.props.location.pathname !== routes.home) {
            this.props.navigate(routes.home);
        }
    };

    getLastName = (fullname) => {
        const nameArray = fullname.split(' ');
        return nameArray[nameArray.length - 1];
    };

    render() {
        const user = this.props.user;

        return (
            <>
                <div className={scss('navbar', this.props.isCollapsed && 'collapse')}>
                    <div className={scss('main')}>
                        <NavbarSearchItem
                            navigate={this.props.navigate}
                            location={this.props.location}
                            searchProducts={this.props.searchProducts}
                            searchResult={this.props.searchResult}
                        />
                        <ul className={scss('menu')}>
                            {menu.map((item, index) => (
                                <li key={index} className={scss('item')}>
                                    <NavbarItem data={item} />
                                </li>
                            ))}
                            <li className={scss('item')}>
                                {this.props.isLogged && !_.isEmpty(user) ? (
                                    <NavbarItem
                                        data={{
                                            title: user.name,
                                            path: routes.profile,
                                            menu: [
                                                {
                                                    title: 'tài khoản',
                                                    path: routes.profile,
                                                },
                                                {
                                                    title: 'sổ địa chỉ',
                                                    path: routes.addresses,
                                                },
                                                {
                                                    title: 'đơn hàng',
                                                    path: routes.orders,
                                                },
                                                {
                                                    title: 'đăng xuất',
                                                    onClick: this.handleLogOut,
                                                },
                                            ],
                                        }}
                                    />
                                ) : (
                                    <NavbarItem
                                        data={{
                                            title: 'đăng nhập',
                                            path: routes.login,
                                        }}
                                    />
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                {this.state.isNowLoading && <Loading />}
            </>
        );
    }
}

class NavbarSearchItem extends React.Component {
    state = {
        text: this.props.text,
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.text && this.state.text.trim().length > 0) {
            this.handleSearch(this.state.text);
        }
    };
    handleSearch = async (text) => {
        this.props.searchProducts(text);
        if (this.props.location.pathname !== routes.search) {
            this.props.navigate(routes.search);
        }
    };
    handleOnChange = (event) => {
        this.setState((prevState) => ({
            ...prevState,
            text: event.target.value,
        }));
    };
    render() {
        return (
            <form className={scss('nav-search-item')} onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className={scss('search-input')}
                    placeholder="Tìm kiếm..."
                    maxLength={40}
                    value={this.state.text || ''}
                    onChange={(e) => this.handleOnChange(e)}
                />
                <button className={scss('search-btn')} type={'submit'}>
                    <FiSearch className={scss('search-icon')} />
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.api.search,
    isLogged: state.auth.isLogged,
    user: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    searchProducts: (text) => dispatch(fetchSearchProducts(text)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Navbar));
