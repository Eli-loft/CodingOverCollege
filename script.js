// script.js

// Your API key (if you plan to keep it in the code, otherwise store it securely)
const apiKey = "5317d337b1d1880e940a8688846d199a";

// Array of references
const references = [
  {
    name: "W3Schools",
    url: "https://www.w3schools.com"
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com"
  },
  {
    name: "Mckenny",
    url: "https://wesmckinney.com/"
  }
];

// Fetch metadata from the LinkPreview API
async function fetchPreviewData(url) {
  const response = await fetch(
    `https://api.linkpreview.net?key=${apiKey}&q=${encodeURIComponent(url)}`
  );
  return response.json();
}

// Build the preview card HTML
function createPreviewCard(title, description, image, name) {
  return `
    <div 
      style="
        border: 1px solid #ccc;
        padding: 10px;
        max-width: 500px;
        margin: 10px 0;
      "
    >
      <h3>${name || title}</h3>
      <img 
        src="${image}"
        alt="Preview Image"
        style="max-width: 100%; height: auto; margin: 5px 0;"
      />
      <h4>${title}</h4>
      <p>${description}</p>
    </div>
  `;
}

// Fetch and display previews for all references
async function displayAllReferences() {
  const container = document.getElementById('previewContainer');
  container.innerHTML = ''; // Clear existing content

  for (const ref of references) {
    try {
      const data = await fetchPreviewData(ref.url);
      
      if (data.error) {
        container.innerHTML += `
          <div style="border: 1px solid red; padding: 10px; margin: 10px 0;">
            <p>Error fetching preview for <strong>${ref.name}</strong>: ${data.error}</p>
          </div>
        `;
        continue;
      }

      const { title, description, image } = data;
      const card = createPreviewCard(title, description, image, ref.name);
      container.innerHTML += card;

    } catch (error) {
      console.error(error);
      container.innerHTML += `
        <div style="border: 1px solid red; padding: 10px; margin: 10px 0;">
          <p>Failed to fetch preview for <strong>${ref.name}</strong>. Check console for details.</p>
        </div>
      `;
    }
  }
}

// Automatically display references on page load
document.addEventListener('DOMContentLoaded', () => {
  displayAllReferences();
});
