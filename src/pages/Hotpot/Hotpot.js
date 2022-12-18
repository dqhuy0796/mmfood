import React from 'react';
import Category from '~/layouts/Category';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
// redux and actions
import { connect } from 'react-redux';
import { fetchProducts } from '~/redux/actions/apiActions';

class Hotpot extends React.Component {
    state = {};
    componentDidMount() {
        this.props.fetchProducts(3);
    }
    render() {
        return (
            <>
                <Header />
                <Category data={this.props.products} />
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.api.products,
});

const mapActionsToProps = (dispatch) => ({
    fetchProducts: (id) => dispatch(fetchProducts(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(Hotpot);
