const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

document.querySelectorAll("input").forEach((node) => {
  node.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    let errorEle = e.target.nextElementSibling;
    const deductions = parseFloat(document.getElementById("deductions").value);
    const annualIncome = parseFloat(
      document.getElementById("annual-income").value
    );
    errorEle.style.opacity = 0;
    const extra = parseFloat(document.getElementById("extra-income").value);

    if (
      isNaN(inputValue) ||
      (!inputValue && e.target.name === "annual-income")
    ) {
      errorEle.style.opacity = 1;
      return;
    } else {
      errorEle.style.opacity = 0;

    }

    const totalIncome = annualIncome + (extra ? extra : 0);
    if (totalIncome < deductions) {
      document.getElementById("annualIncomeError").style.opacity = "1";
      if (extra) {
        document.getElementById("extraIncomeError").style.opacity = "1";
      } else {
        document.getElementById("extraIncomeError").style.opacity = "0";
      }
      document.getElementById("deductionsError").style.opacity = "1";
    }else if(totalIncome < deductions){
      document.getElementById("annualIncomeError").style.opacity = "0";
      document.getElementById("deductionsError").style.opacity = "0";
      document.getElementById("extraIncomeError").style.opacity = "0";
    } 
  });
});

document.getElementById("age-group").addEventListener("change", function (e) {
  if (e.target.value == 0) {
    document.getElementById("ageGroupError").style.opacity = "1";
  } else {
    document.getElementById("ageGroupError").style.opacity = "0";
  }
});

document.getElementById("taxForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  const income = formData.get("annual-income");
  const extra =
    formData.get("extra-income") === "" ? 0 : formData.get("extra-income");
  const ageGroup = formData.get("age-group");
  const deductions =
    formData.get("deductions") === "" ? 0 : formData.get("deductions");

  if (income.trim === "" || !income || isNaN(income)) {
    return;
  }


  if (ageGroup == 0) {
    const errorEle = document.getElementById("ageGroupError");
    errorEle.style.opacity = "1";
    return;
  }

  let totalIncome = (parseFloat(income) + parseFloat(extra)) - parseFloat(deductions);

  

  if (totalIncome < 0) {
    document.getElementById("annualIncomeError").style.opacity = "1";
    if (extra != 0) document.getElementById("extraIncomeError").style.opacity = "1";
    document.getElementById("deductionsError").style.opacity = "1";
    return
  }

  
  console.log('total income', totalIncome)
  
  let tax = 0;
  var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  if (totalIncome > 800000) {
    switch (ageGroup) {
      case '1':
        console.log(1)
        tax = 0.3 * (totalIncome - 800000);
        console.log(tax)
        break;
      case '2':
        tax = 0.4 * (totalIncome - 800000);
        break;
      case '3':
        tax = 0.1 * (totalIncome - 800000);
        break;
      default:
        break;
    }
    document.getElementById("finalAmount").innerText =
   parseFloat(totalIncome - tax).toFixed(2)
   myModal.show();
   return
  }
  document.getElementById("finalAmount").innerText =
   parseFloat(totalIncome).toFixed(2)
  myModal.show();
});
