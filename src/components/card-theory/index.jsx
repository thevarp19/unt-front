import { useSelector } from 'react-redux';
import './card-theory.css';
export const CardTheory = ({ question, answer, flip, setFlip, userSelect }) => {
    const language = useSelector(state => state.language.value.theory);

    return (
        <div className={flip ? 'card-theory__root' : 'card-theory__root card-theory__anchor--flipped'}
            onClick={() => { setFlip(!flip); }} >
            <div className='card-theory__anchor'>
                <div className="card-theory__text">
                    {question}
                </div>
                <div className='card-theory__button__anchor'>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        userSelect("DONT_KNOW");
                    }} className='button--hovered card-theory__button theory__count theory__count--red'>{language.dontKnow}</div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        userSelect("KNOW");
                    }} className='button--hovered card-theory__button theory__count'>{language.know}</div>
                </div>
            </div>
            <div className='card-theory__anchor card-theory__anchor--flipped card-theory__anchor--back'>
                <div>{answer}</div>
            </div>
        </div>
    );
};