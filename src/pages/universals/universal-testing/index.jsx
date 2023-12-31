import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardQuiz } from '../../../components/card-quiz'
import { LazyImage } from '../../../components/lazy-image'
import { Navigator } from '../../../components/navigator'
import { PageSkeleton } from '../../../components/page-skeleton'
import { next, previous } from '../../../media'
import { checkAnswers, fetchQuestions, quizActions } from '../../../store/quiz'
import './universal-testing.css'
export const UniversalTesting = () => {
	const quiz = useSelector(state => state.quiz)
	const current = quiz.current
	const answers = quiz.answers
	const userAnswers = quiz.userAnswers
	const dispatch = useDispatch()
	const toQuestion = index => {
		dispatch(quizActions.toQuestion(index))
	}
	const selectOption = (index, option) => {
		dispatch(quizActions.selectOption({ index, option }))
	}
	const countDown = () => {
		dispatch(quizActions.countDown())
	}
	const handleSubmitQuiz = () => {
		dispatch(checkAnswers())
	}

	useEffect(() => {
		if (answers.length === 0) {
			dispatch(fetchQuestions())
		}
	}, [])

	return (
		<div className='page-skeleton__root'>
			<PageSkeleton
				header='working'
				timeLeft={quiz.timeLeft}
				countDown={countDown}
				onClick={handleSubmitQuiz}
				footer
			>
				<div className='testing__root'>
					<LazyImage
						src={previous}
						className={`button--hovered testing__button ${
							current === 0 ? 'testing__button--disabled' : ''
						}`}
						onClick={() => {
							toQuestion(current - 1)
						}}
					/>
					<div className='testing__anchor'>
						<CardQuiz
							currentQuestion={quiz.questions[current]}
							userAnswer={userAnswers[current]}
							current={current}
							selectOption={selectOption}
							answers={answers}
						/>
					</div>
					<LazyImage
						src={next}
						className={`button--hovered testing__button testing__button--right ${
							current === quiz.questions.length - 1
								? 'testing__button--disabled'
								: ''
						}`}
						onClick={() => {
							toQuestion(current + 1)
						}}
					/>
				</div>
				<Navigator
					userAnswers={userAnswers}
					current={current}
					toQuestion={toQuestion}
					answers={answers}
				/>
			</PageSkeleton>
		</div>
	)
}
