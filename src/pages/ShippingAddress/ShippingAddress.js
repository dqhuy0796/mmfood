import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Checkbox from '~/components/partial/Checkbox';
import Loading from '~/components/partial/Loading';
import TransparentButton from '~/components/shared/TransparentButton';
import RowInput from '~/components/partial/RowInput';
import RowSelection from '~/components/partial/RowSelection';
import Button from '~/components/shared/Button';
import { withRouter } from '~/hoc/withRouter';
import { setSelectedAddress } from '~/redux/actions/authActions';
import { userService } from '~/services';
//redux
//styles
import classNames from 'classnames/bind';
import styles from './ShippingAddress.module.scss';
import DialogMessage from '../../components/partial/DialogMessage/DialogMessage';
const scss = classNames.bind(styles);

class ShippingAddress extends React.Component {
    state = {
        isNowLoading: false,
        isShowDialog: false,
        data: {
            receiverName: '',
            receiverPhoneNumber: '',
            details: '',
            ward: {},
            district: {},
            province: {},
            isDefault: false,
        },
        temp: {
            wards: [],
            districts: [],
            provinces: [],
        },
        message: '',
    };

    componentDidMount() {
        const { address } = this.props;
        if (!_.isEmpty(address)) {
            this.setState((prevState) => ({
                ...prevState,
                data: {
                    ...address,
                    province: {
                        name: address.province,
                    },
                    district: {
                        name: address.district,
                    },
                    ward: {
                        name: address.ward,
                    },
                },
            }));
        }

        this.handleGetProvinces();
    }

