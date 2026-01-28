
console.log("Progressive tax function exists:", typeof calculateProgressiveTax);
window.onload = toggleEmployeeType;

const BBG_KV_PV = 5175;
const BBG_RV_AV = 7550;

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
  const pvAGRate = 0.018;
  let pvANRate;

  if (children >= 5) pvANRate = 0.008;
  else if (children === 4) pvANRate = 0.0105;
  else if (children === 3) pvANRate = 0.013;
  else if (children === 2) pvANRate = 0.0155;
  else if (children === 1) pvANRate = 0.018;
  else if (children === 0 && age >= 23) pvANRate = 0.024;
  else pvANRate = 0.018; // fallback (e.g. under 23, no kids)

  return { pvANRate, pvAGRate };
}


// Progressive tax for annual taxable income
function calculateAnnualProgressiveTax(annualIncome) {
  let tax = 0;

  if (annualIncome <= 12348) return 0; // Grundfreibetrag 2026

  if (annualIncome > 12348) {
    const taxable = Math.min(annualIncome, 20000) - 12348;
    tax += taxable * 0.14;
  }

  if (annualIncome > 20000) {
    const taxable = Math.min(annualIncome, 40000) - 20000;
    tax += taxable * 0.24;
  }

  if (annualIncome > 40000) {
    const taxable = Math.min(annualIncome, 70000) - 40000;
    tax += taxable * 0.34;
  }

  if (annualIncome > 70000) {
    tax += (annualIncome - 70000) * 0.42;
  }

  return tax;
}

// Steuerklasse allowances
function adjustTaxBySteuerklasse(tax, steuerklasse, children) {
    switch(steuerklasse) {
        case "1": 
            return tax; // base tax
        case "2": 
            // Single parent: only the first child reduces tax
            if (children >= 1) return tax - calculateChildAllowance(tax, 1);
            return tax;
        case "3": 
            // Main earner: all children reduce tax
            if (children >= 1) return tax - calculateChildAllowance(tax, children);
            return tax;
        case "4": 
            return tax; // same as 1
        case "5": 
            return tax * 1.4; // secondary earner higher tax
        case "6": 
            return tax * 1.5; // multiple jobs, highest tax
        default: 
            return tax;
    }
}

function calculateChildAllowance(tax, numChildren) {
    // For now, use a placeholder fixed reduction per child
    // TODO: Replace with actual 2026 Kinderfreibetrag or Kindergeld-adjusted amount
    const perChildReduction = 200; // Example: €200 reduction per child
    return perChildReduction * numChildren;
}

function calculateProgressiveTax(monthlyIncome) {
  let tax = 0;

  if (monthlyIncome <= 1200) return 0;

  if (monthlyIncome > 1200) {
    const taxable = Math.min(monthlyIncome, 2000) - 1200;
    tax += taxable * 0.14;
  }

  if (monthlyIncome > 2000) {
    const taxable = Math.min(monthlyIncome, 4000) - 2000;
    tax += taxable * 0.24;
  }

  if (monthlyIncome > 4000) {
    const taxable = Math.min(monthlyIncome, 7000) - 4000;
    tax += taxable * 0.34;
  }

  if (monthlyIncome > 7000) {
    tax += (monthlyIncome - 7000) * 0.42;
  }

  return tax;
}


// Compute monthly Lohnsteuer after allowances
function calculateMonthlyLohnsteuer(steuerpflichtigesBrutto, steuerklasse, svAN = 0) {
  const annualGross = (steuerpflichtigesBrutto - svAN) * 12;
  const annualAllowance = getAnnualAllowance(steuerklasse);
  const netAnnualTaxable = Math.max(0, annualGross - annualAllowance);
  const annualTax = calculateAnnualProgressiveTax(netAnnualTaxable);
  return annualTax / 12;
}

console.log("steuerklasse element:", steuerklasse);


function toggleEmployeeType() {
  const employeeType = document.getElementById("employeeType")?.value;
  const brutto = document.getElementById("brutto");
  const steuerklasse = document.getElementById("steuerklasse");
  const minijobRVBlock = document.getElementById("minijobRVBlock");

  // Reset everything first
  brutto.disabled = false;
  disabledFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = false;
  });

  if (minijobRVBlock) minijobRVBlock.style.display = "none";

  // ===== MINIJOB =====
  if (employeeType === "minijob") {
    brutto.value = 603;
    brutto.disabled = true;

    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });

    if (minijobRVBlock) minijobRVBlock.style.display = "block";
  }

  // ===== MIDIJOB (Übergangsbereich) =====
  if (employeeType === "midijob") {
    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });

    // Steuerklasse still relevant for tax
    steuerklasse.disabled = false;
  }

  // ===== PRAKTIKANT =====
  if (employeeType === "praktikant") {
    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });
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
  } else if (employeeType === "midijob") {
    calculateMidijob();
  }
}

