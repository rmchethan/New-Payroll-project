document.getElementById("output").innerHTML =
  "<strong>Brutto Bestandteile</strong><br>" +
  "Grundgehalt: " + brutto.toFixed(2) + " €<br>" +
  "Zuschläge: " + zuschlaege.toFixed(2) + " €<br>" +
  "Überstunden: " + ueberstunden.toFixed(2) + " €<br>" +
  "NFS-Zuschläge: " + nfs.toFixed(2) + " €<br>" +
  "<strong>Gesamtbrutto: " + gesamtBrutto.toFixed(2) + " €</strong><br><br>" +

  "<strong>Abzüge</strong><br>" +
  "Lohnsteuer: " + lohnsteuer.toFixed(2) + " €<br>" +
  "Krankenversicherung (KV): " + kv.toFixed(2) + " €<br>" +
  "Rentenversicherung (RV): " + rv.toFixed(2) + " €<br>" +
  "Arbeitslosenversicherung (AV): " + av.toFixed(2) + " €<br>" +
  "Pflegeversicherung (PV): " + pv.toFixed(2) + " €<br>" +
  "Jobticket: " + jobticket.toFixed(2) + " €<br><br>" +

  "<strong>Netto: " + netto.toFixed(2) + " €</strong>";
