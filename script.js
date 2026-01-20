function calculateNetto() {

  let brutto = Number(document.getElementById("brutto").value);
  let Überstunden = Number(document.getElementById("Überstunden").value);
  let Nachtschichtzuschlag = Number(document.getElementById("Nachtschichtzuschlag").value)
  let Ferientagzuschlag = Number(document.getElementById("Ferientagzuschlag").value)
  let Sonntagzschlag = Number(document.getElementById("Sonntagzschlag").value)
  let jobticket = Number(document.getElementById("jobticket").value);

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
