$(document).ready(function () {
  console.log("VSCNEW");
  const MUSICPARTY = "music_party";
  const CONSTRUCTION = "construction";
  const VEHICLE = "vehicle";
  const HELICOPTER = "helicopter";
  const TYPES = [MUSICPARTY, CONSTRUCTION, VEHICLE, HELICOPTER];

  (function clickMe() {
    const button = document.getElementById("submit-button");

    button.addEventListener("click", async (event) => {
      const zipcode = document.getElementById("zipcode");
      const email = document.getElementById("email");
      const name = document.getElementById("name");
      const noisereport_zipcode = document.getElementById(
        "noisereport_zipcode"
      );

      if (zipcode.value && email.value && name.value) {
        noisereport_zipcode.innerText = zipcode.value;
        try {
          const response = await fetch(
            `https://rightavenues-free-noise-report.s3.amazonaws.com/zipcode-noise-stats-v2/${zipcode.value}.json`
          );
          const json = await response.json();
          TYPES.map((type) => {
            document.getElementById(
              `noisereport_${type}_complaints`
            ).innerText = json[`stats.${type}`] + " noise complaints";

            document.getElementById(
              `noisereport_${type}_percentile`
            ).innerText = json[`stats.${type}_v1_category`];
          });
          console.log(json);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("failed");
      }
    });
  })();
});

// https://cdn.jsdelivr.net/gh/right-avenues/noisereport@a69c895/index.js
// https://cdn.jsdelivr.net/gh/right-avenues/noisereport@a69c895/index.js
// https://raw.githubusercontent.com/right-avenues/noisereport/main/index.js
