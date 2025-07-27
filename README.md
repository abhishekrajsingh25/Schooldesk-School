# 🏫 School Management System with Student, Teacher, and Admin Panels

This is a full-stack **School Management System** designed to manage and streamline academic workflows across students, teachers, parents, and administrators. It includes dedicated panels for **Students**, **Teachers**, **Parents**, and an **Admin Dashboard** to manage users, attendance, timetables, grades, assignments and announcements.

---

## ✨ Features

### Student Panel:

* Secure login via Clerk
* View personal profile and class timetable
* Check grades, attendance, assignments and announcements
* Responsive and intuitive UI

### Parent Panel:

* Secure login via Clerk
* View personal profile and class timetable
* Check grades, attendance, assignments and announcements
* Responsive and intuitive UI

### Teacher Panel:

* Secure login via Clerk
* Manage subject schedules and mark attendance
* Upload grades and assignments
* View and manage student lists
* Dashboard with performance metrics (via Recharts)

### Admin Panel:

* Secure admin access
* Manage students, teachers, parents and class assignments
* Publish announcements and timetables
* Dashboard with overall school statistics (Recharts)
* Control access and roles via Clerk

---

## 🛠 Tech Stack

### Frontend:

* **Next.js** with **TypeScript**
* **Tailwind CSS** for UI styling
* **Recharts** for visualizing performance and analytics

### Backend:

* **Prisma ORM** for database management
* **PostgreSQL** (via **NeonDB** - serverless cloud DB)
* **Cloudinary** for file/image uploads
* **Clerk** for authentication and user management

### Dev Tools:

* **dotenv** for managing environment variables
* **Zod** (optional) for schema validation

---

## 🚀 Setup Instructions

### Prerequisites:

* Node.js and npm installed
* NeonDB PostgreSQL project and credentials
* Cloudinary and Clerk accounts

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/abhishekrajsingh25/Schooldesk-School.git
   cd Schooldesk-School
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory with the following values:

   ```bash
   DATABASE_URL="your_neondb_postgresql_url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"

   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
   ```
   
4. **Push Prisma Schema to Database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

---

### Running the Application

Start the development server:

```bash
npm run dev
```

The app should now be running on `http://localhost:3000`.

---

## 🌐 Deployment

* **Frontend + Backend**: Deploy the fullstack Next.js app on **Vercel**
* **Database**: Hosted via **NeonDB**
* **Authentication**: Clerk's serverless auth works seamlessly on Vercel
* **File Uploads**: Cloudinary is used for all media uploads

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

---

Feel free to contribute, open issues, or suggest features.
Thank you for exploring this project!

To see the live website:

* 👉 <a href="https://schooldesk-school-abhishekrajsingh.vercel.app/">Click Here</a>

---
