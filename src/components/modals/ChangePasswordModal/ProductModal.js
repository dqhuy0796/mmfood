import _ from 'lodash';
import React from 'react';
import BaseCenterModal from '~/components/modals/BaseCenterModal';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/buttons/Button';
//styles
import classNames from 'classnames/bind';
import styles from './ProductModal.module.scss';
const scss = classNames.bind(styles);

class ProductModal extends React.Component {
    state = {
        content: [],
        data: {},
        message: '',
    };

    componentDidMount() {
        this.handleInit();
        this.handleMapOrCreateInput();
    }
    componentWillUnmount() {}
    //process data
    handleInit = async () => {
        this.setState((prevState) => ({
            ...prevState,
            data: this.props.data,
        }));
    };
    handleMapOrCreateInput = () => {
        this.setState((prevState) => ({
            ...prevState,
            content: [
                {
                    name: 'name',
                    label: 'Tên sản phẩm',
                    required: true,
                },
                {
                    name: 'CategoryLayoutId',
                    label: 'Phân loại',
                    required: true,
                },
                {
                    name: 'unit',
                    label: 'Đơn vị tính',
                    required: true,
                },
                {
                    name: 'size',
                    label: 'Kích thước',
                    required: true,
                },
                {
                    name: 'imageUrl',
                    label: 'Ảnh sản phẩm',
                    type: 'image',
                },
                {
                    name: 'oldPrice',
                    label: 'Giá ban đầu',
                    type: 'number',
                },
                {
                    name: 'newPrice',
                    label: 'Giá niêm yết',
                    type: 'number',
                },
                {
                    name: 'description',
                    label: 'Mô tả',
                },
            ],
        }));
    };
    //handle event
    handleOnChangeInput = (event, id) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [id]: event.target.value,
            },
        }));
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (_.isEmpty(this.props.data)) {
            this.props.handleCreateProduct(this.state.data);
        } else {
            this.props.handleUpdateProduct(this.state.data);
        }
    };

    render() {
        return (
            <BaseCenterModal title={this.props.title} handleActiveModal={this.props.handleActiveModal}>
                <form className={scss('container')} onSubmit={this.handleSubmit}>
                    {this.state.message && <p className={scss('message')}>{this.state.message}</p>}
                    <ul className={scss('body')}>
                        {this.state.content.map((item, index) => (
                            <li key={index}>
                                <RowInput
                                    option={item}
                                    value={this.state.data[item.name]}
                                    onChange={(e) => this.handleOnChangeInput(e, item.name)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className={scss('footer')}>
                        <input id="submit-btn" type={'submit'} hidden />
                        <label htmlFor="submit-btn">
                            <Button size={'large'} color={'primary'}>
                                {_.isEmpty(this.props.data) ? 'Tạo tài khoản' : 'Xác nhận sửa'}
                            </Button>
                        </label>

                        <Button size={'large'} color={'white'} onClick={this.props.handleActiveModal}>
                            Hủy
                        </Button>
                    </div>
                </form>
            </BaseCenterModal>
        );
    }
}

export default ProductModal;
