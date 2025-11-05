/*
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RapidTask() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // set a pleasant full-page background and ensure we restore the original on unmount
    const prevBg = document.body.style.background;
    const prevColor = document.body.style.color;
    document.body.style.background =
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #a1c4fd 100%)";
    document.body.style.color = "#1f2937";

    console.log("RapidTask mounted"); // debug

    return () => {
      document.body.style.background = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <Paper
        elevation={8}
        style={{
          width: "100%",
          maxWidth: 520,
          padding: "24px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 10px 30px rgba(16,24,40,0.12)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 2 }}
        >
          Click Save to show a confirmation. Background and styling updated for visibility.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          aria-label="save-button"
          data-testid="save-button"
          style={{
            marginTop: 8,
            padding: "10px 22px",
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Save
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          aria-label="save-snackbar"
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Saved
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}
*/






/*
import React from "react";
import { Stack, Button, Box, Typography } from "@mui/material";

export default function ButtonStackExample() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#0d47a1",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        Choose an Action
      </Typography>

      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0px 4px 10px rgba(25,118,210,0.3)",
            "&:hover": {
              backgroundColor: "#0d47a1",
              boxShadow: "0px 6px 12px rgba(25,118,210,0.4)",
            },
          }}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0px 4px 10px rgba(56,142,60,0.3)",
            "&:hover": {
              backgroundColor: "#1b5e20",
              boxShadow: "0px 6px 12px rgba(56,142,60,0.4)",
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
*/

















/*

import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function DualActionButtons() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          fontWeight: 800,
          color: "#3e2723",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        Take Your Next Step
      </Typography>

      <Stack direction="row" spacing={4}>
        <Button
          variant="contained"
          onClick={() => handleClick("🚀 Action Started!")}
          sx={{
            background: "linear-gradient(90deg, #ff512f, #dd2476)",
            color: "#fff",
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 700,
            borderRadius: "50px",
            textTransform: "none",
            letterSpacing: "0.5px",
            boxShadow: "0 6px 12px rgba(221, 36, 118, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
              boxShadow: "0 8px 16px rgba(221, 36, 118, 0.5)",
            },
          }}
        >
          Start Journey
        </Button>

        <Button
          variant="contained"
          onClick={() => handleClick("🎯 Goal Achieved!")}
          sx={{
            background: "linear-gradient(90deg, #11998e, #38ef7d)",
            color: "#fff",
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 700,
            borderRadius: "50px",
            textTransform: "none",
            letterSpacing: "0.5px",
            boxShadow: "0 6px 12px rgba(56, 239, 125, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(90deg, #56ab2f, #a8e063)",
              boxShadow: "0 8px 16px rgba(56, 239, 125, 0.5)",
            },
          }}
        >
          Complete Mission
        </Button>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={handleClose}
          sx={{
            fontWeight: 600,
            borderRadius: "10px",
            bgcolor: "#283593",
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
*/



/*
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function EchoTextField() {
  const [value, setValue] = useState("");
  const MAX = 200;

  const handleChange = (e) => {
    const next = e.target.value.slice(0, MAX);
    setValue(next);
  };

  const clear = () => setValue("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
        fontFamily: "'Poppins', sans-serif",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: { xs: "90%", sm: 520 },
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(103,58,183,0.25)",
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.3,
              color: "#4a148c",
              textAlign: "center",
            }}
          >
            Share Your Thoughts 💭
          </Typography>

          <TextField
            value={value}
            onChange={handleChange}
            placeholder="Write something inspiring..."
            label="Your Message"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            inputProps={{ maxLength: MAX }}
            helperText={`${value.length}/${MAX} characters`}
            FormHelperTextProps={{ sx: { color: "#6a1b9a", mt: 1 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear text"
                    onClick={clear}
                    size="small"
                    disabled={!value}
                    sx={{ color: "#6a1b9a" }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                background: "#fff",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                transition: "all 0.2s ease",
                "&:focus-within": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(106,27,154,0.2)",
                },
              },
            }}
          />

          <Box
            sx={{
              mt: 1,
              p: 2,
              borderRadius: 2,
              background: "linear-gradient(180deg, rgba(106,27,154,0.05), rgba(26,35,126,0.05))",
              border: "1px solid rgba(106,27,154,0.1)",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: value ? "#4a148c" : "text.secondary",
                fontStyle: value ? "normal" : "italic",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {value || "✨ Your live preview will appear here..."}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: "#4a148c",
              mt: 1,
              textAlign: "right",
              fontWeight: 500,
            }}
          >
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

*/








import React from "react";
import { Avatar, Box } from "@mui/material";

export default function HardcodedAvatar() {
  const name = "Pragya kumari"; // <-- change the hardcoded name here
  

  // Create initials from first + last word (e.g., "Vivek Kumar Rathour" -> "PK")
  const initials = (() => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: 28 }}>
        {initials}
      </Avatar>
    </Box>
  );
}



