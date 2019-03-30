import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';


class Footer extends Component{
    render() {
        return (
            <footer className="bck_b_dark">
                <div className="container">
                    <div className="logo">
                        DEUPO.DE
                    </div>
                    <div className="wrapper">
                        <div className="left">
                            <h2>Contact information</h2>
                            <div className="business_nfo">
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faCompass}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Address</div>
                                        <div>Kramer 2345</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Phone</div>
                                        <div>123-456-789</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Working Hours</div>
                                        <div>Mon.-Fri./8 am-5 pm</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Email</div>
                                        <div>abc@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left">
                            <h2>Be the first one to know</h2>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

}

export default Footer;