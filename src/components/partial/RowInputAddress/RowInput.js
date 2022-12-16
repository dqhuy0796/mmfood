import classNames from 'classnames/bind';
import React from 'react';
import { RiEye2Line, RiEyeCloseLine } from 'react-icons/ri';
import styles from './RowInput.module.scss';

const cb = classNames.bind(styles);

class RowInput extends React.Component {
    state = {
        option: {},
    };

    componentDidMount() {
        this.handleFormatRowInput(this.props.data.type);
    }

    handleShowPassword = () => {
        this.setState((prevState) => ({
            ...prevState,
            option: {
                ...prevState.option,
                type: prevState.option.type !== 'password' ? 'password' : 'text',
            },
        }));
    };

    handleFormatRowInput = (type) => {
        switch (type) {
            case 'tel':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: 'Số điện thoại phải theo định dạng Việt Nam 0xxx xxx xxx (ví dụ: 0912 345 678).',
                        placeholder: '09xx xxx xxx',
                        pattern: '0+[0-9]{9}',
                    },
                }));
                break;
            case 'email':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: 'Email phải theo đúng định dạng (ví dụ: example@email.com)',
                    },
                }));
                break;
            case 'password':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: 'Mật khẩu phải dài hơn 8 ký tự, bao gồm chữ thường, chữ hoa và chữ số.',
                        pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                    },
                }));
                break;
            case 'address':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: 'Nhập địa chỉ phù hợp với đơn vị hành chính.',
                    },
                }));
                break;
            case 'image':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        type: 'file',
                        accept: `${this.props.data.type}/*`,
                        title: `Nhập đúng định dạng ${this.props.data.type}.`,
                    },
                }));
                break;
            case 'date':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: 'Chọn định dạng ngày tháng năm.',
                    },
                }));
                break;
            default:
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.data,
                        title: `Nhập vào định dạng ${this.props.data.label}`,
                    },
                }));
                break;
        }
    };

    render() {
        return (
            <>
                {this.props.data.type === 'address' ? (
                    <div className={cb('address')}>
                        {['Xã/Phường', 'Huyện/Quận', 'Tỉnh/Thành phố'].map((item, index) => (
                            <div key={index} className={cb('row')}>
                                <p className={cb('label')}>
                                    <span>{item}</span>
                                    {this.state.option.required && <span className={cb('required')}>*</span>}
                                </p>
                                <div className={cb('input')}>
                                    <input {...this.state.option} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cb('row')}>
                        <p className={cb('label')}>
                            {this.state.option.label}
                            {this.state.option.required && <span className={cb('required')}>*</span>}
                        </p>
                        <div className={cb('input')}>
                            <input {...this.state.option} onChange={this.props.onChange} />
                            {this.props.data.type === 'password' && (
                                <span className={cb('eye-btn')} onClick={this.handleShowPassword}>
                                    {this.state.option.type === 'password' ? <RiEyeCloseLine /> : <RiEye2Line />}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default RowInput;
