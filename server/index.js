import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;

app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Multer to preserve the original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/"); // Save the file to the uploads folder
  },
  filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  cb(null, `${uniqueSuffix}-${file.originalname}`);
},
});

const upload = multer({ storage: storage });


// API route to fetch all pre-available style images from './uploads/pre-avail/'
app.get("/api/style-images", (req, res) => {
  const preAvailFolder = path.join(__dirname, "uploads/pre-avail/");
  
  // Read all files in the pre-available folder
  fs.readdir(preAvailFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }
    
    // Filter to include only image files (you can add more image extensions as needed)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

    // Create array of URLs for each image
    const imageUrls = imageFiles.map(file => `http://localhost:5000/uploads/pre-avail/${file}`);
    
    res.json({ images: imageUrls });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});