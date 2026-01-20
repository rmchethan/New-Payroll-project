function calculateNetto() {
  console.log("Button clicked");

  let brutto = Number(document.getElementById("brutto").value);
  let steuerklasse = document.getElementById("steuerklasse").value;
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let vwl = Number(document.getElementById("vwl").value);

  let nacht25 = Number(document.getElementById("nacht25").value);
  let nacht40 = Number(document.getElementById("nacht40").value);
  let sonntag50 = Number(document.getElementById("sonntag50").value);
  let feiertag125 = Number(document.getElementById("feiertag125").value);

  let jobticket = Number(document.getElementById("jobticket").value);

  // Grundlohn
  let grundlohn = brutto + vwl;

  // Stundenlohn
  let stundenlohn = grundlohn / 160;

  // Überstunden
  let ueberstundenPay = ueberstunden * stundenlohn;
  let ueberstundenZuschlag = ueberstundenPay * 0.25;

  // Zuschläge (steuerfrei)
  let zuschlaege =
    (nacht25 * stundenlohn * 0.25) +
    (nacht40 * stundenlohn * 0.40) +
    (sonntag50 * stundenlohn * 0.50) +
    (feiertag125 * stundenlohn * 1.25);

  // Steuerklasse
  let steuersatz = 0.20;
  if (steuerklasse === "3") steuersatz = 0.12;
  if (steuerklasse === "5") steuersatz = 0.26;
  if (steuerklasse === "6") steuersatz = 0.30;

  let steuerpflichtigesBrutto =
    grundlohn +
    ueberstundenPay +
    ueberstundenZuschlag;

  let lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  let gesamtBrutto = steuerpflichtigesBrutto + zuschlaege;

  let netto = gesamtBrutto - lohnsteuer - jobticket;

  document.getElementById("output").innerHTML =
    "Grundlohn: " + grundlohn.toFixed(2) + " €<br>" +
    "Überstunden inkl. Zuschlag: " + (ueberstundenPay + ueberstundenZuschlag).toFixed(2) + " €<br>" +
    "Steuerfreie Zuschläge: " + zuschlaege.toFixed(2) + " €<br>" +
    "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br><br>" +
    "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
}
