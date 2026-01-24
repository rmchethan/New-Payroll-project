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
    "jobticket"
  ];

  if (employeeType === "minijob") {
    brutto.value = 603.00;
    brutto.disabled = true;

    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });

    steuerklasse.disabled = true;
    minijobRVBlock.style.display = "block";
  } else {
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
  const employeeType = document.getElementById("employeeType")?.value || "normal";

  if (employeeType === "normal") {
    calculateNormal();
  } else if (employeeType === "praktikant") {
    calculatePraktikant();
  } else if (employeeType === "minijob") {
    calculateMinijob();
  }
}

function calculateMinijob() {
  const brutto = Number(document.getElementById("brutto").value) || 0;
  const rvCheckbox = document.getElementById("minijobRV").checked;

  const rvAN = rvCheckbox ? brutto * 0.036 : 0;
  const netto = brutto - rvAN;

  const ag_rv = brutto * 0.15;
  const ag_kv = brutto * 0.13;
  const arbeitgeberGesamt = ag_rv + ag_kv;
  const agGesamtkosten = brutto + arbeitgeberGesamt;

  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Minijob)</td><td>${brutto.toFixed(2)}</td></tr>
      ${rvCheckbox ? `<tr><td>RV Arbeitnehmer (3.6%)</td><td>${rvAN.toFixed(2)}</td></tr>` : ``}
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>RV Arbeitgeber (15%)</td><td>${ag_rv.toFixed(2)}</td></tr>
      <tr><td>KV Arbeitgeber (13%)</td><td>${ag_kv.toFixed(2)}</td></tr>
      <tr><td><strong>AG gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${agGesamtkosten.toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
  return; // Important to stop execution
}

function calculateNormal() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const ueberstunden = Number(document.getElementById("ueberstunden")?.value) || 0;
  const vwl = Number(document.getElementById("vwl")?.value) || 0;
  const nacht25 = Number(document.getElementById("nacht25")?.value) || 0;
  const nacht40 = Number(document.getElementById("nacht40")?.value) || 0;
  const sonntag50 = Number(document.getElementById("sonntag50")?.value) || 0;
  const feiertag125 = Number(document.getElementById("feiertag125")?.value) || 0;
  const jobticket = Number(document.getElementById("jobticket")?.value) || 0;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  // PV & age/children
  const dob = document.getElementById("dob")?.value;
  const children = Number(document.getElementById("children")?.value || 0);
  const age = calculateAge(dob);

  // Sachsen & state
  const state = document.getElementById("state")?.value || "default";

const grundlohn = brutto + vwl;
const monatlicheStunden = 160;  
const stundenlohn = grundlohn / monatlicheStunden;

const nacht25Pay = nacht25 * stundenlohn * 0.25;
const nacht40Pay = nacht40 * stundenlohn * 0.40;
const sonntagPay = sonntag50 * stundenlohn * 0.50; 
const feiertagPay = feiertag125 * stundenlohn * 1.25;


  // ===== Brutto components =====
  const ueberstundenZuschlag = ueberstunden * 0.25;
  const steuerfreieZuschlaege = nacht25Pay + nacht40Pay + sonntagPay + feiertagPay;
  const steuerpflichtigesBrutto = grundlohn + ueberstunden + ueberstundenZuschlag;

  // ===== Steuerklasse logic =====
  let steuersatz = 0.20;
  switch (steuerklasse) {
    case "2": steuersatz = 0.18; break;
    case "3": steuersatz = 0.12; break;
    case "5": steuersatz = 0.26; break;
    case "6": steuersatz = 0.30; break;
  }

  const lohnsteuer = steuerpflichtigesBrutto * steuersatz;

  // ===== Sozialversicherung =====
  const kv = steuerpflichtigesBrutto * 0.073;
  const rv = steuerpflichtigesBrutto * 0.093;
  const av = steuerpflichtigesBrutto * 0.012;

 // PV dynamic – before override
