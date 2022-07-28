import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	const location = useLocation();
	const isAuth = useSelector((state) => state.auth.user);

	return isAuth ? (
		children
	) : (
		<Navigate to="/login" state={{ from: location }} replace />

	);
}