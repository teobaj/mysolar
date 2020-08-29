import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import logoReact from '../assets/reactIcon.png';
import logoSpring from '../assets/springio-icon.svg';
import longsolarpanels from '../assets/solarPanelTrim.mp4'
const LandingPage = () => {
    return (
        <div>
            <section className="showcase">
                <div className="video-container"> //linkul pentru videoclipul folosit: https://www.youtube.com/watch?v=gacGuWjqKco
                    <video src={longsolarpanels} autoPlay muted loop></video>
                </div>
                <div className="content">
                    <h1>Solar power for every home</h1>
                    <h3>Solar Panel Monitoring</h3>
                    <h3>using react and spring</h3>
                    <img src={logoReact} alt="react" style={{ width: "2rem", marginTop: "1rem", marginRight: "1rem", marginLeft: "1rem" }} />
                    <img src={logoSpring} alt="spring" style={{ width: "2rem" }} />
                    <div />
                    <Link to="/login">
                        <button
                            className="btn">Login
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button
                            className="btn">Signup
                        </button>
                    </Link>

                </div>
            </section>
            <section id="about">
                <h1>About</h1>
                <p>This is app is meant to make monitoring panels an easier job for the everyday consumer</p>

            </section>
        </div>
    )
}

export default LandingPage
