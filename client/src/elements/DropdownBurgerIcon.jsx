import styles from '../styles/elements/DropdownBurgerIcon.module.css'
import PropTypes from 'prop-types';

const DropdownBurgerIcon = ({onClickOpenSidebar}) => {
    return (
        <button className={styles['burger-container']}
            onClick={onClickOpenSidebar}
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Toggle sidebar"
        >
            <div className={styles["burger-content"]}/>
            <div className={styles["burger-content"]}/>
            <div className={styles["burger-content"]}/>
        </button>
    )
}
DropdownBurgerIcon.propTypes = {
    onClickOpenSidebar: PropTypes.func.isRequired,
};

export default DropdownBurgerIcon;
