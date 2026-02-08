
  // ===== Explanation Content =====
const explanationContent = {
  normal: `
    <h3>Normaler Arbeitnehmer</h3>
    <p><strong>Lohnsteuer:</strong> Jahreshochrechnung mit progressivem Tarif (§32a EStG – Demo-Modell).</p>

    <p><strong>Sozialversicherung:</strong></p>
    <ul>
      <li>KV: 14.6% + Zusatzbeitrag</li>
      <li>RV: 18.6%</li>
      <li>AV: 2.6%</li>
      <li>PV: abhängig von Alter & Kinder</li>
    </ul>

    <p>Beitragsbemessungsgrenzen werden berücksichtigt.</p>
  `
};


// ===== Utility Helpers =====
function safeNumber(value) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}


// Central Input Validation Function
function validateInputs() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  const dob = document.getElementById("dob")?.value;

  // 1️⃣ Negative brutto
  if (brutto < 0) {
    alert("Bruttogehalt darf nicht negativ sein.");
    return false;
  }

  // 2️⃣ DOB validation
  if (dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      alert("Geburtsdatum kann nicht in der Zukunft liegen.");
      return false;
    }
  }

  // 3️⃣ Validate numeric fields (no negatives)
  const numericFields = [
    "ueberstunden",
    "vwl",
    "nacht25",
    "nacht40",
    "sonntag50",
    "feiertag125",
    "jobticket"
  ];

  for (let id of numericFields) {
    const value = safeNumber(document.getElementById(id)?.value);
    if (value < 0) {
      alert("Negative Werte sind nicht erlaubt.");
      return false;
    }
  }

  return true;
}

 // Currency Formatter
  function formatCurrency(value) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(value || 0);
}

// ===== Global Setup =====

// Fields to disable for certain employee types
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

console.log("Progressive tax function exists:", typeof calculateProgressiveTax);
window.onload = toggleEmployeeType;


// ===== Utility Functions =====

// Calculate age from date of birth
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

// ===== Kirchensteuer Configuration =====
const kirchensteuerConfig = {
  BW: 0.08,
  BY: 0.08,

  BE: 0.09,
  BB: 0.09,
  HB: 0.09,
  HH: 0.09,
  HE: 0.09,
  MV: 0.09,
  NI: 0.09,
  NW: 0.09,
  RP: 0.09,
  SL: 0.09,
  SN: 0.09,
  ST: 0.09,
  SH: 0.09,
  TH: 0.09
};

function getKirchensteuerRate(state) {
  return kirchensteuerConfig[state] ?? 0;
}



// Get PV rates depending on children and age
function getPvRates(children, age) {
  const pvAGRate = 0.018;
  let pvANRate;

  if (children >= 5) pvANRate = 0.008;
  else if (children === 4) pvANRate = 0.0105;
  else if (children === 3) pvANRate = 0.013;
  else if (children === 2) pvANRate = 0.0155;
  else if (children === 1) pvANRate = 0.018;
  else if (children === 0 && age >= 23) pvANRate = 0.024;
  else pvANRate = 0.018; // fallback for under 23, no kids

  return { pvANRate, pvAGRate };
}

// Apply BBG (Beitragsbemessungsgrenze) caps
function applyBBG(brutto) {
  const BBG_KV_PV = 5175;   // Example 2025 monthly
  const BBG_RV_AV = 7550;   // West – adjust if needed

  return {
    kvPvBase: Math.min(brutto, BBG_KV_PV),
    rvAvBase: Math.min(brutto, BBG_RV_AV)
  };
}

// ✅ ADD IT HERE
function createZeroSV() {
  return {
    kvAN: 0,
    kvZusatzAN: 0,
    rvAN: 0,
    avAN: 0,
    pvAN: 0,
    kvAG: 0,
    kvZusatzAG: 0,
    rvAG: 0,
    avAG: 0,
    pvAG: 0,
    totalAN: 0,
    totalAG: 0
  };
}

