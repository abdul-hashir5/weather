# Weather Forecast Application

## Project Description
This project is a Weather Forecast web application developed using **HTML, Tailwind CSS, CSS, and JavaScript**.  
The application fetches real-time weather data from the **OpenWeatherMap API** and displays current weather details along with a 5-day forecast.

The main purpose of this project is to understand API integration, JavaScript logic, and responsive UI design using Tailwind CSS.

---

## Features
- Search weather information by **city name**
- Fetch weather data using **current location**
- Display current weather details:
  - Temperature
  - Humidity
  - Wind speed
- **5-day weather forecast**
- **Recently searched cities dropdown** using Local Storage
- **Extreme temperature alert** when temperature exceeds 40°C
- **Dynamic background change** based on weather conditions
- Input validation and user-friendly error messages
- Responsive design for desktop, tablet, and mobile screens

---

## Technologies Used
- HTML5
- Tailwind CSS (via CDN)
- Custom CSS
- JavaScript (ES6)
- OpenWeatherMap API

---

## API Information
The application uses the **OpenWeatherMap API** to retrieve weather data.

Endpoints used:
- Current Weather API
- 5 Day / 3 Hour Forecast API

---

## Project Structure
weather-project/
weather.html # Main HTML file
 weather.css # Custom CSS styles
 weather.js # JavaScript logic and API integration
 README.md # Project documentation


---

## How to Run the Project
1. Download or clone the project files.
2. Make sure you have an active internet connection.
3. Open the `weather.html` file in any modern web browser.
4. Enter a city name or click on **Use Current Location** to view weather details.

No additional installations or setup are required.

---

## Error Handling and Validation
- Empty city input is restricted.
- Invalid city names display a clear error message.
- API errors are handled without using JavaScript alert boxes.

---

## Learning Outcome
Through this project, I learned:
- How to work with external APIs
- Handling asynchronous JavaScript using `fetch`
- Using browser local storage
- Implementing responsive UI using Tailwind CSS
- Managing user input and error handling

---

## Notes
- Tailwind CSS is used through CDN.
- No backend or database is used.
- Node modules are not included as per submission guidelines.


