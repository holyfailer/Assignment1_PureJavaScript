const laptopSelect = document.getElementById('laptopSelect');
const featuresDiv = document.getElementById('features');
const laptopImage = document.getElementById('laptopImage');
const laptopName = document.getElementById('laptopName');
const laptopDescription = document.getElementById('laptopDescription');
const laptopPrice = document.getElementById('laptopPrice');
const buyNowBtn = document.getElementById('buyNowBtn');
const purchaseStatus = document.getElementById('purchaseStatus');

const getLoanBtn = document.getElementById('getLoanBtn')
const workBankBtn = document.getElementById('workBankBtn')
const workBtn = document.getElementById('workBtn')
const repayLoanBtn = document.getElementById('repayLoanBtn')


//initialises balance, loan and pay. Balance starts at 200 kr
let currentBalance = 200;

let loanAmount = 0;

let payAmount = 0;


getLoanBtn.addEventListener('click', getLoan)
workBankBtn.addEventListener('click', transferPayToBank)
workBtn.addEventListener('click', work)
repayLoanBtn.addEventListener('click', payLoan)

//Updates the visuals for the balance field. Is used whenever the balance is changed. 
function updateBalance(){
    const elem =  document.getElementById('balanceDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(currentBalance)}`;
}
//Updates the visuals for the loan field. Is used whenever the loan is changed. Is hidden by default and is only visual when the loan is above 0.
function updateLoan(){
    const elem = document.getElementById('loanDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} );
    
    if(loanAmount > 0) {
        elem.style.display = 'block'; // Show the element
        elem.innerHTML = `Outstanding loan: ${Formatter.format(loanAmount)}`;
    } else {
        elem.style.display = 'none'; // Hide the element
    }
}

//Updates the visuals for the pay field. Is used whenever the pay is changed. 
 function updatePay(){
    const elem =  document.getElementById('payDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(payAmount)}`;
}

//Function for getting a loan. IT prompts the user enter how much they want to loan. 
//They are only allowed to if they doesn't already have a loan or if the loan is bigger than size the avaiable balance
function getLoan(){
    const loadInput= prompt("Enter loan amount:");
    const amount  = parseInt(loadInput);

    if(amount > 0 && amount <= currentBalance*2 && loanAmount == 0 ){
        currentBalance += amount;
        loanAmount +=amount;
        updateBalance();
        updateLoan();
        document.querySelector('.repayLoanBtn').style.display = 'block';
    } 
}

//work function. Adds 100 kr to the payAmount
function work(){
    payAmount+=100;
    updatePay();
}


//transfers money to the bank from work. If there is no loan, transfer all of it, otherwise transfer 10% to the bankloan. 
function transferPayToBank(){
    if(loanAmount <= 0){
        currentBalance += payAmount;
    }else{
        let amountToBankLoan = payAmount*0.1
       
        payAmount -= payAmount*0.1;
        loanAmount -= amountToBankLoan;
        currentBalance +=payAmount;

    }
    // checks and moves any leftover debt(e.g. "negative debt" and moves it to currentBalance)
    if(loanAmount < 0){
      let temp = Math.abs(loanAmount)   
      currentBalance += temp  
      loanAmount=0;
    }
    
    payAmount=0;
    updatePay()
    updateLoan()
    updateBalance()

}
//Pays the loan in full. Like above, any "negative" debt is returned to the balance
function payLoan(){
    console.log(loanAmount)
    console.log(payAmount)
    loanAmount -= payAmount
    
    if(loanAmount < 0){
        let temp = Math.abs(loanAmount)   
        currentBalance += temp  
        loanAmount=0;
        
      }
    payAmount=0

    updatePay()
    updateLoan()
    updateBalance()
}

//Function that fetches all the laptops and info from the url.

fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => {
        data.forEach(laptop => {
            const option = document.createElement('option');
            option.value = laptop.id;
            option.textContent = laptop.title;
            laptopSelect.appendChild(option);
        });
        //formatter for price to danish style.
        const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )

        //eventlistener for the dropdown menu for selecting laptops. Displays the info 
        laptopSelect.addEventListener('change', () => {
            const selectedLaptopId = parseInt(laptopSelect.value);
            const selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);

            featuresDiv.innerHTML = selectedLaptop.specs.map(feature => `<p>${feature}</p>`).join('');

            laptopImage.src = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`;
            laptopName.textContent = selectedLaptop.title;
            laptopDescription.textContent = selectedLaptop.description;
            laptopPrice.textContent = `Price: ${Formatter.format(selectedLaptop.price)}`;
            
            
        });

        // Trigger the change event after populating the dropdown menu so the content of the dropdown menu is populated the first time you start the page. 
        const event = new Event('change');
        laptopSelect.dispatchEvent(event);

        //Event listener for buy laptop button with alert for giving a message if you can afford it or not. 
        buyNowBtn.addEventListener('click', () => {
            const selectedLaptopId = parseInt(laptopSelect.value);
            const selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);

            if (selectedLaptop.price <= currentBalance) {
                alert(`Congratulations! You are now the owner of the ${selectedLaptop.title}. Remaining balance: $${currentBalance}`);
                currentBalance -= selectedLaptop.price;
                updateBalance();
            } else {
                alert(`Sorry, you cannot afford the ${selectedLaptop.title}. Your balance is insufficient.`);
            }
        });
    });








//inital start of current balance and loan amount. Default at 200 kr in balance and 0 in loan. 0 in loans means it isn't visible
updateBalance();
updateLoan();
updatePay();



