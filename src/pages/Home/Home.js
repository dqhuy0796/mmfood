import React from 'react';
import Banner from '~/components/partial/Banner/Banner';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
// redux and actions
import { connect } from 'react-redux';
import { fetchPosts } from '~/redux/actions/apiActions';
// style
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const scss = classNames.bind(styles);
class Home extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <>
                <Banner />
                <div className={scss('wrapper')}>
                    {this.props.posts &&
                        this.props.posts.map((item, index) => (
                            <ContentSection
                                key={index}
                                title={item.title}
                                image={item.imageUrl}
                                content={item.overview}
                            />
                        ))}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.api.posts,
});

const mapActionsToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapActionsToProps)(Home);

const ContentSection = (props) => (
    <div className={scss('content-section')}>
        <div className={scss('image')}>
            <div>
                <img src={props.image} alt={props.title} />
            </div>
        </div>
        <div className={scss('contents')}>
            <h3 className={scss('title')}>{props.title}</h3>
            <p className={scss('text')}>{props.content}</p>
            <div className={scss('fixed-left')}>
                <TransparentButton>
                    <span>Xem thêm</span>
                </TransparentButton>
            </div>
        </div>
    </div>
);
