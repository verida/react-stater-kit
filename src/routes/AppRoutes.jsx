import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import AppLayouts from '../layouts/AppLayouts';
import { Connect, Home } from '../pages';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<Connect />} />
			<Route path='*' element={<h1>Page not found</h1>} />
		</Routes>
	);
};

export default AppRoutes;
