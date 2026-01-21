function calculateNetto() {
  

  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto")?.value) || 0;
  let ueberstunden = Number(document.getElementById("ueberstunden")?.value) || 0;
  let vwl = Number(document.getElementById("vwl")?.value) || 0;
  let nacht25 = Number(document.getElementById("nacht25")?.value) || 0;
  let nacht40 = Number(document.getElementById("nacht40")?.value) || 0;
  let sonntag50 = Number(document.getElementById("sonntag50")?.value) || 0;
  let feiertag125 = Number(document.getElementById("feiertag125")?.value) || 0;
  let jobticket = Number(document.getElementById("jobtickets")?.value) || 0;

  // ===== Basic calculations =====
  let grundlohn = brutto + vwl;

  let ueberstundenPay = ueberstunden;
  let ueberstundenZuschlag = ueberstundenPay * 0.25;

  let nacht25Pay = grundlohn * 0.25 * nacht25;
  let nacht40Pay = grundlohn * 0.40 * nacht40;
  let sonntagPay = grundlohn * 0.50 * sonntag50;
  let feiertagPay = grundlohn * 1.25 * feiertag125;

  let steuerfreieZuschlaege =
    nacht25Pay + nacht40Pay + sonntagPay + feiertagPay;

  let steuerpflichtigesBrutto =
    grundlohn + ueberstundenPay + ueberstundenZuschlag;

  let steuersatz;
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
  let lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  let netto =
    steuerpflichtigesBrutto - lohnsteuer + steuerfreieZuschlaege - jobticket;

  // ===== Arbeitgeber =====
  let ag_kv = steuerpflichtigesBrutto * 0.073;
  let ag_rv = steuerpflichtigesBrutto * 0.093;
  let ag_av = steuerpflichtigesBrutto * 0.013;
  let ag_pv = steuerpflichtigesBrutto * 0.01525;
  let umlage1 = steuerpflichtigesBrutto * 0.028;
  let umlage2 = steuerpflichtigesBrutto * 0.0075;
  let insolvenzgeld = steuerpflichtigesBrutto * 0.006;

  let arbeitgeberGesamt =
    ag_kv + ag_rv + ag_av + ag_pv + umlage1 + umlage2 + insolvenzgeld;

  let gesamtBrutto = steuerpflichtigesBrutto + steuerfreieZuschlaege;

  // ===== Output =====
  let outputHTML = `
  <table border="1" cellpadding="6" style="border-collapse:collapse; width:600px">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>
    <tr><td>Grundlohn</td><td>${grundlohn.toFixed(2)}</td></tr>
    <tr><td>Überstunden</td><td>${ueberstundenPay.toFixed(2)}</td></tr>
    <tr><td>Überstundenzuschlag</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
    <tr><td>Steuerpflichtiges Brutto</td><td>${steuerpflichtigesBrutto.toFixed(2)}</td></tr>
    <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
    <tr><td>Steuerfreie Zuschläge</td><td>${steuerfreieZuschlaege.toFixed(2)}</td></tr>
    <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

    <tr><th colspan="2">Arbeitgeberanteile</th></tr>
    <tr><td>KV AG (7.3%)</td><td>${ag_kv.toFixed(2)}</td></tr>
    <tr><td>RV AG (9.3%)</td><td>${ag_rv.toFixed(2)}</td></tr>
    <tr><td>AV AG (1.3%)</td><td>${ag_av.toFixed(2)}</td></tr>
    <tr><td>PV AG (1.525%)</td><td>${ag_pv.toFixed(2)}</td></tr>
    <tr><td>Umlage 1 (2.8%)</td><td>${umlage1.toFixed(2)}</td></tr>
    <tr><td>Umlage 2 (0.75%)</td><td>${umlage2.toFixed(2)}</td></tr>
    <tr><td>Insolvenzgeld (0.6%)</td><td>${insolvenzgeld.toFixed(2)}</td></tr>
    <tr><td><strong>AG Gesamt</strong></td><td>${arbeitgeberGesamt.toFixed(2)}</td></tr>
    <tr><td><strong>Gesamtkosten AG</strong></td><td>${(gesamtBrutto + arbeitgeberGesamt).toFixed(2)}</td></tr>
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;

  }












