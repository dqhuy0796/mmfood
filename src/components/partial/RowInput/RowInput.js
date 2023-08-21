import classNames from 'classnames/bind';
import React from 'react';
import { RiEye2Line, RiEyeCloseLine } from 'react-icons/ri';
import styles from './RowInput.module.scss';
import _ from 'lodash';

const scss = classNames.bind(styles);

class RowInput extends React.Component {
    state = {
        option: {},
    };

    componentDidMount() {
        this.handleFormat(this.props.option.type);
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

    handleFormat = (type) => {
        switch (type) {
            case 'tel':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: 'Số điện thoại phải theo định dạng Việt Nam 0xxx xxx xxx (ví dụ: 0912 345 678).',
                        pattern: '0+[0-9]{9}',
                    },
                }));
                break;
            case 'email':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: 'Email phải theo đúng định dạng (ví dụ: example@email.com)',
                    },
                }));
                break;
            case 'password':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: 'Mật khẩu phải dài hơn 8 ký tự, bao gồm chữ thường, chữ hoa và chữ số.',
                    },
                }));
                break;
            case 'date':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: 'Chọn ngày tháng năm theo định dạng.',
                    },
                }));
                break;
            default:
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: `Nhập vào định dạng ${this.props.option.label}`,
                    },
                }));
                break;
        }
    };

    handleOnChange = (key, e) => {
        this.props.onChange(key, e.target.value);
    };

    render() {
        const { option } = this.state;
        const { value } = this.props;
        return (
            <div className={scss('row')}>
                <div className={scss('input')}>
                    <input {...option} value={value || ''} onChange={(e) => this.handleOnChange(option.key, e)} />
                    <p className={scss('label', !_.isEmpty(value) || option.type === 'date' ? 'minimize' : null)}>
                        <span>{option.label}</span>
                        {option.required && <span className={scss('required')}>*</span>}
                    </p>
                    {this.props.option.type === 'password' && (
                        <div className={scss('btn')} onClick={this.handleShowPassword}>
                            {option.type === 'password' ? <RiEyeCloseLine /> : <RiEye2Line />}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default RowInput;

// === 'password'