// ===== Calculate Social Insurance contributions =====
function calculateSV({
  brutto,
  svBaseAN,
  svBaseAG,
  children,
  age,
  state,
  includeKV = true,
  includeRV = true,
  includeAV = true,
  includePV = true
}) {

  if (!svBaseAN || typeof svBaseAN !== "object") {
    console.error("Invalid svBaseAN:", svBaseAN);
    return createZeroSV();
  }

  if (!svBaseAG || typeof svBaseAG !== "object") {
    console.error("Invalid svBaseAG:", svBaseAG);
    return createZeroSV();
  }

  const kvPvBase = Number(svBaseAN.kvPvBase) || 0;
  const rvAvBase = Number(svBaseAN.rvAvBase) || 0;

  const kvPvBaseAG = Number(svBaseAG.kvPvBase) || 0;
  const rvAvBaseAG = Number(svBaseAG.rvAvBase) || 0;

  let { pvANRate, pvAGRate } = getPvRates(children, age);

  // Sachsen adjustment
  if (state === "SN") {
    pvAGRate = 0.013;
    pvANRate = pvANRate + 0.005;
  }

  // ===== DECLARE VARIABLES =====
  let kvAN = 0, kvZusatzAN = 0, rvAN = 0, avAN = 0, pvAN = 0;
  let kvAG = 0, kvZusatzAG = 0, rvAG = 0, avAG = 0, pvAG = 0;


  // ===== KV =====
  if (includeKV) {
    kvAN = kvPvBase * 0.073;
    kvAG = kvPvBaseAG * 0.073;

    const KV_ZUSATZ = 0.029;
    const KV_ZUSATZ_HALF = KV_ZUSATZ / 2;

    kvZusatzAN = kvPvBase * KV_ZUSATZ_HALF;
    kvZusatzAG = kvPvBaseAG * KV_ZUSATZ_HALF;
  }

    // ===== RV =====
  const minijobRVExempt = document.getElementById("minijobRVExempt")?.checked || false;
if (includeRV) {
  if (employeeType === "minijob") {
    if (minijobRVExempt) {
      // Employee is exempt → pays 0%
      rvAN = 0;
    } else {
      // Employee not exempt → pays 3.6%
      rvAN = rvAvBase * 0.036;
    }
    // Employer always 15%
    rvAG = rvAvBaseAG * 0.15;
  } else {
    // Normal employees
    rvAN = rvAvBase * 0.093;
    rvAG = rvAvBaseAG * 0.093;
  }
}
  

  // ===== AV =====
  if (includeAV) {
    avAN = rvAvBase * 0.012;
    avAG = rvAvBaseAG * 0.013;
  }

  // ===== PV =====
  if (includePV) {
    pvAN = kvPvBase * pvANRate;
    pvAG = kvPvBaseAG * pvAGRate;
  }

  return {
  kvAN,
  kvZusatzAN,
  rvAN,
  avAN,
  pvAN,

  kvAG,
  kvZusatzAG,
  rvAG,
  avAG,
  pvAG,

  totalAN: kvAN + kvZusatzAN + rvAN + avAN + pvAN,
  totalAG: kvAG + kvZusatzAG + rvAG + avAG + pvAG
  }
}

// ===== Progressive Tax Functions =====

// Monthly progressive tax
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

// Annual progressive tax
function calculateAnnualProgressiveTax(annualIncome) {
  let tax = 0;

  if (annualIncome <= 14400) return 0; // Grundfreibetrag
  if (annualIncome > 14400 && annualIncome <= 24000) {
    tax += (annualIncome - 14400) * 0.14;
  }
  if (annualIncome > 24000 && annualIncome <= 48000) {
    tax += (24000 - 14400) * 0.14 + (annualIncome - 24000) * 0.24;
  }
  if (annualIncome > 48000 && annualIncome <= 84000) {
    tax += (24000 - 14400) * 0.14 + (48000 - 24000) * 0.24 + (annualIncome - 48000) * 0.34;
  }
  if (annualIncome > 84000) {
    tax += (24000 - 14400) * 0.14 + (48000 - 24000) * 0.24 + (84000 - 48000) * 0.34 + (annualIncome - 84000) * 0.42;
  }

  return tax;
}

// ===== Solidaritätszuschlag (2025 simplified model) =====
function calculateSoli(annualTax, steuerklasse) {
  if (!annualTax || annualTax <= 0) return 0;

  // Freigrenze depending on Steuerklasse
  let freigrenze = 18130;

  if (steuerklasse === "3") {
    freigrenze = 18130 * 2;
  }

  // Upper limit for full 5.5%
  const upperLimit = freigrenze + 15800; 
  // simplified Milderungszone width

  // 1️⃣ Below Freigrenze → no Soli
  if (annualTax <= freigrenze) {
    return 0;
  }

  // 2️⃣ Milderungszone
  if (annualTax > freigrenze && annualTax <= upperLimit) {
    return (annualTax - freigrenze) * 0.119;
    // smooth transition factor (demo approximation)
  }

  // 3️⃣ Full Soli
  return annualTax * 0.055;
}



// Steuerklasse allowances
function adjustTaxBySteuerklasse(tax, steuerklasse, children) {
  switch(steuerklasse) {
    case "1": return tax;
    case "2": return children >= 1 ? tax - calculateChildAllowance(tax, 1) : tax;
    case "3": return children >= 1 ? tax - calculateChildAllowance(tax, children) : tax;
    case "4": return tax;
    case "5": return tax * 1.4;
    case "6": return tax * 1.5;
    default: return tax;
  }
}

function calculateChildAllowance(tax, numChildren) {
  const perChildReduction = 200; // placeholder, adjust with 2026 law
  return perChildReduction * numChildren;
}


//Toggle employee

function toggleEmployeeType() {
  const employeeType = document.getElementById("employeeType")?.value;
  const brutto = document.getElementById("brutto");
  const steuerklasse = document.getElementById("steuerklasse");
  const minijobRVBlock = document.getElementById("minijobRVBlock");

  // Reset all fields
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

    steuerklasse.disabled = true;   // ONLY here disabled
    return;
  }

  // Toggle the explanation panel open/closed
function toggleExplanation() {
  const wrapper = document.getElementById("explanationWrapper");
  if (!wrapper) return;

  if (wrapper.style.display === "none" || wrapper.style.display === "") {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
}


  // ===== Midijob / Praktikant / Azubi =====
  if (employeeType === "midijob" || employeeType === "praktikant" || employeeType === "azubi") {
    disabledFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });
  }

  // For ALL non-minijob types → Steuerklasse enabled
  steuerklasse.disabled = false;
}


