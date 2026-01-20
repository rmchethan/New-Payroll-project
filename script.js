function calculateNetto() {

  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto").value);
  let vwl = Number(document.getElementById("vwl").value);
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let ueberstundenZuschlag = Number(document.getElementById("ueberstundenZuschlag").value);

  let nacht25 = Number(document.getElementById("nacht25").value);
  let nacht40 = Number(document.getElementById("nacht40").value);
  let sonntag50 = Number(document.getElementById("sonntag50").value);
  let feiertag125 = Number(document.getElementById("feiertag125").value);

  let jobticket = Number(document.getElementById("Jobtickets").value);

  // ===== Grundlohn (Zuschlagsbasis) =====
  let grundlohn = brutto + vwl;

  // ===== Stundenlohn =====
  const monthlyHours = 160;
  let stundenlohn = grundlohn / monthlyHours;

  // ===== Überstunden (steuerpflichtig, NOT zuschlagsrelevant) =====
  let ueberstundenPay = ueberstunden * stundenlohn;
  let ueberstundenZuschlag = ueberstundenPay * 0.25;

  // ===== Zuschläge (steuerfrei, based on Grundlohn only) =====
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
    grundlohn +
    ueberstundenPay +
    ueberstundenZuschlag;

  // ===== Gesamtbrutto =====
  let gesamtBrutto =
    steuerpflichtigesBrutto +
    steuerfreiesBrutto;

let steuerklasse = document.getElementById("steuerklasse").value;

let steuersatz = 0.20; // default

switch (steuerklasse) {
  case "1": steuersatz = 0.20; break;
  case "2": steuersatz = 0.18; break;
  case "3": steuersatz = 0.12; break;
  case "4": steuersatz = 0.20; break;
  case "5": steuersatz = 0.26; break;
  case "6": steuersatz = 0.30; break;
}
  
  // ===== Steuer =====
  let lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  // ===== Sozialversicherung =====
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
    "<strong>Grundlohn</strong><br>" +
    grundlohn.toFixed(2) + " €<br><br>" +

    "<strong>Steuerpflichtig</strong><br>" +
    "Grundgehalt + VWL: " + grundlohn.toFixed(2) + " €<br>" +
    "Überstunden: " + ueberstundenPay.toFixed(2) + " €<br>" +
    "Überstundenzuschlag: " + ueberstundenZuschlag.toFixed(2) + " €<br><br>" +

    "<strong>Steuerfrei</strong><br>" +
    "Nacht (25%): " + nacht25Pay.toFixed(2) + " €<br>" +
    "Nacht (40%): " + nacht40Pay.toFixed(2) + " €<br>" +
    "Sonntag (50%): " + sonntagPay.toFixed(2) + " €<br>" +
    "Feiertag (125%): " + feiertagPay.toFixed(2) + " €<br><br>" +

    "<strong>Abzüge</strong><br>" +
    "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br>" +
    "KV: " + kv.toFixed(2) + " €<br>" +
    "RV: " + rv.toFixed(2) + " €<br>" +
    "AV: " + av.toFixed(2) + " €<br>" +
    "PV: " + pv.toFixed(2) + " €<br>" +
    "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

    "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
}


