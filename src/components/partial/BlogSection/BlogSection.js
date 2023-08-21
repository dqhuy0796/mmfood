import classNames from 'classnames/bind';
import React from 'react';
import TransparentButton from '~/components/shared/TransparentButton';
import routes from '~/config';
import styles from './BlogSection.module.scss';
const scss = classNames.bind(styles);

class BlogSection extends React.Component {
    state = {};
    render() {
        const data = this.props.data;
        return (
            <article className={scss('wrapper')}>
                <div className={scss('top')}>
                    <span className={scss('category')}>Tutorial</span>
                    <span className={scss('timestamp')}>14 days ago</span>
                </div>
                <h2 className={scss('title')}>
                    <span>{data.title}</span>
                </h2>
                <p className={scss('text')}>{data.content}</p>
                <div className={scss('bottom')}>
                    <div className={scss('author')}>
                        <img
                            className={scss('avatar')}
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            alt="Jese Leos avatar"
                        />
                        <span className={scss('name')}>MMFOOD professor</span>
                    </div>
                    <TransparentButton to={routes.editAddress}>
                        <span>Xem thêm</span>
                    </TransparentButton>
                </div>
            </article>
        );
    }
}

export default BlogSection;
