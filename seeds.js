use trumps_cities;

db.cities.insert([
  { 
      name: "Shanghai",
      imagepth: "/shanghai.jpg",
      skycode:"SHA",
      country: "China",
      flag: "china.gif"
  },
  { 
      name: "Delhi",
      imagepth: "/delhi.jpg",
      skycode:"DEL",
      country: "India",
      flag: "india.gif"
  },
  { 
      name: "Istanbul",
      imagepth: "/istanbul.jpg",
      skycode:"IST",
      country: "Turkey",
      flag: "turkey.gif"
  },
    { 
      name: "Tokyo",
      imagepth: "/tokyo.jpg",
      skycode:"HND",
      country: "Japan",
      flag: "japan.gif"
    },
    { 
      name: "Moscow",
      imagepth: "/moscow.jpg",
      skycode:"DME",
      country: "Russia",
      flag: "russia.gif"
    },
    { 
      name: "New York",
      imagepth: "/newyork.jpg",
      skycode:"JFK",
      country: "United States",
      flag: "unitedstates.gif"
    }
  ]
);

// db.cities.find();