// Main calculate function
function calculateNetto() {
if (!validateInputs()) {
    return;
  }

  const employeeType = document.getElementById("employeeType")?.value;
  
  if (employeeType === "normal") calculateNormal();
  else if (employeeType === "praktikant") calculatePraktikant();
  else if (employeeType === "minijob") calculateMinijob();
  else if (employeeType === "midijob") calculateMidijob();
  else if (employeeType === "azubi") calculateAzubi();

 
// ===== Update the explanation panel (do NOT force display) =====
  updateExplanation(employeeType);
}


// Calculate for Minijob
function calculateMinijob() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  // Prevent negative or zero Brutto
  if (brutto <= 0) {
    alert("Bitte geben Sie einen positiven Bruttobetrag ein.");
    return; // Stop the calculation
  }
  
  if (brutto > 603) {
    alert("Minijob darf 603€ nicht überschreiten.");
    return;
  }

  const steuerpflichtigesBrutto = brutto;

  // ===== RV Exemption checkbox =====
  const minijobRVExempt = document.getElementById("minijobRVExempt")?.checked ?? true;

  // ===== Arbeitnehmer =====
  // If exempt -> AN pays 0; if not exempt -> 3.6% RV
  const rvAN = minijobRVExempt ? 0 : brutto * 0.036;

  const sozialversicherungAN = rvAN;
  const lohnsteuer = 0; // always 0 for Minijob
  const netto = brutto - sozialversicherungAN;

  // ===== Arbeitgeber (pauschal) =====
  const kvAG = brutto * 0.13;      // 13% KV
  const rvAG = brutto * 0.15;      // 15% RV (AG always pays)
  const pauschsteuer = brutto * 0.02; // 2% pauschal
  const umlage1 = brutto * 0.028;
  const umlage2 = brutto * 0.0075;
  const insolvenzgeld = brutto * 0.006;

  const arbeitgeberGesamt =
    kvAG + rvAG + pauschsteuer + umlage1 + umlage2 + insolvenzgeld;

  // ===== Output =====

const gesamtBrutto = brutto;
const gesamtKostenAG = brutto + arbeitgeberGesamt;

const outputHTML = `
<table>

  <!-- ================= BRUTTO ================= -->
  <tr>
    <th colspan="2">Brutto</th>
  </tr>
  <tr>
    <td>Minijob Brutto</td>
    <td>${formatCurrency(gesamtBrutto)}</td>
  </tr>

  <!-- ================= ABZÜGE AN ================= -->
  <tr>
    <th colspan="2">Abzüge Arbeitnehmer</th>
  </tr>
  <tr>
    <td>Lohnsteuer</td>
    <td>${formatCurrency(0)}</td>
  </tr>
  <tr>
    <td>Rentenversicherung AN ${sozialversicherungAN > 0 ? "(3,6%)" : "(befreit)"}</td>
    <td>${formatCurrency(sozialversicherungAN)}</td>
  </tr>

  <tr>
    <th>Netto</th>
    <th>${formatCurrency(netto)}</th>
  </tr>

  <!-- ================= ARBEITGEBER ================= -->
  <tr>
    <th colspan="2">Arbeitgeberanteile</th>
  </tr>
  <tr>
    <td>KV AG (13% pauschal)</td>
    <td>${formatCurrency(kvAG)}</td>
  </tr>
  <tr>
    <td>RV AG (15%)</td>
    <td>${formatCurrency(rvAG)}</td>
  </tr>
  <tr>
    <td>Pauschsteuer (2%)</td>
    <td>${formatCurrency(pauschsteuer)}</td>
  </tr>
  <tr>
    <td>Umlage U1</td>
    <td>${formatCurrency(umlage1)}</td>
  </tr>
  <tr>
    <td>Umlage U2</td>
    <td>${formatCurrency(umlage2)}</td>
  </tr>
  <tr>
    <td>Insolvenzgeldumlage</td>
    <td>${formatCurrency(insolvenzgeld)}</td>
  </tr>

  <tr>
    <th>AG Gesamt</th>
    <th>${formatCurrency(arbeitgeberGesamt)}</th>
  </tr>
  <tr>
    <th>Gesamtkosten AG</th>
    <th>${formatCurrency(gesamtKostenAG)}</th>
  </tr>

</table>
`;

document.getElementById("output").innerHTML = outputHTML;
}

// Calculate for Midijob

function calculateMidijob() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  
  // Prevent negative or zero Brutto
  if (brutto <= 0) {
    alert("Bitte geben Sie einen positiven Bruttobetrag ein.");
    return; // Stop the calculation
  }
  
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("state")?.value;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";
  const kirchensteuerpflichtig =
    document.getElementById("kirchensteuer")?.checked || false;


  if (brutto <= 603 || brutto > 2000) {
    alert("Brutto liegt nicht im Übergangsbereich (603,01 – 2.000 €)");
    return;
  }

  const steuerpflichtigesBrutto = brutto;

  // Midijob SV bases for 2026
