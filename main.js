

// Display current time and date
function showTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let session = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds} ${session}`;

document.querySelector(".clockNow").textContent = time;

setTimeout(showTime, 1000);
}

showTime(); // Initial call

// Fetch prayer times
function getPrayerTimes() {
    const apiURL = "https://api.aladhan.com/v1/timingsByCity/21-10-2024?city=cairo&country=egypt&method=5";
    
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            let times = data.data.timings;
            let DAYS = data.data.date;
            
            document.querySelector(".dayNow").textContent = `${DAYS.hijri.weekday.ar} : ( ${DAYS.hijri.day} من ${DAYS.hijri.month.ar} ${DAYS.hijri.year} )`;
            
            const prayerTimes = {
                الفجر: formatTime(times.Fajr),
                الشروق: formatTime(times.Sunrise),
                الظهر: formatTime(times.Dhuhr),
                العصر: formatTime(times.Asr),
                المغرب: formatTime(times.Maghrib),
                العشاء: formatTime(times.Isha)
            };

            displayPrayerTimes(prayerTimes);
            startCounting(prayerTimes); // Pass prayer times to the counting function
        })
        .catch(error => {
            console.error("Error fetching prayer times:", error);
        });
}

function formatTime(time) {
    return new Date(`01/01/2000 ${time}`).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}

// Display prayer times
function displayPrayerTimes(prayerTimes) {
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';

    for (let time in prayerTimes) {
        cards.innerHTML += `
            <div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="prayTime">${prayerTimes[time]}</div>
                </div>
                <p>${time}</p>
            </div>
        `;
    }
}

getPrayerTimes(); // Fetch prayer times



// // Start counting function
// function startCounting(prayerTimes) {
//     const timeDisplay = document.getElementById('currentTime');
//     timeDisplay.textContent = showTime(); // Set initial time

//     setInterval(() => {
//         const currentTime = showTime(); // Get current time
//         timeDisplay.textContent = currentTime; // Update time display

//         // Example prayer time, use actual prayer times from fetched data
//         const result = subtractTimes(currentTime, prayerTimes.الفجر); // Update result with Fajr time
//         console.log(result); // Log the result
//     }, 1000);
// }

// function convertTimeToSeconds(timeString) {
//     const [hours, minutes, seconds] = timeString.split(':').map(Number);
//     return hours * 3600 + minutes * 60 + (seconds || 0); // Handle cases where seconds might be undefined
// }

// function subtractTimes(currentTime) {
//     const seconds1 = convertTimeToSeconds(currentTime);
//     const seconds2 = convertTimeToSeconds("12:39:00");
//     const differenceInSeconds = seconds1 - seconds2;

//     // Convert the difference back to HH:MM:SS format, handling negative values
//     const hours = Math.abs(Math.floor(differenceInSeconds / 3600));
//     const minutes = Math.abs(Math.floor((differenceInSeconds % 3600) / 60));
//     const seconds = Math.abs(differenceInSeconds % 60);

//     // Format as HH:MM:SS with leading zeros
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }




// Scroll functionality
const fixedNav = document.querySelector(".header");
const scrollBtn = document.querySelector(".scrollBtn");

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    fixedNav.classList.toggle('active', scrolled > 50);
    scrollBtn.classList.toggle('active', scrolled > 100);
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});