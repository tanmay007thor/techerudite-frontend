import { useState } from "react";
import { registerUser } from "../services/authService";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", success: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ ...formData, role: "customer" });
      setSnackbar({ open: true, message: "Customer registered successfully!", success: true });
      setFormData({ first_name: "", last_name: "", email: "", password: "" });
    } catch (error) {
      setSnackbar({ open: true, message: "Registration failed. Try again!", success: false });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Customer Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="first_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbar.success ? "green" : "red",
          },
        }}
      />
    </Container>
  );
};

export default CustomerRegister;
