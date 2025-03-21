import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../store/AuthSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {token ? (
          <>
            <h2
              className="mb-3"
              style={{
                color: "#00eaff",
                fontWeight: "bold",
                textShadow: "0px 0px 10px rgba(0, 255, 255, 0.7)",
              }}
            >
              Welcome Back! 🎉
            </h2>
            <p style={{ color: "#99e6ff" }}>You are successfully logged in.</p>
            <Button
              variant="danger"
              className="mt-3 w-100"
              style={{
                backgroundColor: "#ff4c4c",
                border: "none",
                fontWeight: "bold",
                transition: "0.3s",
                boxShadow: "0px 0px 15px rgba(255, 77, 77, 0.8)",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4c4c")}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <h2
              className="mb-3"
              style={{
                color: "#00eaff",
                fontWeight: "bold",
                textShadow: "0px 0px 10px rgba(0, 255, 255, 0.7)",
              }}
            >
              User Profile
            </h2>
            <p style={{ color: "#99e6ff" }}>You are not logged in.</p>
            <Link to="/login">
              <Button
                variant="primary"
                className="mt-3 w-100"
                style={{
                  backgroundColor: "#00eaff",
                  border: "none",
                  fontWeight: "bold",
                  transition: "0.3s",
                  boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.8)",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#00bcd4")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00eaff")}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
