import classNames from 'classnames/bind';
import React from 'react';
import { RiEye2Line, RiEyeCloseLine, RiUploadCloud2Line } from 'react-icons/ri';
import styles from './RowInputImage.module.scss';
import Button from '~/components/shared/buttons/Button';
import TransparentButton from '~/components/shared/buttons/TransparentButton';

const cb = classNames.bind(styles);

class RowInputImage extends React.Component {
    state = {
        option: { value: '' },
    };

    componentDidMount() {
        this.handleFormatRowInput(this.props.data.type);
    }

    handleFormatRowInput = (type) => {
        this.setState((prevState) => ({
            ...prevState,
            option: {
                ...this.props.data,
                type: 'file',
                accept: 'image/jpeg, image/png',
                title: 'Hỗ trợ định dạng .JPG và .PNG',
            },
        }));
    };

    handlePreviewImage = () => {};

    render() {
        return (
            <div className={cb('row')}>
                <p className={cb('label')}>
                    {this.state.option.label}
                    {this.state.option.required && <span className={cb('required')}>*</span>}
                </p>
                <div className={cb('input')}>
                    <div className={cb('image-upload')}>
                        <div className={cb('image')}>
                            {this.state.option.src ? (
                                <img src={this.state.option.src} alt={this.state.option.label} />
                            ) : (
                                <RiUploadCloud2Line className={cb('icon')} />
                            )}
                        </div>
                        <div className={cb('upload')}>
                            <div className={cb('file')}>
                                <label>
                                    <TransparentButton>{'Tải ảnh lên (.JPG .PNG)'}</TransparentButton>
                                    <input
                                        hidden
                                        {...this.state.option}
                                        onChange={this.props.onChange}
                                        onFocus={this.props.onChange}
                                        onBlur={this.props.onChange}
                                    />
                                </label>
                            </div>
                            <div className={cb('space')}>
                                <p>Hoặc</p>
                            </div>
                            <div className={cb('url')}>
                                <input
                                    type={'url'}
                                    placeholder={'Dán URL hình ảnh...'}
                                    onChange={this.props.onChange}
                                    onFocus={this.props.onChange}
                                    onBlur={this.props.onChange}
                                />
                                <Button size={'tiny'} color={'primary'}>
                                    Load
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RowInputImage;
