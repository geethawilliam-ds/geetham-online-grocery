**Geetham Online Grocery Platform**

A full-stack online grocery application built using React, Next.js, MongoDB with integrated machine learning–based recommendation features.

**🚀 Tech Stack**

Frontend: React, Next.js
Backend: Next.js API Routes (Node.js runtime)
Database: MongoDB
Machine Learning: Python, FP-Growth, Scikit-learn

**🏗 Architecture**

This project uses Next.js API routes to handle backend functionality within the same application.

API endpoints are located in:

frontend/pages/api/


These routes handle:

Product management

Cart operations

Order processing

Database communication

The machine learning recommendation engine is developed separately in the ml/ directory and can be integrated with backend APIs.

**📂 Project Structure**
<img width="609" height="398" alt="image" src="https://github.com/user-attachments/assets/d5e340a6-746c-4754-977d-1eb82b41e9f0" />



geetham-online-grocery/
│
├── frontend/      # Next.js full-stack application
│   ├── pages/
│   │   ├── api/   # Backend API routes
│   │   └── index.js
│   ├── components/
│   └── styles/
│
├── ml/            # Machine learning recommendation logic
├── screenshots/   # UI screenshots
└── README.md

**✨ Features**

Product listing and search

Cart and order management

ML-based product recommendations

Responsive UI

**📸 Screenshots**
Home Page

Product Listing

Cart

**Recommendations**

🛠 **Installation**
# Clone repository
git clone https://github.com/geethawilliam-ds/geetham-online-grocery.git

# Frontend + Backend (Next.js)
cd frontend
npm install
npm run dev

# Machine Learning
cd ../ml
pip install -r requirements.txt
python recommendation.py

📌 **Project Status**

🚧 Under active development
