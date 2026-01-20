function calculateNetto() {

  // Inputs (match HTML IDs EXACTLY)
  let brutto = Number(document.getElementById("brutto").value);
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let nachtschicht = Number(document.getElementById("Nachtshichtzuschlag").value);
  let ferientag = Number(document.getElementById("Ferientagzuschlag").value);
  let sonntag = Number(document.getElementById("Sonntagzuschlag").value);
  let jobticket = Number(document.getElementById("Jobtickets").value);

  // Gesamtbrutto
  let gesamtBrutto =
    brutto +
    ueberstunden +
    nachtschicht +
    ferientag +
    sonntag;

  // Sozialversicherung (vereinfacht)
  let kv = gesamtBrutto * 0.073;
  let rv = gesamtBrutto * 0.093;
  let av = gesamtBrutto * 0.012;
  let pv = gesamtBrutto * 0.015;

  let sozialversicherung = kv + rv + av + pv;

  // Steuer
  let lohnsteuer = gesamtBrutto * 0.20;

  // Netto
  let netto = gesamtBrutto - lohnsteuer - sozialversicherung - jobticket;

  // OUTPUT (this was missing!)
  document.getElementById("output").innerHTML =
    "<strong>Brutto-Bestandteile</strong><br>" +
    "Grundgehalt: " + brutto.toFixed(2) + " €<br>" +
    "Überstunden: " + ueberstunden.toFixed(2) + " €<br>" +
    "Nachtschichtzuschlag: " + nachtschicht.toFixed(2) + " €<br>" +
    "Ferientagzuschlag: " + ferientag.toFixed(2) + " €<br>" +
    "Sonntagszuschlag: " + sonntag.toFixed(2) + " €<br>" +
    "<strong>Gesamtbrutto: " + gesamtBrutto.toFixed(2) + " €</strong><br><br>" +

    "<strong>Abzüge</strong><br>" +
    "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br>" +
    "KV: " + kv.toFixed(2) + " €<br>" +
    "RV: " + rv.toFixed(2) + " €<br>" +
    "AV: " + av.toFixed(2) + " €<br>" +
    "PV: " + pv.toFixed(2) + " €<br>" +
    "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

    "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
}
