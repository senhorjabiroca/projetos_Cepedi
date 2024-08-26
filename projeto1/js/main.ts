const apiKey = 'd74f5f5b75869b4d2d96f8164d30d6fc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


const form = document.getElementById('location-form') as HTMLFormElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
let table: HTMLTableElement | null = null; 

const weatherTranslations: { [key: string]: { translation: string, image: string } } = {
  "clear sky": { translation: "céu limpo", image: "images/sol.png" },
    "few clouds": { translation: "poucas nuvens", image: "images/nuvem.png" },
    "scattered clouds": { translation: "nuvens dispersas", image: "images/dispersa.png" },
    "broken clouds": { translation: "nuvens fragmentadas", image: "images/frag.png" },
    "shower rain": { translation: "chuva leve", image: "images/chuva-leve.png" },
    "rain": { translation: "chuva", image: "images/chuva.png" },
    "thunderstorm": { translation: "trovoada", image: "images/trovoada.png" },
    "snow": { translation: "neve", image: "images/neve.png" },
    "mist": { translation: "neblina", image: "images/nevoa.png" },
    "overcast clouds": { translation: "nublado", image: "images/nublado.png" },

};
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const cityInput = (document.getElementById('city') as HTMLInputElement).value;
  if (cityInput) {
    try {
      const response = await fetch(`${apiUrl}?q=${cityInput}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        resultDiv.innerHTML = `<p>Erro: ${data.message}</p>`;
      }
    } catch (error) {
      if (error instanceof Error) {
        resultDiv.innerHTML = `<p>Erro ao obter os dados: ${error.message}</p>`;
      } else {
        resultDiv.innerHTML = `<p>Erro desconhecido</p>`;
      }
    }
  }
});

function displayWeather(data: any) {
  if (!table) {
    table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>Cidade</th>
        <th>País</th>
        <th>Temperatura (°C)</th>
        <th>Condição do Tempo</th>
      </tr>
    `;
    resultDiv.appendChild(table);
  }

  const weatherCondition = data.weather[0].description;

  const translationData = weatherTranslations[weatherCondition] || { translation: weatherCondition, image: "" };

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.sys.country}</td>
    <td>${data.main.temp}</td>
    <td style="text-align: left;">
      ${translationData.translation}
      ${translationData.image ? `<img src="${translationData.image}" alt="${translationData.translation}" class="weather-icon">` : ''}
    </td>
  `;
  table.appendChild(row); 
}
