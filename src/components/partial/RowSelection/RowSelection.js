import classNames from 'classnames/bind';
import _ from 'lodash';
import React from 'react';
import { GoChevronDown } from 'react-icons/go';
import styles from './RowSelection.module.scss';

const scss = classNames.bind(styles);

class RowSelection extends React.Component {
    state = {
        data: [],
        text: '',
        isOpen: false,
    };

    componentDidMount() {
        this.setState({
            data: this.props.data,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data,
            });
        }
    }

    handleSelect = (key, value) => {
        if (!this.state.isOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));

        this.props.onSelect(key, value);
    };

    handleOpen = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
            text: '',
        }));
    };

    handleOutsideClick = () => {
        this.handleSelect();
    };

    handleOnChangeFilter = (e) => {
        const keyword = e.target.value;
        if (!_.isEmpty(keyword)) {
            const filtered = this.props.data.filter(
                (item) =>
                    item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.codename.toLowerCase().includes(keyword.toLowerCase()),
            );
            this.setState({
                text: keyword,
                data: filtered,
            });
        } else {
            this.setState({
                text: keyword,
                data: this.props.data,
            });
        }
    };

    render() {
        const { option, disabled, value } = this.props;
        const { isOpen, text, data } = this.state;

        return (
            <div className={scss('row', disabled ? 'disabled' : null)}>
                <div className={scss('input')} onClick={this.handleOpen}>
                    <input type={'text'} className={scss('value')} value={value.name || ''} readOnly={true} />
                    <p className={scss('label', !_.isEmpty(value) ? 'minimize' : null)}>
                        <span>{option.label}</span>
                        {option.required && <span className={scss('required')}>*</span>}
                    </p>
                    <div className={scss('btn', !disabled && isOpen ? 'open' : null)}>
                        <GoChevronDown />
                    </div>
                </div>
                {!disabled && (
                    <ul className={scss('dropdown', isOpen ? 'active' : null)}>
                        <li>
                            <div className={scss('item')}>
                                <input
                                    type={'text'}
                                    value={text}
                                    placeholder={'Tìm kiếm...'}
                                    className={scss('value')}
                                    onChange={(e) => this.handleOnChangeFilter(e)}
                                />
                            </div>
                        </li>

                        {!_.isEmpty(data) ? (
                            data.map((item, index) => (
                                <li key={index}>
                                    <div className={scss('item')} onClick={() => this.handleSelect(option.key, item)}>
                                        <span title={item.name}>{item.name}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>
                                <div className={scss('item')}>
                                    <span>
                                        Không tìm thấy <strong>{text}</strong>
                                    </span>
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default RowSelection;
