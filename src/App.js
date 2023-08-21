import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRouter, publicRouter } from './routes';
import { userService } from './services';
// redux and actions
import { connect } from 'react-redux';
import { logout, refreshTokens } from './redux/actions/authActions';

function App({ auth }) {
    const dispatch = useDispatch();

    const verifyRefreshToken = async () => {
        if (!auth.refreshToken) {
            return false;
        }

        const response = await userService.verifyRefreshTokenService();
        if (response && response.code === 0) {
            return true;
        }

        return false;
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        let refreshTokenInterval;

        const handleRefreshTokens = async () => {
            try {
                const refreshTokenValid = await verifyRefreshToken();

                if (refreshTokenValid) {
                    refreshTokenInterval = setInterval(() => {
                        dispatch(refreshTokens());
                        console.log('refresh tokens', new Date());
                    }, 10 * 60 * 1000);
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error(error);
                handleLogout();
            }
        };

        handleRefreshTokens();

        return () => {
            clearInterval(refreshTokenInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, auth.refreshToken]);

    const renderRoutes = (routes) => {
        return routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                element={
                    <route.Layout>
                        <route.Component />
                    </route.Layout>
                }
            />
        ));
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {renderRoutes(publicRouter)}
                    {auth.isLogged && renderRoutes(privateRouter)}
                </Routes>
            </div>
        </BrowserRouter>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapActionsToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    refreshTokens: () => dispatch(refreshTokens()),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