    handleOnChangeInput = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [key]: value,
            },
        }));
    };

    handleSelectionChange = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [key]: value,
            },
        }));

        if (this.state.data[key] !== value) {
            switch (key) {
                case 'province':
                    this.setState((prevState) => ({
                        data: {
                            ...prevState.data,
                            district: {},
                            ward: {},
                        },
                        temp: {
                            ...prevState.temp,
                            districts: [],
                            wards: [],
                        },
                    }));
                    this.handleGetDistricts(value.code);
                    break;

                case 'district':
                    this.handleGetWards(value.code);
                    this.setState((prevState) => ({
                        data: {
                            ...prevState.data,
                            ward: {},
                        },
                        temp: {
                            ...prevState.temp,
                            wards: [],
                        },
                    }));
                    break;

                default:
                    break;
            }
        }
    };

    handleGetProvinces = async () => {
        try {
            this.setState({ isNowLoading: true });
            const url = 'https://provinces.open-api.vn/api/p';
            const response = await axios.get(url, { params: { depth: 2 } });
            if (response) {
                this.setState((prevState) => ({
                    ...prevState,
                    temp: {
                        ...prevState.temp,
                        provinces: response.data,
                    },
                }));
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setTimeout(() => {
                this.setState({ isNowLoading: false });
            }, 1000);
        }
    };

    handleGetDistricts = async (province_code) => {
        try {
            this.setState({ isNowLoading: true });
            const url = `https://provinces.open-api.vn/api/p/${province_code}`;
            const response = await axios.get(url, { params: { depth: 2 } });
            if (response) {
                this.setState((prevState) => ({
                    ...prevState,
                    temp: {
                        ...prevState.temp,
                        districts: response.data.districts,
                    },
                }));
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setTimeout(() => {
                this.setState({ isNowLoading: false });
            }, 1000);
        }
    };

    handleGetWards = async (district_code) => {
        try {
            this.setState({ isNowLoading: true });
            const url = `https://provinces.open-api.vn/api/d/${district_code}`;
            const response = await axios.get(url, { params: { depth: 2 } });
            if (response) {
                this.setState((prevState) => ({
                    ...prevState,
                    temp: {
                        ...prevState.temp,
                        wards: response.data.wards,
                    },
                }));
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setTimeout(() => {
                this.setState({ isNowLoading: false });
            }, 1000);
        }
    };

    handleCreateAddress = async (data) => {
        let response = await userService.createAddressService(data);
        if (response) {
            this.setState((prevState) => ({
                ...prevState,
                message: response.message,
            }));

            if (response.code === 0) {
                toast.success('Thêm địa chỉ thành công!');
                this.props.navigate(-1);
            } else {
                toast.error('Dữ liệu không hợp lệ, kiểm tra lại!');
            }
        }
    };

    handleUpdateAddress = async (data) => {
        let response = await userService.updateAddressService(data);
        if (response) {
            this.setState((prevState) => ({
                ...prevState,
                message: response.message,
            }));

            if (response.code === 0) {
                toast.success('Cập nhật địa chỉ thành công!');
                this.props.navigate(-1);
            } else {
                toast.error('Dữ liệu không hợp lệ, kiểm tra lại!');
            }
        }
    };

    // event handler
    handleOnClickDeleteAddress = () => {
        this.handleToggleShowDialogMessage();
    };

    handleOnClickCancelAction = () => {
        this.props.setSelectedAddress();
        this.props.navigate(-1);
    };

    handleOnClickUpdateOrCreateAddress = async () => {
        const { data } = this.state;

        const address = {
            ...data,
            province: data.province.name,
            district: data.district.name,
            ward: data.ward.name,
        };

        if (this.props.address) {
            this.handleUpdateAddress(address);
        } else {
            this.handleCreateAddress(address);
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    handleToggleShowDialogMessage = () => {
        this.setState((prevState) => ({
            isShowDialog: !prevState.isShowDialog,
        }));
    };

    handleConfirmDeleteAddress = async () => {
        this.setState({
            isShowDialog: false,
        });

        const { address, navigate } = this.props;

        if (address) {
            try {
                await userService.deleteAddressService(address);
                navigate(-1);
            } catch (error) {
                toast.error('Có lỗi xảy ra. Kiểm tra và thử lại!');
            }
        }
    };

    handleCancelDeleteAddress = () => {
        console.log('handleCancelDeleteAddress');
        this.setState({
            isShowDialog: false,
        });
    };

    render() {
        const { temp, data } = this.state;

        return (
            <div className={scss('wrapper')}>
                <div className={scss('greeting')}>
                    <p>{`${!_.isEmpty(this.props.address) ? 'Cập nhật' : 'Thêm mới'} địa chỉ giao hàng`}</p>

                    {!_.isEmpty(this.props.address) ? (
                        <TransparentButton onClick={this.handleOnClickDeleteAddress}>
                            <span>Xoá địa chỉ</span>
                        </TransparentButton>
                    ) : null}
                </div>

                <form className={scss('main')} onSubmit={this.handleSubmit}>
                    <ul className={scss('details')}>
                        <li className={scss('section')}>
                            <RowInput
                                option={{
                                    key: 'receiverName',
                                    label: 'Người nhận',
                                    required: true,
                                    type: 'text',
                                }}
                                value={data.receiverName}
                                onChange={this.handleOnChangeInput}
                            />
                            <RowInput
                                option={{
                                    key: 'receiverPhoneNumber',
                                    label: 'Số điện thoại nhận hàng',
                                    required: true,
                                    type: 'tel',
                                }}
                                value={data.receiverPhoneNumber}
                                onChange={this.handleOnChangeInput}
                            />
                        </li>
                        <li className={scss('section')}>
                            <RowInput
                                option={{
                                    key: 'details',
                                    label: 'Địa chỉ chi tiết',
                                    required: true,
                                    type: 'text',
                                }}
                                value={data.details}
                                onChange={this.handleOnChangeInput}
                            />
                            <RowSelection
                                option={{
                                    label: 'Tỉnh/Thành phố',
                                    key: 'province',
                                    required: true,
                                }}
                                value={data.province}
                                data={temp.provinces}
                                disabled={temp.provinces.length === 0}
                                onSelect={this.handleSelectionChange}
                            />
                            <RowSelection
                                option={{
                                    label: 'Huyện/Quận/TP/Thị xã',
                                    key: 'district',
                                    required: true,
                                }}
                                value={data.district}
                                data={temp.districts}
                                disabled={_.isEmpty(data.province)}
                                onSelect={this.handleSelectionChange}
                            />
                            <RowSelection
                                option={{
                                    label: 'Xã/Phường/Thị trấn',
                                    key: 'ward',
                                    required: true,
                                }}
                                value={data.ward}
                                data={temp.wards}
                                disabled={_.isEmpty(data.district)}
                                onSelect={this.handleSelectionChange}
                            />
                            <Checkbox
                                option={{
                                    key: 'isDefault',
                                    label: 'Địa chỉ giao hàng mặc định',
                                }}
                                checked={data.isDefault}
                                onChange={this.handleOnChangeInput}
                            />
                            <div className={scss('action')}>
                                <Button
                                    size={'full'}
                                    shape={'rounded'}
                                    color={'primary'}
                                    onClick={this.handleOnClickUpdateOrCreateAddress}
                                >
                                    <span>Lưu</span>
                                </Button>
                                <Button
                                    size={'full'}
                                    shape={'rounded'}
                                    color={'gray'}
                                    onClick={this.handleOnClickCancelAction}
                                >
                                    <span>Hủy</span>
                                </Button>
                            </div>
                        </li>
                    </ul>
                </form>

                {this.state.isNowLoading && <Loading />}

                {this.state.isShowDialog && (
                    <DialogMessage
                        title={'Xóa địa chỉ'}
                        message={'Bạn có chắc chắn muốn xóa địa chỉ nhận hàng này?'}
                        onToggle={this.handleToggleShowDialogMessage}
                        onConfirm={this.handleConfirmDeleteAddress}
                        onCancel={this.handleCancelDeleteAddress}
                    />
                )}

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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    address: state.auth.selectedAddress,
});

const mapActionsToProps = (dispatch) => ({
    setSelectedAddress: (data) => dispatch(setSelectedAddress(data)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(ShippingAddress));

// optimize when success, set all inputs with read-only
