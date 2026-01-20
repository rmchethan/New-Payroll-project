function calculateNetto() {

  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto").value);
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let nacht25 = Number(document.getElementById("nacht25").value);
  let nacht40 = Number(document.getElementById("nacht40").value);
  let sonntag50 = Number(document.getElementById("sonntag50").value);
  let feiertag125 = Number(document.getElementById("feiertag125").value);
  let jobticket = Number(document.getElementById("Jobtickets").value);

  // ===== Basis =====
  const monthlyHours = 160; // Vereinfachte Annahme
  let stundenlohn = brutto / monthlyHours;

  // ===== Überstunden (steuerpflichtig) =====
  let ueberstundenPay = ueberstunden * stundenlohn;

  // ===== Zuschläge (steuerfrei) =====
  let nacht25Pay = nacht25 * stundenlohn * 0.25;
  let nacht40Pay = nacht40 * stundenlohn * 0.40;
  let sonntagPay = sonntag50 * stundenlohn * 0.50;
  let feiertagPay = feiertag125 * stundenlohn * 1.25;

  let steuerfreiesBrutto =
    nacht25Pay +
    nacht40Pay +
    sonntagPay +
    feiertagPay;

  // ===== Steuerpflichtiges Brutto =====
  let steuerpflichtigesBrutto =
    brutto +
    ueberstundenPay;

  // ===== Gesamtbrutto (Auszahlungsbasis) =====
  let gesamtBrutto =
    steuerpflichtigesBrutto +
    steuerfreiesBrutto;

  // ===== Steuer =====
  let lohnsteuer = steuerpflichtigesBrutto * 0.20;

  // ===== Sozialversicherung (vereinfachte Annahme) =====
  let kv = gesamtBrutto * 0.073;
  let rv = gesamtBrutto * 0.093;
  let av = gesamtBrutto * 0.012;
  let pv = gesamtBrutto * 0.015;
  let sozialversicherung = kv + rv + av + pv;

  // ===== Netto =====
  let netto =
    gesamtBrutto -
    lohnsteuer -
    sozialversicherung -
    jobticket;

  // ===== Output =====
  document.getElementById("output").innerHTML =
    "<strong>Stundenlohn</strong><br>" +
    stundenlohn.toFixed(2) + " €<br><br>" +

    "<strong>Brutto-Bestandteile</strong><br>" +
    "Grundgehalt: " + brutto.toFixed(2) + " €<br>" +
    "Überstunden: " + ueberstundenPay.toFixed(2) + " €<br>" +
    "Nacht (25%): " + nacht25Pay.toFixed(2) + " €<br>" +
    "Nacht (40%): " + nacht40Pay.toFixed(2) + " €<br>" +
    "Sonntag (50%): " + sonntagPay.toFixed(2) + " €<br>" +
    "Feiertag (125%): " + feiertagPay.toFixed(2) + " €<br><br>" +

    "<strong>Steuerfrei</strong><br>" +
    steuerfreiesBrutto.toFixed(2) + " €<br><br>" +

    "<strong>Steuerpflichtig</strong><br>" +
    steuerpflichtigesBrutto.toFixed(2) + " €<br><br>" +

    "<strong>Abzüge</strong><br>" +
    "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br>" +
    "KV: " + kv.toFixed(2) + " €<br>" +
    "RV: " + rv.toFixed(2) + " €<br>" +
    "AV: " + av.toFixed(2) + " €<br>" +
    "PV: " + pv.toFixed(2) + " €<br>" +
    "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

    "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
}
