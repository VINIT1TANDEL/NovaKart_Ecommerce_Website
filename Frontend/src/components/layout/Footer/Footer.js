import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footerSection leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore"/>
                <img src={appStore} alt="Appstore"/>
            </div>

            <div className="footerSection midFooter">
                <h1>NovaKart</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2024 &copy; MeVINIT</p>
            </div>

            <div className="footerSection rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/soul_vinit">Instagram</a>
                <a href="http://youtube.com/soul_vinit">Youtube</a>
                <a href="http://instagram.com/soul_vinit">Facebook</a>
            </div>
        </footer>
    );
}

export default Footer;
