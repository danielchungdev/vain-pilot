import './App.css';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home'
import Signup from './pages/Signup'
import AddBook from './pages/AddBook';
import Reports from './pages/Reports';
import { CssBaseline } from '@mui/material'; 
import { ThemeProvider } from '@emotion/react';
import { vainTheme } from './assets/vainTheme';

function App() {

	return (
		<ThemeProvider theme = {vainTheme}>
			<CssBaseline/>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Home />} />
					<Route path="/addbook" element={<AddBook />} />
					<Route path="/reports" element={<Reports/>}/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
