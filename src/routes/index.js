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
    { path: config.routes.register, Component: Register },
    { path: config.routes.checkout, Component: Checkout },
];
const privateRoutes = [
    // cmt
    { path: config.routes.account, Component: Account },
];
export { publicRoutes, privateRoutes };
