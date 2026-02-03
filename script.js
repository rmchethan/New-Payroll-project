

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
  if (includeRV) {
    rvAN = rvAvBase * 0.093;
    rvAG = rvAvBaseAG * 0.093;
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

// Employee type toggle (disables irrelevant fields)
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

  if (employeeType === "minijob") {
    brutto.value = 603;
    brutto.disabled = true;
    disabledFields.forEach(id => { const el = document.getElementById(id); if(el) el.disabled=true; });
    if (minijobRVBlock) minijobRVBlock.style.display = "block";
  }

  if (employeeType === "midijob" || employeeType === "praktikant" || employeeType === "azubi") {
    disabledFields.forEach(id => { const el = document.getElementById(id); if(el) el.disabled=true; });
  }

  if (employeeType === "midijob") {
    steuerklasse.disabled = false; // Steuerklasse still relevant for Midijob
  }
}

// Main calculate function
function calculateNetto() {
  const employeeType = document.getElementById("employeeType")?.value || "normal";

  if (employeeType === "normal") calculateNormal();
  else if (employeeType === "praktikant") calculatePraktikant();
  else if (employeeType === "minijob") calculateMinijob();
  else if (employeeType === "midijob") calculateMidijob();
  else if (employeeType === "azubi") calculateAzubi();
}



