
function toggleEmployeeType() {
  const employeeType = document.getElementById("employeeType").value;

  const steuerklasse = document.getElementById("steuerklasse");
  const brutto = document.getElementById("brutto");
  const minijobRVBlock = document.getElementById("minijobRVBlock");

  // Fields that are NOT allowed for Minijob
  const disabledFields = [
    "steuerklasse",
    "ueberstunden",
    "vwl",
    "nacht25",
    "nacht40",
    "sonntag50",
    "feiertag125"
  ];

  if (employeeType === "minijob") {
    // Set & lock brutto
    brutto.value = 603.00;
    brutto.disabled = true;

    // Disable all non-eligible fields
    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });

    steuerklasse.disabled = true;
    minijobRVBlock.style.display = "block";

  } else {
    // Enable everything back
    brutto.disabled = false;

    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = false;
    });

    steuerklasse.disabled = false;
    minijobRVBlock.style.display = "none";
  }
}

function calculateNetto() {
  let employeeType = document.getElementById("employeeType")?.value;

  if(employeeType === "normal") {
    // call existing logic
    calculateNormal();
  } else if(employeeType === "praktikant") {
    calculatePraktikant();
  } else if(employeeType === "minijob") {
    calculateMinijob(); // NEW
  }
}

function calculateMinijob() {
   let brutto = Number(document.getElementById("brutto").value) || 0;
    let jobticket = Number(document.getElementById("jobticket").value) || 0;
    let rvCheckbox = document.getElementById("minijobRV").checked;
 
    let rvAN = rvCheckbox ? brutto * 0.036 : 0;
    let netto = brutto - rvAN - jobticket;

  // Arbeitgeberanteile Minijob
    let ag_rv = brutto * 0.15;
    let ag_kv = brutto * 0.13;
    let arbeitgeberGesamt = ag_rv + ag_kv;
    let agGesamtkosten = brutto + arbeitgeberGesamt;
    
     document.getElementById("output").innerHTML = `
    <table border="1" cellpadding="5">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>
    <tr><td>Brutto (Minijob)</td><td>${brutto.toFixed(2)}</td></tr>
    ${
      rvCheckbox
        ? `<tr><td>RV Arbeitnehmer (3.6%)</td><td>${rvAN.toFixed(2)}</td></tr>`
        : ``
    }

    <tr><td><strong>Netto</strong></td>
    <td><strong>${netto.toFixed(2)}</strong></td></tr>
    <tr><th colspan="2">Arbeitgeberanteile</th></tr>
    <tr><td>RV Arbeitgeber (15%)</td><td>${ag_rv.toFixed(2)}</td></tr>
    <tr><td>KV Arbeitgeber (13%)</td><td>${ag_kv.toFixed(2)}</td></tr>
    <tr><td><strong>AG gesamt</strong></td>
    <td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
    <tr><td><strong>Gesamtkosten AG</strong></td>
    <td><strong>${agGesamtkosten.toFixed(2)}</strong></td></tr>
  </table>
`;
    return; // 

  document.getElementById("output").innerHTML = outputHTML;
}


