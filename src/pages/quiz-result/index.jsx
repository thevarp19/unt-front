import { useSelector } from 'react-redux'
import { PageSkeleton } from '../../components/page-skeleton'
import { ResultNavigation } from '../../components/results/result-navigation'
import { ResultScore } from '../../components/results/result-score'
import { ResultTopic } from '../../components/results/result-topic'
import { TopText } from '../../components/top-text'
import './quiz-result.css'
export const QuizResult = () => {
	const language = useSelector(state => state.language.value.result)
	const answers = useSelector(state => state.quiz.answers)
	const duration = useSelector(state => state.quiz.timeLeft)
	const score = useSelector(state => state.quiz.score) || 0
	return (
		<PageSkeleton
			className='quiz-result__root'
			header='working'
			timeLeft={0}
			footer
		>
			<TopText text={language.yourResult} />
			<div className='quiz-result__anchor'>
				<ResultScore score={score} duration={6000000 - duration} />
				<ResultTopic topics={['python', 'sql', 'informatics', 'IT']} />
				<ResultNavigation answers={answers} />
			</div>
		</PageSkeleton>
	)
}
