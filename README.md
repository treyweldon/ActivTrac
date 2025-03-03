# Activity Tracker App

## Overview
An activity tracker app designed for golf, surfing, and mountain biking, built to enhance the outdoor adventures I love. The app allows users to log activities, track their history, and view weather conditions at the time of their activities.

## Tech Stack
- **Frontend:** React
- **Database:** Supabase
- **Styling:** Tailwind CSS
- **Weather API:** OpenWeather API
- **Icons:** Lucide React

## Core Features
### Dynamic Activity Form
- Users can select from three activity types: **Golf, Surfing, and Mountain Biking**.
- The form dynamically updates based on the selected activity type.
- Each activity type has specific fields:
  - **Golf:** Course Name and Score
  - **Surfing:** Duration and Beach Name
  - **Mountain Biking:** Duration, Distance, and Trail System

### Activity History
- Activities are displayed in a **card-based layout**.
- Cards are **color-coded** by activity type:
  - Green for Golf
  - Blue for Surfing
  - Orange for Mountain Biking
- Activities are sorted **by date**, with the most recent displayed first.

### User Interface
- Clean, **modern UI** using **Tailwind CSS**.
- Fully **responsive design** for mobile and desktop.
- **Tab-based navigation** between "Track Activity" and "Activity History".
- Activity-specific **icons from Lucide React**.

### Authentication & Security
- Full **authentication flow** with **sign-up and sign-in options**.
- **Session management** to persist user login.
- **Logout button** for users to securely sign out.
- **Protected routes** to ensure only authenticated users can access the app.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add your **Supabase** and **OpenWeather API** keys.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Future Improvements
- Add **data visualization** (charts and graphs for activity trends).
- Implement **social features** (friends and shared activities).
- Integrate **GPS tracking** for mountain biking and surfing.

## License
This project is open-source under the MIT License.
