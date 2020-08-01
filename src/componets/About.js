import React from 'react';
import '../styles/About.scss';

export default function About() {
    return (
        <div className='about'>
            <h1 align='center'>Announcer</h1>

            <div>
                This is one of <a href='http://marikkv.github.io'>my</a> project  for portfolio.
            </div>
            <div>
                In this app you can:
                <ul>
                    <li>Sign In with socials.</li>
                    <li>Add, edit and delete announcement.</li>
                </ul>
            </div>
            <div>
                App created with using:
                <ul>
                    <li>React.js (Functional components)</li>
                    <li>Redux</li>
                    <li>Firebase (Firebase Firestore, Firebase Autentication)</li>
                </ul>
            </div>
            <div>
                Additional technologies and libraries used:
                <ul>
                    <li>React Bootstrap</li>
                    <li>React SCSS</li>
                    <li>Animate.css</li>
                    <li>GitHub Pages</li>
                </ul>
            </div>
        </div>
    )
}
