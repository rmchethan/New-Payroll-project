function calculateNetto() {

  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto").value);
  let steuerklasse = document.getElementById("steuerklasse").value;
  let ueberstunden = Number(document.getElementById("Ueberstunden").value);
  let vwl = Number(document.getElementById("vwl").value);

  let nacht25 = Number(document.getElementById("nacht25").value);
  let nacht40 = Number(document.getElementById("nacht40").value);
  let sonntag50 = Number(document.getElementById("sonntag50").value);
  let feiertag125 = Number(document.getElementById("feiertag125").value);

  let jobticket = Number(document.getElementById("jobticket").value);

  // ===== Grundlohn =====
  let grundlohn = brutto + vwl;

  // ===== Stundenlohn =====
  let stundenlohn = grundlohn / 160;

  // ===== Überstunden =====
  let ueberstundenPay = ueberstunden * stundenlohn;
  let ueberstundenZuschlag = ueberstundenPay * 0.25;

  // ===== Steuerfreie Zuschläge =====
  let nacht25Pay = nacht25 * stundenlohn * 0.25;
  let nacht40Pay = nacht40 * stundenlohn * 0.40;
  let sonntagPay = sonntag50 * stundenlohn * 0.50;
  let feiertagPay = feiertag125 * stundenlohn * 1.25;

  let steuerfreieZuschlaege = nacht25Pay + nacht40Pay + sonntagPay + feiertagPay;

  // ===== Steuerklasse =====
  let steuersatz = 0.20;
  if (steuerklasse === "2") steuersatz = 0.18;
  if (steuerklasse === "3") steuersatz = 0.12;
  if (steuerklasse === "5") steuersatz = 0.26;
  if (steuerklasse === "6") steuersatz = 0.30;

  // ===== Steuerpflichtiges Brutto =====
  let steuerpflichtigesBrutto = grundlohn + ueberstundenPay + ueberstundenZuschlag;

  // ===== Lohnsteuer =====
  let lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  // ===== Gesamtbrutto =====
  let gesamtBrutto = steuerpflichtigesBrutto + steuerfreieZuschlaege;

  // ===== Netto =====
  let netto = gesamtBrutto - lohnsteuer - jobticket;

  // ===== Output table =====
  let outputHTML = `
  <table border="1" cellpadding="5">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>
    <tr><td>Grundlohn (Bruttogehalt + VWL)</td><td>${grundlohn.toFixed(2)}</td></tr>
    <tr><td>Überstunden</td><td>${ueberstundenPay.toFixed(2)}</td></tr>
    <tr><td>Überstundenzuschlag (25%)</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
    <tr><td>Nachtstunden 25%</td><td>${nacht25Pay.toFixed(2)}</td></tr>
    <tr><td>Nachtstunden 40%</td><td>${nacht40Pay.toFixed(2)}</td></tr>
    <tr><td>Sonntag 50%</td><td>${sonntagPay.toFixed(2)}</td></tr>
    <tr><td>Feiertag 125%</td><td>${feiertagPay.toFixed(2)}</td></tr>
    <tr><td><strong>Steuerpflichtiges Brutto</strong></td><td>${steuerpflichtigesBrutto.toFixed(2)}</td></tr>
    <tr><td>Lohnsteuer (${(steuersatz*100).toFixed(0)}%)</td><td>${lohnsteuer.toFixed(2)}</td></tr>
    <tr><td>Steuerfreie Zuschläge gesamt</td><td>${steuerfreieZuschlaege.toFixed(2)}</td></tr>
    <tr><td>Gesamtbrutto</td><td>${gesamtBrutto.toFixed(2)}</td></tr>
    <tr><td>Jobticket</td><td>${jobticket.toFixed(2)}</td></tr>
    <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}
