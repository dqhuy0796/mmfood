import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '~/components/partial/Loading';
import { withRouter } from '~/hoc/withRouter';
import { userService } from '~/services';
// style
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';

const scss = classNames.bind(styles);
class ProductDetails extends React.Component {
    state = {
        isNowLoading: false,
        order: {},
    };

    componentDidMount() {
        this.handleFetchProductDetails();
    }

    handleFetchProductDetails = async () => {
        this.setState({ isNowLoading: true });

        const pathnameArray = this.props.location.pathname.split('/');
        const pathnameUuid = pathnameArray[pathnameArray.length - 1];
        console.log(pathnameUuid);

        // const response = await userService.fetchOrderByIdService(pathnameUuid);

        // if (response && response.code === 0) {
        //     this.setState((prevState) => ({
        //         ...prevState,
        //         order: response.result,
        //     }));
        // }

        setTimeout(() => {
            this.setState({ isNowLoading: false });
        }, 1000);
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const { order } = this.state;
        const { items, states, deliveryAddress } = order;
        console.log(items, states, deliveryAddress);
        return (
            <>
                <div className={scss('wrapper')}>
                    <div className={scss('title')}>
                        <p>{`Tên sản phẩm`}</p>
                    </div>

                    <div className={scss('container')}></div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {this.state.isNowLoading && <Loading />}
            </>
        );
    }
}

const ItemPrice = (props) => <span>{props.value.toLocaleString('vn-VI', { style: 'currency', currency: 'VND' })}</span>;

const mapStateToProps = (state) => ({
    // get redux state and return here
});

const mapActionsToProps = (dispatch) => ({
    // get redux action and dispatch here
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(ProductDetails));
