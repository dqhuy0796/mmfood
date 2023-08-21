import React from 'react';
import GridProductsLayout from '~/layouts/GridProductsLayout';
// redux and actions
import { connect } from 'react-redux';
import { fetchProducts } from '~/redux/actions/preloadActions';
import { withRouter } from '../../hoc/withRouter';

class Others extends React.Component {
    state = {};
    componentDidMount() {
        this.props.fetchProducts(4);
    }

    render() {
        return <GridProductsLayout data={this.props.products} />;
    }
}

const mapStateToProps = (state) => ({
    products: state.api.products,
});

const mapActionsToProps = (dispatch) => ({
    fetchProducts: (id) => dispatch(fetchProducts(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Others));
