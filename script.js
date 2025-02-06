// script.js

// API key (store securely in environment variables for production)
const apiKey = "5317d337b1d1880e940a8688846d199a";

// List of references
const references = [
  { name: "W3Schools", url: "https://www.w3schools.com" },
  { name: "NeetCode", url: "https://neetcode.io/" },
  { name: "Stack Overflow", url: "https://stackoverflow.com" },
  { name: "Wes McKinney", url: "https://wesmckinney.com/" }
];

// Fetch metadata from LinkPreview API
async function fetchPreviewData(url) {
  try {
    const response = await fetch(
      `https://api.linkpreview.net?key=${apiKey}&q=${encodeURIComponent(url)}`
    );
    return response.json();
  } catch (error) {
    console.error(`Error fetching preview for ${url}:`, error);
    return { error: "Network error" };
  }
}

// Create preview card HTML using CSS classes
function createPreviewCard(title, description, image, name) {
  return `
    <div class="preview-card">
      <h3>${name || title}</h3>
      <img src="${image || 'fallback-image.jpg'}" alt="Preview Image">
      <h4>${title}</h4>
      <p>${description || "No description available."}</p>
    </div>
  `;
}

// Fetch and display previews
async function displayAllReferences() {
  const container = document.getElementById("previewContainer");
  container.innerHTML = ""; // Clear previous content

  for (const ref of references) {
    const data = await fetchPreviewData(ref.url);

    if (data.error) {
      container.innerHTML += `
        <div class="error-card">
          <p>Error fetching preview for <strong>${ref.name}</strong>: ${data.error}</p>
        </div>
      `;
      continue;
    }

    container.innerHTML += createPreviewCard(data.title, data.description, data.image, ref.name);
  }
}

// Load references on page load
document.addEventListener("DOMContentLoaded", displayAllReferences);
