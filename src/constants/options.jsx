export const SelectTravelesList = [
  {
    id: 1,
    title: "Just me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two people traveling together",
    icon: "❤️",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family trip with kids",
    icon: "👨‍👩‍👧‍👦",
    people: "4",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends on an adventure",
    icon: "👫",
    people: "3-5",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Economy",
    desc: "Budget friendly options",
    icon: "💸",
  },
  {
    id: 2,
    title: "Standard",
    desc: "Mid-range options",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "High-end options",
    icon: "💎",
  },
];
export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hoteladdress, Price, hotelimageurl, geo coordinates, rating, descriptions and suggest itinerary with time(as 1:00 PM - 3:00 PM format), placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
