
    // EV Charging Station Details
const stations = [
    {
        id: 1,
        name: "Green Charge Station",
        location: "Kompally, Hyderabad",
        type: "DC Fast Charging",
        power: "60 kW",
        price: 18
    },
    {
        id: 2,
        name: "Volt Point Station",
        location: "Suchitra, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 3,
        name: "Eco Drive Station",
        location: "Medchal, Hyderabad",
        type: "DC Fast Charging",
        power: "30 kW",
        price: 16
    },
    {
        id: 4,
        name: "City EV Station",
        location: "Kukatpally, Hyderabad",
        type: "AC Charging",
        power: "11 kW",
        price: 10
    },
    {
        id: 5,
        name: "Volt Point Station",
        location: "Hitech City, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 6,
        name: "Volt Point Station",
        location: "Madhapur, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 7,
        name: "Volt Point Station",
        location: "Uppal, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 8,
        name: "Volt Point Station",
        location: "Secunderabad, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 9,
        name: "Volt Point Station",
        location: "LB Nagar, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 10,
        name: "Volt Point Station",
        location: "Mehdipatnam, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    },
    {
        id: 11,
        name: "Volt Point Station",
        location: "Shamshabad, Hyderabad",
        type: "AC Charging",
        power: "7.4 kW",
        price: 12
    }
];



// Load saved bookings
let bookings = JSON.parse(
    localStorage.getItem("evBookings") || "[]"
);

// Display charging stations
function displayStations() {

    const stationList = document.getElementById("station-list");

    stationList.innerHTML = "";

    stations.forEach(station => {

        stationList.innerHTML += `
            <div class="station-card">

                <h3>⚡ ${station.name}</h3>

                <p>📍 ${station.location}</p>

                <p>Charger: ${station.type}</p>

                <p>Power: ${station.power}</p>

                <p>Price: ₹${station.price} / kWh</p>

                <button onclick="bookSlot(${station.id})">
                    Book Charging Slot
                </button>

            </div>
        `;

    });
}

// Book a charging slot
function bookSlot(id) {

    const station = stations.find(s => s.id === id);

    const name = prompt("Enter your name:");

    if (!name || !name.trim()) {
        alert("Please enter your name.");
        return;
    }

    const date = prompt("Enter date (YYYY-MM-DD):");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        alert("Please enter date in YYYY-MM-DD format.");
        return;
    }

    const time = prompt(
        "Select time:\n09:00 AM\n10:00 AM\n11:00 AM\n12:00 PM\n02:00 PM\n04:00 PM"
    );

    if (!time) {
        return;
    }

    const validTimes = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "04:00 PM"
    ];

    if (!validTimes.includes(time)) {
        alert("Please select a listed time slot.");
        return;
    }

    // Prevent double booking
    const alreadyBooked = bookings.some(booking =>
        booking.stationId === id &&
        booking.date === date &&
        booking.time === time
    );

    if (alreadyBooked) {
        alert("Sorry! This slot is already booked.");
        return;
    }

    const booking = {
        bookingId: "EV" + Date.now(),
        name: name.trim(),
        stationId: id,
        station: station.name,
        location: station.location,
        date: date,
        time: time,
        status: "Confirmed"
    };

    bookings.push(booking);

    localStorage.setItem(
        "evBookings",
        JSON.stringify(bookings)
    );

    alert(
        "Booking Successful!\n" +
        "Booking ID: " + booking.bookingId
    );

    displayBookings();
}

// Display user bookings
function displayBookings() {

    const bookingList = document.getElementById("booking-list");

    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No bookings yet.</p>";
        return;
    }

    bookings.forEach(booking => {

        bookingList.innerHTML += `
            <div class="booking-card">

                <h3>${booking.station}</h3>

                <p>Name: ${booking.name}</p>

                <p>Location: ${booking.location}</p>

                <p>Date: ${booking.date}</p>

                <p>Time: ${booking.time}</p>

                <p>Booking ID: ${booking.bookingId}</p>

                <p>Status: ${booking.status}</p>

            </div>
        `;

    });
}

// Start website
displayStations();
displayBookings();
