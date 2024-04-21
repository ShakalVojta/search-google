async function searchGoogle() {
  const query = document.getElementById("searchQuery").value;
  const cx = "a492048531b354e1b";
  const apiKey = "AIzaSyDxWz8z8ZtoakgbaLpTt3M0ywfZXFue6Bc";

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&start=1&lr=lang_cs&cx=${cx}&key=${apiKey}&sort=date&filter=1&gl=cs&hl=cs&num=10&source=gcsc&as_oq=&as_sitesearch=&exp=&callback=
  `;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const searchResults = data.items;

    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    searchResults.forEach((result, index) => {
      const resultElement = document.createElement("li");
      resultElement.innerHTML = `<a href="${result.link}" target="_blank">${
        index + 1
      }. ${result.title}</a>`;
      resultsContainer.appendChild(resultElement);
    });
  } catch (error) {
    console.error("Chyba při provádění vyhledávání:", error);
  }
}

function clearSearch() {
  document.getElementById("searchQuery").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

function downloadResultsAsJson(searchResults) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(searchResults));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "search_results.json");
  document.body.appendChild(downloadAnchorNode); 
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function downloadSearchResults() {
  const searchResults = Array.from(document.getElementById("searchResults").children).map(item => {
      return {
          title: item.textContent,
          link: item.querySelector('a').href
      };
  });
  downloadResultsAsJson(searchResults);
}
