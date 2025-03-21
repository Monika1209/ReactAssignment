import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert, Container, Card } from "react-bootstrap";
import { loginUser } from "../store/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // Success alert state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Auth State Changed:", isAuthenticated);
    if (isAuthenticated) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Auto-hide after 3 sec
    }
  }, [isAuthenticated]); // Watch for isAuthenticated changes

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#000" }} // Black Background
    >
      <Card
        style={{
          background: "rgba(20, 20, 20, 0.9)", // Dark card background
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.7)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ color: "#00eaff", fontWeight: "bold" }}>Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {showSuccess && <Alert variant="success">Login Successful! 🎉</Alert>} {/* Success Alert */}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#00eaff" }}>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "#111", // Darker input background
                color: "#00eaff",
                border: "1px solid rgba(0, 255, 255, 0.5)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#00eaff" }}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: "#111", // Darker input background
                color: "#00eaff",
                border: "1px solid rgba(0, 255, 255, 0.5)",
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mb-2"
            style={{
              backgroundColor: "#00eaff",
              border: "none",
              fontWeight: "bold",
              boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.8)",
            }}
          >
            Login
          </Button>
        </Form>

        {/* Back to Profile Button */}
        {isAuthenticated && (
          <Button
            variant="secondary"
            className="w-100 mt-2"
            onClick={() => navigate("/profile")}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(0, 255, 255, 0.5)",
              color: "#00eaff",
              boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
            }}
          >
            Back to Profile
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default Login;
