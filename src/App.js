import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, adminRoutes } from './routes';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<route.Component />} />;
                    })}
                    {adminRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<route.Component />} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;