#  💳 Visa Rewards AI Platform

## 🚀 Project Overview

Our team developed a full-stack web application for the **Visa Data Analytics Challenge**, where we were tasked with using AI and data insights to help Visa enhance their rewards program. The goal was to make rewards **more personal, engaging, and real-time** by analyzing transaction data and suggesting meaningful rewards while customers are shopping.

Using a **FastAPI backend** with **Pandas** and **CSV-based data processing**, paired with a modern **React frontend**, our platform gives users a personalized dashboard that displays spending trends, top merchants, shopping behavior, and more—making reward suggestions based on real data.

## Check it out here!: https://visarewardplus.netlify.app

---

## 🎯 Prompt

> Visa wants to improve its rewards program by making it more personal and meaningful for each customer. Using the dataset, suggest ways to use AI to analyze people’s spending habits and offer custom rewards or deals in real time while they’re shopping.
>
> Draw insights and use data visualizations (charts, tables, etc.) generated with software like Excel, Tableau, Python, or similar tools to support your case, alongside the AI strategies you propose. Be sure to explain how your idea would work behind the scenes and describe how it could help keep customers engaged and returning to use their Visa cards.

---

## 🧠 Objectives

- View trends in datasets to draw insights and make tailored recommendations.
- Develop a deeper understanding of how AI is used in the **fintech industry**.

---

## 🔧 Technologies Used

### Backend
- **FastAPI** – For API development
- **Pandas** – For data processing and analysis
- **CORS Middleware** – To connect with the React frontend
- **CSV Dataset** – Provided Visa transaction data

### Frontend
- **React** – User interface development
- **Lucide React Icons** – UI enhancements
- **Tailwind CSS** – Styling

---

## 📈 Features

- **User Profile Dashboard**: Displays membership tier, available points, and transaction summaries.
- **Data-Driven Rewards**: Points and offers tailored to each user's top categories and merchants.
- **Backend Insights**: Dynamically fetches analytics per user using FastAPI and CSV data.
- **Smart AI Strategy**:
  - Recommend rewards based on highest spending categories.
  - Surface deals from most visited merchants.
  - Predict high-activity shopping times for real-time offers.
  - Identify recurring transactions to propose subscription-based rewards.

---

## 🗂 File Structure

```bash
📦visa-rewards-platform
 ┣ 📁backend
 ┃ ┣ 📄main.py                     # FastAPI backend with user insight routes
 ┃ ┗ 📄VisaDataFinalComp 2.csv     # Cleaned dataset for analysis
 ┣ 📁frontend
 ┃ ┣ 📄UserProfile.tsx             # React component to display user reward data
 ┃ ┗ 📄...                          # Other frontend components and assets
 ┗ 📄README.md                     # You are here!

🧪 How It Works
Backend Logic (main.py):
Load Visa CSV data using Pandas.

On request (e.g. /user/USER2572), extract that user’s transactions.

Compute:

Total spent

Average transaction

Top merchants & categories

Recurring transaction patterns

Most active shopping times

Return the data as JSON to the frontend.

Frontend Logic (UserProfile.tsx):
Fetch user insights via the FastAPI endpoint.

Display the user’s:

Tier status (Basic, Gold, Platinum)

Available vs. total points

Points history with timestamps

Spending categories and suggested deals (future scope)

📊 AI & Visualization Strategy
Visualization Tools: Python (Matplotlib, Pandas), React charts (future enhancement).

Personalization Engine:

Categories with high frequency get priority in recommendations.

Time-of-day and recurring data help fine-tune when rewards are offered.

Merchant preferences help suggest partnerships or instant cashback deals.


GET /user/USER2572

{
  "user_id": "USER2572",
  "total_spent": 985.20,
  "average_transaction": 35.18,
  "top_merchants": {"Walmart": 12, "Amazon": 9, "Target": 5},
  "top_categories": {"Groceries": 10, "Electronics": 7, "Clothing": 6},
  "recurring_transaction_stats": {"Yes": 5, "No": 28},
  "busiest_times": {"Evening": 15, "Afternoon": 10, "Morning": 8}
}


cd backend
pip install fastapi uvicorn pandas
uvicorn main:app --reload

cd frontend
npm install
npm run dev

💡 Future Enhancements
Integrate AI/ML model to predict future categories and automate reward tiers.

Build user-facing reward recommendation cards.

Add charts and graphs for spending insights using React or D3.js.

Store user history in a real database (e.g., Firebase, PostgreSQL).

🧑‍💻 Team Credits
Developed by jcodes101, izdinkins, itsjustej (github usernames)
Visa Data Analytics Challenge – 2025
