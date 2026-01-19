document.getElementById("output").innerHTML =
  "Brutto: " + brutto + " €<br>" +
  "Lohnsteuer (20%): " + steuer + " €<br>" +
  "Sozialversicherung (20%): " + sozial + " €<br>" +
  "<strong>Netto: " + netto.toFixed(2) + " €</strong>";