const MIDIJOB_MIN = 603.01;
const MIDIJOB_MAX = 2000;
const F2026 = 0.6619; // from 28 / 42.30

  let svBaseAN, svBaseAG;

  // Case: midijob range
if (brutto > MIDIJOB_MIN && brutto <= MIDIJOB_MAX) {
  const G = MIDIJOB_MIN;
  // employee contribution base
  svBaseAN = (MIDIJOB_MAX / (MIDIJOB_MAX - G)) * (brutto - G);

  // total social base
  svBaseAG = F2026 * G
      + ((MIDIJOB_MAX / (MIDIJOB_MAX - G)) - (G / (MIDIJOB_MAX - G) * F2026)) * (brutto - G);

} else {
  // normal (no reduction)
  svBaseAN = brutto;
  svBaseAG = brutto;
}

  // then pass to calculateSV
const sv = calculateSV({
  brutto,
  svBaseAN: applyBBG(svBaseAN),
  svBaseAG: applyBBG(svBaseAG),
  children,
  age,
  state
});

  // ===== Lohnsteuer (annualized) =====
  const annualIncome = steuerpflichtigesBrutto * 12;
  let annualTax = calculateAnnualProgressiveTax(annualIncome);
  annualTax = adjustTaxBySteuerklasse(annualTax, steuerklasse, children);

  const lohnsteuer = annualTax / 12;
  const annualSoli = calculateSoli(annualTax, steuerklasse);
  const soli = annualSoli / 12;

  
  // ===== Kirchensteuer =====
  let kirchensteuer = 0;

if (kirchensteuerpflichtig && lohnsteuer > 0) {
  const kirchensteuerRate = getKirchensteuerRate(state);
  kirchensteuer = lohnsteuer * kirchensteuerRate;
}

console.log("State:", state);
console.log("Kirchensteuer checked:", kirchensteuerpflichtig);
console.log("Lohnsteuer:", lohnsteuer);

  // ===== Umlagen (Arbeitgeber only) =====
const umlage1 = brutto * 0.028;        // U1 (2.8%)
const umlage2 = brutto * 0.0075;       // U2 (0.75%)
const insolvenzgeld = brutto * 0.006;  // Insolvenzgeld (0.6%)

  
  // ===== Netto =====
  const netto =
    steuerpflichtigesBrutto -
    lohnsteuer -
    soli -
    kirchensteuer -
    sv.totalAN;

  const arbeitgeberGesamt =
  sv.totalAG +
  umlage1 +
  umlage2 +
  insolvenzgeld;


  // ===== Output =====
const gesamtBrutto = brutto;
const gesamtKostenAG = brutto + arbeitgeberGesamt;

const outputHTML = `
<table>

  <!-- ================= BRUTTO ================= -->
  <tr>
    <th colspan="2">Brutto</th>
  </tr>
  <tr>
    <td>Midijob (Übergangsbereich)</td>
    <td>${formatCurrency(gesamtBrutto)}</td>
  </tr>

  <!-- ================= ABZÜGE AN ================= -->
  <tr>
    <th colspan="2">Abzüge Arbeitnehmer</th>
  </tr>
  <tr>
    <td>Lohnsteuer</td>
    <td>${formatCurrency(lohnsteuer)}</td>
  </tr>
  <tr>
    <td>Solidaritätszuschlag</td>
    <td>${formatCurrency(soli)}</td>
  </tr>
  <tr>
    <td>Kirchensteuer</td>
    <td>${formatCurrency(kirchensteuer)}</td>
  </tr>
  <tr>
    <td>KV AN</td>
    <td>${formatCurrency(sv.kvAN)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AN</td>
    <td>${formatCurrency(sv.kvZusatzAN)}</td>
  </tr>
  <tr>
    <td>RV AN</td>
    <td>${formatCurrency(sv.rvAN)}</td>
  </tr>
  <tr>
    <td>AV AN</td>
    <td>${formatCurrency(sv.avAN)}</td>
  </tr>
  <tr>
    <td>PV AN</td>
    <td>${formatCurrency(sv.pvAN)}</td>
  </tr>

  <tr>
    <th>Netto</th>
    <th>${formatCurrency(netto)}</th>
  </tr>

    <!-- ================= ARBEITGEBER ================= -->
  <tr>
    <th colspan="2">Arbeitgeberanteile</th>
  </tr>
  <tr>
    <td>KV AG</td>
    <td>${formatCurrency(sv.kvAG)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AG</td>
    <td>${formatCurrency(sv.kvZusatzAG)}</td>
  </tr>
  <tr>
    <td>RV AG</td>
    <td>${formatCurrency(sv.rvAG)}</td>
  </tr>
  <tr>
    <td>AV AG</td>
    <td>${formatCurrency(sv.avAG)}</td>
  </tr>
  <tr>
    <td>PV AG</td>
    <td>${formatCurrency(sv.pvAG)}</td>
  </tr>

  <!-- ================= UMLAGEN ================= -->
  <tr>
    <th colspan="2">Umlagen & Sonstige AG-Kosten</th>
  </tr>
  <tr>
    <td>Umlage U1</td>
    <td>${formatCurrency(umlage1)}</td>
  </tr>
  <tr>
    <td>Umlage U2</td>
    <td>${formatCurrency(umlage2)}</td>
  </tr>
  <tr>
    <td>Insolvenzgeldumlage</td>
    <td>${formatCurrency(insolvenzgeld)}</td>
  </tr>

  <tr>
    <th>AG Gesamt</th>
    <th>${formatCurrency(arbeitgeberGesamt)}</th>
  </tr>
  <tr>
    <th>Gesamtkosten AG</th>
    <th>${formatCurrency(gesamtKostenAG)}</th>
  </tr>
</table>
`;
  
