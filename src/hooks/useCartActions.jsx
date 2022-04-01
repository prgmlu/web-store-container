import config from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { setObsessCartItemsAction } from '../redux_stores/cartReducer/actions';

const useCartActions = () => {
	const {
		axios,
		addToCart,
		removeFromCart,
		useLocalize,
		getCartItems,
		checkIfSKUInCart,
	} = useSelector((state) => state.shareableFunctions);

	const { activeLocale } = useLocalize();
	const dispatch = useDispatch();

	const setCartItems = () => {
		getCartItems(axios, config.ENV, activeLocale).then((response) => {
			dispatch(setObsessCartItemsAction(response));
		});
	};

	const addToCartAction = (sku, quantity) => {
		return new Promise((resolve, reject) => {
			addToCart(axios, sku, quantity, config.ENV, activeLocale).then(
				(res) => {
					setCartItems();
					resolve(res);
				},
			);
		});
	};

	const removeFromCartAction = (options) => {
		removeFromCart(axios, options, config.ENV, activeLocale).then(() =>
			setCartItems(),
		);
	};

	const isInCart = (sku) => {
		checkIfSKUInCart(sku);
	};

	return {
		setCartItems,
		addToCart: addToCartAction,
		removeFromCart: removeFromCartAction,
		isInCart,
	};
};

export default useCartActions;