function calculateNormal() {
  // ===== Inputs =====
  let brutto = Number(document.getElementById("brutto")?.value) || 0;
  let ueberstunden = Number(document.getElementById("Ueberstunden")?.value) || 0;
  let vwl = Number(document.getElementById("vwl")?.value) || 0;
  let nacht25 = Number(document.getElementById("nacht25")?.value) || 0;
  let nacht40 = Number(document.getElementById("nacht40")?.value) || 0;
  let sonntag50 = Number(document.getElementById("sonntag50")?.value) || 0;
  let feiertag125 = Number(document.getElementById("feiertag125")?.value) || 0;
  let jobticket = Number(document.getElementById("jobtickets")?.value) || 0;
  let steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  // ===== Employee Brutto Components =====
  let ueberstundenZuschlag = ueberstunden * 0.25;
  let steuerfreieZuschlaege = nacht25 + nacht40 + sonntag50 + feiertag125;
  let grundlohn = brutto + vwl;
  let steuerpflichtigesBrutto = grundlohn + ueberstunden + ueberstundenZuschlag; // Zuschläge steuerfrei

  // ===== Steuerklasse Logic =====
  let steuersatz;
  switch(steuerklasse) {
    case "1":
    case "4":
      steuersatz = 0.20;
      break;
    case "2":
      steuersatz = 0.18;
      break;
    case "3":
      steuersatz = 0.12;
      break;
    case "5":
      steuersatz = 0.26;
      break;
    case "6":
      steuersatz = 0.30;
      break;
    default:
      steuersatz = 0.20;
  }

  // ===== Abzüge =====
  let lohnsteuer = steuerpflichtigesBrutto * steuersatz;
  let kv = steuerpflichtigesBrutto * 0.073;
  let rv = steuerpflichtigesBrutto * 0.093;
  let av = steuerpflichtigesBrutto * 0.012;
  let pv = steuerpflichtigesBrutto * 0.015;
  let sozialversicherungGesamt = kv + rv + av + pv;
  let netto = steuerpflichtigesBrutto - lohnsteuer - sozialversicherungGesamt - jobticket + steuerfreieZuschlaege;

  // ===== Arbeitgeberanteile =====
  let ag_kv = steuerpflichtigesBrutto * 0.073;
  let ag_rv = steuerpflichtigesBrutto * 0.093;
  let ag_av = steuerpflichtigesBrutto * 0.013;
  let ag_pv = steuerpflichtigesBrutto * 0.015;
  let umlage1 = steuerpflichtigesBrutto * 0.028;
  let umlage2 = steuerpflichtigesBrutto * 0.0075;
  let insolvenzgeld = steuerpflichtigesBrutto * 0.006;
  let arbeitgeberGesamt = ag_kv + ag_rv + ag_av + ag_pv + umlage1 + umlage2 + insolvenzgeld;

  // ===== Build Output Table =====
  let outputHTML = `
  <table border="1" cellpadding="5">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>
    <tr><td>Grundgehalt + VWL</td><td>${grundlohn.toFixed(2)}</td></tr>
    <tr><td>Überstunden</td><td>${ueberstunden.toFixed(2)}</td></tr>
    <tr><td>Überstundenzuschlag 25%</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
    <tr><td>Nachtstunden 25%</td><td>${nacht25.toFixed(2)}</td></tr>
    <tr><td>Nachtstunden 40%</td><td>${nacht40.toFixed(2)}</td></tr>
    <tr><td>Sonntagszuschlag 50%</td><td>${sonntag50.toFixed(2)}</td></tr>
    <tr><td>Feiertag 125%</td><td>${feiertag125.toFixed(2)}</td></tr>
    <tr><td><strong>Gesamtbrutto</strong></td><td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege).toFixed(2)}</strong></td></tr>

    <tr><th colspan="2">Abzüge</th></tr>
    <tr><td>Lohnsteuer (${(steuersatz*100).toFixed(0)}%)</td><td>${lohnsteuer.toFixed(2)}</td></tr>
    <tr><td>KV</td><td>${kv.toFixed(2)}</td></tr>
    <tr><td>RV</td><td>${rv.toFixed(2)}</td></tr>
    <tr><td>AV</td><td>${av.toFixed(2)}</td></tr>
    <tr><td>PV</td><td>${pv.toFixed(2)}</td></tr>
    <tr><td>Jobticket</td><td>${jobticket.toFixed(2)}</td></tr>
    <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

    <tr><th colspan="2">Arbeitgeberanteile</th></tr>
    <tr><td>KV AG (7.3%)</td><td>${ag_kv.toFixed(2)}</td></tr>
    <tr><td>RV AG (9.3%)</td><td>${ag_rv.toFixed(2)}</td></tr>
    <tr><td>AV AG (1.3%)</td><td>${ag_av.toFixed(2)}</td></tr>
    <tr><td>PV AG (1.525%)</td><td>${ag_pv.toFixed(2)}</td></tr>
    <tr><td>Umlage 1 (2.8%)</td><td>${umlage1.toFixed(2)}</td></tr>
    <tr><td>Umlage 2 (0.75%)</td><td>${umlage2.toFixed(2)}</td></tr>
    <tr><td>Insolvenzgeld (0.6%)</td><td>${insolvenzgeld.toFixed(2)}</td></tr>
    <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
    <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

window.onload = toggleEmployeeType;








