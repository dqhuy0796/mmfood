import classNames from 'classnames/bind';
import React from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import Button from '~/components/shared/buttons/Button';
import RowInput from '~/components/partial/RowInput';
import styles from './AddressDetail.module.scss';
const cb = classNames.bind(styles);

class AddressDetail extends React.Component {
    state = {};
    render() {
        return (
            <div className={cb('wrapper', this.props.data.selected && 'selected')} onClick={this.props.data.onClick}>
                <div className={cb('check')}>
                    {this.props.data.selected ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
                </div>
                <div className={cb('detail')}>
                    <ul>
                        <li>
                            <p>{this.props.data.name}</p>
                        </li>
                        <li>
                            <p>{this.props.data.phone}</p>
                        </li>
                        <li>
                            <p>{this.props.data.address}</p>
                        </li>
                        {this.props.data.default && (
                            <li>
                                <span className={cb('default-address')}>Địa chỉ nhận hàng mặc định</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default AddressDetail;

export class NewAddressDetail extends React.Component {
    state = {
        content: [
            {
                name: 'name',
                label: 'Người nhận',
                required: true,
                type: 'text',
            },
            {
                name: 'phone',
                label: 'SĐT người nhận',
                required: true,
                type: 'tel',
            },
            {
                name: 'address',
                label: 'Địa chỉ người nhận',
                required: true,
                type: 'text',
            },
        ],
        data: {},
    };
    handleOnChangeInput = (event, id) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [id]: event.target.value,
            },
        }));
    };

    render() {
        return (
            <div className={cb('wrapper')}>
                <div className={cb('detail')}>
                    <ul>
                        {this.state.content.map((item, index) => (
                            <li key={index}>
                                <RowInput
                                    option={item}
                                    value={this.state.data[item.name] || ''}
                                    onChange={(e) => this.handleOnChangeInput(e, item.name)}
                                />
                            </li>
                        ))}
                        <li>
                            <Button
                                size={'medium'}
                                shape={'rounded'}
                                color={'info'}
                                onClick={() => this.props.handleOnClickCreateAddress(this.state.data)}
                            >
                                <span>Thêm</span>
                            </Button>
                            <Button
                                size={'medium'}
                                shape={'rounded'}
                                onClick={() => this.props.handleOnClickCreateAddress()}
                            >
                                <span>Hủy</span>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