document.getElementById("output").innerHTML = outputHTML;
 }

 // Calculate for Normal AN
// ===== Calculate Normal Employee =====
function calculateNormal() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  // Prevent negative or zero Brutto
  if (brutto <= 0) {
    alert("Bitte geben Sie einen positiven Bruttobetrag ein.");
    return; // Stop the calculation
  }
  
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("state")?.value;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  const ueberstunden = Number(document.getElementById("ueberstunden")?.value || 0);
  const vwl = Number(document.getElementById("vwl")?.value || 0);
  const nacht25 = Number(document.getElementById("nacht25")?.value || 0);
  const nacht40 = Number(document.getElementById("nacht40")?.value || 0);
  const sonntag50 = Number(document.getElementById("sonntag50")?.value || 0);
  const feiertag125 = Number(document.getElementById("feiertag125")?.value || 0);
  const jobticket = Number(document.getElementById("jobticket")?.value || 0);

  const grundlohn = brutto + vwl;
  const monatlicheStunden = 160;
  const stundenlohn = monatlicheStunden > 0 ? grundlohn / monatlicheStunden : 0;
  
  const ueberstundenPay = ueberstunden * stundenlohn;
  const ueberstundenZuschlag = ueberstundenPay * 0.25;
  const nacht25Pay  = nacht25 * stundenlohn * 0.25;
  const nacht40Pay  = nacht40 * stundenlohn * 0.40;
  const sonntagPay  = sonntag50 * stundenlohn * 0.50;
  const feiertagPay = feiertag125 * stundenlohn * 1.25;

  const steuerfreieZuschlaege = nacht25Pay + nacht40Pay + sonntagPay + feiertagPay;
  const steuerpflichtigesBrutto = grundlohn + ueberstundenPay + ueberstundenZuschlag;
  
// ===== Umlagen (Arbeitgeber only) =====
const umlage1 = steuerpflichtigesBrutto * 0.028;      // U1 (2.8%)
const umlage2 = steuerpflichtigesBrutto * 0.0075;     // U2 (0.75%)
const insolvenzgeld = steuerpflichtigesBrutto * 0.006; // Insolvenzgeld (0.6%)

  

  // ===== BBG & SV =====
  const bbg = applyBBG(steuerpflichtigesBrutto);
  
  const sv = calculateSV({
  brutto: steuerpflichtigesBrutto,
  svBaseAN: bbg,
  svBaseAG: bbg,
  children,
  age,
  state
});


  
  // ===== Jahreshochrechnung & Steuerklasse =====
  const annualIncome = steuerpflichtigesBrutto * 12;
  let annualTax = calculateAnnualProgressiveTax(annualIncome);
  annualTax = adjustTaxBySteuerklasse(annualTax, steuerklasse, children);

  //Soli 
  const lohnsteuer = annualTax / 12;
  const annualSoli = calculateSoli(annualTax, steuerklasse);
  const soli = annualSoli / 12;

  // ===== Kirchensteuer =====
  const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
  
  let kirchensteuer = 0;
if (kirchensteuerpflichtig && lohnsteuer > 0) {
  const kirchensteuerRate = getKirchensteuerRate(state);
  kirchensteuer = lohnsteuer * kirchensteuerRate;
}

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - lohnsteuer - soli - kirchensteuer - sv.totalAN - jobticket + steuerfreieZuschlaege;

  // ===== Arbeitgeberanteile =====
  const arbeitgeberGesamt =
  sv.totalAG +
  umlage1 +
  umlage2 +
  insolvenzgeld;

  // ===== Output =====
