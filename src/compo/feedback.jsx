/*

import React, { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Grid,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Slider,
  FormGroup,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  LinearProgress,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Single-file app that provides /feedback route rendering <FeedbackForm />
export default function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#00695c" ,
          },
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 20,
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route
              path="/"
              element={
                <Box textAlign="center">
                  <Typography variant="h4" gutterBottom>
                    Welcome
                  </Typography>
                  <Button component={Link} to="/feedback" variant="contained">
                    Go to Feedback Form
                  </Button>
                </Box>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function FeedbackForm() {
  // controlled state for each field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [recommend, setRecommend] = useState("");
  const [rating, setRating] = useState(0);
  const [pace, setPace] = useState(5);
  const [worked, setWorked] = useState({ Lectures: false, Labs: false, Assignments: false, Projects: false, Others: false });
  const [comments, setComments] = useState("");
  const [consent, setConsent] = useState(false);

  // UI state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  // Validation state (live)
  const [touched, setTouched] = useState({});

  // helper validators
  const validators = useMemo(() => ({
    name: (v) => v.trim().length >= 2 || "Name must be at least 2 characters",
    email: (v) => /^(?:[\w.%+-]+)@(?:[\w-]+\.)+[A-Za-z]{2,}$/.test(v) || "Enter a valid email",
    course: (v) => !!v || "Please select a course",
    instructor: (v) => v.trim().length > 0 || "Instructor is required",
    recommend: (v) => v === "yes" || v === "no" || "Please choose yes or no",
    rating: (v) => (v >= 1 && v <= 5) || "Please provide a rating",
    pace: (v) => (typeof v === "number" && v >= 0 && v <= 10) || "Pace is required",
    comments: (v) => v.trim().length >= 50 || "Comments must be at least 50 characters",
    consent: (v) => v === true || "Consent is required",
  }), []);

  const errors = useMemo(() => {
    const e = {};
    if (touched.name) {
      const ok = validators.name(name);
      if (ok !== true) e.name = ok;
    }
    if (touched.email) {
      const ok = validators.email(email);
      if (ok !== true) e.email = ok;
    }
    if (touched.course) {
      const ok = validators.course(course);
      if (ok !== true) e.course = ok;
    }
    if (touched.instructor) {
      const ok = validators.instructor(instructor);
      if (ok !== true) e.instructor = ok;
    }
    if (touched.recommend) {
      const ok = validators.recommend(recommend);
      if (ok !== true) e.recommend = ok;
    }
    if (touched.rating) {
      const ok = validators.rating(rating);
      if (ok !== true) e.rating = ok;
    }
    if (touched.pace) {
      const ok = validators.pace(pace);
      if (ok !== true) e.pace = ok;
    }
    if (touched.comments) {
      const ok = validators.comments(comments);
      if (ok !== true) e.comments = ok;
    }
    if (touched.consent) {
      const ok = validators.consent(consent);
      if (ok !== true) e.consent = ok;
    }
    return e;
  }, [touched, name, email, course, instructor, recommend, rating, pace, comments, consent, validators]);

  // overall validity (required fields)
  const requiredValid = useMemo(() => {
    return (
      validators.name(name) === true &&
      validators.email(email) === true &&
      validators.course(course) === true &&
      validators.instructor(instructor) === true &&
      (validators.recommend(recommend) === true) &&
      validators.rating(rating) === true &&
      validators.pace(pace) === true &&
      validators.comments(comments) === true &&
      validators.consent(consent) === true
    );
  }, [name, email, course, instructor, recommend, rating, pace, comments, consent, validators]);

  // progress percent based on required fields satisfied (9 required fields listed)
  const progress = useMemo(() => {
    const checks = [
      validators.name(name) === true,
      validators.email(email) === true,
      validators.course(course) === true,
      validators.instructor(instructor) === true,
      validators.recommend(recommend) === true,
      validators.rating(rating) === true,
      validators.pace(pace) === true,
      validators.comments(comments) === true,
      validators.consent(consent) === true,
    ];
    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
  }, [name, email, course, instructor, recommend, rating, pace, comments, consent, validators]);

  // instructor options for autocomplete - could be fetched but hard-coded per requirements
  const instructors = ["Dr. Sharma", "Prof. Rao", "Ms. Gupta", "Mr. Singh"];

  // handlers
  const handleWorkedChange = (e) => {
    setWorked((p) => ({ ...p, [e.target.name]: e.target.checked }));
  };

  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // mark all touched to show errors
    setTouched({ name: true, email: true, course: true, instructor: true, recommend: true, rating: true, pace: true, comments: true, consent: true });
    if (!requiredValid) return;
    // open preview dialog
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    // build payload
    const payload = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      course,
      instructor,
      recommend,
      rating,
      pace,
      worked: Object.keys(worked).filter((k) => worked[k]),
      comments: comments.trim(),
      consent,
      submittedAt: new Date().toISOString(),
    };

    // read existing
    const existingJson = localStorage.getItem("feedback_submissions");
    let arr = [];
    try {
      arr = existingJson ? JSON.parse(existingJson) : [];
      if (!Array.isArray(arr)) arr = [];
    } catch (err) {
      arr = [];
    }
    arr.push(payload);
    localStorage.setItem("feedback_submissions", JSON.stringify(arr));

    // UI: close dialog, show snackbar, reset form
    setDialogOpen(false);
    setSnackOpen(true);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setInstructor("");
    setRecommend("");
    setRating(0);
    setPace(5);
    setWorked({ Lectures: false, Labs: false, Assignments: false, Projects: false, Others: false });
    setComments("");
    setConsent(false);
    setTouched({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5">Course Feedback</Typography>

        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
        <Typography variant="body2">Completion: {progress}%</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markTouched("name")}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched("email")}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.course}>
              <InputLabel id="course-label">Course *</InputLabel>
              <Select
                labelId="course-label"
                label="Course *"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                onBlur={() => markTouched("course")}
                required
              >
                <MenuItem value="DSA">DSA</MenuItem>
                <MenuItem value="Operating Systems">Operating Systems</MenuItem>
                <MenuItem value="DBMS">DBMS</MenuItem>
                <MenuItem value="Networks">Networks</MenuItem>
              </Select>
              <FormHelperText>{errors.course}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              options={instructors}
              value={instructor}
              onChange={(e, v) => {
                setInstructor(typeof v === "string" ? v : v || "");
              }}
              onInputChange={(e, v) => setInstructor(v)}
              onBlur={() => markTouched("instructor")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Instructor"
                  required
                  error={!!errors.instructor}
                  helperText={errors.instructor}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" error={!!errors.recommend}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Would you recommend this course? *
              </Typography>
              <RadioGroup
                row
                value={recommend}
                onChange={(e) => setRecommend(e.target.value)}
                onBlur={() => markTouched("recommend")}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              <FormHelperText>{errors.recommend}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography component="legend">Overall Rating *</Typography>
            <Rating
              value={rating}
              onChange={(e, v) => setRating(v || 0)}
              onBlur={() => markTouched("rating")}
            />
            {errors.rating && <FormHelperText error>{errors.rating}</FormHelperText>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Pace of the course (0 - 10) *</Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={pace}
                valueLabelDisplay="on"
                min={0}
                max={10}
                onChange={(e, v) => setPace(v)}
                onBlur={() => markTouched("pace")}
              />
              {errors.pace && <FormHelperText error>{errors.pace}</FormHelperText>}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <Typography component="legend">What worked well?</Typography>
              <FormGroup>
                {Object.keys(worked).map((k) => (
                  <FormControlLabel
                    key={k}
                    control={<Checkbox checked={worked[k]} onChange={handleWorkedChange} name={k} />}
                    label={k}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Comments"
              multiline
              minRows={4}
              fullWidth
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              onBlur={() => markTouched("comments")}
              error={!!errors.comments}
              helperText={errors.comments ? errors.comments : `${comments.trim().length} characters`}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl error={!!errors.consent} component="fieldset">
              <FormControlLabel
                control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} onBlur={() => markTouched("consent")} />}
                label="I agree to share this feedback with the instructor"
              />
              <FormHelperText>{errors.consent}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={resetForm}>
                Reset
              </Button>
              <Button variant="contained" type="submit" disabled={!requiredValid}>
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Preview Feedback</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography><strong>Name:</strong> {name}</Typography>
            <Typography><strong>Email:</strong> {email}</Typography>
            <Typography><strong>Course:</strong> {course}</Typography>
            <Typography><strong>Instructor:</strong> {instructor}</Typography>
            <Typography><strong>Recommend:</strong> {recommend}</Typography>
            <Typography><strong>Rating:</strong> {rating}</Typography>
            <Typography><strong>Pace:</strong> {pace}</Typography>
            <Typography><strong>Worked well:</strong> {Object.keys(worked).filter(k=>worked[k]).join(", ") || "(none)"}</Typography>
            <Typography><strong>Comments:</strong></Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{comments}</Typography>
            <Typography><strong>Consent:</strong> {consent ? "Yes" : "No"}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: "100%" }}>
          Feedback submitted — saved locally.
        </Alert>
      </Snackbar>
    </Box>
  );
}
                

*/




