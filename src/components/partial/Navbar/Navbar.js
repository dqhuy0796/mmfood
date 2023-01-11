import React from 'react';
import { FiSearch } from 'react-icons/fi';
import config from '~/config';
import { withRouter } from '~/hoc/withRouter';
import NavbarItem from './NavbarItem';
// redux and actions
import { connect } from 'react-redux';
import { fetchSearchProducts } from '~/redux/actions/apiActions';
//styles
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
const scss = classNames.bind(styles);

const menu = [
    { title: 'đồ ăn', path: config.routes.food },
    { title: 'đồ uống', path: config.routes.drink },
    { title: 'lẩu', path: config.routes.hotpot },
    { title: 'topping', path: config.routes.topping },
    { title: 'khuyến mãi', path: config.routes.promotion },
    { title: 'về chúng tôi', path: config.routes.about },
];

class Navbar extends React.Component {
    state = {};
    render() {
        return (
            <div className={scss('navbar', this.props.isCollapsed && 'collapse')}>
                <NavbarSearchItem
                    navigate={this.props.navigate}
                    location={this.props.location}
                    searchProducts={this.props.searchProducts}
                    searchResult={this.props.searchResult}
                />
                <ul>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <NavbarItem path={item.path} title={item.title} />
                        </li>
                    ))}
                </ul>
            </div>
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
        if (this.props.location.pathname !== config.routes.search) {
            this.props.navigate(config.routes.search);
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
});

const mapActionsToProps = (dispatch) => ({
    searchProducts: (text) => dispatch(fetchSearchProducts(text)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Navbar));
