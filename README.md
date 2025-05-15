# TravelGPT

A React + Vite app that uses AI to generate personalized trip itineraries based on your destination, budget, duration, and number of travelers.

## 🚀 Features

- Plan trips by providing location, days, budget, and travelers
- AI-powered itinerary generation via OpenAI
- Save and view past trips stored in Firebase Firestore
- Google OAuth sign-in for personalized experience
- Light/Dark theme support with Tailwind CSS
- Responsive, animated UI with Framer Motion

## 🛠 Tech Stack

- React 18 & Vite
- Tailwind CSS
- Firebase Firestore
- OpenAI / Google Generative AI
- React Router v7
- Google OAuth (`@react-oauth/google`)
- Framer Motion
- ShadCN UI & Radix Dialog
- Sonner for toasts

## 🔧 Installation

1. Clone the repo  
   `git clone https://github.com/yourusername/travelgpt.git`
2. Install dependencies  
   `cd travelgpt && npm install`
3. Create a `.env` file at project root:  
   ```env
   VITE_GOOGLE_AUTH_CLIENT_ID=your-google-client-id
   VITE_OPENAI_API_KEY=your-openai-api-key
   ```
4. Start the dev server  
   `npm run dev`

## 📂 Project Structure

```
src/
├── components/ui/      UI primitives (Button, Dialog, Input, ThemeProvider)
├── create-trip/        Trip creation page
├── view-trip/          AI-generated itinerary viewer
├── my-trips/           List of saved trips
├── service/            API and Firebase configuration
├── App.jsx             Main application wrapper
├── main.jsx            Entry point with router & theme
└── index.css           Global styles
```

## 🔑 Environment Variables

- `VITE_GOOGLE_AUTH_CLIENT_ID` – OAuth client ID for Google sign-in  
- `VITE_OPENAI_API_KEY` – API key for OpenAI or Google Generative AI

## 📦 Scripts

- `npm run dev` – start development server  
- `npm run build` – build for production  
- `npm run preview` – preview production build  
- `npm run lint` – run ESLint

## 🤝 Contributing

Feel free to open issues or submit pull requests. Please follow the existing code style and add tests where applicable.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
