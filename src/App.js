import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
// redux and actions
import { connect } from 'react-redux';
function App({ auth }) {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<route.Component />} />;
                    })}
                    {auth.isLoggedIn &&
                        privateRoutes.map((route, index) => {
                            return <Route key={index} path={route.path} element={<route.Component />} />;
                        })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapActionsToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapActionsToProps)(App);
