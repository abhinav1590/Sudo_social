import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import Posts from './posts';
import Comments from './comments';
import Likes from './likes';
import LoginForm from './loginform';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts/')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

    fetch('http://127.0.0.1:8000/api/posts/${postId}/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));

    fetch('http://127.0.0.1:8000/api/posts/${postId}/likes')
      .then(response => response.json())
      .then(data => setLikes(data))
      .catch(error => console.error('Error fetching likes:', error));
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" render={() => (
          loggedIn ? (
            <div>
              <h2>Posts</h2>
              <Posts posts={posts} />
              <h2>Comments</h2>
              <Comments comments={comments} />
              <h2>Likes</h2>
              <Likes likes={likes} />
            </div>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )
        )} />
        <Route exact path="/login" render={() => (
          loggedIn ? (
            <Navigate to="/" />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )
        )} />
      </Routes>
    </Router>
  );
}

export default App;