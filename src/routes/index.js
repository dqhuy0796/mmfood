import config from '~/config';
import About from '~/pages/client/About';
import Account from '~/pages/client/Account';
import Drink from '~/pages/client/Drink';
import Food from '~/pages/client/Food';
import Home from '~/pages/client/Home';
import Hotpot from '~/pages/client/Hotpot';
import Login from '~/pages/client/Login';
import Checkout from '~/pages/client/Checkout';
import Promotion from '~/pages/client/Promotion';
import Search from '~/pages/client/Search';
import Topping from '~/pages/client/Topping';

import Dashboard from '~/pages/admin/Dashboard';
import Customers from '~/pages/admin/Customers';
import Products from '~/pages/admin/Products';
import Orders from '~/pages/admin/Orders';
import Users from '~/pages/admin/Users';
import Posts from '~/pages/admin/Posts';

const publicRoutes = [
    { path: config.routes.home, Component: Home },
    { path: config.routes.food, Component: Food },
    { path: config.routes.drink, Component: Drink },
    { path: config.routes.hotpot, Component: Hotpot },
    { path: config.routes.topping, Component: Topping },
    { path: config.routes.promotion, Component: Promotion },
    { path: config.routes.about, Component: About },
    { path: config.routes.search, Component: Search },
    { path: config.routes.login, Component: Login },
    { path: config.routes.payment, Component: Checkout },
];
const privateRoutes = [
    // cmt
    { path: config.routes.account, Component: Account },
];
const adminRoutes = [
    { path: config.routes.dashboard, Component: Dashboard },
    { path: config.routes.customers, Component: Customers },
    { path: config.routes.products, Component: Products },
    { path: config.routes.orders, Component: Orders },
    { path: config.routes.users, Component: Users },
    { path: config.routes.posts, Component: Posts },

    // comment cho no viet xuong dong
];
export { publicRoutes, adminRoutes };