// Calculate for Minijob
if (brutto > 603) {
  alert("Minijob: Brutto darf maximal 603 € sein");
  }

function calculateMinijob() {
  const brutto = Number(document.getElementById("brutto").value) || 0;
  const rvCheckbox = document.getElementById("minijobRV").checked;

  const rvAN = rvCheckbox ? brutto * 0.036 : 0;
  const netto = brutto - rvAN;
  const pauschalsteuer = brutto * 0.02;
  const ag_rv = brutto * 0.15;
  const ag_kv = brutto * 0.13;
  const arbeitgeberGesamt = ag_rv + ag_kv+ pauschalsteuer;
  const agGesamtkosten = brutto + arbeitgeberGesamt;

  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Minijob)</td><td>${brutto.toFixed(2)}</td></tr>
      ${rvCheckbox ? `<tr><td>RV Arbeitnehmer (3.6%)</td><td>${rvAN.toFixed(2)}</td></tr>` : ``}
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>Pauschalsteuer 2%</td><td>${pauschalsteuer.toFixed(2)}</td></tr>
      <tr><td>RV Arbeitgeber (15%)</td><td>${ag_rv.toFixed(2)}</td></tr>
      <tr><td>KV Arbeitgeber (13%)</td><td>${ag_kv.toFixed(2)}</td></tr>
      <tr><td><strong>AG gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${agGesamtkosten.toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
  return; // Important to stop execution
}


// Calculate for Midijob

function calculateMidijobSVBase(brutto) {
  if (brutto <= 538 || brutto >= 2000) return brutto;

  const lower = 538;
  const upper = 2000;

  const factor = (brutto - lower) / (upper - lower);
  return lower + factor * (brutto - lower);
}