const gesamtBrutto = steuerpflichtigesBrutto + steuerfreieZuschlaege;
const gesamtKostenAG = gesamtBrutto + arbeitgeberGesamt;
const outputHTML = `
<table>
  <tr>
    <th colspan="2">Brutto Bestandteile</th>
  </tr>
  <tr>
    <td>Grundgehalt + VWL</td>
    <td>${formatCurrency(grundlohn)}</td>
  </tr>
  <tr>
    <td>Überstunden</td>
    <td>${formatCurrency(ueberstundenPay)}</td>
  </tr>
  <tr>
    <td>Überstundenzuschlag 25%</td>
    <td>${formatCurrency(ueberstundenZuschlag)}</td>
  </tr>
  <tr>
    <td>Nacht 25%</td>
    <td>${formatCurrency(nacht25Pay)}</td>
  </tr>
  <tr>
    <td>Nacht 40%</td>
    <td>${formatCurrency(nacht40Pay)}</td>
  </tr>
  <tr>
    <td>Sonntag 50%</td>
    <td>${formatCurrency(sonntagPay)}</td>
  </tr>
  <tr>
    <td>Feiertag 125%</td>
    <td>${formatCurrency(feiertagPay)}</td>
  </tr>

  <tr>
    <th>Gesamtbrutto</th>
    <th>${formatCurrency(gesamtBrutto)}</th>
  </tr>

  <tr>
    <th colspan="2">Abzüge Arbeitnehmer</th>
  </tr>
  <tr>
    <td>Lohnsteuer</td>
    <td>${formatCurrency(lohnsteuer)}</td>
  </tr>
  <tr>
    <td>Solidaritätszuschlag</td>
    <td>${formatCurrency(soli)}</td>
  </tr>
  <tr>
    <td>Kirchensteuer</td>
    <td>${formatCurrency(kirchensteuer)}</td>
  </tr>
  <tr>
    <td>KV AN</td>
    <td>${formatCurrency(sv.kvAN)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AN</td>
    <td>${formatCurrency(sv.kvZusatzAN)}</td>
  </tr>
  <tr>
    <td>RV AN</td>
    <td>${formatCurrency(sv.rvAN)}</td>
  </tr>
  <tr>
    <td>AV AN</td>
    <td>${formatCurrency(sv.avAN)}</td>
  </tr>
  <tr>
    <td>PV AN</td>
    <td>${formatCurrency(sv.pvAN)}</td>
  </tr>
  <tr>
    <td>Jobticket</td>
    <td>${formatCurrency(jobticket)}</td>
  </tr>

  <tr>
    <th>Netto</th>
    <th>${formatCurrency(netto)}</th>
  </tr>

  <tr>
    <th colspan="2">Arbeitgeberanteile</th>
  </tr>
  <tr>
    <td>KV AG</td>
    <td>${formatCurrency(sv.kvAG)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AG</td>
    <td>${formatCurrency(sv.kvZusatzAG)}</td>
  </tr>
  <tr>
    <td>RV AG</td>
    <td>${formatCurrency(sv.rvAG)}</td>
  </tr>
  <tr>
    <td>AV AG</td>
    <td>${formatCurrency(sv.avAG)}</td>
  </tr>
  <tr>
    <td>PV AG</td>
    <td>${formatCurrency(sv.pvAG)}</td>
  </tr>
  <tr>
  <th colspan="2">Umlagen & Sonstige AG-Kosten</th>
</tr>
<tr>
  <td>Umlage U1</td>
  <td>${formatCurrency(umlage1)}</td>
</tr>
<tr>
  <td>Umlage U2</td>
  <td>${formatCurrency(umlage2)}</td>
</tr>
<tr>
  <td>Insolvenzgeldumlage</td>
  <td>${formatCurrency(insolvenzgeld)}</td>
</tr>
  <tr>
    <th>AG Gesamt</th>
    <th>${formatCurrency(arbeitgeberGesamt)}</th>
  </tr>
  <tr>
    <th>Gesamtkosten AG</th>
    <th>${formatCurrency(gesamtKostenAG)}</th>
  </tr>
</table>
`;

document.getElementById("output").innerHTML = outputHTML;
 }

 // ===== Calculate Praktikant =====
function calculatePraktikant() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  // Prevent negative or zero Brutto
  if (brutto <= 0) {
    alert("Bitte geben Sie einen positiven Bruttobetrag ein.");
    return; // Stop the calculation
  }
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("state")?.value;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  // ===== Steuerpflichtiges Brutto =====
  const steuerpflichtigesBrutto = brutto;

  
  // ===== SV calculation =====
  const svBase = applyBBG(steuerpflichtigesBrutto);

const sv = calculateSV({
  brutto: steuerpflichtigesBrutto,
  svBaseAN: svBase,
  svBaseAG: svBase,
  children,
  age,
  state,
  includeAV: false
});

  console.log("SV Base Praktikant:", svBase);

  // ===== Jahreshochrechnung & Steuerklasse =====
  const annualIncome = steuerpflichtigesBrutto * 12;
  let annualTax = calculateAnnualProgressiveTax(annualIncome);
  annualTax = adjustTaxBySteuerklasse(annualTax, steuerklasse, children);
  const lohnsteuer = annualTax / 12;
  const annualSoli = calculateSoli(annualTax, steuerklasse);
  const soli = annualSoli / 12;

  // ===== Kirchensteuer =====
  const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
  let kirchensteuer = 0;
 if (kirchensteuerpflichtig && lohnsteuer > 0) {
  const kirchensteuerRate = getKirchensteuerRate(state);
  kirchensteuer = lohnsteuer * kirchensteuerRate;
}

// ===== Umlagen (Arbeitgeber only) =====
const umlage1 = brutto * 0.028;        // U1 (2.8%)
const umlage2 = brutto * 0.0075;       // U2 (0.75%)
const insolvenzgeld = brutto * 0.006;  // Insolvenzgeld (0.6%)

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - soli - lohnsteuer - kirchensteuer - sv.totalAN;

  // ===== AG contributions =====
  const arbeitgeberGesamt =
  sv.totalAG +
  umlage1 +
  umlage2 +
  insolvenzgeld;


  // ===== Output =====
 const gesamtBrutto = brutto;
const gesamtKostenAG = brutto + arbeitgeberGesamt;

