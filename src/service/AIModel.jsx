import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hoteladdress, Price, hotelimageurl, geo coordinates, rating, descriptions and suggest itinerary with time(as 1:00 PM - 3:00 PM format), placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotels": [\n    {\n      "HotelName": "The D Las Vegas",\n      "HotelAddress": "3151 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "Price": "$$",\n      "hotelImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/The_D_Las_Vegas_exterior.jpg/1200px-The_D_Las_Vegas_exterior.jpg",\n      "geoCoordinates": "36.1197° N, 115.1623° W",\n      "rating": "4.0",\n      "description": "Budget-friendly hotel with a convenient location on the Strip. Offers basic amenities and is a good value for the price."\n    },\n\t{\n\t\t"HotelName": "Circus Circus Hotel and Casino",\n\t\t"HotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n\t\t"Price": "$$",\n\t\t"hotelImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Circus_Circus_hotel_in_Las_Vegas.jpg/1200px-Circus_Circus_hotel_in_Las_Vegas.jpg",\n\t\t"geoCoordinates": "36.1212° N, 115.1608° W",\n\t\t"rating": "3.5",\n\t\t"description": "A classic, budget-friendly option. Includes a variety of activities and attractions, including a circus-themed atmosphere."\n\t},\n\t{\n\t\t"HotelName": "Downtown Grand Hotel",\n\t\t"HotelAddress": "166 E Fremont St, Las Vegas, NV 89101",\n\t\t"Price": "$$",\n\t\t"hotelImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Downtown_Grand_Hotel_Las_Vegas.jpg/1200px-Downtown_Grand_Hotel_Las_Vegas.jpg",\n\t\t"geoCoordinates": "36.1152° N, 115.1573° W",\n\t\t"rating": "3.8",\n\t\t"description": "Budget-friendly option in downtown Las Vegas, close to Fremont Street Experience. Offers basic amenities."\n\t}\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "theme": "Downtown Delights",\n      "plan": [\n        {\n          "time": "1:00 PM - 3:00 PM",\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Downtown\'s vibrant entertainment hub with light shows, street performers, and shops.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Fremont_Street_Experience_at_night.jpg/1200px-Fremont_Street_Experience_at_night.jpg",\n          "geoCoordinates": "36.1001° N, 115.1659° W",\n          "ticketPricing": "Free",\n          "rating": "4.5",\n          "travelTime": "10-15 mins walking"\n        },\n        {\n          "time": "4:00 PM - 6:00 PM",\n          "placeName": "Downtown Las Vegas Walking Tour",\n          "placeDetails": "Explore the unique shops, casinos, and sights of downtown Las Vegas.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Las_Vegas_Downtown_03.jpg/1200px-Las_Vegas_Downtown_03.jpg",\n          "geoCoordinates": "36.1001° N, 115.1659° W",\n          "ticketPricing": "Free (or guided tour varies)",\n          "rating": "4.0",\n          "travelTime": "Walking or short cab ride"\n        }\n      ],\n      "bestTime": "Evening for the light shows"\n    },\n    {\n      "day": 2,\n      "theme": "Strip Exploration",\n      "plan": [\n        {\n          "time": "10:00 AM - 12:00 PM",\n          "placeName": "Bellagio Conservatory and Botanical Gardens",\n          "placeDetails": "Admire the beautiful and elaborate floral displays.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bellagio_Botanical_Gardens.jpg/800px-Bellagio_Botanical_Gardens.jpg",\n          "geoCoordinates": "36.1166° N, 115.1665° W",\n          "ticketPricing": "Free to enter",\n          "rating": "4.5",\n          "travelTime": "Walking or short cab ride"\n        },\n        {\n          "time": "1:00 PM - 3:00 PM",\n          "placeName": "High Roller Observation Wheel",\n          "placeDetails": "Experience the panoramic views of the Las Vegas Strip.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/High_Roller_Wheel_at_night.jpg/1200px-High_Roller_Wheel_at_night.jpg",\n          "geoCoordinates": "36.0951° N, 115.1526° W",\n          "ticketPricing": "Around $30-40",\n          "rating": "4.2",\n          "travelTime": "Walking or short cab ride"\n        }\n      ],\n      "bestTime": "Morning for better weather"\n    },\n\t{\n      "day": 3,\n      "theme": "Hoover Dam & Red Rock",\n      "plan": [\n        {\n          "time": "9:00 AM - 1:00 PM",\n          "placeName": "Hoover Dam",\n          "placeDetails": "Explore the impressive Hoover Dam and learn about its history.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Hoover_Dam_from_Lake_Mead.jpg/1200px-Hoover_Dam_from_Lake_Mead.jpg",\n          "geoCoordinates": "35.5549° N, 114.6835° W",\n          "ticketPricing": "$20-30 per person (estimated)",\n          "rating": "4.7",\n          "travelTime": "1-1.5 hours by car"\n        },\n        {\n          "time": "2:00 PM - 4:00 PM",\n          "placeName": "Red Rock Canyon",\n          "placeDetails": "Enjoy scenic views and hikes in a beautiful natural setting.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Red_Rock_Canyon_NV_sunset.jpg/1200px-Red_Rock_Canyon_NV_sunset.jpg",\n          "geoCoordinates": "36.0483° N, 115.0685° W",\n          "ticketPricing": "$10 parking (estimated)",\n          "rating": "4.8",\n          "travelTime": "30-45 mins drive"\n        }\n      ],\n\t  "bestTime": "Early Morning/Mid-day for best weather"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});