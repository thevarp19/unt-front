import { Footer } from '../footer'
import { HeaderHome } from '../headers/header-home'
import { HeaderMain } from '../headers/header-main'
import { HeaderWorking } from '../headers/header-working'
import './page-skeleton.css'

export const PageSkeleton = ({
	header,
	footer,
	children,
	timeLeft,
	countDown,
	className,
	onClick,
}) => {
	return (
		<div className={`page-skeleton__anchor ${className}`}>
			<div>
				{header === 'home' ? (
					<HeaderHome />
				) : header === 'working' ? (
					<HeaderWorking
						onClick={onClick}
						timeLeft={timeLeft}
						countDown={countDown}
					/>
				) : (
					<HeaderMain />
				)}
				<div className='page-skeleton__content'>{children}</div>
			</div>
			{footer ? <></> : <Footer />}
		</div>
	)
}
