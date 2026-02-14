let events = [];

const API_URL = "https://webdevharsha.github.io/open-hackathons-api/data.json";

async function loadEventsFromAPI() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    events = data.hackathons.map(item => ({
      title: item.title || "Untitled Event",
      platform: item.organization_name || "Hackathon",
      startDate: item.submission_period_dates ? item.submission_period_dates.split(' - ')[0] : "",
      endDate: item.submission_period_dates ? item.submission_period_dates.split(' - ')[1] : "",
      link: item.url || "#",
      prize: item.prizeText || "",
      location: item.displayed_location || "",
      isOpen: item.isOpen || false
    }));

    renderEvents();
  } catch (err) {
    console.error("API failed:", err);
    const grid = document.getElementById("eventsGrid");
    if (grid) {
      grid.innerHTML = "<p style='text-align:center;'>Failed to load events.</p>";
    }
  }
}

function getStatus(start, end, isOpen) {
  // Use isOpen flag from API if available
  if (isOpen === false) return "ended";
  
  const now = new Date();
  if (!start || !end) return "upcoming";

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) return "upcoming";
  if (now > endDate) return "ended";
  return "ongoing";
}

function getCountdown(end) {
  if (!end) return "";

  const endDate = new Date(end);
  const diff = endDate - new Date();
  
  if (diff <= 0) return "Event ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days + " days left";
}

function renderEvents(filter = "all") {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  
  grid.innerHTML = "";

  events.forEach(event => {
    const status = getStatus(event.startDate, event.endDate, event.isOpen);
    if (filter !== "all" && status !== filter) return;

    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-platform">${event.platform}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-badge ${status}">${status.toUpperCase()}</div>
      <div class="countdown">${getCountdown(event.endDate)}</div>
      <a href="${event.link}" target="_blank" class="event-link">
        View Details →
      </a>
    `;

    grid.appendChild(card);
  });
}

function filterEvents(type, el) {
  document.querySelectorAll(".event-filters button")
    .forEach(btn => btn.classList.remove("active"));

  if (el) el.classList.add("active");

  renderEvents(type);
}

// Load from API when page loads
loadEventsFromAPI();