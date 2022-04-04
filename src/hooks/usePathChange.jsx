import { useLocation } from 'react-router';

const usePathChange = () => {
	const { pathname } = useLocation();
	return pathname;
};

export default usePathChange;
