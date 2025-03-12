import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { Container, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  const { user } = useContext(AuthContext); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user); 
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser)); 
      }
    }
  }, [user]);

  if (!currentUser) return <Typography>Loading...</Typography>; 

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color={currentUser.role === "admin" ? "red" : "blue"}>
            {currentUser.role === "admin" ? "You are Admin" : "You are Customer"}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>User Details:</Typography>
          <Typography>Name: {currentUser.first_name}</Typography>

          <Typography>Email: {currentUser.email}</Typography>
          <Typography>Role: {currentUser.role}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
