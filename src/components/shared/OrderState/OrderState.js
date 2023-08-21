import classNames from 'classnames/bind';
import React from 'react';
import styles from './OrderState.module.scss';
const scss = classNames.bind(styles);

class OrderState extends React.Component {
    state = {
        color: '',
    };

    componentDidMount() {
        switch (this.props.data.stateCode) {
            case 1:
                this.setState({ color: 'shadow' });
                break;
            case 2:
                this.setState({ color: 'warning' });
                break;
            case 3:
                this.setState({ color: 'info' });
                break;
            case 4:
                this.setState({ color: 'success' });
                break;
            case 5:
                this.setState({ color: 'error' });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <p className={scss('wrapper')} style={{ backgroundColor: `var(--color-${this.state.color})` }}>
                {this.props.data.stateDesc}
            </p>
        );
    }
}
export default OrderState;
