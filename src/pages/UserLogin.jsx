import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Snackbar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", success: true });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      console.log("Login Response:", response.data); 
      console.log("User Data:", response.data.user); 
  
      if (!response.data?.user || !response.data?.token) {
        setSnackbar({ open: true, message: "Invalid credentials", success: false });
        return;
      }
  
      const { user, token } = response.data;
  
      
      localStorage.setItem("authToken", token);
  
      
      login({ ...user, token });
      navigate("/dashboard");
      setSnackbar({ open: true, message: `Welcome, ${user.first_name}!`, success: true });
    } catch (error) {
      console.error("Login Error:", error?.response?.data || error.message);
      setSnackbar({ open: true, message: "Invalid credentials", success: false });
    }
    setLoading(false);
  };
  

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, textAlign: "center", boxShadow: 5, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>User Login</Typography>
          <form onSubmit={handleSubmit}>
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": { backgroundColor: snackbar.success ? "green" : "red" },
        }}
      />
    </Container>
  );
};

export default UserLogin;
