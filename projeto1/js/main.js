var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var apiKey = 'd74f5f5b75869b4d2d96f8164d30d6fc'; // Substitua pela sua chave de API
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Referência aos elementos do HTML
var form = document.getElementById('location-form');
var resultDiv = document.getElementById('result');
var table = null; // Inicializando a variável com o tipo correto
var weatherTranslations = {
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
    // Adicione mais traduções e imagens conforme necessário
};
form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var cityInput, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                cityInput = document.getElementById('city').value;
                if (!cityInput) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(apiUrl, "?q=").concat(cityInput, "&appid=").concat(apiKey, "&units=metric"))];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (data.cod === 200) {
                    displayWeather(data);
                }
                else {
                    resultDiv.innerHTML = "<p>Erro: ".concat(data.message, "</p>");
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    resultDiv.innerHTML = "<p>Erro ao obter os dados: ".concat(error_1.message, "</p>");
                }
                else {
                    resultDiv.innerHTML = "<p>Erro desconhecido</p>";
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function displayWeather(data) {
    // Se a tabela ainda não existe, crie-a
    if (!table) {
        table = document.createElement('table');
        table.innerHTML = "\n      <tr>\n        <th>Cidade</th>\n        <th>Pa\u00EDs</th>\n        <th>Temperatura (\u00B0C)</th>\n        <th>Condi\u00E7\u00E3o do Tempo</th>\n      </tr>\n    ";
        resultDiv.appendChild(table);
    }
    // Obtemos a condição do tempo
    var weatherCondition = data.weather[0].description;
    // Traduzimos a condição do tempo e obtemos a imagem
    var translationData = weatherTranslations[weatherCondition] || { translation: weatherCondition, image: "" };
    // Cria uma nova linha com os dados da cidade
    var row = document.createElement('tr');
    row.innerHTML = "\n    <td>".concat(data.name, "</td>\n    <td>").concat(data.sys.country, "</td>\n    <td>").concat(data.main.temp, "</td>\n    <td style=\"text-align: left;\">\n      ").concat(translationData.translation, "\n      ").concat(translationData.image ? "<img src=\"".concat(translationData.image, "\" alt=\"").concat(translationData.translation, "\" class=\"weather-icon\">") : '', "\n    </td>\n  ");
    table.appendChild(row); // Adiciona a nova linha à tabela
}
