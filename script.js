const apiKey = "Your-API";

function getWeather() {
  var T = document.getElementById("weatherResult");
  T.style.display = "block";

  const city = document.getElementById("cityInput").value;
  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          const weatherResult = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <h3>${data.weather[0].description}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
          `;
          document.getElementById("weatherResult").innerHTML = weatherResult;
        } else {
          document.getElementById(
            "weatherResult"
          ).innerHTML = `<p>${data.message}</p>`;
        }
      })
      .catch((error) => {
        document.getElementById(
          "weatherResult"
        ).innerHTML = `<p>Error: ${error.message}</p>`;
      });
  } else {
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<p>Please enter a city name</p>`;
  }
}

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("send_feedback.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        document.getElementById("feedbackForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi nanti."
        );
      });
  });
