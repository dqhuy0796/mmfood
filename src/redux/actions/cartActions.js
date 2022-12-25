import { cartActionTypes } from '../constants';

export const cartItemAdd = (item) => ({
    type: cartActionTypes.addItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemRemove = (item) => ({
    type: cartActionTypes.removeItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemIncrease = (item) => ({
    type: cartActionTypes.increaseItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemDescrease = (item) => ({
    type: cartActionTypes.descreaseItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemRemoveAll = () => ({
    type: cartActionTypes.removeAll,
});
