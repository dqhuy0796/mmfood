import React from 'react';
import Banner from '~/components/partial/Banner/Banner';
import TransparentButton from '~/components/shared/buttons/TransparentButton';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
// redux and actions
import { connect } from 'react-redux';
import { fetchPosts } from '~/redux/actions/apiActions';
// style
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const css = classNames.bind(styles);
class Home extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <>
                <Header />
                <Banner />
                <div className={css('background')}>
                    <div className={css('wrapper')}>
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
                </div>
                <Footer />
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
    <div className={css('content-section')}>
        <div className={css('image')}>
            <div>
                <img src={props.image} alt={props.title} />
            </div>
        </div>
        <div className={css('contents')}>
            <h3 className={css('title')}>{props.title}</h3>
            <p className={css('text')}>{props.content}</p>
            <div className={css('fixed-left')}>
                <TransparentButton>
                    <span>Xem thêm</span>
                </TransparentButton>
            </div>
        </div>
    </div>
);
