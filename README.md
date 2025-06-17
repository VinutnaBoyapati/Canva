# 🖼️ Canvas Builder API with PDF Export

This project is a **Canvas Builder** web application where users can create a canvas, add shapes, text, or images, and **export it as a compressed PDF**. Built with a **React + Vite frontend** and a **Node.js (Express)** backend, it supports dynamic rendering, real-time UI updates, and optimized exports.

---

## 📌 Features

### Backend (Node.js + Express)
- Initialize a canvas with custom size
- Add elements: Rectangle, Circle, Text
- Upload & insert images into the canvas
- Resize images using `sharp` for optimized output
- Export the canvas as a PDF
- Temporary storage for uploaded images and generated PDFs

### Frontend (React + Vite)
- Developed using [Vite](https://vitejs.dev/) for faster development and build
- Element-type dropdown (rectangle, circle, text, image)
- Form inputs dynamically change based on selected type
- Image auto-resize logic to fit within canvas bounds
- Image preview + client-side validation
- "Add" button styled in **blue** with proper enabling/disabling
- State-managed canvas elements list

---

##  Tech Stack

| Layer       | Tech Used                     |
|-------------|-------------------------------|
| Frontend    | React + Vite                  |
| Backend     | Node.js, Express              |
| Drawing     | `canvas` (node-canvas)        |
| PDF Export  | `pdfkit`                      |
| Image Tools | `sharp`, `multer`, `fs`       |

---
## Getting Started

### Backend Setup

```bash
cd backend
npm install
node server.js
```
---
### Frontend Setup (Vite + React)

```bash
cd backend
npm install
node server.js
```
---
## API Overview

### `POST /init`
Initialize a new canvas.

**Request Body:**
```json
{
  "id": "canvas1",
  "width": 800,
  "height": 600
}
```
### `POST /add`
Add a shape or text to the canvas.

**Request Body:**
```json
{
  "id": "canvas1",
  "type": "rectangle",
  "x": 10,
  "y": 20,
  "width": 100,
  "height": 50
}
```
### `POST /upload`
Upload an image to the canvas.
```
FormData Fields:
id: Canvas ID
x, y, width, height: Placement and dimensions
image: Image file to be uploaded
```
### `GET /export?id=canvas1`
Export the current canvas as a PDF file

---
##  Logic Highlights

- **Client-side Image Resizing**  
  Before uploading, image dimensions are auto-adjusted using JavaScript based on the canvas size.

- **Server-side Optimization**  
  Images are compressed using the `sharp` library to ensure optimal size.

- **PDF Generation**  
  The `pdfkit` library creates a downloadable PDF based on all elements added.

- **File Cleanup**  
  After sending the PDF, it is automatically deleted from the server to avoid storage clutter.

---

##  Temp File Handling

- All uploaded images and generated PDFs are temporarily stored in the `/uploads` directory.
- After sending a PDF in response, it is removed using `fs.unlinkSync()` to keep the backend clean.

---

##  Example Flow

1. **Initialize Canvas**  
   `POST /init`

2. **Add Elements** (rectangle, circle, text)  
   `POST /add`

3. **Upload Image**  
   `POST /upload`

4. **Export Canvas as PDF**  
   `GET /export`

---

##  UI Details

- **Dynamic Element Input Fields**  
  Adjust automatically based on the selected type (rectangle, circle, text, image).

- **"Add" Button**   
  - 🚫 Disabled for image uploads unless both a file is selected and image dimensions are calculated

- **User Guidance**  
  Logs and auto-scaling assist users in fitting images into the canvas without distortion.

- **UI Design**  
  Clean, minimal interface using simple HTML + CSS.

- **Responsiveness**  
  Powered by React Hooks for smooth and responsive form behavior.

---

##  Tools & Technologies Used

| Tool / Library | Purpose                                      |
|----------------|----------------------------------------------|
| **Vite**       | Fast dev server + bundler for frontend       |
| **React**      | Frontend framework (with Hooks)              |
| **Axios**      | HTTP client for frontend-backend communication |
| **Express**    | Backend server                               |
| **Sharp**      | Image processing and compression             |
| **PdfKit**     | PDF generation                               |
| **Multer**     | File upload handling on backend              |
| **fs (Node.js)** | File system access for temp handling      |

---
