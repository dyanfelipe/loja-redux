import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartsSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select((state) => state.cart.find((p) => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.tron.warn('ERROR');
    return;
  }
  if (productExists) {
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartsSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
