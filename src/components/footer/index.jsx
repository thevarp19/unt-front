import { instagram, linkedin, telegram } from "../../media";
import { Header } from "../universals/header";
import './footer.css';
export const Footer = () => {
    return (
        <div className='footer__anchor'>
            <Header left={
                <div>
                    <div className='header__button'>
                        © 2022 nfactorial.school
                    </div>
                </div>
            } right={
                <div>
                    <img className='footer__logo' src={linkedin} alt="linkedin" />
                    <img className='footer__logo' src={telegram} alt="telegram" />
                    <img className='footer__logo' src={instagram} alt="instagram" />
                </div>
            } />
        </div>
    );
};