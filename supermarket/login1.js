  // Initialize the map (Default: Kigali)
  var map = L.map('map').setView([1.9501, 30.0588], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Dummy users (replace with real authentication later)
  const users = [
      { role: "admin", email: "admin@example.com", password: "admin123" },
      { role: "seller", email: "seller@example.com", password: "seller123" },
      { role: "customer1", email: "customer@example.com", password: "customer123" }
  ];

  const allowedCities = ["Kigali", "Rusizi", "Ngoma", "Huye", "Musanze","Rubavu"];

  // Get user's location and validate login based on location
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(checkLocation, showError);
      } else {
          document.getElementById("message").innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  // Handle location response
  function checkLocation(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      console.log("User Location:", lat, lon);

      // Reverse geocode to get city name
      reverseGeocode(lat, lon, function(city) {
          if (allowedCities.includes(city)) {
              document.getElementById("loginButton").disabled = false;
              alert(`Welcome! You are in an allowed location: ${city}`);
          } else {
              document.getElementById("loginButton").disabled = true;
              alert(`Access Denied! You are in ${city}, which is not an allowed location.`);
          }

          // Update the map view and add a marker
          map.setView([lat, lon], 12);
          L.marker([lat, lon]).addTo(map).bindPopup(`You are in ${city}`).openPopup();
      });
  }

  // Reverse geocode to get city name
  function reverseGeocode(lat, lon, callback) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(response => response.json())
          .then(data => {
              let city = data.address.city || data.address.town || data.address.village || "Unknown Location";
              console.log("Detected City:", city);
              callback(city);
          })
          .catch(error => console.error("Error with reverse geocoding:", error));
  }

  // Handle geolocation error
  function showError(error) {
      switch (error.code) {
          case error.PERMISSION_DENIED:
              document.getElementById("message").innerHTML = "User denied location access.";
              break;
          case error.POSITION_UNAVAILABLE:
              document.getElementById("message").innerHTML = "Location information is unavailable.";
              break;
          case error.TIMEOUT:
              document.getElementById("message").innerHTML = "Request timed out.";
              break;
          default:
              document.getElementById("message").innerHTML = "An unknown error occurred.";
              break;
      }
  }

  // Validate login credentials
  function validateLogin() {
      const role = document.getElementById("role").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      const user = users.find(user => user.role === role && user.email === email && user.password === password);

      if (user) {
          message.style.color = "green";
          message.textContent = "Login successful!";
          setTimeout(() => {
              window.location.href = `${role}.html`; // Redirect to role-specific page
          }, 1000);
      } else {
          message.style.color = "red";
          message.textContent = "Invalid credentials!";
      }
  }

  // Call getLocation() when the page loads
  getLocation();