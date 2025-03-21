import React from 'react';

function ErrorPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', textAlign: 'center' }}>
      <h1 className="display-1 fw-bold" style={{ fontSize: '8rem', textShadow: '3px 3px 10px rgba(255, 0, 0, 0.6)' }}>404</h1>
      <p className="lead mb-4" style={{ fontSize: '1.5rem', opacity: '0.8' }}>Oops! The page you're looking for doesn't exist.</p>
      <a className="btn btn-danger px-4 py-2" href="/" style={{ borderRadius: '30px', boxShadow: '2px 2px 15px rgba(255, 0, 0, 0.5)' }}>Back to Home</a>
    </div>
  );
}

export default ErrorPage;