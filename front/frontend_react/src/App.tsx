import './App.css';
import 'styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from 'hooks/useAuth';
import AppRoutes from 'AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import 'swiper/css';

// toast.configure({
// 	position: 'top-center' as const,
// 	autoClose: 5000,
// 	hideProgressBar: false,
// 	closeOnClick: true,
// 	pauseOnHover: true,
// 	draggable: true,
// 	theme: 'colored' as const,
// });

function App() {
	return (
		<HelmetProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</AuthContextProvider>
		</HelmetProvider>
	);
}

export default App;
