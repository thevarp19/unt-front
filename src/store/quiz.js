import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../const'

const initialState = {
	questions: [],
	userAnswers: [],
	current: 0,
	timeLeft: 6000000,
	answers: [],
}

const quizSlice = createSlice({
	name: 'quiz',
	initialState: initialState,
	reducers: {
		toQuestion(state, action) {
			if (action.payload >= 0 && action.payload < state.questions.length) {
				state.current = action.payload
			}
		},
		setQuestions(state, action) {
			state.questions = action.payload
		},
		setUserAnswers(state, action) {
			state.userAnswers = action.payload
		},
		setAnswers(state, action) {
			state.answers = action.payload
		},
		setScore(state, action) {
			state.score = action.payload
		},
		selectOption(state, action) {
			const index = action.payload.index
			const option = `${action.payload.option}`

			if (index < 25) {
				state.userAnswers[index].answers = [option]
			} else if (index >= 25 && index < 35) {
				if (!state.userAnswers[index]) {
					state.userAnswers[index] = { answers: [] }
				}

				const userAnswers = state.userAnswers[index].answers

				if (userAnswers.includes(option)) {
					state.userAnswers[index].answers = userAnswers.filter(
						ans => ans !== option
					)
				} else if (userAnswers.length < 3) {
					state.userAnswers[index].answers.push(option)
				}
			}
		},

		countDown(state) {
			state.timeLeft -= 1000
		},
	},
})

export const fetchQuestions = () => async dispatch => {
	try {
		const response = await axios.get(`${baseURL}/api/questions`)
		const questions = response.data.questions
		const userAnswers = questions.map(question => ({
			id: question.id,
			answers: [],
		}))

		dispatch(quizActions.setQuestions(questions))
		dispatch(quizActions.setUserAnswers(userAnswers))
	} catch (error) {
		console.error(error)
	}
}
export const checkAnswers = () => async (dispatch, getState) => {
	try {
		const state = getState()
		const userAnswers = state.quiz.userAnswers
		const res = await axios.post(`${baseURL}/api/questions/check/`, userAnswers)
		const answers = res.data

		for (let i = 0; i < answers.test.length; i++) {
			answers.test[i].description = 'null'
			const testItem = answers.test[i]

			if (testItem.score > 0) {
				const correctAnswers = testItem.correct_answers
				const userAnswersForTest =
					userAnswers.find(item => item.id === testItem.id)?.answers || []

				if (
					correctAnswers.every(answer => userAnswersForTest.includes(answer))
				) {
					testItem.description = 'full'
				} else if (
					correctAnswers.some(answer => userAnswersForTest.includes(answer)) &&
					correctAnswers.length >= 2
				) {
					testItem.description = 'half'
				} else {
					testItem.description = 'null'
				}
			}
		}

		dispatch(quizActions.setAnswers(answers.test))
		dispatch(quizActions.setScore(answers.score))
	} catch (error) {
		console.error(error)
	}
}

export const quizActions = quizSlice.actions
export const quizReducer = quizSlice.reducer
