# Cross-Platform Tide Watch (POC)

A "Backend-First" Tide Prediction Application that provides 48-hour tide forecasts, offline capabilities, and dynamic location selection. Built with a robust Python FastAPI backend and a responsive React frontend.

## Tech Stack

- **Backend**: Python 3.11, FastAPI, SQLAlchemy, SQLite, Pydantic, Httpx
- **Frontend**: React 18, TypeScript, Vite, Recharts, Axios
- **Database**: SQLite (local persistence)
- **External API**: Open-Meteo Marine API

## Features

- **48h Forecast**: Visualizes tide height predictions for the next 48 hours.
- **Offline Mode**: Automatically caches data to `localStorage` and falls back to it when offline, with visual indicators.
- **Favorites**: Save up to 3 frequently visited locations for quick access.
- **Geolocation**: "Near Me" functionality to quickly find tides for your current location.
- **Dynamic Location**: Search for tide data by latitude and longitude.

## Quick Start

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will start at `http://127.0.0.1:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:5173`.

## License

This project is a Proof of Concept (POC).
