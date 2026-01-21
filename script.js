function calculateNetto() {

  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto").value);
  let steuerklasse = document.getElementById("steuerklasse").value;
  let ueberstunden = Number(document.getElementById("ueberstunden").value);
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

  // ===== Überstunden (steuerpflichtig) =====
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

  // ===== Arbeitgeberanteile =====
let ag_kv = steuerpflichtigesBrutto * 0.073;
let ag_rv = steuerpflichtigesBrutto * 0.093;
let ag_av = steuerpflichtigesBrutto * 0.013;
let ag_pv = steuerpflichtigesBrutto * 0.01525;

let umlage1 = steuerpflichtigesBrutto * 0.028;
let umlage2 = steuerpflichtigesBrutto * 0.0075;
let insolvenzgeld = steuerpflichtigesBrutto * 0.006;

let arbeitgeberGesamt =
  ag_kv + ag_rv + ag_av + ag_pv + umlage1 + umlage2 + insolvenzgeld;

  // ===== Gesamtbrutto =====
  let gesamtBrutto = steuerpflichtigesBrutto + steuerfreieZuschlaege;

  // ===== Netto =====
  let netto = gesamtBrutto - lohnsteuer - jobticket;

  // ===== Output table =====
  let outputHTML = `
  <table border="1" cellpadding="5">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>
    <tr><td>Grundlohn (Brutto + VWL)</td><td>${grundlohn.toFixed(2)}</td></tr>
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
    `;
      outputHTML += `
    <tr><th colspan="2">Arbeitgeberanteile</th></tr>
    <tr><td>KV Arbeitgeber (7.3%)</td><td>${ag_kv.toFixed(2)} €</td></tr>
    <tr><td>RV Arbeitgeber (9.3%)</td><td>${ag_rv.toFixed(2)} €</td></tr>
    <tr><td>AV Arbeitgeber (1.3%)</td><td>${ag_av.toFixed(2)} €</td></tr>
    <tr><td>PV Arbeitgeber (1.525%)</td><td>${ag_pv.toFixed(2)} €</td></tr>
    <tr><td>Umlage 1 (2.8%)</td><td>${umlage1.toFixed(2)} €</td></tr>
    <tr><td>Umlage 2 (0.75%)</td><td>${umlage2.toFixed(2)} €</td></tr>
    <tr><td>Insolvenzgeld (0.6%)</td><td>${insolvenzgeld.toFixed(2)} €</td></tr>
    <tr><td><strong>Arbeitgeber gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)} €</strong></td></tr>
    <tr><th colspan="2">Gesamtkosten Arbeitgeber</th></tr>
    <tr><td>Brutto + Arbeitgeberanteile</td><td>${(gesamtBrutto + arbeitgeberGesamt).toFixed(2)} €</td></tr>

`  ;
  outputHTML += `</table>`;
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}