import React, { useState } from 'react';
import {
  Container, Grid, Box, Typography, Card, CardContent,
  TextField, Button, Select, MenuItem, FormControl, InputLabel,
  RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup,
  Rating, Chip, Table, TableHead, TableBody, TableRow, TableCell,
  Autocomplete
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommendIcon from '@mui/icons-material/ThumbUpAlt';
import CloseIcon from '@mui/icons-material/ThumbDownAlt';

const theme = createTheme({
  palette: {
    primary: { main: '#673AB7' },      // deep purple
    secondary: { main: '#00B0FF' },    // sky blue
    background: { default: '#f3f3fe' },
    success: { main: '#43a047' },
    error: { main: '#e53935' }
  }
});

const courseOptions = [
  'Data Structures', 'Operating Systems', 'Algorithms', 'Database Systems'
];
const instructorOptions = [
  'Dr. Smith', 'Dr. Iyer', 'Prof. Johnson', 'Dr. Williams'
];
const feedbackSample = [
  {
    name: 'John Doe', course: 'Data Structures', instructor: 'Dr. Smith',
    rating: 4, recommend: true
  },
  {
    name: 'Jane Smith', course: 'Algorithms', instructor: 'Prof. Johnson',
    rating: 3, recommend: false
  }
];

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', course: '', instructor: '',
    recommend: '', rating: 0, pace: 0, worked: [],
    comments: ''
  });
  const [submissions, setSubmissions] = useState(feedbackSample);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleWorkedChange = (e) => {
    const { value } = e.target;
    const newWorked = form.worked.includes(value)
      ? form.worked.filter(w => w !== value)
      : [...form.worked, value];
    setForm({ ...form, worked: newWorked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissions([{...form}, ...submissions]);
    setForm({
      name: '', email: '', course: '', instructor: '',
      recommend: '', rating: 0, pace: 0, worked: [], comments: ''
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{
      minHeight: '100vh', py: 6,
      background: 'linear-gradient(120deg, #f3f3fe, #e3f2fd 85%)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* --- Left Panel: Form --- */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 5, boxShadow: 3, p:2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}>
                  Submit Feedback
                </Typography>
                <form onSubmit={handleSubmit} autoComplete="off">
                  {/* Name and Email */}
                  <TextField
                    label="Student Name" name="name" value={form.name}
                    onChange={handleFormChange} fullWidth required
                    margin="dense" color="secondary"
                  />
                  <TextField
                    label="Email Address" name="email" value={form.email}
                    onChange={handleFormChange} fullWidth required
                    type="email" margin="dense" color="secondary"
                  />
                  {/* Course Select */}
                  <FormControl fullWidth margin="dense" required color="secondary">
                    <InputLabel>Course</InputLabel>
                    <Select
                      label="Course" name="course" value={form.course}
                      onChange={handleFormChange}
                    >
                      {courseOptions.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Instructor Autocomplete */}
                  <Autocomplete
                    options={instructorOptions}
                    value={form.instructor}
                    onChange={(_, v) => setForm({ ...form, instructor: v||'' })}
                    renderInput={(params) =>
                      <TextField {...params} label="Instructor" required margin="dense" color="secondary"/>
                    }
                    sx={{ mt: 1, mb: 1 }}
                  />
                  {/* Recommend */}
                  <Typography sx={{ mt:2, mb:0.5 }}>Would you recommend this course?</Typography>
                  <RadioGroup row name="recommend" value={form.recommend} onChange={handleFormChange}>
                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes"/>
                    <FormControlLabel value="no" control={<Radio color="primary"/>} label="No"/>
                  </RadioGroup>
                  {/* Rating & Pace */}
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item xs={6}>
                      <Typography>Overall Rating</Typography>
                      <Rating
                        value={Number(form.rating)}
                        onChange={(_, n) => setForm({ ...form, rating: n })}
                        color="primary"
                        icon={<FavoriteIcon fontSize="inherit" color="secondary"/>}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Pace of Course</Typography>
                      <Rating
                        value={Number(form.pace)}
                        max={5}
                        onChange={(_, n) => setForm({ ...form, pace: n })}
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                  {/* What worked well */}
                  <Typography sx={{ mt: 2 }}>What worked well?</Typography>
                  <FormGroup row>
                    {['Lectures', 'Labs', 'Assignments', 'Projects', 'Others'].map(opt =>
                      <FormControlLabel
                        control={<Checkbox checked={form.worked.includes(opt)} onChange={handleWorkedChange} value={opt} color="secondary"/>}
                        label={opt} key={opt}
                      />
                    )}
                  </FormGroup>
                  {/* Comments */}
                  <TextField
                    label="Comments" name="comments" value={form.comments}
                    onChange={handleFormChange} fullWidth multiline rows={2}
                    margin="dense" color="secondary"
                    sx={{ mt: 2.5 }}
                  />
                  <Button
                    type="submit" variant="contained" color="primary" fullWidth
                    sx={{ mt:3, fontWeight: 600, py:1.4, borderRadius: 3, fontSize: '1rem'}}
                  >
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          {/* --- Right Panel: Submissions --- */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 5, boxShadow: 3, p:2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 600 }}>Recent Feedback</Typography>
                  <Chip label={submissions.length} color="secondary" sx={{ ml: 2, fontWeight: 600 }}/>
                </Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Course</b></TableCell>
                      <TableCell><b>Instructor</b></TableCell>
                      <TableCell align="center"><b>Rating</b></TableCell>
                      <TableCell align="center"><b>Recommend</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submissions.map((s, i) => (
                      <TableRow key={i}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.course}</TableCell>
                        <TableCell>{s.instructor}</TableCell>
                        <TableCell align="center">
                          <Rating value={Number(s.rating)} readOnly color="primary"/>
                        </TableCell>
                        <TableCell align="center">
                          {s.recommend === 'yes' || s.recommend === true
                            ? <Chip icon={<RecommendIcon/>} label="Yes" color="success" variant="outlined" sx={{fontWeight:'bold'}}/>
                            : <Chip icon={<CloseIcon/>} label="No" color="error" variant="outlined"/>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </ThemeProvider>
  );
}
