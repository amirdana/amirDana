window.addEventListener("load", () => {
  let long;
  let lat;

  lat = 35.7248;
  long = 51.3817;

  const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/645471e083e551402049938d9fbf4b8e/${lat},${long}`;
  fetch(api)
    .then(answer => {
      return answer.json();
    })
    .then(data => {
      document.getElementById("preloader").style.display = "none";
      zone = data.timezone;
      document.querySelector(".t-z").innerHTML = zone;
      document.querySelector(".w-h").innerHTML =
        Math.round(data.currently.humidity * 100) + " %";
      document.querySelector(".w-s").innerHTML =
        data.currently.windSpeed + " km";
      document.querySelector(".w-temp").innerHTML =
        Math.round(((data.currently.temperature - 32) * 5) / 9) + " °C";
      setIcons(data.currently.icon, document.querySelector(".icon"));
    });

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
