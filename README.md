📘 **Payroll Calculator – Germany (Demo Model)**

🧾 **Overview**

**This project is a frontend payroll simulation tool that models German salary calculation for different employment types**:

  * Normal Employee (Normaler Arbeitnehmer)
  
  * Midijob (Übergangsbereich)
  
  * Minijob (§ 8 SGB IV)
  
  * Praktikant
  
  * Azubi

**The application demonstrates:**

* Progressive income tax calculation

* Social security contributions (AN / AG split)

* Transition zone logic (Midijob)

* Employer cost simulation

* Legal documentation integration

* Structured breakdown output

⚠️ **This tool is a demo model for portfolio purposes and does not replace certified payroll software**.

⚙️ **Features**

🧮 **Tax Calculation**

* Income tax according to § 32a EStG (annualized)

* Tax class handling (I–VI)

* Solidarity surcharge (5.5%)

* Church tax (8% / 9%)

🏥 **Social Security**

* KV (14.6% + 1.7% avg. Zusatzbeitrag)

* RV (18.6%)

* AV (2.6%)

* PV (3.4% + childless surcharge)

🔁 **Midijob Transition Logic**

* Reduced employee contribution base

* Factor F simulation (≈ 0.6619)

* Full employer contribution on real gross

💼 **Minijob Model**

* 13% KV (AG)

* 15% RV (AG)

* Optional 3.6% RV (AN)

* Employer flat-rate contributions

📊 **Output**

* Detailed contribution breakdown

* Employer total cost

* Cost factor calculation

* Legal explanation panel

🧠 **Technical Architecture**

* Vanilla JavaScript

* Modular calculation functions per employee type

**Separation of**:

* Tax calculation

* Social security logic

* Employer contributions

* UI rendering

**No backend — calculation logic runs fully client-side**.

📚 **Legal References (Model-Based)**

* EStG (Income Tax Act)

* SGB IV, V, VI, III, XI (Social Security Codes)

* AAG (Employer Reimbursement Act)

* SolzG (Solidarity Surcharge Act)

⚠️ **Disclaimer**

This model:

* Uses simplified assumptions

* Does not account for all edge cases

* Does not replace official payroll systems

* Is intended for educational and demonstration purposes

🚀 **Why This Project**

**This project demonstrates:**

* Understanding of complex rule-based systems

* Implementation of real-world financial logic

* Legal-to-technical translation capability

* Structured UI breakdown

* Clean architecture separation
