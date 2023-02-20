import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>Malik Ibrahim - Full Stack Software Developer</h3>
        <p>DISCO is a social media app where you and your friends can share all your favorite music and find your new favorite songs all in one place.</p>
        <h3>Technologies Used:</h3>
        <p>React, Node.js, Express.js, Javascript, PostgresSQL, Redux/Saga, Postman, Material UI, CSS, HTML, REST API, Spotify Web API</p>
        <h3>Special Thanks</h3>
        <p>Prime Digital Academy, my instructors, the Vonnegut Cohort, and all my family and friends that supported me so far!</p>
      </div>
    </div>
  );
}

export default AboutPage;
