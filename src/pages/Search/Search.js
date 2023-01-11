import React from 'react';
import CategoryLayout from '~/layouts/CategoryLayout';
// redux and actions
import { connect } from 'react-redux';
import { fetchSearchProducts } from '~/redux/actions/apiActions';

class Search extends React.Component {
    render() {
        return <CategoryLayout data={this.props.searchResult.products} />;
    }
}

const mapStateToProps = (state) => ({
    searchResult: state.api.search,
});

const mapActionsToProps = (dispatch) => ({
    searchProducts: (text) => dispatch(fetchSearchProducts(text)),
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
