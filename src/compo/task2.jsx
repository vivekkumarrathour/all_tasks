import React, { useState } from "react";
import { Modal, Box, Button, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const courses = [
  {
    id: "CS101",
    title: "Data Structures",
    instructor: "Dr. Rao",
    notesUrl: "/notes/CS101-week1.pdf",
  },
  {
    id: "CS102",
    title: "Operating Systems",
    instructor: "Prof. Mehta",
    notesUrl: "/notes/CS102-week1.pdf",
  },
  {
    id: "CS103",
    title: "DBMS",
    instructor: "Dr. Sharma",
    notesUrl: "/notes/CS103-week1.pdf",
  },
];

export default function CoursesPage() {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
    setLoading(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📘 Available Courses
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {courses.map((course) => (
          <Card key={course.id} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Instructor: {course.instructor}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => handleOpen(course)}
              >
                View Notes
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" mb={1}>
            {selectedCourse?.title} – Notes
          </Typography>

          {loading && (
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          {selectedCourse && (
            <Box sx={{ flex: 1, border: "1px solid #ddd" }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={selectedCourse.notesUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  onDocumentLoad={() => setLoading(false)}
                />
              </Worker>
            </Box>
          )}

          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            sx={{ mt: 2, alignSelf: "flex-end", borderRadius: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
