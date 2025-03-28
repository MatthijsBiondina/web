/**
 * Alert Notification Component
 *
 * Reusable notification alerts for success and error messages
 */

import PropTypes from "prop-types";

// MUI components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AlertNotification({ open, onClose, severity = "success", message = "" }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

// PropTypes definitions
AlertNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]),
  message: PropTypes.string,
};

export default AlertNotification;