// Calculate for Minijob
function calculateMinijob() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;

  if (brutto > 603) {
    alert("Minijob darf 603€ nicht überschreiten.");
    return;
  }

  const steuerpflichtigesBrutto = brutto;

  // ===== Arbeitnehmer =====
  const lohnsteuer = 0;
  const sozialversicherungAN = 0;
  const netto = brutto;

  // ===== Arbeitgeber (pauschal) =====
  const kvAG = brutto * 0.13;      // 13% KV
  const rvAG = brutto * 0.15;      // 15% RV
  const pauschsteuer = brutto * 0.02; // 2% pauschal
  const umlage1 = brutto * 0.028;
  const umlage2 = brutto * 0.0075;
  const insolvenzgeld = brutto * 0.006;

  const arbeitgeberGesamt =
    kvAG + rvAG + pauschsteuer + umlage1 + umlage2 + insolvenzgeld;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Minijob)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>0.00</td></tr>
      <tr><td>Sozialversicherung AN</td><td>0.00</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG (13% pauschal, kein Zusatzbeitrag)</td>
      <td>${kvAG.toFixed(2)}</td></tr>
      <tr><td>RV AG (15%)</td><td>${rvAG.toFixed(2)}</td></tr>
      <tr><td>Pauschsteuer (2%)</td><td>${pauschsteuer.toFixed(2)}</td></tr>
      <tr><td>Umlage 1</td><td>${umlage1.toFixed(2)}</td></tr>
      <tr><td>Umlage 2</td><td>${umlage2.toFixed(2)}</td></tr>
      <tr><td>Insolvenzgeld</td><td>${insolvenzgeld.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td>
          <td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td>
          <td><strong>${(brutto + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}


// Calculate for Midijob

function calculateMidijob() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("bundesland")?.value || "default";
  const steuerklasse = document.getElementById("steuerklasse")?.value || "1";
  const kirchensteuerpflichtig =
    document.getElementById("kirchensteuer")?.checked || false;


  if (brutto <= 603 || brutto > 2000) {
    alert("Brutto liegt nicht im Übergangsbereich (603,01 – 2.000 €)");
    return;
  }

  const steuerpflichtigesBrutto = brutto;

  // ===== Midijob reduced AN base =====
  const reductionFactor = 0.8;
const bbg = applyBBG(brutto);

const svBaseAN = {
  kvPvBase: Math.min(brutto * reductionFactor, bbg.kvPvBase),
  rvAvBase: Math.min(brutto * reductionFactor, bbg.rvAvBase)
};
const svBaseAG = bbg;
const sv = calculateSV({
  brutto,
  svBaseAN,
  svBaseAG,
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
  if (kirchensteuerpflichtig) {
    const kirchensteuerRate =
      ["BW", "BY"].includes(state) ? 0.08 : 0.09;
    kirchensteuer = lohnsteuer * kirchensteuerRate;
  }

  // ===== Netto =====
  const netto =
    steuerpflichtigesBrutto -
    lohnsteuer -
    soli -
    kirchensteuer -
    sv.totalAN;

  const arbeitgeberGesamt = sv.totalAG;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Midijob)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>Solidaritätszuschlag</td><td>${soli.toFixed(2)}</td></tr>
      <tr><td>Kirchensteuer</td><td>${kirchensteuer.toFixed(2)}</td></tr>

      <tr><td>KV (7,3%)</td><td>${sv.kvAN.toFixed(2)}</td></tr>
      <tr><td>KV Zusatzbeitrag</td><td>${sv.kvZusatzAN.toFixed(2)}</td></tr>
      <tr><td>RV AN</td><td>${sv.rvAN.toFixed(2)}</td></tr>
      <tr><td>AV AN</td><td>${sv.avAN.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${sv.pvAN.toFixed(2)}</td></tr>

      <tr><td><strong>Netto</strong></td>
          <td><strong>${netto.toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG (7,3%)</td><td>${sv.kvAG.toFixed(2)}</td></tr>
      <tr><td>KV Zusatz AG</td><td>${sv.kvZusatzAG.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${sv.rvAG.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${sv.avAG.toFixed(2)}</td></tr>
      <tr><td>PV AG</td><td>${sv.pvAG.toFixed(2)}</td></tr>

      <tr><td><strong>AG Gesamt</strong></td>
          <td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>

      <tr><td><strong>Gesamtkosten AG</strong></td>
          <td><strong>${(brutto + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

 // Calculate for Normal AN
// ===== Calculate Normal Employee =====
function calculateNormal() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("bundesland")?.value || "default";
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
  const stundenlohn = grundlohn / monatlicheStunden;

  const ueberstundenPay = ueberstunden * stundenlohn;
  const ueberstundenZuschlag = ueberstundenPay * 0.25;

  const nacht25Pay  = nacht25 * stundenlohn * 0.25;
  const nacht40Pay  = nacht40 * stundenlohn * 0.40;
  const sonntagPay  = sonntag50 * stundenlohn * 0.50;
  const feiertagPay = feiertag125 * stundenlohn * 1.25;

  const steuerfreieZuschlaege = nacht25Pay + nacht40Pay + sonntagPay + feiertagPay;
  const steuerpflichtigesBrutto = grundlohn + ueberstundenPay + ueberstundenZuschlag;

  annualTax = adjustTaxBySteuerklasse(annualTax, steuerklasse, children);
  const lohnsteuer = annualTax / 12;
  const annualSoli = calculateSoli(annualTax, steuerklasse);
  const soli = annualSoli / 12;

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


  // ===== Kirchensteuer =====
  const kirchensteuerpflichtig = document.getElementById("kirchensteuer")?.checked || false;
  let kirchensteuer = 0;
  if (kirchensteuerpflichtig) {
    const kirchensteuerRate = ["BW", "BY"].includes(state) ? 0.08 : 0.09;
    kirchensteuer = lohnsteuer * kirchensteuerRate;
  }

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - lohnsteuer - soli - kirchensteuer - sv.totalAN - jobticket + steuerfreieZuschlaege;

  // ===== Arbeitgeberanteile =====
  const arbeitgeberGesamt = sv.totalAG;

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
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>Solidaritätszuschlag</td><td>${soli.toFixed(2)}</td></tr>
      <tr><td>Kirchensteuer</td><td>${kirchensteuer.toFixed(2)}</td></tr>
      <tr><td>KV AN</td><td>${sv.kvAN.toFixed(2)}</td></tr>
      <tr><td>KV Zusatz AN</td><td>${sv.kvZusatzAN.toFixed(2)}</td></tr>
      <tr><td>RV AN</td><td>${sv.rvAN.toFixed(2)}</td></tr>
      <tr><td>AV AN</td><td>${sv.avAN.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${sv.pvAN.toFixed(2)}</td></tr>
      <tr><td>Jobticket</td><td>${jobticket.toFixed(2)}</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>

      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG</td><td>${sv.kvAG.toFixed(2)}</td></tr>
      <tr><td>KV Zusatz AG</td><td>${sv.kvZusatzAG.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${sv.rvAG.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${sv.avAG.toFixed(2)}</td></tr>
      <tr><td>PV AG</td><td>${sv.pvAG.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(steuerpflichtigesBrutto + steuerfreieZuschlaege + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

 // ===== Calculate Praktikant =====
function calculatePraktikant() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("bundesland")?.value || "default";
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
  if (kirchensteuerpflichtig) {
    const kirchensteuerRate = ["BW", "BY"].includes(state) ? 0.08 : 0.09;
    kirchensteuer = lohnsteuer * kirchensteuerRate;
  }

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - soli - lohnsteuer - kirchensteuer - sv.totalAN;

  // ===== AG contributions =====
  const arbeitgeberGesamt = sv.totalAG;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Praktikant)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>Solidaritätszuschlag</td><td>${soli.toFixed(2)}</td></tr>
      <tr><td>Kirchensteuer</td><td>${kirchensteuer.toFixed(2)}</td></tr>
      <tr><td>KV AN</td><td>${sv.kvAN.toFixed(2)}</td></tr>
      <tr><td>KV Zusatzbeitrag</td><td>${sv.kvZusatzAN.toFixed(2)}</td></tr>
      <tr><td>RV AN</td><td>${sv.rvAN.toFixed(2)}</td></tr>
      <tr><td>AV AN</td><td>${sv.avAN.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${sv.pvAN.toFixed(2)}</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
      
      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG</td><td>${sv.kvAG.toFixed(2)}</td></tr>
      <tr><td>KV Zusatz AG</td><td>${sv.kvZusatzAG.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${sv.rvAG.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${sv.avAG.toFixed(2)}</td></tr>
      <tr><td>PV AG</td><td>${sv.pvAG.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(steuerpflichtigesBrutto + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}


// ===== Calculate Azubi =====
function calculateAzubi() {
  const brutto = Number(document.getElementById("brutto")?.value) || 0;
  const dob = document.getElementById("dob")?.value;
  const age = calculateAge(dob);
  const children = Number(document.getElementById("children")?.value || 0);
  const state = document.getElementById("bundesland")?.value || "default";
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
  if (kirchensteuerpflichtig) {
    const kirchensteuerRate = ["BW", "BY"].includes(state) ? 0.08 : 0.09;
    kirchensteuer = lohnsteuer * kirchensteuerRate;
  }

  // ===== Netto =====
  const netto = steuerpflichtigesBrutto - soli - lohnsteuer - kirchensteuer - sv.totalAN;

  // ===== AG contributions =====
  const arbeitgeberGesamt = sv.totalAG;

  // ===== Output =====
  const outputHTML = `
    <table border="1" cellpadding="5">
      <tr><th>Komponente</th><th>Betrag (€)</th></tr>
      <tr><td>Brutto (Azubi)</td><td>${brutto.toFixed(2)}</td></tr>
      <tr><td>Lohnsteuer</td><td>${lohnsteuer.toFixed(2)}</td></tr>
      <tr><td>Solidaritätszuschlag</td><td>${soli.toFixed(2)}</td></tr>
      <tr><td>Kirchensteuer</td><td>${kirchensteuer.toFixed(2)}</td></tr>
      <tr><td>KV AN</td><td>${sv.kvAN.toFixed(2)}</td></tr>
      <tr><td>KV Zusatzbeitrag</td><td>${sv.kvZusatzAN.toFixed(2)}</td></tr>
      <tr><td>RV AN</td><td>${sv.rvAN.toFixed(2)}</td></tr>
      <tr><td>AV AN</td><td>${sv.avAN.toFixed(2)}</td></tr>
      <tr><td>PV AN</td><td>${sv.pvAN.toFixed(2)}</td></tr>
      <tr><td><strong>Netto</strong></td><td><strong>${netto.toFixed(2)}</strong></td></tr>
      
      <tr><th colspan="2">Arbeitgeberanteile</th></tr>
      <tr><td>KV AG</td><td>${sv.kvAG.toFixed(2)}</td></tr>
      <tr><td>KV Zusatz AG</td><td>${sv.kvZusatzAG.toFixed(2)}</td></tr>
      <tr><td>RV AG</td><td>${sv.rvAG.toFixed(2)}</td></tr>
      <tr><td>AV AG</td><td>${sv.avAG.toFixed(2)}</td></tr>
      <tr><td>PV AG</td><td>${sv.pvAG.toFixed(2)}</td></tr>
      <tr><td><strong>AG Gesamt</strong></td><td><strong>${arbeitgeberGesamt.toFixed(2)}</strong></td></tr>
      <tr><td><strong>Gesamtkosten AG</strong></td><td><strong>${(steuerpflichtigesBrutto + arbeitgeberGesamt).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}


// Initialize toggle on page load
window.onload = toggleEmployeeType;

















































