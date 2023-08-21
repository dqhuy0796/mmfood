import React from 'react';
import GridProductsLayout from '~/layouts/GridProductsLayout';
// redux and actions
import { connect } from 'react-redux';
import { fetchSearchProducts } from '~/redux/actions/preloadActions';

class Search extends React.Component {
    render() {
        return <GridProductsLayout data={this.props.searchResult.products} />;
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.api.search,
});

const mapActionsToProps = (dispatch) => ({
    searchProducts: (text) => dispatch(fetchSearchProducts(text)),
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
