window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long);
      console.log(lat);

      const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/645471e083e551402049938d9fbf4b8e/${lat},${long}`;
      fetch(api)
        .then(answer => {
          return answer.json();
        })
        .then(dataz => {
          document.getElementById("preloader").style.display = "none";
          console.log(dataz);
          zone = dataz.timezone;
          document.querySelector(".t-z").innerHTML = zone;
          document.querySelector(".w-h").innerHTML =
            Math.round(dataz.currently.humidity * 100) + " %";
          document.querySelector(".w-s").innerHTML =
            dataz.currently.windSpeed + " km";
          document.querySelector(".w-temp").innerHTML =
            Math.round(((dataz.currently.temperature - 32) * 5) / 9) + " °C";

          setIcons(dataz.currently.icon, document.querySelector(".icon"));
        });
    });
  } else {
    alert("This function need locaion permision");
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
