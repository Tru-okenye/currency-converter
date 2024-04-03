const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");
apiKey = ' 7c39555fbc2b63efce6d4dfa';
for(let i = 0; i < dropList.length; i++){
    for (currency_code in country_code) {
        let selectedFrom = currency_code === "USD" ? "selected" : "";
        let selectedTo = currency_code === "NPR" ? "selected" : "";
    
        let optionTag = `<option value="${currency_code}" ${selectedFrom}>${currency_code}</option>`;
        fromCurrency.insertAdjacentHTML("beforeend", optionTag);
    
        optionTag = `<option value="${currency_code}" ${selectedTo}>${currency_code}</option>`;
        toCurrency.insertAdjacentHTML("beforeend", optionTag);
    }
    
};

window.addEventListener("load", () => {
    getExchangeRate();
});
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "  Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/7c39555fbc2b63efce6d4dfa/latest/${fromCurrency.value}`
fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); 
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`



})
}