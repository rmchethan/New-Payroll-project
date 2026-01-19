function calculateNetto() {

  let brutto = Number(document.getElementById("brutto").value);
  let zuschlaege = Number(document.getElementById("zuschlaege").value);

  let steuer = brutto * 0.20;
  let sozial = brutto * 0.20;

  let netto = brutto + zuschlaege - steuer - sozial;

  document.getElementById("output").innerHTML =
    "Netto: " + netto.toFixed(2) + " €";
}

let employeeType = document.getElementById("employeeType").value;

if (employeeType === "normal") {
  steuer = brutto * 0.20;
  sozial = brutto * 0.20;
}