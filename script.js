function calculateNetto() {
  }

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

  let steuersatz = 0.20;
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
    <tr><td>AG gesamt</td><td>${arbeitgeberGesamt.toFixed(2)}</td></tr>
    <tr><td><strong>Gesamtkosten AG</strong></td>
        <td><strong>${(gesamtBrutto + arbeitgeberGesamt).toFixed(2)}</strong></td>
    </tr>
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;






