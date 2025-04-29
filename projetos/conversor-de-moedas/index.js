// Elements
const amountInput = document.getElementById("amountInput");
const fromContainer = document.getElementById("fromContainer");
const fromCurrency = document.getElementById("fromCurrency");
const toContainer = document.getElementById("toContainer");
const toCurrency = document.getElementById("toCurrency");
const conversionParagraph = document.getElementById("conversionParagraph");
const exchangeRateBtn = document.getElementById("exchangeRateBtn");

// Adding event listeners
window.addEventListener("load", () => {
    displayCurrency();
    displayImage();
});

fromContainer.addEventListener("change", displayImage);
toContainer.addEventListener("change", displayImage);

exchangeRateBtn.addEventListener("click", async () => {
    if(amountInput.value === "") return;
    const data = await getCurrencyAPIData();
    
    const finalValue = (amountInput.value * data.conversion_rates[toCurrency.value]).toFixed(2);
    updateConversionParagraph(finalValue);
});

// Functions
function displayCurrency() {
    for(let currencyCode in countryList) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = currencyCode;
        option2.value = currencyCode;

        option1.textContent = currencyCode;
        option2.textContent = currencyCode;

        if(option1.value === "USD") {
            option1.selected = true;
        }

        if(option2.value === "BRL") {
            option2.selected = true;
        }

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }
};

function displayImage() {
    const image1 = document.createElement("img");
    const image2 = document.createElement("img");

    image1.src = `https://flagsapi.com/${countryList[fromCurrency.value]}/flat/32.png`;
    image2.src = `https://flagsapi.com/${countryList[toCurrency.value]}/flat/32.png`;

    image1.alt = `${countryList[fromCurrency.value]} flag`;
    image2.alt = `${countryList[toCurrency.value]} flag`;

    fromContainer.appendChild(image1);
    toContainer.appendChild(image2);
};

async function getCurrencyAPIData() {
    try {
        const request = await fetch(`https://v6.exchangerate-api.com/v6/7e8549f3d7258b4218b2f246/latest/${fromCurrency.value}`);

        if(request.ok) {
            const data = await request.json();
            return data;
        } else {
            throw new Error("Error in fetching API");
        }
    }
    catch (error) {
        console.error(`Sorry, there was an unexpected error: ${error}`);
    }
};

function updateConversionParagraph(finalValue) {
    conversionParagraph.textContent = `${amountInput.value} ${fromCurrency.value} = ${finalValue} ${toCurrency.value}`;
};