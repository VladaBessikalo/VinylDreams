# VinylDreams

**VinylDreams** is a vinyl wishlist app designed to help users build and manage their dream LP collection. Users can browse and save their favorite vinyl records, create personalized wishlists, and remove items as needed. The app provides an intuitive interface with seamless browsing, authentication, and database management.

## ✨ Features

- **🎵 Main Page with Infinite Scroll** 
- **🔐 Authentication & Authorization via Firebase**
- **💿 Rotating**
- **📜 Vinyl Details Page**
- **⭐ Vinyl Dreams List** 
- **➕ Add to/Delete from Vinyl Dreams, managed using Firebase.** 

## 🌍 API
The app fetches vinyl record data from the [Discogs API](https://www.discogs.com/developers/#), providing access to a vast database of music records.

## 🛠 Technologies Used

- **⚛ React + Vite** - Frontend framework powered by Vite for faster development
- **🔥 Firebase** - Authentication, authorization, and database management
- **📀 Discogs API** - Fetching vinyl records data
- **🎭 Material UI** - Pre-built UI components for a modern look
- **🎨 SCSS** - Styling for a responsive and visually appealing interface

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/VinylDreams.git
   cd VinylDreams
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Firebase:**
   - Create a Firebase project.
   - Enable Authentication and Firestore Database.
   - Add Firebase credentials to `.env`:
     ```ini
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repository, create a new branch, and submit a pull request.

---

