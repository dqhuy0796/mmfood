import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RowInput from '~/components/partial/RowInput';
import Button from '~/components/shared/Button';
import { withRouter } from '~/hoc/withRouter';
import { userService } from '~/services';
// redux and actions
import { connect } from 'react-redux';
import { updateProfile } from '../../redux/actions/authActions';
// style
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';

const scss = classNames.bind(styles);
class EditProfile extends React.Component {
    state = {
        content: [
            {
                key: 'name',
                label: 'Họ và tên',
                placeholder: 'Nguyễn Văn A',
                required: true,
            },
            {
                key: 'phoneNumber',
                label: 'Số điện thoại',
                placeholder: '09xx xxx xxx',
                required: true,
                type: 'tel',
            },
            {
                key: 'email',
                label: 'Email',
                placeholder: 'example@email.com',
                required: true,
                type: 'email',
            },
            {
                key: 'birth',
                label: 'Ngày sinh',
                type: 'date',
            },
        ],
        data: {},
        message: '',
    };

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
            data: this.props.user,
        }));
    }

    handleOnClickCancel = () => {
        this.props.navigate(-1);
    };

    handleOnChangeInput = (key, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [key]: value,
            },
        }));
    };

    handleUpdateProfile = async (data) => {
        const { result, message, code } = await userService.updateProfileService(data);

        if (result) {
            this.setState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    ...result,
                },
                message,
            }));

            if (code === 0) {
                const { name, birth } = this.state.data;
                this.props.updateProfile({ name, birth });

                setTimeout(() => {
                    toast.success('Cập nhật thông tin thành công!');
                }, 5000);

                this.props.navigate(-1);
            }
        }

        if (code !== 0) {
            toast.error('Dữ liệu không hợp lệ!');
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.data !== this.props.user) {
            const { phoneNumber, email, name, birth } = this.state.data;
            this.handleUpdateProfile({ phoneNumber, email, name, birth });
        }
        toast.error('Dữ liệu không thay đổi!');
    };

    render() {
        const user = this.state.data;
        return (
            <>
                <form className={scss('wrapper')} onSubmit={this.handleSubmit}>
                    <div className={scss('greeting')}>
                        <p>Chỉnh sửa</p>
                    </div>

                    <div className={scss('profile')}>
                        <ul>
                            {this.state.content.map((item, index) => (
                                <li key={index}>
                                    <RowInput
                                        option={item}
                                        value={user[item.key]}
                                        onChange={this.handleOnChangeInput}
                                    />
                                </li>
                            ))}
                            <li className={scss('action')}>
                                <Button
                                    size={'full'}
                                    shape={'rounded'}
                                    color={'white'}
                                    onClick={this.handleOnClickCancel}
                                >
                                    <span>Hủy</span>
                                </Button>
                                <Button size={'full'} shape={'rounded'} color={'primary'} type={'submit'}>
                                    <span>Lưu thông tin</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </form>

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
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapActionsToProps = (dispatch) => ({
    updateProfile: (data) => dispatch(updateProfile(data)),
});

export default connect(mapStateToProps, mapActionsToProps)(withRouter(EditProfile));
