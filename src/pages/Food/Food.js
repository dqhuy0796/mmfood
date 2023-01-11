import React from 'react';
import CategoryLayout from '~/layouts/CategoryLayout';
// redux and actions
import { connect } from 'react-redux';
import { fetchProducts } from '~/redux/actions/apiActions';

class Food extends React.Component {
    state = {};
    componentDidMount() {
        this.props.fetchProducts(1);
    }
    render() {
        return <CategoryLayout data={this.props.products} />;
    }
}

const mapStateToProps = (state) => ({
    products: state.api.products,
});

const mapActionsToProps = (dispatch) => ({
    fetchProducts: (id) => dispatch(fetchProducts(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(Food);
