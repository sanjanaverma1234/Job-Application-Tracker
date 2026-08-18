# 💼 Job Application Tracker

A modern and responsive web application that helps users manage, track, and organize their job applications in one place.

The application allows users to add, edit, delete, search, and filter job applications. All application data is stored in the browser using LocalStorage, so the data remains available even after refreshing the page.

---

## 🚀 Features

- ➕ Add new job applications
- ✏️ Edit existing applications
- 🗑️ Delete applications
- 🔍 Search applications by company name or job role
- 🎯 Filter applications by status
- 📊 Dashboard with application statistics
- 💾 LocalStorage data persistence
- 🔗 Add and open job links
- 📝 Add notes for applications
- 📅 Track application dates
- 🏷️ Application status badges
- 📱 Responsive design
- ⚡ Fast and lightweight frontend

---

## 📊 Dashboard

The dashboard displays the current application statistics:

- **Total Applications**
- **Applied**
- **Interview**
- **Selected**

The statistics automatically update whenever an application is added, edited, or deleted.

---

## 🏷️ Application Status

The tracker supports four application statuses:

| Status | Description |
|---|---|
| 🔵 Applied | Application has been submitted |
| 🟠 Interview | Application has reached the interview stage |
| 🟢 Selected | Candidate has been selected |
| 🔴 Rejected | Application was rejected |

---

## 📝 Application Details

Each application can contain:

- Company Name
- Job Role
- Location
- Job Type
- Application Date
- Application Status
- Job Link
- Notes

---

## 🔍 Search & Filter

Users can search applications by:

- Company Name
- Job Role

Applications can also be filtered by:

- All
- Applied
- Interview
- Selected
- Rejected

---

## 💾 Data Storage

This project uses **LocalStorage** to store application data directly in the browser.

This provides:

- Automatic data saving
- Data persistence after page refresh
- Automatic updates after editing
- Automatic removal after deleting
- No backend or database requirement

> **Note:** Clearing the browser's LocalStorage or site data will remove the saved applications.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Responsive Web Design

---

## 📂 Project Structure

```text
Job-Application-Tracker/
│
├── index.html
├── Style.css
├── Main.js
└── README.md

⚙️ How to Run
Step 1: Clone the Repository
git clone YOUR_REPOSITORY_URL
Step 2: Open the Project

Open the project folder in VS Code.

Step 3: Run the Application

Open index.html in your browser.

You can also use the Live Server extension in VS Code.

💻 How to Use
Add Application
Click the + Add Application button.
Enter the company name.
Enter the job role.
Enter the location.
Select the job type.
Select the application date.
Select the application status.
Add the job link if available.
Add notes if required.
Click Save Application.
Edit Application
Find the application you want to update.
Click the Edit button.
Update the required information.
Click Update Application.
Delete Application
Find the application you want to remove.
Click the Delete button.
Confirm the deletion.
Search Applications

Enter a company name or job role in the search box to find applications quickly.

Filter Applications

Use the status buttons to filter applications based on their current status.

📱 Responsive Design

The application is designed to work across different screen sizes:

💻 Desktop
💻 Laptop
📱 Tablet
📱 Mobile

Responsive CSS media queries are used to provide a user-friendly experience on different devices.

🎯 Project Goals

This project was created to practice and demonstrate:

HTML and CSS
JavaScript
DOM Manipulation
LocalStorage
CRUD Operations
Search and Filtering
Responsive Web Design
Frontend Project Development
🔮 Future Improvements

Possible future improvements include:

🔔 Application reminders
📧 Email notifications
📈 Application analytics and charts
🌙 Dark mode
📤 Export applications to CSV
📄 Export applications to PDF
📅 Interview scheduling
🔐 User authentication
☁️ Cloud database integration
👤 User profiles
🔄 Backend API integration
🌟 Why This Project?

Managing multiple job applications can become difficult when keeping track of companies, job roles, application dates, interviews, and results.

The Job Application Tracker provides a simple and organized dashboard where users can manage their job applications efficiently.

👩‍💻 Author

Sanjana Verma

BCA Student | Aspiring Software Engineer

📌 Project Type

Frontend Web Development Project

Built using HTML, CSS, and JavaScript for learning, practice, and portfolio development.

Thank you for checking out the project! ❤️

