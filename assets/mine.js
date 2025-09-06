
document.getElementById("city").addEventListener("change", (e) => {
  const cityName = e.target.value; // الاسم بالانجليزي للـ API
  const cityNameArabic = e.target.options[e.target.selectedIndex].text; // الاسم بالعربي لعرضه
  document.querySelector(".city-name").textContent = cityNameArabic;

  getPrayerTimingsofCity(cityName);
});

function getPrayerTimingsofCity(cityName) {
  let params = {
    country: "EG",
    city: cityName
  };

  axios.get("https://api.aladhan.com/v1/timingsByCity", { params })
    .then(function (response) {
      const timings = response.data.data.timings;
      fillTimeForPrayer("fajr", timings.Fajr);
      fillTimeForPrayer("sunrise", timings.Sunrise);
      fillTimeForPrayer("dhuhr", timings.Dhuhr);
      fillTimeForPrayer("asr", timings.Asr);
      fillTimeForPrayer("maghrib", timings.Maghrib);
      fillTimeForPrayer("isha", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      const dateElement = document.getElementById("date");
      dateElement.textContent = weekday + " " + readableDate;

      console.log(readableDate + " - " + weekday);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillTimeForPrayer(id, time) {
  document.getElementById(id).textContent = time;
}

// تحميل البيانات أول مرة للقاهرة
getPrayerTimingsofCity("Cairo");
