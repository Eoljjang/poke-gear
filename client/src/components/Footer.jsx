import '../styles/components/Footer.css'
import PropTypes from 'prop-types'

// Props:
// 1) footerLinks: Takes a JSON-style object {text: url}. Display text for the link, and the url to the link itself.

function Footer({footerLinks}) {
    return(
        <footer>
            {Object.entries(footerLinks).map(([text, url], index) => (
                <a key={url} href={url} className="footer-link"> {/* Using the URL as the key. If it raises issues later on check here.*/}
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
