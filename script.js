function calculateNetto() {
  // Inputs
  let brutto = Number(document.getElementById("brutto").value);
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let jobticket = Number(document.getElementById("Jobtickets").value);
  let employeeType = document.getElementById("employeeType").value;

  // Basic Lohn
  let basicLohn = brutto;

  // Hourly pay for Überstunden
  const monthlyHours = 160; 
  let hourlyPay = basicLohn / monthlyHours;
  let ueberstundenPay = ueberstunden * hourlyPay;

  // Zuschläge (steuerfrei)
  let nachtschicht = basicLohn * 0.25;
  let sonntag = basicLohn * 0.50;
  let ferientag = basicLohn * 1.25;

  // Gesamtbrutto for SV
  let gesamtBrutto = brutto + ueberstundenPay + nachtschicht + sonntag + ferientag;

  // Sozialversicherung (vereinfachte Annahmen)
  let kv = gesamtBrutto * 0.073;
  let rv = gesamtBrutto * 0.093;
  let av = gesamtBrutto * 0.012;
  let pv = gesamtBrutto * 0.015;
  let sozialversicherung = kv + rv + av + pv;

  // Steuerpflichtiges Brutto = exclude steuerfreie Zuschläge
  let steuerpflichtigesBrutto = brutto + ueberstundenPay;
  let lohnsteuer = steuerpflichtigesBrutto * 0.20;

  // Netto
  let netto = gesamtBrutto - lohnsteuer - sozialversicherung - jobticket;

  // Output
  document.getElementById("output").innerHTML =
    "<strong>Brutto-Bestandteile</strong><br>" +
    "Grundgehalt: " + brutto.toFixed(2) + " €<br>" +
    "Überstunden (" + ueberstunden + "h): " + ueberstundenPay.toFixed(2) + " €<br>" +
    "Nachtzuschlag (25%, steuerfrei): " + nachtschicht.toFixed(2) + " €<br>" +
    "Sonntagszuschlag (50%, steuerfrei): " + sonntag.toFixed(2) + " €<br>" +
    "Ferientagzuschlag (125%, steuerfrei): " + ferientag.toFixed(2) + " €<br>" +
    "<strong>Gesamtbrutto (inkl. steuerfreie Zuschläge): " + gesamtBrutto.toFixed(2) + " €</strong><br><br>" +

    "<strong>Abzüge</strong><br>" +
    "Lohnsteuer (steuerpflichtiges Brutto): " + lohnsteuer.toFixed(2) + " €<br>" +
    "KV: " + kv.toFixed(2) + " €<br>" +
    "RV: " + rv.toFixed(2) + " €<br>" +
    "AV: " + av.toFixed(2) + " €<br>" +
    "PV: " + pv.toFixed(2) + " €<br>" +
    "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

    "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
}
