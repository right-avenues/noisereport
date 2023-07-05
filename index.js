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
          const percentile = json[`stats.${type}_v1_category`];
          TYPES.map((type) => {
            document.getElementById(
              `noisereport_${type}_complaints`
            ).innerText = json[`stats.${type}`] + " noise complaints";

            switch (percentile) {
              case "other":
                document.getElementById(
                  `noisereport_${type}_percentile`
                ).innerText = "Below 25 percentile";
                document.getElementById(
                  `noisereport_${type}_circle`
                ).style.backgroundColor = "yellow";

                // yellow
                break;
              case "p90":
                document.getElementById(
                  `noisereport_${type}_percentile`
                ).innerText = "Top 10 percentile.";
                document.getElementById(
                  `noisereport_${type}_circle`
                ).style.backgroundColor = "red";
                // red
                break;
              case "p75":
                document.getElementById(
                  `noisereport_${type}_percentile`
                ).innerText = "Top 25 percentile.";
                document.getElementById(
                  `noisereport_${type}_circle`
                ).style.backgroundColor = "orange";
                // orange

                break;

              default:
                break;
            }
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

const sample = {
  zip_code: "10020",
  "stats.construction": 11.0,
  "stats.music_party": 19.0,
  "stats.other_street_noise": 10.0,
  "stats.vehicle": 3.0,
  "stats.helicopter": 0.0,
  "stats.construction_area_normalized": 9.0470379369,
  "stats.music_party_area_normalized": 15.6267018911,
  "stats.other_street_noise_area_normalized": 8.2245799427,
  "stats.vehicle_area_normalized": 2.4673739828,
  "stats.helicopter_area_normalized": 0.0,
  "stats.construction_v1_category": "other",
  "stats.music_party_v1_category": "other",
  "stats.other_street_noise_v1_category": "other",
  "stats.vehicle_v1_category": "other",
  "stats.helicopter_v1_category": "other",
  fdny_station_count: 0.0,
  hospital_count: 0.0,
  emergency_services_count: 0.0,
  emergency_services_count_v1_category: "other",
};
