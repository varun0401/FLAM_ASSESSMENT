# HR Dashboard 👥📊

A modern HR dashboard built with **Next.js**, **Tailwind CSS**, and **Zustand**. It allows HRs to view employee data, bookmark employees, analyze performance trends, search/filter users, and manage theme preferences.

## 🚀 Live Demo

[🔗 View Live Site](https://flam-assessment-7ntt.vercel.app/)

---

## 🛠️ Features

- 📋 View and manage employee list (mocked from `randomuser.me`)
- 🌟 Bookmark employees for quick access
- 📈 Analytics dashboard with mocked trends
- 🔍 Search and multi-select filter
- 🌙 Dark/Light mode toggle
- 🔐 Mock Authentication with login/logout
- ➕ Add New Employee (Form)
- 📱 Responsive Design

---

## 📷 Screenshots

### Dashboard View  
![image](https://github.com/user-attachments/assets/c066f347-342a-45fc-82cd-788b3ac55ef1)



### Bookmarks  
![image](https://github.com/user-attachments/assets/d809cb9b-db76-4ecc-a259-c43bb804b22e)



### Analytics  
![image](https://github.com/user-attachments/assets/ae53ae8d-4313-4fdd-96e4-86fee0dcc0a2)

----------------------------------------------------------------------------------------------------------------->

![image](https://github.com/user-attachments/assets/cd1db150-082b-4782-b396-5f6e4255fcec)




---

## 📂 Folder Structure

FLAM_ASSESSMENT/
├── hr-dashboard/
│ ├── app/
│ │ ├── analytics/
│ │ ├── bookmarks/
│ │ ├── employee/[id]/
│ │ ├── login/
│ │ ├── page.js
│ │ └── layout.js
│ ├── components/
│ │ ├── Header.js
│ │ └── EmployeeCard.js
│ ├── hooks/
│ │ └── useEmployees.js
│ ├── store/
│ │ └── useStore.js
│ ├── public/
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── package.json
│ └── README.md

## 📦 Installation & Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/varun0401/FLAM_ASSESSMENT.git
   cd FLAM_ASSESSMENT/hr-dashboard

   
Install dependencies
npm install
npm run dev

Visit http://localhost:3000

🔄 Deployment (Vercel)
Go to vercel.com

Import the GitHub repo

Set project root as:
hr-dashboard

Ensure build command is npm run build and output directory is .next


