window.addEventListener("load", () => {
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let timeZone = document.querySelector(".location-timezone");
  let long, lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/953d617a31114531175ca4df92f46ba4/${lat},${long}`;
      fetch(api)
        .then(data => data.json())
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.innerHTML =
            Math.round((+temperature - 32) / 1.8) + "<sup>o</sup>";
          temperatureDescription.textContent = summary;
          timeZone.textContent = data.timezone;
          setIcons(icon,document.querySelector('.icon'))
        })
        .catch(err => console.log(err));
    });
  }
  function setIcons(icon, inconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(inconID,Skycons[currentIcon]);
  }
});
