import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useSelector } from 'react-redux'
import { CardDark } from '../../cards/card-dark'
import './result-score.css'
export const ResultScore = ({ score, duration }) => {
	const language = useSelector(state => state.language.value.result)
	let time = {
		hours: Math.floor(duration / (1000 * 60 * 60)),
		minutes: Math.floor((duration / 1000 / 60) % 60),
		seconds: Math.floor((duration / 1000) % 60),
	}
	return (
		<CardDark>
			<div className='result-score__anchor'>
				<CircularProgressbar
					value={(score / 35) * 100}
					text={`${Math.round((score / 35) * 100)}%`}
					styles={buildStyles({
						pathColor: ' #00E022 ',
						trailColor: 'red',
						textColor: 'white',
						textSize: 'inherit',
					})}
					className='result-score__circle'
				/>
				<div className='result-score__text'>
					{`${language.testingDuration}: `}
					<div className>
						{time.hours < 10 ? `0${time.hours}` : time.hours}:
						{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
						{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
					</div>
				</div>
				<div className='result-score__text'>{`${language.score}: ${score}/45`}</div>
			</div>
		</CardDark>
	)
}
