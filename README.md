# 🖼️ Neural Style Transfer Web App

A web-based application for Neural Style Transfer (NST), built with a unique tech stack that merges **MERN (MongoDB, Express.js, React.js, Node.js)** with a **Flask + Python + PyTorch** backend for performing the actual style transfer using a pre-trained deep learning model.

> This was one of my first explorations into AI/ML — even though I didn’t know machine learning at the time. I followed a tutorial by **Aleksa Gordić** (The AI Epiphany) and adapted the code for my own full-stack web application.

---

## 🎯 What It Does

This app lets users:
- Upload a **content image** (like a photo of a person)
- Choose or upload a **style image** (like a painting)
- Set an **intensity level**
- Click "Generate" and receive a stylized image (e.g., your photo painted in Van Gogh's style)

---

## 🧠 My Learning Journey

I had no machine learning background when I started this. I came across an amazing tutorial on YouTube by **Aleksa Gordić** and used his [GitHub repo](https://github.com/gordicaleksa/pytorch-neural-style-transfer) as the base for the style transfer logic.

From there:
- I learned how to run a VGG19-based style transfer model
- Built a Flask API around it
- Connected that API to an Express backend
- Finally, used React on the frontend to make it interactive

> All the MERN stack integration, Express logic, and frontend was built by me.

---

## 🖼️ Flow Overview

Below is how the full stack works:

```

React (Frontend) <-> Express.js (Backend) <-> Flask (NST API) <-> PyTorch (VGG19 Model)

````

Or more visually:

1. **User uploads images + sets intensity (React)**
2. **Express backend receives data and forwards it to Flask**
3. **Flask uses PyTorch to run style transfer using pre-trained VGG19**
4. **Generated image is saved on disk**
5. **Flask sends back path → Express sends it → React renders it**

📌 See included flowchart: `Project/NST Flowchart Final.pdf`

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- Upload UI + intensity slider
- Image preview + download option

### Backend:
- **Express.js** (Node.js)
  - Handles file uploads
  - Communicates with Flask
  - Serves the final image to frontend

### Style Transfer API:
- **Flask (Python)**
  - Accepts image files + intensity
  - Preprocesses inputs
  - Uses pre-trained VGG19 NST model from PyTorch
  - Saves and returns the generated image path

### AI Model:
- **PyTorch VGG19**
  - Based on [gordicaleksa/pytorch-neural-style-transfer](https://github.com/gordicaleksa/pytorch-neural-style-transfer)
  - Minor adaptations made to integrate into Flask API

---

## 🔧 How to Run It Locally

### 1. Clone the repo

```bash
git clone https://github.com/hemantsinghdev/Neural_Style_Transfer_Web_Application
cd nst-web-app
````

### 2. Install and run Flask API

```bash
cd api
pipenv install
pipenv shell
python generatorApi.py
```

Make sure you have:

* Python 3.7+
* PyTorch + torchvision installed
* `Pipenv` for managing dependencies

### 3. Run the Express backend

```bash
cd server
npm install
node index.js
```

### 4. Start the React frontend

```bash
cd client
npm install
npm start
```

---

## 📁 Project Structure
```
NST-WEB-APP/
├── client/           # React frontend
├── server/           # Express backend
├── api/              # Flask + Python (NST logic)
│   ├── models_and_scripts/
│   └── generator_api.py
├── images/
│   ├── uploads/      # Uploaded images
│   └── generated/    # Stylized images
├── Project
└── README.md
```
---

## 🔍 Key Features

* Upload content + style images
* Adjust stylization intensity (1–100)
* Preview output image on frontend
* Download final image
* Realtime feedback loop (via Express + Flask)

---

## 🤯 What I Learned

* How to build a hybrid system with MERN + Python
* Basics of machine learning pipelines
* File handling, API chaining, and response flow
* That it’s okay to **not understand everything at once** — start by integrating pieces
* Using GPU for faster processing

---

## 📌 Mistakes I Made

> At the time, I didn’t know ML or PyTorch. I followed a tutorial and copied the core model logic. But I made it work — and learned a lot while doing it.

This project taught me:

* How hard AI integrations can be
* How powerful open-source code is
* That it’s better to try and fail than never try

I eventually **moved on** from this project after completing MVP, realizing I’d need deeper ML understanding to extend it further.

---

> Created by [Hemant Singh](https://github.com/hemantsinghdev)
> Special thanks to [Aleksa Gordić](https://github.com/gordicaleksa) for the original NST implementation that made this possible.
