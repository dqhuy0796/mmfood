import { Fragment } from 'react';
import routes from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout';
import NotFound from '~/layouts/NotFound';
//
import About from '~/pages/About';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Promotion from '~/pages/Promotion';
import Register from '~/pages/Register';
import Search from '~/pages/Search';
//
import Category from '~/pages/Category';
import Drink from '~/pages/Category/Drink';
import Food from '~/pages/Category/Food';
import Hotpot from '~/pages/Category/Hotpot';
import Others from '~/pages/Category/Others';
import ProductDetails from '../pages/ProductDetails';
import BlogDetails from '../pages/BlogDetails';
import Blogs from '../pages/Blogs';

//
import Checkout from '~/pages/Checkout';
import EditProfile from '~/pages/EditProfile';
import Profile from '~/pages/Profile';
import AddressBook from '../pages/AddressBook';
import ShippingAddress from '../pages/ShippingAddress';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';

export const publicRouter = [
    {
        path: routes.home,
        Component: Home,
        Layout: DefaultLayout,
    },
    {
        path: routes.about,
        Component: About,
        Layout: DefaultLayout,
    },
    {
        path: routes.promotion,
        Component: Promotion,
        Layout: DefaultLayout,
    },
    {
        path: routes.search,
        Component: Search,
        Layout: DefaultLayout,
    },
    {
        path: routes.register,
        Component: Register,
        Layout: Fragment,
    },
    {
        path: routes.login,
        Component: Login,
        Layout: Fragment,
    },
    {
        path: '*',
        Component: NotFound,
        Layout: Fragment,
    },
    {
        path: routes.product,
        Component: Category,
        Layout: DefaultLayout,
    },
    {
        path: routes.food,
        Component: Food,
        Layout: DefaultLayout,
    },
    {
        path: routes.drink,
        Component: Drink,
        Layout: DefaultLayout,
    },
    {
        path: routes.hotpot,
        Component: Hotpot,
        Layout: DefaultLayout,
    },
    {
        path: routes.others,
        Component: Others,
        Layout: DefaultLayout,
    },
    {
        path: routes.productDetails,
        Component: ProductDetails,
        Layout: DefaultLayout,
    },
    {
        path: routes.blog,
        Component: Blogs,
        Layout: DefaultLayout,
    },
    {
        path: routes.blogDetails,
        Component: BlogDetails,
        Layout: DefaultLayout,
    },
];
export const privateRouter = [
    {
        path: routes.checkout,
        Component: Checkout,
        Layout: DefaultLayout,
    },
    {
        path: routes.addresses,
        Component: AddressBook,
        Layout: DefaultLayout,
    },
    {
        path: routes.editAddress,
        Component: ShippingAddress,
        Layout: DefaultLayout,
    },
    {
        path: routes.createAddress,
        Component: ShippingAddress,
        Layout: DefaultLayout,
    },
    {
        path: routes.profile,
        Component: Profile,
        Layout: DefaultLayout,
    },
    {
        path: routes.editProfile,
        Component: EditProfile,
        Layout: DefaultLayout,
    },
    {
        path: routes.orders,
        Component: Orders,
        Layout: DefaultLayout,
    },
    {
        path: routes.orderDetails,
        Component: OrderDetails,
        Layout: DefaultLayout,
    },
];
