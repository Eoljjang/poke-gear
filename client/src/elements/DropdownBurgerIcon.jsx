import '../styles/elements/DropdownBurgerIcon.css'
import PropTypes from 'prop-types';

const DropdownBurgerIcon = ({onClickOpenSidebar}) => {
    return (
        <button className='burger-container'
            onClick={onClickOpenSidebar}
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Toggle sidebar"
        >
            <div className="burger-content"/>
            <div className="burger-content"/>
            <div className="burger-content"/>
        </button>
    )
}
DropdownBurgerIcon.propTypes = {
    onClickOpenSidebar: PropTypes.func.isRequired,
};

export default DropdownBurgerIcon;
