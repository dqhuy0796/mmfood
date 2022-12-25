import classNames from 'classnames/bind';
import React from 'react';
import { RiEye2Line, RiEyeCloseLine, RiUploadCloud2Line } from 'react-icons/ri';
import styles from './RowInput.module.scss';

const cb = classNames.bind(styles);

class RowInput extends React.Component {
    constructor(props) {
        super(props);
        this.imageUrlRef = React.createRef();
    }

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
            case 'address':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        title: 'Nhập địa chỉ phù hợp với đơn vị hành chính.',
                    },
                }));
                break;
            case 'image':
                this.setState((prevState) => ({
                    ...prevState,
                    option: {
                        ...this.props.option,
                        type: 'text',
                        title: 'Dán vào url của ảnh.',
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

    handlePreviewImage = () => {
        if (this.props.option.type === 'image') {
            this.setState((prevState) => ({
                ...prevState,
                value: this.imageUrlRef.value,
            }));
        }
    };

    render() {
        return (
            <div className={cb('row')}>
                <p className={cb('label')}>
                    {this.state.option.label}
                    {this.state.option.required && <span className={cb('required')}>*</span>}
                </p>
                <div className={cb('input')}>
                    {this.props.option.type === 'image' ? (
                        <div className={cb('image-upload')}>
                            <div className={cb('image')}>
                                {this.props.value ? (
                                    <img src={this.props.value} alt={this.state.option.label} />
                                ) : (
                                    <RiUploadCloud2Line className={cb('icon')} />
                                )}
                            </div>
                            <div className={cb('upload')}>
                                <textarea
                                    {...this.state.option}
                                    ref={this.imageUrlRef}
                                    value={this.props.value}
                                    placeholder={'Dán URL hình ảnh...'}
                                    onChange={this.props.onChange}
                                    onFocus={this.props.onChange}
                                    onBlur={this.props.onChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <input
                            {...this.state.option}
                            value={this.props.value || ''}
                            onChange={this.props.onChange}
                            onFocus={this.props.onChange}
                            onBlur={this.props.onChange}
                        />
                    )}
                    {this.props.option.type === 'password' && (
                        <span className={cb('eye-btn')} onClick={this.handleShowPassword}>
                            {this.state.option.type === 'password' ? <RiEyeCloseLine /> : <RiEye2Line />}
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default RowInput;
