# Ad Insights Explorer Lite

Ad Insights Explorer Lite is a modern dashboard for analyzing advertising campaign data. It features a React frontend and a FastAPI backend, providing real-time anomaly detection and insightful summaries of ad posts. The project is designed for marketers, analysts, and developers who want to quickly identify unusual patterns and gain actionable insights from campaign data.

---

## Features

- **Anomalies Table:** Detects and displays posts with anomalies such as short titles, duplicate titles, and bot-like behavior.
- **Summary Panel:** Highlights top users by unique word usage and trending keywords in ad titles.
- **Modern UI:** Responsive, accessible, and visually appealing interface built with Tailwind CSS and React.
- **API Integration:** Fetches and processes data from external sources using FastAPI and httpx.
- **Filtering & Sorting:** Easily filter anomalies by user and sort by different criteria.
- **Extensible Architecture:** Modular codebase for easy customization and extension.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.8+)
- [pip](https://pip.pypa.io/en/stable/)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/ad-insights-explorer-lite.git
cd ad-insights-explorer-lite
```

# Backend Setup (FastAPI)

```bash
cd app
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
python3 -m uvicorn app.main:app --reload # For Development
```

> The backend will start at http://127.0.0.1:8000.

# Frontend Setup (React)

```bash
cd ../frontend
npm install
npm run dev
```

> The frontend will start at http://localhost:5173.

# Usage

1. Ensure both backend and frontend servers are running.
2. Open http://localhost:5173 in your browser.
3. Explore the dashboard to view campaign summaries and detected anomalies.
