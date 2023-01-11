import config from '~/config';
import About from '~/pages/About';
import Account from '~/pages/Account';
import Drink from '~/pages/Drink';
import Food from '~/pages/Food';
import Home from '~/pages/Home';
import Hotpot from '~/pages/Hotpot';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Checkout from '~/pages/Checkout';
import Promotion from '~/pages/Promotion';
import Search from '~/pages/Search';
import Topping from '~/pages/Topping';
import NotFound from '~/layouts/NotFound';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment } from 'react';

const publicRoutes = [
    { path: config.routes.home, Component: Home, Layout: DefaultLayout },
    { path: config.routes.food, Component: Food, Layout: DefaultLayout },
    { path: config.routes.drink, Component: Drink, Layout: DefaultLayout },
    { path: config.routes.hotpot, Component: Hotpot, Layout: DefaultLayout },
    { path: config.routes.topping, Component: Topping, Layout: DefaultLayout },
    { path: config.routes.promotion, Component: Promotion, Layout: DefaultLayout },
    { path: config.routes.about, Component: About, Layout: DefaultLayout },
    { path: config.routes.search, Component: Search, Layout: DefaultLayout },
    { path: config.routes.login, Component: Login, Layout: Fragment },
    { path: config.routes.register, Component: Register, Layout: Fragment },
    { path: '*', Component: NotFound, Layout: Fragment },
];
const privateRoutes = [
    // cmt
    { path: config.routes.checkout, Component: Checkout, Layout: DefaultLayout },
    { path: config.routes.account, Component: Account, Layout: DefaultLayout },
];
export { publicRoutes, privateRoutes };
