# 🦝 Enot Adoption Center

Welcome to **Enot Adoption Center** — a playful and simple CRUD web application where users can upload, view, and delete photos of raccoons.

---

## 🌐 Live Demo

👉 **Try it out here**: [enot-3k1m.onrender.com](https://enot-3k1m.onrender.com)

---

## 📸 What It Does

- 🐾 Upload a new raccoon photo with details  
- 📂 View all uploaded raccoons  
- ❌ Delete any raccoon (public for now)  

---

## 🛠 Tech Stack

### 🔧 Backend
- Java 21  
- Spring Boot 3.4.5  
- PostgreSQL (hosted on Render)  
- JPA (Hibernate)

### 🎨 Frontend
- HTML, CSS, JavaScript (no frameworks)  
- Responsive design (mobile-friendly)

### 🚀 Deployment
- Backend: Render  
- Frontend: Render static site

---

## ✅ Features

- 🔁 **Full CRUD functionality**  
  Create, read, and delete raccoons via a simple UI and RESTful API.

- 📤 **Image upload support**  
  Upload and display raccoon photos using multipart file handling.

- 🗄️ **PostgreSQL integration**  
  Uses a remote PostgreSQL database (via Render) for persistent storage.

- 📱 **Mobile-friendly UI**  
  Responsive CSS ensures the app works smoothly on both desktop and mobile.

- 🌍 **Live frontend and backend**  
  Both parts are live and publicly accessible online.

---

## 🚧 Upcoming Improvements

- 🔒 User authentication (to protect content)  
- 💬 Comments or likes on raccoons  
- 📊 Metrics: how many enots uploaded  
- 🌍 Internationalization or fun raccoon facts  

---

## 🚀 How to Run Locally

### 🔧 Prerequisites
- Java Development Kit (JDK) 21  
- Maven  
- PostgreSQL (local or hosted)

### 📁 1. Clone the Repository
```bash
git clone https://github.com/Max0424/Enot
```
```bash
cd Enot
```
### 🗄️ 2. Set Up the Database
- Create a PostgreSQL database
- Open the file: `src/main/resources/application.properties`
- Replace the values:
```
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```
### 🧪 3. Build and Run the Backend
```bash
mvn clean install
```
```bash
java -jar target/enotadoption-0.0.1-SNAPSHOT.jar
```
### 🌐 4. Run the Frontend
- Go to: `src/main/resources/static`
- Open `index.html` in your browser

### 🧠 Inspiration

“Enot” means raccoon in Russian — cute, curious, and surprisingly lovable.

Also it´s my favorite animal :)

This project started small but evolved into a clean, deployed app to show off my backend and deployment skills.
