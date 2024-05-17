import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        404 ERROR
      </Typography>
      <Typography variant="body1" gutterBottom>
        La página que buscas no existe
      </Typography>
      <Button variant="text" color="primary" component={RouterLink} to="/">
        Ir al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
