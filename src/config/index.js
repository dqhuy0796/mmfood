const routes = {
    home: '/',
    promotion: '/promotion',
    search: '/search',
    about: '/about',
    login: '/login',
    register: '/register',

    blog: '/blog',
    blogDetails: '/blog/details/:id',

    product: '/product',
    productDetails: '/product/details/:id',

    food: '/product/food',
    drink: '/product/drink',
    hotpot: '/product/hotpot',
    others: '/product/others',

    profile: '/profile',
    editProfile: '/profile/edit',

    addresses: '/address',
    editAddress: '/address/edit/:id',
    createAddress: '/address/create',

    orders: '/order',
    orderDetails: '/order/details/:id',

    checkout: '/checkout',
};

export default routes;