function calculateMidijob() {
  // 1️⃣ Read & validate input
  const brutto = Number(document.getElementById("brutto")?.value);

  if (isNaN(brutto)) {
    alert("Ungültiges Bruttogehalt");
    return;
  }

  if (brutto <= 538 || brutto > 2000) {
    alert("Brutto liegt nicht im Übergangsbereich (538,01 – 2.000 €)");
    return;
  }

  // 2️⃣ Bases
  const steuerpflichtigesBrutto = brutto; // FULL for tax
  const beitragspflichtigesEntgelt = calculateMidijobSVBase(brutto);

  // 3️⃣ Tax
  let lohnsteuer = calculateProgressiveTax(steuerpflichtigesBrutto);
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";
  lohnsteuer = adjustTaxBySteuerklasse(lohnsteuer, steuerklasse);

  // 4️⃣ AN SV (reduced base)
  const kvAN = beitragspflichtigesEntgelt * 0.073;
  const rvAN = beitragspflichtigesEntgelt * 0.093;
  const avAN = beitragspflichtigesEntgelt * 0.012;
  const pvAN = beitragspflichtigesEntgelt * 0.018;

  const sozialversicherungAN = kvAN + rvAN + avAN + pvAN;

  // 5️⃣ Netto
  const netto = steuerpflichtigesBrutto - lohnsteuer - sozialversicherungAN;

  // 6️⃣ AG SV (FULL brutto)
  const kvAG = brutto * 0.073;
  const rvAG = brutto * 0.093;
  const avAG = brutto * 0.013;
  const pvAG = brutto * 0.018;

  const arbeitgeberGesamt = kvAG + rvAG + avAG + pvAG;

  // 7️⃣ Output (MUST be inside function)
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Midijob)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Steuerpflichtiges Brutto</td><td>${steuerpflichtigesBrutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>KV AN</td><td>${kvAN.toFixed(2)}</td></tr>
      <tr><td>RV AN</td><td>${rvAN.toFixed(2)}</td></tr>
      <tr><td>AV AN</td><td>${avAN.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${pvAN.toFixed(2)}</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG</td><td>${kvAG.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${rvAG.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${avAG.toFixed(2)}</td></tr>
      <tr><td>PV AG</td><td>${pvAG.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(brutto + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}



 // Calculate for Normal AN
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
  const age = calculateAge(dob);

  // Sachsen & state
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("state")?.value || "default";
  
  let { pvANRate, pvAGRate } = getPvRates(children, age);
  
  if (state === "SN") {
  pvAGRate = 0.013;

  if (children === 0 && age >= 23) pvANRate = 0.029;
  else if (children === 1) pvANRate = 0.023;
  else if (children === 2) pvANRate = 0.0205;
  else if (children === 3) pvANRate = 0.018;
  else if (children === 4) pvANRate = 0.0155;
  else if (children >= 5) pvANRate = 0.013;
}

  // ===== Stundenlohn =====
const grundlohn = brutto + vwl;
const monatlicheStunden = 160;
const stundenlohn = grundlohn / monatlicheStunden;

// ===== Überstunden =====
const ueberstundenPay = ueberstunden * stundenlohn;        // 100% pay
const ueberstundenZuschlag = ueberstundenPay * 0.25;       // 25% Zuschlag (steuerpflichtig)
  
  // ===== Zuschläge (steuerfrei) =====
const nacht25Pay  = nacht25     * stundenlohn * 0.25;
const nacht40Pay  = nacht40     * stundenlohn * 0.40;
const sonntagPay  = sonntag50   * stundenlohn * 0.50;
const feiertagPay = feiertag125 * stundenlohn * 1.25;

  // ===== Brutto components =====
const steuerfreieZuschlaege =
  nacht25Pay +
  nacht40Pay +
  sonntagPay +
  feiertagPay;

// ===== Steuerpflichtiges Brutto (SV-Basis) =====
const steuerpflichtigesBrutto =
  grundlohn +
  ueberstundenPay +
  ueberstundenZuschlag;

const kvPvBase = Math.min(steuerpflichtigesBrutto, BBG_KV_PV);
const rvAvBase = Math.min(steuerpflichtigesBrutto, BBG_RV_AV);

  
  // ===== Steuerklasse logic =====
  let steuersatz = 0.20;
  switch (steuerklasse) {
    case "2": steuersatz = 0.18; break;
    case "3": steuersatz = 0.12; break;
    case "5": steuersatz = 0.26; break;
    case "6": steuersatz = 0.30; break;
  }

  let lohnsteuer = calculateProgressiveTax(steuerpflichtigesBrutto);
  lohnsteuer = adjustTaxBySteuerklasse(lohnsteuer, steuerklasse, children);
 
 
  // ===== Sozialversicherung =====
  const kv = kvPvBase * 0.073;
  const rv = rvAvBase * 0.093;
  const av = rvAvBase * 0.012;


  const pvAN = kvPvBase * pvANRate;
  const pvAG = kvPvBase * pvAGRate;
  const sozialversicherungAN = kv + rv + av + pvAN;

  console.log("STATE:", state, "CHILDREN:", children, "AGE:", age, "PV AN RATE:", pvANRate);
  
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
  const ag_kv = kvPvBase * 0.073;
  const ag_rv = rvAvBase * 0.093;
  const ag_av = rvAvBase * 0.013;
  const umlage1 = steuerpflichtigesBrutto * 0.028;
  const umlage2 = steuerpflichtigesBrutto * 0.0075;
  const insolvenzgeld = steuerpflichtigesBrutto * 0.006;

  const arbeitgeberGesamt = ag_kv + ag_rv + ag_av + pvAG + umlage1 + umlage2 + insolvenzgeld;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Grundgehalt + VWL</td><td>${grundlohn.toFixed(2)}</td></tr>
      <tr><td>Überstunden</td><td>${ueberstundenPay.toFixed(2)}</td></tr>
      <tr><td>Überstundenzuschlag 25%</td><td>${ueberstundenZuschlag.toFixed(2)}</td></tr>
      <tr><td>Nacht 25%</td><td>${nacht25Pay.toFixed(2)}</td></tr>
      <tr><td>Nacht 40%</td><td>${nacht40Pay.toFixed(2)}</td></tr>
      <tr><td>Sonntag 50%</td><td>${sonntagPay.toFixed(2)}</td></tr>
      <tr><td>Feiertag 125%</td><td>${feiertagPay.toFixed(2)}</td></tr>
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

function calculatePraktikant() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("bundesland")?.value || "default";

  // ===== Steuerpflichtiges Brutto =====
  const steuerpflichtigesBrutto = brutto;

  // ===== Lohnsteuer =====
  let lohnsteuer = 0;
  if (steuerpflichtigesBrutto > 1200) {
    lohnsteuer = calculateProgressiveTax(steuerpflichtigesBrutto);
  }

  // ===== Sozialversicherung =====
  const kv = steuerpflichtigesBrutto * 0.073; // example, adjust if exempt
  const rv = steuerpflichtigesBrutto * 0.093; // may be reduced or 0
  const av = steuerpflichtigesBrutto * 0.012; // may be 0
  let { pvANRate, pvAGRate } = getPvRates(children, age);
  if (state === "SN") pvANRate = 0.023; // example
  const pvAN = steuerpflichtigesBrutto * pvANRate;
  const pvAG = steuerpflichtigesBrutto * pvAGRate;
  const sozialversicherungAN = kv + rv + av + pvAN;

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - lohnsteuer - sozialversicherungAN;

  // ===== Arbeitgeberanteile =====
  const arbeitgeberGesamt = kv + rv + av + pvAG;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Praktikant)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>KV</td><td>${kv.toFixed(2)}</td></tr>
      <tr><td>RV</td><td>${rv.toFixed(2)}</td></tr>
      <tr><td>AV</td><td>${av.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${pvAN.toFixed(2)}</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
      <tr><td>PV AG</td><td>${pvAG.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}


// Initialize toggle on page load
window.onload = toggleEmployeeType;























































