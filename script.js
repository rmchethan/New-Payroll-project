
function calculateAge(dob) {
  if (!dob) return 0;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function getPvRates(children, age) {
  let pvANRate = 0.018; // base 1.8%
  const pvAGRate = 0.018; // fixed

  if (children >= 5) {
    pvANRate = 0.008;
  } else if (children === 4) {
    pvANRate = 0.0105;
  } else if (children === 3) {
    pvANRate = 0.013;
  } else if (children === 2) {
    pvANRate = 0.0155;
  } else if (children === 1) {
    pvANRate = 0.018;
  } else {
    // children === 0
    if (age >= 23) {
      pvANRate = 0.024; // Zuschlag
    }
  }

  return {
    pvANRate,
    pvAGRate
  };
}


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
    "feiertag125",
    "jobtickets"
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
    let rvCheckbox = document.getElementById("minijobRV").checked;
 
    let rvAN = rvCheckbox ? brutto * 0.036 : 0;
    let netto = brutto - rvAN;

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
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const ueberstunden = Number(document.getElementById("ueberstunden")?.value) || 0;
  const vwl = Number(document.getElementById("vwl")?.value) || 0;
  const nacht25 = Number(document.getElementById("nacht25")?.value) || 0;
  const nacht40 = Number(document.getElementById("nacht40")?.value) || 0;
  const sonntag50 = Number(document.getElementById("sonntag50")?.value) || 0;
  const feiertag125 = Number(document.getElementById("feiertag125")?.value) || 0;
  const jobticket = Number(document.getElementById("jobticket")?.value) || 0;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  // === Kirchensteuer calculation ===
const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
let kirchensteuer = 0;

if (kirchensteuerpflichtig) {
  // Determine percentage based on state
  const kirchensteuerRate = ["Bayern", "Baden-Württemberg"].includes(state) ? 0.08 : 0.09;
  kirchensteuer = lohnsteuer * kirchensteuerRate;
}

  // PV inputs
  const dob = document.getElementById("dob")?.value;
  const children = Number(document.getElementById("children")?.value || 0);
  const age = calculateAge(dob);

  // ===== Brutto components =====
  const ueberstundenZuschlag = ueberstunden * 0.25;
  const steuerfreieZuschlaege = nacht25 + nacht40 + sonntag50 + feiertag125;
  const grundlohn = brutto + vwl;

  const steuerpflichtigesBrutto =
    grundlohn +
    ueberstunden +
    ueberstundenZuschlag;

  // ===== Steuerklasse logic =====
  let steuersatz = 0.20;
  switch (steuerklasse) {
    case "2": steuersatz = 0.18; break;
    case "3": steuersatz = 0.12; break;
    case "5": steuersatz = 0.26; break;
    case "6": steuersatz = 0.30; break;
  }

  const lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  // ===== Sozialversicherung AN =====
  const kv = steuerpflichtigesBrutto * 0.073;
  const rv = steuerpflichtigesBrutto * 0.093;
  const av = steuerpflichtigesBrutto * 0.012;

  // === PV dynamic ===
const state = document.getElementById("state")?.value || "default";

// === Get PV rates considering children and age ===
const pvRates = getPvRates(children, age);
let pvANRate = pvRates.pvANRate; // employee rate
let pvAGRate = pvRates.pvAGRate; // employer rate

// Sachsen exception: employee pays reduced PV rate
if (state === "Sachsen") {
  pvANRate = 0.00775; // 0.775%
}

// === PV amounts ===
const pvAN = steuerpflichtigesBrutto * pvANRate;
const pvAG = steuerpflichtigesBrutto * pvAGRate;

// === Social security total for AN ===
const sozialversicherungAN = kv + rv + av + pvAN;

// Now use `pvAN` and `pvAG` in your net and AG calculations


  // ===== Netto =====
  const netto =
    steuerpflichtigesBrutto
    - lohnsteuer
    - sozialversicherungAN
    - jobticket
    - kirchensteuer
    + steuerfreieZuschlaege;

  // ===== Arbeitgeberanteile =====
  const ag_kv = steuerpflichtigesBrutto * 0.073;
  const ag_rv = steuerpflichtigesBrutto * 0.093;
  const ag_av = steuerpflichtigesBrutto * 0.013;
  const umlage1 = steuerpflichtigesBrutto * 0.028;
  const umlage2 = steuerpflichtigesBrutto * 0.0075;
  const insolvenzgeld = steuerpflichtigesBrutto * 0.006;

  const arbeitgeberGesamt =
    ag_kv +
    ag_rv +
    ag_av +
    pvAG +
    umlage1 +
    umlage2 +
    insolvenzgeld;

  // ===== Output =====
  const outputHTML = `
  <table border="1" cellpadding="5">
    <tr><th>Komponente</th><th>Betrag (€)</th></tr>

    <tr><td>Grundgehalt + VWL</td><td>${grundlohn.toFixed(2)}</td></tr>
    <tr><td>Überstunden</td><td>${ueberstunden.toFixed(2)}</td></tr>
    <tr><td>Überstundenzuschlag 25%</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
    <tr><td>Steuerfreie Zuschläge</td><td>${steuerfreieZuschlaege.toFixed(2)}</td></tr>

    <tr><td><strong>Gesamtbrutto</strong></td>
        <td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege).toFixed(2)}</strong></td></tr>

    <tr><th colspan="2">Abzüge Arbeitnehmer</th></tr>
    <tr><td>Lohnsteuer (${(steuersatz * 100).toFixed(0)}%)</td><td>${lohnsteuer.toFixed(2)}</td></tr>
    <tr><td>Kirchensteuer (${(kirchensteuerRate*100).toFixed(0)}%)</td><td>${kirchensteuer.toFixed(2)}</td></tr>
    <tr><td>KV</td><td>${kv.toFixed(2)}</td></tr>
    <tr><td>RV</td><td>${rv.toFixed(2)}</td></tr>
    <tr><td>AV</td><td>${av.toFixed(2)}</td></tr>
    <tr><td>PV AN(${(pvANRate * 100).toFixed(2)}%)</td><td>${pvAN.toFixed(2)}</td></tr>
    <tr><td>Jobticket</td><td>${jobticket.toFixed(2)}</td></tr>

    <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

    <tr><th colspan="2">Arbeitgeberanteile</th></tr>
    <tr><td>KV AG</td><td>${ag_kv.toFixed(2)}</td></tr>
    <tr><td>RV AG</td><td>${ag_rv.toFixed(2)}</td></tr>
    <tr><td>AV AG</td><td>${ag_av.toFixed(2)}</td></tr>
    <tr><td>PV AG (1.8%)</td><td>${pvAG.toFixed(2)}</td></tr>
    <tr><td>PV AN (${(pvANRate*100).toFixed(2)}%)</td><td>${pvAN.toFixed(2)}</td></tr>
    <tr><td>Umlage 1</td><td>${umlage1.toFixed(2)}</td></tr>
    <tr><td>Umlage 2</td><td>${umlage2.toFixed(2)}</td></tr>
    <tr><td>Insolvenzgeld</td><td>${insolvenzgeld.toFixed(2)}</td></tr>

    <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
    <tr><td><strong>Gesamtkosten AG</strong></td>
        <td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
  </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}


window.onload = toggleEmployeeType;















