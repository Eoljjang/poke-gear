import styles from '../styles/components/Footer.module.css'
import PropTypes from 'prop-types'
import { useState } from 'react';
// Props:
// 1) footerLinks: Takes a JSON-style object {text: url}. Display text for the link, and the url to the link itself.

function Footer({footerLinks}) {
    return(
        <footer className={styles.footer}>
            {Object.entries(footerLinks).map(([text, url], index) => (
                <a key={`${url}-${index}`} href={url} className={styles["footer-link"]}>
                    {text}
                </a>
            ))}
        </footer>
    )
}

// Prop Validation.
Footer.propTypes = {
    footerLinks: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Footer;
