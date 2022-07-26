import { useState, createContext, useContext } from "react";
import { authAPI } from "./authAPI";

const AuthContext = createContext();

export function useAuth() {
	console.log(useContext(AuthContext))
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	let [user, setUser] = useState(null);

	let signin = (newUser, callback) => {
		return authAPI.signin(() => {
			setUser(newUser);
			callback()
		});
	};

	let signout = (callback) => {
		return authAPI.signout(() => {
			setUser(null);
			callback()
		});
	};

	let value = { user, signin, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}