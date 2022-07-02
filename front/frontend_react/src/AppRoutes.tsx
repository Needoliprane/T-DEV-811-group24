import React, { Suspense } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { SWRConfig } from 'swr';
import { useAuth } from 'hooks/useAuth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading } from 'components';

const SearchPage = React.lazy(() => import('pages/search'));
const HotelDetailsPage = React.lazy(() => import('pages/hotels/Details'));
const HomePage = React.lazy(() => import('pages/Home'));
const NotFoundPage = React.lazy(() => import('pages/404'));
const InternalServerErrorPage = React.lazy(() => import('pages/500'));

const AppRoutes = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	return (
		<SWRConfig
			value={{
				fetcher: async (endpoint: string) => {
					const options: AxiosRequestConfig = {
						baseURL: process.env.REACT_APP_API_URL,
					};
					if (auth?.user.jwt) options.headers = { Authorization: `Bearer ${auth?.user.jwt}` };
					try {
						const { data } = await axios.get(endpoint, options);
						return data;
					} catch (error) {
						const status = (error as AxiosError).response?.status;
						if (status === 401) {
							auth?.dispatch({ type: 'logout' });
							navigate('/login', { replace: true });
						}
						if (!status || status >= 500) navigate('/500', { replace: true });
						throw new Error('Une erreur est survenue');
					}
				},
			}}
		>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/404" element={<NotFoundPage />} />
					<Route path="/500" element={<InternalServerErrorPage />} />
					<Route path="/hotels">
						<Route path=":id" element={<HotelDetailsPage />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</SWRConfig>
	);
};

export default AppRoutes;
