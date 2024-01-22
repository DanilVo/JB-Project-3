import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function DragDropFileUpload({ onFileUpload }: any) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onFileUpload(event.dataTransfer.files[0]);
    }
  };

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <Paper
      variant="outlined"
      onDragOver={(e) => {
        console.log(e);
        handleDragOver;
      }}
      onDragLeave={(e) => {
        console.log(e);
        handleDragLeave;
      }}
      onDrop={handleDrop}
      style={{
        border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
        padding: 20,
        textAlign: "center",
        cursor: "pointer",
        background: dragOver ? "#eee" : "#fafafa",
      }}
    >
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(e) => {
          console.log(e);
          handleChange;
        }}
      />
      <label htmlFor="raised-button-file">
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <CloudUploadIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Typography>
            Drag and drop files here or click to select files
          </Typography>
        </Box>
      </label>
    </Paper>
  );
}
