use trumps_cities;

db.cities.insert([
  { 
      name: "Shanghai",
      imagepth: "./images/shanghai.jpg",
      skycode:"SHA",
      country: "China",
      flag: "china.gif"
  },
  { 
      name: "Delhi",
      imagepth: "./images/delhi.jpg",
      skycode:"DEL",
      country: "India",
      flag: "india.gif"
  },
  { 
      name: "Istanbul",
      imagepth: "./images/istanbul.png",
      skycode:"IST",
      country: "Turkey",
      flag: "turkey.gif"
  },
    { 
      name: "Tokyo",
      imagepth: "./images/tokyo.jpg",
      skycode:"HND",
      country: "Japan",
      flag: "japan.gif"
    },
    { 
      name: "Moscow",
      imagepth: "./images/moscow.jpg",
      skycode:"DME",
      country: "Russia",
      flag: "russia.gif"
    },
    { 
      name: "New York",
      imagepth: "./images/newyork.png",
      skycode:"JFK",
      country: "United States",
      flag: "unitedstates.gif"
    },
    { 
      name: "Edinburgh",
      imagepth: "./images/edinburgh.jpg",
      skycode:"EDI",
      country: "Scotland",
      flag: "scotland.gif"
    },
    { 
      name: "Rio De Janeiro",
      imagepth: "./images/rio.jpg",
      skycode:"GIG",
      country: "Brazil",
      flag: "brazil.gif"
    },
    { 
      name: "Sydney",
      imagepth: "./images/sydney.jpg",
      skycode:"SYD",
      country: "Australia",
      flag: "australia.gif"
    },
    { 
      name: "Barcelona",
      imagepth: "./images/barcelona.jpg",
      skycode:"MAD",
      country: "Spain",
      flag: "spain.gif"
    },
    { 
      name: "Amsterdam",
      imagepth: "./images/amsterdam.jpg",
      skycode:"AMS",
      country: "Netherlands",
      flag: "netherlands.gif"
    },
    { 
      name: "Los Angeles",
      imagepth: "./images/la.jpg",
      skycode:"LAX",
      country: "United States",
      flag: "unitedstates.gif"
    },
  ]
);

// db.cities.find();