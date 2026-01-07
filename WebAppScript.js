/*Financial Dashboard Scripts*/


let exp = "", log = [];

const display = document.getElementById("display");
const history = document.getElementById("history");

// Tab Switching
function show(id,btn){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// Calculator Functions
function press(v){ exp+=v; display.value=exp; }
function del(){ exp = exp.slice(0, -1); display.value = exp; }
function clearDisplay(){ exp=""; display.value=""; }

function calculate(){
  try{
    let r=eval(exp);
    log.unshift(`${exp} = ${r}`);
    history.innerHTML = log.map(l => `<div>${l}</div>`).join("");
    exp=r.toString(); display.value=exp;
  }catch{ display.value="Error"; exp=""; }
}

// Toggle Sign Function
function toggleSign(){
  // Match the last number in the expression
  const match = exp.match(/(-?\d+\.?\d*)$/);

  if (!match) return;

  const number = match[0];
  const index = match.index;

  // Remove the number from the expression
  exp = exp.slice(0, index);

  if (number.startsWith("-")) {
    // Make positive
    exp += number.slice(1);
  } else {
    // Make negative (wrapped for safety)
    exp += `(-${number})`;
  }

  display.value = exp;
}

// Add Other Expense Input
function addOther(){
  const container = document.getElementById("other-container");

  const row = document.createElement("div");
  row.className = "other-row";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Bill name";

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "$";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = () => row.remove();

  row.appendChild(labelInput);
  row.appendChild(valueInput);
  row.appendChild(removeBtn);

  container.appendChild(row);
}


// Budget Calculator Functions
function calcBudget(){
  let budgetInput = {
    incomeValue: +income.value || 0,
    housingValue: +housing.value || 0,
    electricityValue: +electricity.value || 0,
    waterValue: +water.value || 0,
    internetValue: +internet.value || 0,
    gasValue: +gas.value || 0,
    foodValue: +food.value || 0,
    transportValue: +transport.value || 0,
  };

  const otherRows = document.querySelectorAll("#other-container .other-row");
  let otherTotal = 0;

  otherRows.forEach(row => {
    const valueInput = row.querySelector("input[type='number']");
    otherTotal += +valueInput.value || 0;
  });


  let total = budgetInput.housingValue + budgetInput.electricityValue + budgetInput.waterValue + budgetInput.internetValue + budgetInput.gasValue + budgetInput.foodValue + budgetInput.transportValue + otherTotal;

  expenses.textContent=`$${total.toFixed(2)}`;

  let rem=budgetInput.incomeValue-total;

  remaining.textContent=`$${rem.toFixed(2)}`;
  remaining.className=rem>=0?"positive":"negative";
}


function calcMortgage(){
  let l=+loan.value, r=(+rate.value)/100/12, y=+years.value*12;
  let t=(+taxes.value||0)/12+(+ins.value||0)/12+(+hoa.value||0);
  let pi=l*(r*Math.pow(1+r,y))/(Math.pow(1+r,y)-1);
  mortTotal.textContent=`$${(pi+t).toFixed(2)}`;
  mortPI.textContent=`$${pi.toFixed(2)}`;
  mortTax.textContent=`$${((+taxes.value||0)/12).toFixed(2)}`;
  mortIns.textContent=`$${((+ins.value||0)/12).toFixed(2)}`;
  mortHOA.textContent=`$${(+hoa.value||0).toFixed(2)}`;
}
