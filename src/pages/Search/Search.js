import React from 'react';
import Category from '~/layouts/Category';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
// redux and actions
import { connect } from 'react-redux';
import { fetchSearchProducts } from '~/redux/actions/apiActions';

class Search extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Category data={this.props.searchResult.products} />
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.api.search,
});

const mapActionsToProps = (dispatch) => ({
    searchProducts: (text) => dispatch(fetchSearchProducts(text)),
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