const outputHTML = `
<table>

  <!-- ================= BRUTTO ================= -->
  <tr>
    <th colspan="2">Brutto</th>
  </tr>
  <tr>
    <td>Praktikant</td>
    <td>${formatCurrency(gesamtBrutto)}</td>
  </tr>

  <!-- ================= ABZÜGE AN ================= -->
  <tr>
    <th colspan="2">Abzüge Arbeitnehmer</th>
  </tr>
  <tr>
    <td>Lohnsteuer</td>
    <td>${formatCurrency(lohnsteuer)}</td>
  </tr>
  <tr>
    <td>Solidaritätszuschlag</td>
    <td>${formatCurrency(soli)}</td>
  </tr>
  <tr>
    <td>Kirchensteuer</td>
    <td>${formatCurrency(kirchensteuer)}</td>
  </tr>
  <tr>
    <td>KV AN</td>
    <td>${formatCurrency(sv.kvAN)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AN</td>
    <td>${formatCurrency(sv.kvZusatzAN)}</td>
  </tr>
  <tr>
    <td>RV AN</td>
    <td>${formatCurrency(sv.rvAN)}</td>
  </tr>
  <tr>
    <td>AV AN</td>
    <td>${formatCurrency(sv.avAN)}</td>
  </tr>
  <tr>
    <td>PV AN</td>
    <td>${formatCurrency(sv.pvAN)}</td>
  </tr>

  <tr>
    <th>Netto</th>
    <th>${formatCurrency(netto)}</th>
  </tr>

  <!-- ================= ARBEITGEBER ================= -->
  <tr>
    <th colspan="2">Arbeitgeberanteile</th>
  </tr>
  <tr>
    <td>KV AG</td>
    <td>${formatCurrency(sv.kvAG)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AG</td>
    <td>${formatCurrency(sv.kvZusatzAG)}</td>
  </tr>
  <tr>
    <td>RV AG</td>
    <td>${formatCurrency(sv.rvAG)}</td>
  </tr>
  <tr>
    <td>AV AG</td>
    <td>${formatCurrency(sv.avAG)}</td>
  </tr>
  <tr>
    <td>PV AG</td>
    <td>${formatCurrency(sv.pvAG)}</td>
  </tr>

  <!-- ================= UMLAGEN ================= -->
  <tr>
    <th colspan="2">Umlagen & Sonstige AG-Kosten</th>
  </tr>
  <tr>
    <td>Umlage U1</td>
    <td>${formatCurrency(umlage1)}</td>
  </tr>
  <tr>
    <td>Umlage U2</td>
    <td>${formatCurrency(umlage2)}</td>
  </tr>
  <tr>
    <td>Insolvenzgeldumlage</td>
    <td>${formatCurrency(insolvenzgeld)}</td>
  </tr>

  <tr>
    <th>AG Gesamt</th>
    <th>${formatCurrency(arbeitgeberGesamt)}</th>
  </tr>
  <tr>
    <th>Gesamtkosten AG</th>
    <th>${formatCurrency(gesamtKostenAG)}</th>
  </tr>

</table>
`;

  document.getElementById("output").innerHTML = outputHTML;
}


