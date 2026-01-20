function calculateNetto() {

  let brutto = Number(document.getElementById("brutto").value);
  let Ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let Nachtschichtzuschlag = Number(document.getElementById("Nachtschichtzuschlag").value)
  let Ferientagzuschlag = Number(document.getElementById("Ferientagzuschlag").value)
  let Sonntagzschlag = Number(document.getElementById("Sonntagzschlag").value)
  let jobticket = Number(document.getElementById("jobticket").value);

// Gesamtbrutto
let gesamtBrutto = brutto + Nachtschichtzuschlag + Ferientagzuschlag + Sonntagzschlag + ueberstunden;

// Sozialversicherungen (vereinfachte Annahmen)
let kv = gesamtBrutto * 0.073;   // Krankenversicherung
let rv = gesamtBrutto * 0.093;   // Rentenversicherung
let av = gesamtBrutto * 0.012;   // Arbeitslosenversicherung
let pv = gesamtBrutto * 0.015;   // Pflegeversicherung

let sozialversicherung = kv + rv + av + pv;

// Steuer (vereinfacht)
let lohnsteuer = gesamtBrutto * 0.20;

// Netto
let netto = gesamtBrutto - lohnsteuer - sozialversicherung - jobticket;

// Ausgabe
document.getElementById("output").innerHTML =
  "<strong>Brutto Bestandteile</strong><br>" +
  "Grundgehalt: " + brutto.toFixed(2) + " €<br>" +
  "Nachtschichtzuschlag: " + Nachtschichtzuschlag.toFixed(2) + " €<br>" +
  "Ferientagzuschlag: " + Ferientagzuschlag.toFixed(2) + " €<br>" +
  "Sonntagzschlag: " + Sonntagzschlag.toFixed(2) + " €<br>" +
  "Überstunden: " + ueberstunden.toFixed(2) + " €<br>" +
  "<strong>Gesamtbrutto: " + gesamtBrutto.toFixed(2) + " €</strong><br><br>" +

  "<strong>Abzüge</strong><br>" +
  "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br>" +
  "Krankenversicherung (KV): " + kv.toFixed(2) + " €<br>" +
  "Rentenversicherung (RV): " + rv.toFixed(2) + " €<br>" +
  "Arbeitslosenversicherung (AV): " + av.toFixed(2) + " €<br>" +
  "Pflegeversicherung (PV): " + pv.toFixed(2) + " €<br>" +
  "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

  "<strong>Netto: " + netto.toFixed(2) + " €</strong>";


}
