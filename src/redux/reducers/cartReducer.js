import { cartActionTypes } from '../constants';

const initState = {
    quantity: 0,
    subtotal: 0,
    items: [],
};

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case cartActionTypes.addItem:
            // if not have any item, let's push this item
            if (state.quantity === 0) {
                return {
                    ...state,
                    quantity: state.quantity + 1,
                    subtotal: state.subtotal + action.payload.newPrice,
                    items: [...state.items, action.payload],
                };
                // else have item(s), let's check
            } else {
                let isExistItem = false;
                // if adding item is exist, just increase the quantity
                // eslint-disable-next-line array-callback-return
                state.items.map((item, index) => {
                    if (item.id === action.payload.id) {
                        state.items[index].quantity++;
                        isExistItem = true;
                    }
                });
                // else adding item is not exist, let's push this item
                if (!isExistItem) {
                    state.items = [...state.items, action.payload];
                }
                // finally update quantity and subtotal
                return {
                    ...state,
                    quantity: state.quantity + 1,
                    subtotal: state.subtotal + action.payload.newPrice,
                };
            }

        case cartActionTypes.removeItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    state.quantity = state.quantity - state.items[index].quantity;
                    state.subtotal = state.subtotal - state.items[index].quantity * state.items[index].newPrice;
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                }
            });
            return {
                ...state,
            };

        case cartActionTypes.increaseItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    state.items[index].quantity = state.items[index].quantity + 1;
                    state.quantity = state.quantity + 1;
                    state.subtotal += state.items[index].newPrice;
                }
            });
            return {
                ...state,
            };

        case cartActionTypes.descreaseItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    state.items[index].quantity = state.items[index].quantity > 1 ? state.items[index].quantity - 1 : 1;
                    state.quantity = state.quantity > 1 ? state.quantity - 1 : 1;
                    state.subtotal =
                        state.subtotal > state.items[index].newPrice
                            ? state.subtotal - state.items[index].newPrice
                            : state.items[index].newPrice;
                }
            });
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default cartReducer;
