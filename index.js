const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let grossIncome = document.getElementById("income").value.trim();
  let extraIncome = document.getElementById("extraIncome").value.trim();
  let deductions = document.getElementById("deductions").value.trim();
  const imgInput = document.querySelector(".img-input");
  const imgInput1 = document.querySelector(".img-input1");
  const imgInput2 = document.querySelector(".img-input2");
  if (isNaN(grossIncome) || grossIncome <= 0 || !grossIncome) {
    imgInput.style.display = "block";
    imgInput1.style.display = "none";
    imgInput2.style.display = "none";
    return;
  } else if (isNaN(extraIncome) || extraIncome < 0 || !extraIncome) {
    imgInput.style.display = "none";
    imgInput2.style.display = "none";
    imgInput1.style.display = "block";
    return;
  } else if (isNaN(deductions) || deductions < 0 || !deductions) {
    imgInput.style.display = "none";
    imgInput1.style.display = "none";
    imgInput2.style.display = "block";
    return;
  }
  let age = document.getElementById("age").value;
  console.log(age);
  const total = calculateTax(grossIncome, extraIncome, deductions, age);
  const head = document.querySelector(".head");
  head.textContent = total;
  if (total) {
    imgInput.style.display = "none";
    imgInput1.style.display = "none";
    imgInput2.style.display = "none";
    openModal();
  }
});

function calculateTax(grossIncome, extraIncome, deductions, age) {
  grossIncome = Number(grossIncome);
  extraIncome = Number(extraIncome);
  deductions = Number(deductions);
  let taxableIncome = grossIncome + extraIncome - deductions;
  if (taxableIncome <= 800000) {
    return taxableIncome.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
  }
  let taxableExcess = taxableIncome - 800000;
  let taxRate;
  switch (age) {
    case "<40":
      taxRate = 0.3;
      break;
    case ">=40&&<60":
      taxRate = 0.4;
      break;
    case ">=60":
      taxRate = 0.1;
      break;
    default:
      taxRate = 0;
      break;
  }
  const taxAmount = taxableExcess * taxRate;
  const total = grossIncome + extraIncome - taxAmount;
  return total.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
