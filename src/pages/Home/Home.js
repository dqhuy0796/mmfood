import React from 'react';
import Banner from '~/components/partial/Banner/Banner';
// redux and actions
import { connect } from 'react-redux';
import { fetchPosts } from '~/redux/actions/preloadActions';
// style
import classNames from 'classnames/bind';
import BlogSection from '../../components/partial/BlogSection/BlogSection';
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
                <ul className={scss('wrapper')}>
                    {this.props.posts &&
                        this.props.posts.map((item, index) => (
                            <li key={index}>
                                <BlogSection data={item} />
                            </li>
                        ))}
                </ul>
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
