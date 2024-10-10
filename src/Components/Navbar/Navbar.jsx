import React from 'react';

function Navbar() {
    const handleLogin = () => {
        window.location.href = "./Authentication/signIn.html";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-color">
            <a className="navbar-brand" href="#"><img src="./Assets/brandLogo.png" className="brand-logo" alt="Brand Logo" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#feature-container">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#kiran-container">KIRAN Helpline</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#team-container">Team</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#frequently-asked-questions">FAQ</a>
                    </li>
                </ul>
            </div>

            <div className="signup-container">
                <button className="register-btn" onClick={handleLogin}>Log In</button>
            </div>
        </nav>
    );
}

export default Navbar;
