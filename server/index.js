import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import axios from "axios";
import deleteOldFiles from "./deleteOldFiles.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8000;

app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../images/uploads")));

// Configure Multer to preserve the original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'contentImage' ? 'contentImages' : 'styleImages';
    const uploadFolder = path.join(__dirname, "../images/uploads", folder);
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}
    cb(null, uploadFolder); // Save the file to the uploads folder
  },
  filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  cb(null, `${uniqueSuffix}-${file.originalname}`);
},
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

// Schedule the cron job to run every hour
cron.schedule('0 * * * *', () => {
  const contentImagesFolder = path.join(__dirname, "../images/uploads/contentImages");
  const styleImagesFolder = path.join(__dirname, "../images/uploads/styleImages");

  console.log("Running scheduled task: Deleting files older than 1 hour...");

  deleteOldFiles(contentImagesFolder);
  deleteOldFiles(styleImagesFolder);
});

// API to handle image and data upload
app.post("/upload", upload.fields([
  { name: "styleImage", maxCount: 1 },
  { name: "contentImage", maxCount: 1 }
]), async (req, res) => {
  try {
    let styleImagePath = null;
    let styleImageUrl = req.body.styleImageUrl || null;
    const contentImage = req.files['contentImage'] ? req.files['contentImage'][0] : null;
    const intensity = req.body.intensity;

    if (styleImageUrl) {
      // Case 1: styleImageUrl is provided
      const urlParts = styleImageUrl.split('/');
  const filename = urlParts[urlParts.length - 1];
  styleImagePath = `../images/uploads/pre-avail/${filename}`;
    } else if (req.files['styleImage']) {
      // Case 2: styleImage is uploaded
      const styleImage = req.files['styleImage'][0];
      styleImagePath = `../images/uploads/styleImages/${styleImage.filename}`;  // Create a URL for the uploaded image
    } else {
      return res.status(400).json({ message: "Style image is required" });
    }

    if (!contentImage) {
      return res.status(400).json({ message: "Content image is required" });
    }
    const contentImagePath = `../images/uploads/contentImages/${contentImage.filename}`;  // URL for content image

    // Return success response with URLs to the uploaded images
    res.json({
      message: "Images uploaded successfully",
      styleImagePath: styleImagePath,
      contentImagePath: contentImagePath,
      intensity: intensity,
    });
    console.log("Image URLs:", styleImagePath, contentImagePath);

     const pythonApiUrl = 'http://127.0.0.1:5000/style-transfer';
    try {
      const response = await axios.post(pythonApiUrl, {
        styleImage: styleImagePath,
        contentImage: contentImagePath,
        intensity: intensity,
      });

      if (response.data && response.data.finalImageUrl) {
        console.log("Style transfer completed successfully:", response.data.finalImageUrl);
        // Here you could emit a WebSocket event to notify the frontend
      } else {
        // console.error("Error in style transfer:", response.data);
        console.error("Error in style transfer");
      }
    } catch (apiError) {
      // console.error("Error calling Python API:", apiError);
      console.error("Error calling Python API");
    }

  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API route to fetch all pre-available style images from './uploads/pre-avail/'
app.get("/api/style-images", (req, res) => {
  const preAvailFolder = path.join(__dirname, "../images/uploads/pre-avail");
  
  fs.readdir(preAvailFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }
    
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    const imageUrls = imageFiles.map(file => `http://localhost:8000/uploads/pre-avail/${file}`);
    
    res.json({ images: imageUrls });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});