// ===== Calculate Azubi =====
function calculateAzubi() {
  const brutto = safeNumber(document.getElementById("brutto")?.value);
  // Prevent negative or zero Brutto
  if (brutto <= 0) {
    alert("Bitte geben Sie einen positiven Bruttobetrag ein.");
    return; // Stop the calculation
  }
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("state")?.value;
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";

  // ===== Steuerpflichtiges Brutto =====
  const steuerpflichtigesBrutto = brutto;

  // ===== SV calculation (Azubi: full contributions) =====
  const svBase = applyBBG(steuerpflichtigesBrutto);
  const sv = calculateSV({
    brutto: steuerpflichtigesBrutto,
    svBaseAN: svBase,
    svBaseAG: svBase,
    children,
    age,
    state
  });

  // ===== Jahreshochrechnung & Steuerklasse =====
  const annualIncome = steuerpflichtigesBrutto * 12;
  let annualTax = calculateAnnualProgressiveTax(annualIncome);
  annualTax = adjustTaxBySteuerklasse(annualTax, steuerklasse, children);
  const lohnsteuer = annualTax / 12;
  const annualSoli = calculateSoli(annualTax, steuerklasse);
  const soli = annualSoli / 12;

  // ===== Kirchensteuer =====
  const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
  let kirchensteuer = 0;
  if (kirchensteuerpflichtig && lohnsteuer > 0) {
  const kirchensteuerRate = getKirchensteuerRate(state);
  kirchensteuer = lohnsteuer * kirchensteuerRate;
}

// ===== Umlagen (Arbeitgeber only) =====
const umlage1 = brutto * 0.028;
const umlage2 = brutto * 0.0075;
const insolvenzgeld = brutto * 0.006;


  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - soli - lohnsteuer - kirchensteuer - sv.totalAN;

  // ===== AG contributions =====
  const arbeitgeberGesamt =
  sv.totalAG +
  umlage1 +
  umlage2 +
  insolvenzgeld;


  // ===== Output =====
  const gesamtBrutto = brutto;
const gesamtKostenAG = brutto + arbeitgeberGesamt;

const outputHTML = `
<table>

  <!-- ================= BRUTTO ================= -->
  <tr>
    <th colspan="2">Brutto</th>
  </tr>
  <tr>
    <td>Azubi</td>
    <td>${formatCurrency(gesamtBrutto)}</td>
  </tr>

  <!-- ================= ABZÜGE AN ================= -->
  <tr>
    <th colspan="2">Abzüge Arbeitnehmer</th>
  </tr>
  <tr>
    <td>Lohnsteuer</td>
    <td>${formatCurrency(lohnsteuer)}</td>
  </tr>
  <tr>
    <td>Solidaritätszuschlag</td>
    <td>${formatCurrency(soli)}</td>
  </tr>
  <tr>
    <td>Kirchensteuer</td>
    <td>${formatCurrency(kirchensteuer)}</td>
  </tr>
  <tr>
    <td>KV AN</td>
    <td>${formatCurrency(sv.kvAN)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AN</td>
    <td>${formatCurrency(sv.kvZusatzAN)}</td>
  </tr>
  <tr>
    <td>RV AN</td>
    <td>${formatCurrency(sv.rvAN)}</td>
  </tr>
  <tr>
    <td>AV AN</td>
    <td>${formatCurrency(sv.avAN)}</td>
  </tr>
  <tr>
    <td>PV AN</td>
    <td>${formatCurrency(sv.pvAN)}</td>
  </tr>

  <tr>
    <th>Netto</th>
    <th>${formatCurrency(netto)}</th>
  </tr>

  <!-- ================= ARBEITGEBER ================= -->
  <tr>
    <th colspan="2">Arbeitgeberanteile</th>
  </tr>
  <tr>
    <td>KV AG</td>
    <td>${formatCurrency(sv.kvAG)}</td>
  </tr>
  <tr>
    <td>KV Zusatz AG</td>
    <td>${formatCurrency(sv.kvZusatzAG)}</td>
  </tr>
  <tr>
    <td>RV AG</td>
    <td>${formatCurrency(sv.rvAG)}</td>
  </tr>
  <tr>
    <td>AV AG</td>
    <td>${formatCurrency(sv.avAG)}</td>
  </tr>
  <tr>
    <td>PV AG</td>
    <td>${formatCurrency(sv.pvAG)}</td>
  </tr>

  <!-- ================= UMLAGEN ================= -->
  <tr>
    <th colspan="2">Umlagen & Sonstige AG-Kosten</th>
  </tr>
  <tr>
    <td>Umlage U1</td>
    <td>${formatCurrency(umlage1)}</td>
  </tr>
  <tr>
    <td>Umlage U2</td>
    <td>${formatCurrency(umlage2)}</td>
  </tr>
  <tr>
    <td>Insolvenzgeldumlage</td>
    <td>${formatCurrency(insolvenzgeld)}</td>
  </tr>

  <tr>
    <th>AG Gesamt</th>
    <th>${formatCurrency(arbeitgeberGesamt)}</th>
  </tr>
  <tr>
    <th>Gesamtkosten AG</th>
    <th>${formatCurrency(gesamtKostenAG)}</th>
  </tr>

</table>
`;

  document.getElementById("output").innerHTML = outputHTML;
}

function openModal(content) {
  document.getElementById("modalBody").innerHTML = content;
  document.getElementById("infoModal").style.display = "block";
}

function closeModal() {
  document.getElementById("infoModal").style.display = "none";
}

// Close when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById("infoModal");
  if (event.target === modal) {
    closeModal();
  }
};


const infoContent = {
  ueberstunden: `
    <h3>Überstunden</h3>
    <div class="highlight highlight-green">
      Zuschläge können steuerfrei sein (§3b EStG).
    </div>
    <div class="highlight highlight-yellow">
      Steuerfreiheit gilt nur bei bestimmtem Grundlohn.
    </div>
    <div class="highlight highlight-red">
      Sozialversicherungspflicht kann trotzdem bestehen.
    </div>
  `,

  soli: `
    <h3>Solidaritätszuschlag</h3>
    <div class="highlight highlight-green">
      Fällt für die meisten Arbeitnehmer nicht mehr an.
    </div>
    <div class="highlight highlight-yellow">
      Greift erst oberhalb der Freigrenze.
    </div>
  `,

  sv: `
    <h3>Sozialversicherung</h3>
    <div class="highlight highlight-yellow">
      Beiträge richten sich nach Beitragsbemessungsgrenzen.
    </div>
    <div class="highlight highlight-red">
      Sachsen hat abweichende Pflegeversicherung.
    </div>
  `
};

// ===== Toggle collapsible explanation panel =====
// Update explanation content only, do not touch display
function updateExplanation(employeeType) {
  const explanationWrapper = document.getElementById("explanationWrapper");
  const expContent = document.getElementById("expContent");
  if (!explanationWrapper || !expContent) return;

  // Only update content
  if (explanationContent[employeeType]) {
    expContent.innerHTML = explanationContent[employeeType];
    // Show panel **only if hidden**
    if (explanationWrapper.style.display === "none") {
      explanationWrapper.style.display = "block";
    }
  } else {
    // Hide panel if no content
    explanationWrapper.style.display = "none";
  }
}




// Initialize toggle on page load
window.onload = toggleEmployeeType;






















































































