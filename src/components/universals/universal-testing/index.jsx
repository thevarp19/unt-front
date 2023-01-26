import { Navigator } from "../../navigator";
import { useDispatch, useSelector } from "react-redux";
import { CardQuiz } from "../../cards/card-quiz";
import { quizActions } from '../../../store/quiz';
import { PageSkeleton } from "../../page-skeleton";
import { LazyImage } from "../../lazy-image";
import { next, previous } from "../../../media";
import './universal-testing.css';
export const UniversalTesting = () => {

    const quiz = useSelector(state => state.quiz);
    const current = quiz.current;
    const userAnswers = quiz.userAnswers;
    const dispatch = useDispatch();
    const toQuestion = (index) => {
        dispatch(quizActions.toQuestion(index));
    };
    const selectOption = (index, option) => {
        dispatch(quizActions.selectOption({ index, option }));
    }
    const countDown = () => {
        dispatch(quizActions.countDown());
    }

    const answers = quiz.answers;

    return (
        <div className="page-skeleton__root">
            <PageSkeleton header='working' timeLeft={quiz.timeLeft} countDown={countDown} footer>
                <div className="testing__root">
                    <LazyImage src={previous} className={`testing__button ${current === 0 ? 'testing__button--disabled' : ''}`} onClick={() => { if (current !== 0) { toQuestion(current - 1); } }} />
                    <div className="testing__anchor">
                        <CardQuiz currentQuestion={quiz.questions[current]} userAnswer={userAnswers[current]} current={current} selectOption={selectOption} answers={answers} />
                    </div>
                    <LazyImage src={next} className={`testing__button testing__button--right ${current === quiz.questions.length - 1 ? 'testing__button--disabled' : ''}`} onClick={() => { if (current !== quiz.questions.length - 1) { toQuestion(current + 1); } }} />
                </div>
                <Navigator userAnswers={quiz.userAnswers} current={current} toQuestion={toQuestion} answers={answers}/>
            </PageSkeleton>
        </div>
    );

};