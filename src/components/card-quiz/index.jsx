import { Card } from '../cards/card'
import { LazyImage } from '../lazy-image'
import './card-quiz.css'
export const CardQuiz = ({
	currentQuestion,
	userAnswer,
	current,
	selectOption,
	answers,
}) => {
	const isDivided =
		(currentQuestion?.task !== null && currentQuestion?.task !== '') ||
		(currentQuestion?.content !== null && currentQuestion?.content !== '') ||
		(currentQuestion?.taskContent !== null &&
			currentQuestion?.taskContent !== '')

	const questionPart = (
		<>
			{currentQuestion?.taskContent ? (
				<LazyImage
					className='card-quiz__image'
					src={currentQuestion?.taskContent}
				/>
			) : (
				<></>
			)}
			{currentQuestion?.task ? (
				<div className='card-quiz__question'>{currentQuestion?.task}</div>
			) : (
				<></>
			)}
			{currentQuestion?.content ? (
				<LazyImage
					className='card-quiz__image'
					src={currentQuestion?.content}
				/>
			) : (
				<></>
			)}
		</>
	)

	const optionPart = (
		<>
			<div className='card-quiz__question'>{currentQuestion?.question}</div>
			{currentQuestion?.options.map((e, index) => {
				let labelClass = ''
				if (userAnswer?.answers?.length > 0) {
					labelClass = userAnswer.answers?.includes(e)
						? 'card-quiz__option__label--selected'
						: ''
				}
				let backgroundOption = ''
				if (answers.length > 0) {
					const answer = answers[current].correct_answers
					const selectedAnswers = userAnswer?.answers || []

					if (index < 25) {
						backgroundOption = answer?.includes(e)
							? 'card-quiz__option--correct card-quiz__option--correct--user'
							: ''
						if (selectedAnswers.includes(e) && !answer?.includes(e)) {
							backgroundOption = 'card-quiz__option--incorrect'
						}
					} else if (index >= 25 && index < 35) {
						if (answer.includes(e)) {
							backgroundOption = 'card-quiz__option--correct'
							if (selectedAnswers.includes(e)) {
								backgroundOption += ' card-quiz__option--correct--user'
							}
						} else {
							backgroundOption = 'card-quiz__option--incorrect'
						}
					}
				}
				return (
					<div
						className={`card-quiz__option__anchor ${backgroundOption}`}
						onClick={() => {
							if (answers.length === 0) {
								selectOption(current, e)
							}
						}}
						key={index}
					>
						<div className={`card-quiz__option__label ${labelClass}`}>
							{String.fromCharCode(65 + index)}
						</div>
						<div className='card-quiz__option__text'>{e}</div>
					</div>
				)
			})}
		</>
	)

	if (isDivided) {
		return (
			<div className='card-quiz__root card-quiz__root--flex'>
				<div className='card-quiz__part--question'>
					<Card>
						<div className='card-quiz__anchor'>{questionPart}</div>
					</Card>
				</div>
				<div className='card-quiz__part--option'>
					<Card>
						<div className='card-quiz__anchor '>{optionPart}</div>
					</Card>
				</div>
			</div>
		)
	}

	return (
		<div className='card-quiz__root'>
			<Card>
				<div className='card-quiz__anchor'>
					{questionPart}
					{optionPart}
				</div>
			</Card>
		</div>
	)
}
