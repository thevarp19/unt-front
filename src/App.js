import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Additional } from './pages/additional'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Main } from './pages/main'
import { NotFound } from './pages/not-found'
import { Profile } from './pages/profile'
import { QuizResult } from './pages/quiz-result'
import Protected from './protected'
import { universalRoutes } from './universalRoutes'

function App() {
	const language = useSelector(state => {
		return state.language.value
	})
	const auth = useSelector(state => {
		return state.auth
	})
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='login' element={<Login />} />
				<Route path='home' element={<Protected isAuthorized={auth} />}>
					<Route index element={<Home />} />
					<Route path='profile' element={<Profile />} />
					<Route path='additional' element={<Additional />} />
					<Route path='testing'>{universalRoutes('testing', language)}</Route>
					<Route path='practice'>{universalRoutes('practice', language)}</Route>
					<Route path='theory'>{universalRoutes('theory', language)}</Route>
					<Route path='results' element={<QuizResult />} />
				</Route>
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
