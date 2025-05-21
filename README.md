
# 🔁 Skill Swap Platform – Swap Mate

**Swap Mate** is a web-based platform that enables users to **exchange skills** by connecting individuals who can teach and learn from each other. It uses an **AI-based matching system** to suggest the most relevant swap partners, fostering collaborative learning.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Matching:** Custom logic (coming soon / implemented)
- **Architecture:** RESTful API

---

## 📁 Project Structure


├── config/ # Configuration files (e.g., DB connection)
├── controllers/ # Logic for handling routes
├── data/ # Sample/mock data
├── models/ # Mongoose models
├── node_modules/ # Dependencies
├── routes/ # API route definitions
├── services/ # Business logic and core functionality
├── utils/ # Utility functions

---

## 🚀 Features

- 🔐 User authentication *(handled separately)*
- 🎯 AI-based skill matching system
- 📬 Request system to connect matched users
- 📊 Modular, scalable backend codebase
- 📦 Clean REST API endpoints

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/skill-swap-platform.git
   cd skill-swap-platform
Install dependencies
npm install
Set up environment variables
Create a .env file and add:
MONGODB_URI=your_mongo_connection_string
PORT=5000
