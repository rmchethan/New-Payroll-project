
  // ===== Explanation Content =====
const explanationContent = {
  normal: `
    <h3>Normaler Arbeitnehmer – Steuer- und Sozialversicherungsübersicht</h3>

    <h3>1️⃣ Steuerliche Behandlung (Einkommensteuerrecht)</h3>

<h4>Gesetzliche Grundlage</h4>
<ul>
  <li>§ 38 EStG – Lohnsteuerabzug durch den Arbeitgeber</li>
  <li>§ 32a EStG – Einkommensteuertarif (Grund-/Splittingtarif)</li>
  <li>§ 39 EStG – Steuerklassen</li>
  <li>§ 39b EStG – Jahreshochrechnung / Lohnsteuerberechnung</li>
  <li>§ 3 SolzG – Solidaritätszuschlag</li>
  <li>Kirchensteuergesetze der Länder</li>
</ul>

<h4>Steuerpflichtiger Arbeitslohn im Modell</h4>
<ul>
  <li>Grundgehalt</li>
  <li>Vermögenswirksame Leistungen (VWL)</li>
  <li>Überstundenvergütung</li>
  <li>Überstundenzuschläge (steuerpflichtig)</li>
</ul>

<h4>Lohnsteuer</h4>
<ul>
  <li>Monatsbrutto wird gemäß <strong>§ 39b EStG</strong> auf Jahresarbeitslohn hochgerechnet (× 12)</li>
  <li>Besteuerung nach progressivem Tarif gemäß <strong>§ 32a EStG</strong></li>
  <li>Berücksichtigung der Steuerklasse I–VI gemäß <strong>§ 39 EStG</strong></li>
</ul>

<h4>Solidaritätszuschlag</h4>
<ul>
  <li><strong>5,5 %</strong> der festgesetzten Lohnsteuer (§ 3 SolzG)</li>
  <li>Freigrenzen im Modell vereinfacht berücksichtigt</li>
</ul>

<h4>Kirchensteuer</h4>
<ul>
  <li><strong>8 %</strong> (Bayern, Baden-Württemberg)</li>
  <li><strong>9 %</strong> (übrige Bundesländer)</li>
  <li>Bemessungsgrundlage: Lohnsteuer</li>
  <li>Nur bei bestehender Kirchensteuerpflicht</li>
</ul>


<h3>2️⃣ Sozialversicherung</h3>
<p><strong>Gesetzliche Grundlage:</strong><br>
§ 14 SGB IV (Arbeitsentgeltbegriff)<br>
SGB V (KV) · SGB VI (RV) · SGB III (AV) · SGB XI (PV)
</p>

<p>
Im Modell wird das sozialversicherungspflichtige Entgelt bis zur jeweiligen 
<strong>Beitragsbemessungsgrenze (BBG)</strong> berücksichtigt.
</p>

<h4>🏥 Krankenversicherung (KV)</h4>
<ul>
  <li>Allgemeiner Beitragssatz: 14,6 % (§ 241 SGB V)</li>
  <li>Durchschnittlicher Zusatzbeitrag: ca. 1,7 % (§ 242 SGB V)</li>
  <li>Gesamt: ca. 16,3 %</li>
  <li>Aufteilung: 50 % Arbeitnehmer / 50 % Arbeitgeber (§ 249 SGB V)</li>
  <li>BBG 2026 (Modellannahme): ca. 5.175 € monatlich</li>
</ul>

<h4>👴 Rentenversicherung (RV)</h4>
<ul>
  <li>Beitragssatz: 18,6 % (§ 158 SGB VI)</li>
  <li>Aufteilung: 9,3 % Arbeitnehmer / 9,3 % Arbeitgeber</li>
  <li>BBG West 2026 (Modellannahme): ca. 7.550 € monatlich</li>
</ul>

<h4>📉 Arbeitslosenversicherung (AV)</h4>
<ul>
  <li>Beitragssatz: 2,6 % (§ 341 SGB III)</li>
  <li>Aufteilung: 1,3 % Arbeitnehmer / 1,3 % Arbeitgeber</li>
  <li>BBG entspricht der Rentenversicherungs-BBG</li>
</ul>

<h4>👶 Pflegeversicherung (PV)</h4>
<ul>
  <li>Grundbeitrag: 3,4 % (§ 55 SGB XI)</li>
  <li>Aufteilung: 1,7 % Arbeitnehmer / 1,7 % Arbeitgeber</li>
  <li>Kinderlosenzuschlag: +0,6 % Arbeitnehmeranteil (§ 55 Abs. 3 SGB XI)</li>
  <li>BBG entspricht der Krankenversicherungs-BBG</li>
</ul>

<p>
Im Modell werden Beitragsabschläge für mehrere Kinder unter 25 vereinfacht berücksichtigt.
</p>

<h3>3️⃣ Zuschläge für besondere Arbeitszeiten (§ 3b EStG)</h3>
<p><strong>Gesetzliche Grundlage:</strong> § 3b EStG</p>

<h4>Im Modell berücksichtigt</h4>
<ul>
  <li>Nachtarbeit: <strong>25 %</strong></li>
  <li>Nachtarbeit: <strong>40 %</strong></li>
  <li>Sonntagsarbeit: <strong>50 %</strong></li>
  <li>Feiertagsarbeit: <strong>125 %</strong></li>
   <li>Feiertagsarbeit: <strong>150 % (Nicht)</strong></li>
</ul>

<h4>Steuerliche Behandlung</h4>
<ul>
  <li>Steuerfrei bei zusätzlicher Zahlung zum Grundlohn</li>
  <li>Steuerfreiheit nur bis gesetzliche Höchstgrenzen</li>
  <li>Grundlohn ≤ <strong>50 € je Stunde</strong></li>
</ul>

<h4>Behandlung im Modell</h4>
<ul>
  <li>Zuschläge steuerfrei</li>
  <li>Zuschläge sozialversicherungsfrei</li>
  <li>Erhöhen ausschließlich das Netto</li>
  <li>Gesetzliche Höchstgrenzen werden nicht gesondert geprüft</li>
</ul>


    <h3>4️⃣ Umlagen (Arbeitgeberaufwendungen)</h3>
    <p><strong>Gesetzliche Grundlage:</strong> AAG, § 358 SGB III (Insolvenzgeldumlage)</p>
    <ul>
  <li>Umlage U1: <strong>2,8 %</strong></li>
  <li>Umlage U2: <strong>0,75 %</strong></li>
  <li>Insolvenzgeldumlage: <strong>0,6 %</strong></li>
</ul>
<p>
Diese Umlagen werden ausschließlich vom Arbeitgeber getragen und erhöhen nicht das Netto des Arbeitnehmers.
</p>

    <h3>5️⃣ Beitragsbemessungsgrenzen (BBG) – Modellannahme 2026</h3>
   <ul>
  <li>KV / PV BBG 2026: <strong>≈ 5.175 € monatlich</strong></li>
  <li>RV / AV BBG 2026: <strong>≈ 7.550 € monatlich</strong></li>
</ul>

<p>
Arbeitsentgelt oberhalb dieser Grenzen ist beitragsfrei.
</p>

    <h3>6️⃣ Nicht im Modell berücksichtigt (vereinfachte Darstellung)</h3>
    <ul>
      <li>Jahresarbeitsentgeltgrenze (§ 6 SGB V)</li>
      <li>Märzklausel (§ 23a SGB IV)</li>
      <li>Einmalzahlungen mit SV-Splitting</li>
      <li>ELStAM-Freibeträge (§ 39a EStG)</li>
      <li>Sachbezüge (§ 8 EStG)</li>
      <li>Pauschalversteuerungen (§ 40 EStG)</li>
      <li>Altersteilzeit / Kurzarbeitergeld</li>
      <li>Geringfügige Beschäftigung (§ 8 SGB IV)</li>
      <li>Beitragsgruppenschlüssel / Personengruppenschlüssel</li>
      <li>Umlagepflichtige Kleinbetriebsprüfung</li>
    </ul>

    <h3>7️⃣ Nettoermittlung im Modell</h3>
    <p>Netto = steuerpflichtiges Brutto + steuerfreie Zuschläge – Lohnsteuer – Solidaritätszuschlag – Kirchensteuer – AN-Anteile SV – sonstige Abzüge (z. B. Jobticket)</p>
  `,

//Explanation Midijob
    
midijob: `
<h3>Übergangsbereich (Midijob) – Fachliche Systematik</h3>

<h4>1️⃣ Rechtsgrundlage & Definition</h4>
<ul>
  <li>§ 20 Abs. 2 SGB IV – Übergangsbereich</li>
  <li>§ 163 Abs. 10 SGB VI – Ermäßigte Beitragsbemessungsgrundlage</li>
</ul>

<p>
Der Übergangsbereich umfasst ein monatliches Arbeitsentgelt von
<strong>603,01 € bis 2.000 €</strong>.
Ziel ist die <strong>Entlastung des Arbeitnehmers bei den Sozialversicherungsbeiträgen</strong>,
während der Arbeitgeber grundsätzlich reguläre Beiträge trägt.
</p>

<hr>

<h4>2️⃣ Steuerliche Behandlung (keine Sonderregelung)</h4>
<ul>
  <li>§ 38 EStG – Lohnsteuerabzug</li>
  <li>§ 32a EStG – Progressiver Einkommensteuertarif</li>
  <li>§ 39 EStG – Steuerklassen</li>
  <li>§ 3 SolzG – Solidaritätszuschlag</li>
  <li>Kirchensteuergesetze der Länder</li>
</ul>

<p>
Midijobs unterliegen <strong>vollständig dem regulären Lohnsteuerrecht</strong>.
Es existiert keine steuerliche Begünstigung wie im Minijob.
</p>

<p>
Das Monatsbrutto wird gemäß § 39b EStG auf einen Jahresarbeitslohn
hochgerechnet und progressiv besteuert.
</p>

<hr>

<h4>3️⃣ Sozialversicherung – Kernmechanismus des Übergangsbereichs</h4>

<p><strong>Grundsatz:</strong> Das tatsächliche Brutto ist sozialversicherungspflichtig,
jedoch wird für den Arbeitnehmer eine reduzierte Beitragsbemessungsgrundlage
ermittelt.</p>

<ul>
  <li><strong>Arbeitnehmer:</strong> Ermäßigte Bemessungsgrundlage gemäß gesetzlicher Formel</li>
  <li><strong>Arbeitgeber:</strong> Beiträge grundsätzlich aus dem tatsächlichen Arbeitsentgelt</li>
</ul>

<p>
Im Modell wird die Arbeitnehmer-Bemessungsgrundlage mit der gesetzlich
vorgegebenen Übergangsbereichsformel simuliert:
</p>

<p>
svBaseAN = (2000 / (2000 − G)) × (Brutto − G)
</p>

<p>
Zusätzlich wird der Faktor F (Modellannahme 2026 ≈ 0,6619)
zur Ermittlung der Gesamtsozialversicherungsbasis berücksichtigt.
</p>

<p>
Dadurch steigt der Arbeitnehmeranteil gleitend von einem reduzierten Wert
auf den regulären Beitragsanteil bei 2.000 €.
</p>

<hr>

<h4>4️⃣ Beitragssätze im Übergangsbereich</h4>

<ul>
  <li><strong>Krankenversicherung:</strong> 14,6 % + Ø 1,7 % Zusatzbeitrag → ca. 16,3 % gesamt<br>
      Aufteilung 50 % / 50 % (§ 249 SGB V)</li>

  <li><strong>Rentenversicherung:</strong> 18,6 % gesamt → 9,3 % AN / 9,3 % AG (§ 158 SGB VI)</li>

  <li><strong>Arbeitslosenversicherung:</strong> 2,6 % gesamt → 1,3 % AN / 1,3 % AG (§ 341 SGB III)</li>

  <li><strong>Pflegeversicherung:</strong> 3,4 % gesamt → 1,7 % AN / 1,7 % AG<br>
      Kinderlosenzuschlag +0,6 % AN (§ 55 Abs. 3 SGB XI)</li>
</ul>

<p>
Die Beitragsbemessungsgrenzen (BBG) werden auch im Übergangsbereich angewendet,
sind jedoch bei Entgelten unter 2.000 € regelmäßig nicht erreicht.
</p>

<hr>

<h4>5️⃣ Umlagen & Arbeitgeberaufwendungen</h4>

<ul>
  <li>AAG – Aufwendungsausgleichsgesetz (U1 / U2)</li>
  <li>§ 358 SGB III – Insolvenzgeldumlage</li>
</ul>

<p>
Umlagen werden <strong>nicht reduziert</strong> und basieren im Modell
auf dem tatsächlichen Bruttoarbeitsentgelt:
</p>

<ul>
  <li>U1: 2,8 %</li>
  <li>U2: 0,75 %</li>
  <li>Insolvenzgeldumlage: 0,6 %</li>
</ul>

<p>
Sie werden ausschließlich vom Arbeitgeber getragen.
</p>

<hr>

<h4>6️⃣ Abgrenzung zum Minijob</h4>

<ul>
  <li>Keine Pauschalversteuerung</li>
  <li>Volle Versicherungspflicht in allen Zweigen</li>
  <li>Reduktion betrifft ausschließlich die Arbeitnehmer-Beitragslast</li>
</ul>

<hr>

<h4>7️⃣ Nicht im Modell berücksichtigt (bewusste Vereinfachung)</h4>

<ul>
  <li>Mehrfachbeschäftigung (§ 22 SGB IV)</li>
  <li>Überschreiten der Grenze im Jahresverlauf</li>
  <li>Einmalzahlungen mit Übergangsbereichs-Splitting</li>
  <li>SV-Tage bei untermonatiger Beschäftigung</li>
  <li>Jahresarbeitsentgeltgrenze (§ 6 SGB V)</li>
</ul>

<hr>

<h4>8️⃣ Nettoermittlung im Modell</h4>

<p>
Netto =<br>
Brutto<br>
− Lohnsteuer<br>
− Solidaritätszuschlag<br>
− Kirchensteuer<br>
− Arbeitnehmeranteile Sozialversicherung
</p>

<p><em>Hinweis: Das Modell dient der strukturellen Darstellung der Systematik
des Übergangsbereichs und ersetzt keine rechtsverbindliche Entgeltabrechnung.</em></p>
`,

// Explanation MiniJobs

minijob: `
<h3>Minijob (§ 8 Abs. 1 Nr. 1 SGB IV – Geringfügig entlohnte Beschäftigung)</h3>

<h4>1️⃣ Sozialversicherungsrechtliche Einordnung</h4>

<p><strong>Gesetzliche Grundlage:</strong></p>
<ul>
  <li>§ 8 SGB IV – Geringfügige Beschäftigung</li>
  <li>§ 172 SGB VI – Rentenversicherung Minijob</li>
  <li>§ 249b SGB V – Krankenversicherung Pauschalbeitrag</li>
  <li>AAG – Umlagepflicht</li>
  <li>§ 358 SGB III – Insolvenzgeldumlage</li>
</ul>

<p>
Eine geringfügig entlohnte Beschäftigung liegt vor, wenn das regelmäßige monatliche Arbeitsentgelt die gesetzliche Geringfügigkeitsgrenze (derzeit 603 €) nicht übersteigt.
</p>

<p>
Minijobs sind grundsätzlich sozialversicherungsfrei für den Arbeitnehmer mit Ausnahme der Rentenversicherungspflicht.
</p>

<hr>

<h4>2️⃣ Beiträge des Arbeitgebers (Pauschalabgaben)</h4>

<ul>
  <li><strong>Krankenversicherung:</strong> 13 % (§ 249b SGB V)</li>
  <li><strong>Rentenversicherung:</strong> 15 % (§ 172 Abs. 3 SGB VI)</li>
  <li><strong>Pauschalsteuer:</strong> 2 % (§ 40a Abs. 2 EStG – optional, im Modell nicht simuliert)</li>
  <li><strong>Umlage U1:</strong> 2,8 % (AAG – modellhafte Annahme)</li>
  <li><strong>Umlage U2:</strong> 0,75 % (AAG – modellhafte Annahme)</li>
  <li><strong>Insolvenzgeldumlage:</strong> 0,6 % (§ 358 SGB III)</li>
</ul>

<p>
Diese Abgaben werden ausschließlich vom Arbeitgeber getragen und erhöhen die Gesamtkosten der Beschäftigung.
</p>

<hr>

<h4>3️⃣ Rentenversicherungspflicht des Arbeitnehmers</h4>

<p>
Minijobs sind grundsätzlich rentenversicherungspflichtig.
</p>

<ul>
  <li><strong>Gesamtbeitrag RV:</strong> 18,6 % (§ 158 SGB VI)</li>
  <li><strong>Arbeitgeberanteil:</strong> 15 %</li>
  <li><strong>Arbeitnehmeranteil:</strong> 3,6 % (Differenzbetrag)</li>
</ul>

<p>
Der Arbeitnehmer kann sich gemäß § 6 Abs. 1b SGB VI von der Rentenversicherungspflicht befreien lassen.
Im Befreiungsfall entfällt der 3,6 %-Eigenanteil.
</p>

<p>
Das Modell berücksichtigt die RV-Befreiungsoption über die entsprechende Auswahlfunktion.
</p>

<hr>

<h4>4️⃣ Steuerliche Behandlung</h4>

<p><strong>Gesetzliche Grundlage:</strong></p>
<ul>
  <li>§ 40a EStG – Pauschalbesteuerung bei geringfügiger Beschäftigung</li>
  <li>§ 38 EStG – Lohnsteuerabzug</li>
</ul>

<p>
Minijobs können pauschal mit 2 % besteuert werden (inkl. Kirchensteuer und Solidaritätszuschlag).
Alternativ ist eine individuelle Besteuerung nach ELStAM möglich.
</p>

<p>
Im Modell erfolgt eine vereinfachte Darstellung ohne pauschale 2 %-Besteuerung.
</p>

<hr>

<h4>5️⃣ Umlagen und Arbeitgebernebenkosten</h4>

<p>
Minijobs unterliegen vollständig der Umlagepflicht nach dem Aufwendungsausgleichsgesetz (AAG).
Die Umlagen erhöhen die Arbeitgebergesamtkosten, wirken sich jedoch nicht auf das Netto des Arbeitnehmers aus.
</p>

<hr>

<h4>6️⃣ Besonderheiten im Beitragsrecht</h4>

<ul>
  <li>Keine Anwendung von Beitragsbemessungsgrenzen (da Entgelt unterhalb der Grenzen liegt)</li>
  <li>Keine Anwendung der Jahresarbeitsentgeltgrenze (§ 6 SGB V)</li>
  <li>Keine Gleitzonenregelung (Abgrenzung zum Midijob)</li>
  <li>Volle Umlagepflicht unabhängig von Betriebsgröße</li>
</ul>

<hr>

<h4>7️⃣ Nettoermittlung im Modell</h4>

<p><strong>Netto =</strong></p>
<ul>
  <li>Brutto</li>
  <li>– Arbeitnehmeranteil RV (falls keine Befreiung)</li>
</ul>

<p>
Weitere Abzüge werden im Modell nicht simuliert.
</p>

<hr>

<p style="font-size:13px; color:#666;">
Hinweis: Das Modell dient der strukturellen Darstellung der Systematik der geringfügigen Beschäftigung.
Komplexe Sonderfälle (z. B. kurzfristige Beschäftigung, Mehrfachbeschäftigung, Mindestlohnbewertung, Statusfeststellungsverfahren) sind nicht implementiert.
</p>
`,

// ===== Explanation Praktikant =====
  
praktikant: `
<h3>Praktikant – Steuer- und Sozialversicherungsübersicht</h3>

<h3>1️⃣ Rechtsgrundlage & Definition</h3>
<ul>
  <li>§ 20 Abs. 1,2 SGB IV – Arbeitsentgeltbegriff für Praktikanten</li>
  <li>§ 1,2,3 SGB V, VI, III, XI – Sozialversicherungspflicht</li>
  <li>§ 38 EStG – Lohnsteuerabzug durch den Arbeitgeber</li>
  <li>§ 32a EStG – Einkommensteuertarif</li>
  <li>§ 39 EStG – Steuerklassen</li>
  <li>Kirchensteuergesetze der Länder</li>
</ul>

<h4>Praktikantentypen</h4>
<ul>
  <li><strong>Pflichtpraktikum</strong> (Teil von Ausbildung/Studium): sozialversicherungsfrei (§ 20 SGB IV)</li>
  <li><strong>Freiwilliges Praktikum &lt; 3 Monate:</strong> sozialversicherungsfrei (§ 20 SGB IV)</li>
  <li><strong>Freiwilliges Praktikum ≥ 3 Monate und Brutto ≤ 603 €:</strong> sozialversicherungsfrei bzw. Minijob-Status</li>
  <li><strong>Freiwilliges Praktikum ≥ 3 Monate und Brutto > 603 €:</strong> sozialversicherungspflichtig wie Normaler Arbeitnehmer</li>
</ul>

<h3>2️⃣ Steuerliche Behandlung (Einkommensteuerrecht)</h3>
<ul>
  <li>Monatsbrutto wird bei SV-pflichtigen Praktika gemäß § 39b EStG auf Jahresarbeitslohn hochgerechnet (×12)</li>
  <li>Besteuerung nach progressivem Tarif gemäß § 32a EStG</li>
  <li>Berücksichtigung Steuerklasse I–VI (§ 39 EStG)</li>
  <li>Solidaritätszuschlag 5,5 % der Lohnsteuer (§ 3 SolzG)</li>
  <li>Kirchensteuer: 8 % (Bayern/BW), 9 % (übrige Bundesländer)</li>
</ul>

<h3>3️⃣ Sozialversicherung – SV-Behandlung Praktikanten</h3>
<p>
Die Sozialversicherung hängt von Praktikantentyp, Dauer und Vergütung ab:
</p>
<ul>
  <li>Pflichtpraktikum: sozialversicherungsfrei (§ 20 SGB IV)</li>
  <li>Freiwilliges Praktikum &lt; 3 Monate: sozialversicherungsfrei</li>
  <li>Freiwilliges Praktikum ≥ 3 Monate:
    <ul>
      <li>Brutto ≤ 603 €: sozialversicherungsfrei / Minijob-Status</li>
      <li>Brutto > 603 €: volle SV-Pflicht wie Normaler Arbeitnehmer</li>
    </ul>
  </li>
</ul>

<h4>Beitragssätze bei SV-pflichtigen Praktika</h4>
<ul>
  <li>Krankenversicherung (KV): 14,6 % + Ø 1,7 % Zusatz → 16,3 % gesamt, 50 % AN / 50 % AG (§ 249 SGB V), BBG 2026 ≈ 5.175 €</li>
  <li>Rentenversicherung (RV): 18,6 % gesamt, 9,3 % AN / 9,3 % AG (§ 158 SGB VI), BBG West 2026 ≈ 7.550 €</li>
  <li>Arbeitslosenversicherung (AV): 2,6 % gesamt, 1,3 % AN / 1,3 % AG (§ 341 SGB III), BBG wie RV</li>
  <li>Pflegeversicherung (PV): 3,4 % gesamt, 1,7 % AN / 1,7 % AG, Kinderlosenzuschlag +0,6 % AN (§ 55 Abs. 3 SGB XI), BBG wie KV</li>
</ul>

<h3>4️⃣ Zuschläge / Überstunden</h3>
<p>
Bei Praktikanten werden Überstunden und Zuschläge im Modell analog Normaler Arbeitnehmer behandelt, nur wenn die Beschäftigung SV-pflichtig ist.
</p>
<ul>
  <li>Nachtarbeit 25 %, Nachtarbeit 40 %, Sonntagsarbeit 50 %, Feiertagsarbeit 125 %</li>
  <li>Steuerfrei, falls zusätzlich zum Grundlohn und gesetzliche Höchstgrenzen eingehalten</li>
  <li>Erhöhen nur das Netto, keine SV auf steuerfreie Zuschläge</li>
</ul>

<h3>5️⃣ Umlagen (Arbeitgeber)</h3>
<p>
Umlagen werden nur bei SV-pflichtigen Praktika relevant:
</p>
<ul>
  <li>U1: 2,8 %</li>
  <li>U2: 0,75 %</li>
  <li>Insolvenzgeldumlage: 0,6 %</li>
</ul>
<p>Diese werden vollständig vom Arbeitgeber getragen.</p>

<h3>6️⃣ Nicht im Modell berücksichtigt (wird in zukünftigen Versionen entwickelt)</h3>
<ul>
  <li>Jahresarbeitsentgeltgrenze (§ 6 SGB V)</li>
  <li>Märzklausel (§ 23a SGB IV)</li>
  <li>Einmalzahlungen mit SV-Splitting</li>
  <li>ELStAM-Freibeträge (§ 39a EStG)</li>
  <li>Sachbezüge (§ 8 EStG)</li>
  <li>Pauschalversteuerungen (§ 40 EStG)</li>
  <li>Altersteilzeit / Kurzarbeitergeld</li>
  <li>Beitragsgruppenschlüssel / Personengruppenschlüssel</li>
</ul>

<h3>7️⃣ Nettoermittlung im Modell</h3>
<p>
Netto = Brutto + steuerfreie Zuschläge − Lohnsteuer − Solidaritätszuschlag − Kirchensteuer − Arbeitnehmeranteile SV − sonstige Abzüge (z. B. Jobticket)
</p>

<p><em>Hinweis: Dieses Modell dient der strukturellen Darstellung der Systematik von Praktikantenvergütung und ersetzt keine rechtsverbindliche Entgeltabrechnung.</em></p>
`,


  // ===== Explanation Content for Azubi =====
azubi: `
<h3>Azubi – Übersicht Entgeltabrechnung</h3>

<h4>1️⃣ Gesetzliche Grundlage & Definition</h4>
<ul>
  <li>§ 14 SGB IV – Arbeitsentgeltbegriff</li>
  <li>SGB V – Krankenversicherung (KV)</li>
  <li>SGB VI – Rentenversicherung (RV)</li>
  <li>SGB III – Arbeitslosenversicherung (AV)</li>
  <li>SGB XI – Pflegeversicherung (PV)</li>
  <li>§ 38 EStG – Lohnsteuerabzug durch den Arbeitgeber</li>
  <li>§ 32a EStG – Progressiver Einkommensteuertarif</li>
  <li>§ 39 EStG – Steuerklassen</li>
  <li>§ 3 SolzG – Solidaritätszuschlag</li>
  <li>Kirchensteuergesetze der Länder</li>
</ul>

<h4>2️⃣ Steuerpflichtiger Arbeitslohn im Modell</h4>
<ul>
  <li>Grundvergütung / Ausbildungsvergütung</li>
  <li>Vermögenswirksame Leistungen (VWL), falls vom Arbeitgeber gezahlt</li>
  <li>Überstundenvergütung</li>
  <li>Überstundenzuschläge (steuerpflichtig)</li>
</ul>

<h4>3️⃣ Lohnsteuer</h4>
<ul>
  <li>Monatsbrutto wird gemäß § 39b EStG auf Jahresarbeitslohn hochgerechnet</li>
  <li>Besteuerung nach progressivem Tarif (§ 32a EStG)</li>
  <li>Berücksichtigung der Steuerklasse I–VI (§ 39 EStG)</li>
  <li>Kinderfreibeträge werden im Modell vereinfacht berücksichtigt</li>
</ul>

<h4>4️⃣ Solidaritätszuschlag</h4>
<ul>
  <li>5,5 % der festgesetzten Lohnsteuer (§ 3 SolzG)</li>
  <li>Freigrenzen im Modell vereinfacht berücksichtigt</li>
</ul>

<h4>5️⃣ Kirchensteuer</h4>
<ul>
  <li>8 % (Bayern, Baden-Württemberg)</li>
  <li>9 % (übrige Bundesländer)</li>
  <li>Bemessungsgrundlage: Lohnsteuer</li>
  <li>Nur bei bestehender Kirchensteuerpflicht</li>
</ul>

<h4>6️⃣ Sozialversicherung</h4>
<ul>
  <li>Krankenversicherung: 14,6 % + ca. 1,7 % Zusatzbeitrag → ca. 16,3 % gesamt, Aufteilung 50 % AN / 50 % AG (§ 249 SGB V), BBG 2026 ≈ 5.175 €</li>
  <li>Rentenversicherung: 18,6 % gesamt → 9,3 % AN / 9,3 % AG (§ 158 SGB VI), BBG West 2026 ≈ 7.550 €</li>
  <li>Arbeitslosenversicherung: 2,6 % gesamt → 1,3 % AN / 1,3 % AG (§ 341 SGB III), BBG wie RV</li>
  <li>Pflegeversicherung: 3,4 % gesamt → 1,7 % AN / 1,7 % AG, Kinderlosenzuschlag +0,6 % AN (§ 55 Abs. 3 SGB XI), BBG wie KV</li>
</ul>

<h4>7️⃣ Zuschläge & Sonderzahlungen</h4>
<ul>
  <li>Nachtarbeit, Sonntagsarbeit, Feiertagsarbeit – im Modell steuerfrei und SV-frei, erhöhen ausschließlich das Netto</li>
  <li>Überstundenvergütung ist steuer- und SV-pflichtig</li>
</ul>

<h4>8️⃣ Umlagen (Arbeitgeber)</h4>
<ul>
  <li>Umlage U1: 2,8 %</li>
  <li>Umlage U2: 0,75 %</li>
  <li>Insolvenzgeldumlage: 0,6 %</li>
  <li>Nur Arbeitgeberanteil, erhöht nicht das Netto</li>
</ul>

<h4>9️⃣ Nicht im Modell berücksichtigt (künftige Entwicklung)</h4>
<ul>
  <li>Einmalzahlungen, Sonderzahlungen mit SV-Splitting</li>
  <li>ELStAM-Freibeträge (§ 39a EStG)</li>
  <li>Sachbezüge (§ 8 EStG)</li>
  <li>Pauschalversteuerungen (§ 40 EStG)</li>
  <li>Altersteilzeit / Kurzarbeitergeld</li>
  <li>Beitragsgruppenschlüssel / Personengruppenschlüssel</li>
</ul>

<h4>🔟 Nettoermittlung im Modell</h4>
<p>
Netto = Brutto + steuerfreie Zuschläge – Lohnsteuer – Solidaritätszuschlag – Kirchensteuer – AN-Anteile Sozialversicherung – sonstige Abzüge (z. B. Jobticket)
</p>

<p><em>Hinweis: Dieses Modell dient der strukturellen Darstellung der Systematik der Ausbildungsvergütung und ersetzt keine rechtsverbindliche Entgeltabrechnung.</em></p>
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

const summaryHTML = `
<div class="summary-box">
  <div class="summary-item">
    <h4>Beschäftigungsart</h4>
    <p>Normal</p>
  </div>
  <div class="summary-item">
    <h4>Brutto</h4>
    <p>${formatCurrency(gesamtBrutto)}</p>
  </div>
  <div class="summary-item">
    <h4>Netto</h4>
    <p>${formatCurrency(netto)}</p>
  </div>
  <div class="summary-item">
    <h4>AG Gesamtkosten</h4>
    <p>${formatCurrency(gesamtKostenAG)}</p>
  </div>
</div>
`;

document.getElementById("output").innerHTML = summaryHTML + outputHTML;

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
  
const summaryHTML = `
<div class="summary-box">
  <div class="summary-item">
    <h4>Beschäftigungsart</h4>
    <p>Normal</p>
  </div>
  <div class="summary-item">
    <h4>Brutto</h4>
    <p>${formatCurrency(gesamtBrutto)}</p>
  </div>
  <div class="summary-item">
    <h4>Netto</h4>
    <p>${formatCurrency(netto)}</p>
  </div>
  <div class="summary-item">
    <h4>AG Gesamtkosten</h4>
    <p>${formatCurrency(gesamtKostenAG)}</p>
  </div>
</div>
`;

document.getElementById("output").innerHTML = summaryHTML + outputHTML;

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

const summaryHTML = `
<div class="summary-box">
  <div class="summary-item">
    <h4>Beschäftigungsart</h4>
    <p>Normal</p>
  </div>
  <div class="summary-item">
    <h4>Brutto</h4>
    <p>${formatCurrency(gesamtBrutto)}</p>
  </div>
  <div class="summary-item">
    <h4>Netto</h4>
    <p>${formatCurrency(netto)}</p>
  </div>
  <div class="summary-item">
    <h4>AG Gesamtkosten</h4>
    <p>${formatCurrency(gesamtKostenAG)}</p>
  </div>
</div>
`;

document.getElementById("output").innerHTML = summaryHTML + outputHTML;

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

  const summaryHTML = `
<div class="summary-box">
  <div class="summary-item">
    <h4>Beschäftigungsart</h4>
    <p>Normal</p>
  </div>
  <div class="summary-item">
    <h4>Brutto</h4>
    <p>${formatCurrency(gesamtBrutto)}</p>
  </div>
  <div class="summary-item">
    <h4>Netto</h4>
    <p>${formatCurrency(netto)}</p>
  </div>
  <div class="summary-item">
    <h4>AG Gesamtkosten</h4>
    <p>${formatCurrency(gesamtKostenAG)}</p>
  </div>
</div>
`;

document.getElementById("output").innerHTML = summaryHTML + outputHTML;

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

  const summaryHTML = `
<div class="summary-box">
  <div class="summary-item">
    <h4>Beschäftigungsart</h4>
    <p>Normal</p>
  </div>
  <div class="summary-item">
    <h4>Brutto</h4>
    <p>${formatCurrency(gesamtBrutto)}</p>
  </div>
  <div class="summary-item">
    <h4>Netto</h4>
    <p>${formatCurrency(netto)}</p>
  </div>
  <div class="summary-item">
    <h4>AG Gesamtkosten</h4>
    <p>${formatCurrency(gesamtKostenAG)}</p>
  </div>
</div>
`;

document.getElementById("output").innerHTML = summaryHTML + outputHTML;

}



//  JS functions for modal
function openModal(content) {
  const modal = document.getElementById('infoModal');
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = content;
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('infoModal').style.display = 'none';
}

// Close if user clicks outside the modal content
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}





// ===== Info content for i-icons =====
const infoContent = {
  brutto: `
    <ul>
      <li>Gesamtbrutto des Monats (ohne steuerfreie Zuschläge)</li>
      <li>Basis für Lohnsteuer und Sozialversicherungsabgaben</li>
      <li>Für Midijobs und Minijobs gelten spezielle Regeln</li>
    </ul>
  `,
  steuerklasse: `
    <ul>
      <li>Steuerklassen I–VI bestimmen die Lohnsteuer</li>
      <li>Berücksichtigt Kinderfreibeträge und Familienstand</li>
      <li>Wichtig für korrekte monatliche Steuerberechnung</li>
    </ul>
  `,
  state: `
    <ul>
      <li>Bundesland für Berechnung der Kirchensteuer</li>
      <li>Kirchensteuer: 8 % in Bayern/BW, 9 % in anderen Ländern</li>
    </ul>
  `,
  kirchensteuer: `
    <ul>
      <li>Nur relevant, wenn Arbeitnehmer kirchensteuerpflichtig ist</li>
      <li>Bemessungsgrundlage: Lohnsteuer</li>
    </ul>
  `,
  dob: `
    <ul>
      <li>Geburtsdatum zur Ermittlung von Kinderfreibeträgen</li>
      <li>Keine direkte Auswirkung auf Sozialversicherung im Modell</li>
    </ul>
  `,
  children: `
    <ul>
      <li>Anzahl der Kinder für Steuerklassenanpassung</li>
      <li>Berücksichtigt Freibeträge über Steuerklasse</li>
    </ul>
  `,
  ueberstunden: `
    <ul>
      <li>Vergütung für geleistete Überstunden</li>
      <li>Monatsbrutto + Überstunden vergütet</li>
      <li>Erhöhung sozialversicherungspflichtiges Entgelt</li>
    </ul>
  `,
  vwl: `
    <ul>
      <li>Vermögenswirksame Leistungen durch Arbeitgeber</li>
      <li>Steuerpflichtig, Sozialversicherungspflichtig</li>
      <li>Steuertabelle wird berücksichtigt</li>
    </ul>
  `,
  nacht25: `
    <ul>
      <li>Nachtarbeit mit 25 % Zuschlag</li>
      <li>Im Modell steuerfrei, erhöht Netto</li>
      <li>Sozialversicherungsfrei</li>
    </ul>
  `,
  nacht40: `
    <ul>
      <li>Nachtarbeit mit 40 % Zuschlag</li>

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




















































































































