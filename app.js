const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value =currCode;
       if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
       }else if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    });
}

const updateFlage = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentNode.querySelector("img");
    img.src = newSrc;

};
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
   let amount = document.querySelector(".amount input");
   let amtVal = amount.value;
   if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
   }

   const fromCurrency = fromCurr.value.toLowerCase();
   const toCurrency = toCurr.value.toLowerCase();
   const URL =`${BASE_URL}/${fromCurrency}.json`
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[fromCurrency][toCurrency];
   let finalAmount = amount.value*rate;
   msg.innerText = `${amount.value}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
});