let { pvANRate, pvAGRate } = getPvRates(children, age);

// Saxony override for AG share & AN share:
if (state === "Sachsen") {
  pvAGRate = 0.013; // employer always 1.3%
  
  // Adjust employee PV share based on children/age:
  if (children === 0 && age >= 23) {
    pvANRate = 0.029; // 2.90%
  } else if (children === 1) {
    pvANRate = 0.023; // 2.30%
  } else if (children === 2) {
    pvANRate = 0.0205; // 2.05%
  } else if (children === 3) {
    pvANRate = 0.018; // 1.80%
  } else if (children === 4) {
    pvANRate = 0.0155; // 1.55%
  } else if (children >= 5) {
    pvANRate = 0.013; // 1.30%
  } else {
    // default fallback – not needed if above covers all
  }
}
  // ===== Kirchensteuer =====
  const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
  let kirchensteuer = 0;
  let kirchensteuerRate = 0;
  if (kirchensteuerpflichtig) {
    kirchensteuerRate = ["Bayern", "Baden-Württemberg"].includes(state) ? 0.08 : 0.09;
    kirchensteuer = lohnsteuer * kirchensteuerRate;
  }

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - lohnsteuer - sozialversicherungAN - jobticket - kirchensteuer + steuerfreieZuschlaege;

  // ===== Arbeitgeberanteile =====
  const ag_kv = steuerpflichtigesBrutto * 0.073;
  const ag_rv = steuerpflichtigesBrutto * 0.093;
  const ag_av = steuerpflichtigesBrutto * 0.013;
  const umlage1 = steuerpflichtigesBrutto * 0.028;
  const umlage2 = steuerpflichtigesBrutto * 0.0075;
  const insolvenzgeld = steuerpflichtigesBrutto * 0.006;

  const arbeitgeberGesamt = ag_kv + ag_rv + ag_av + pvAG + umlage1 + umlage2 + insolvenzgeld;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Grundgehalt + VWL</td><td>${grundlohn.toFixed(2)}</td></tr>
      <tr><td>Überstunden</td><td>${ueberstunden.toFixed(2)}</td></tr>
      <tr><td>Überstundenzuschlag 25%</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
      <tr><td>Nachtstunden 25%</td><td>${nacht25.toFixed(2)}</td></tr>
      <tr><td>Nachtstunden 40%</td><td>${nacht40.toFixed(2)}</td></tr>
      <tr><td>Sonntag 50%</td><td>${sonntag50.toFixed(2)}</td></tr>
      <tr><td>Feiertag 125%</td><td>${feiertag125.toFixed(2)}</td></tr>
      <tr><td><strong>Gesamtbrutto</strong></td><td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege).toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Abzüge Arbeitnehmer</th></tr>
      <tr><td>Lohnsteuer (${(steuersatz * 100).toFixed(0)}%)</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>Kirchensteuer (${(kirchensteuerRate*100).toFixed(0)}%)</td><td>${kirchensteuer.toFixed(2)}</td></tr>
      <tr><td>KV</td><td>${kv.toFixed(2)}</td></tr>
      <tr><td>RV</td><td>${rv.toFixed(2)}</td></tr>
      <tr><td>AV</td><td>${av.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${pvAN.toFixed(2)}</td></tr>
      <tr><td>Jobticket</td><td>${jobticket.toFixed(2)}</td></tr>

      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG</td><td>${ag_kv.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${ag_rv.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${ag_av.toFixed(2)}</td></tr>
      <tr><td>PV AG (1.8%)</td><td>${pvAG.toFixed(2)}</td></tr>
      <tr><td>Umlage 1</td><td>${umlage1.toFixed(2)}</td></tr>
      <tr><td>Umlage 2</td><td>${umlage2.toFixed(2)}</td></tr>
      <tr><td>Insolvenzgeld</td><td>${insolvenzgeld.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

// Initialize toggle on page load
window.onload = toggleEmployeeType;





