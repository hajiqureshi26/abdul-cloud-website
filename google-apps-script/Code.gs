function doPost(event) {
  var data = event.parameter || {};

  if (event.postData && event.postData.contents) {
    try {
      data = JSON.parse(event.postData.contents);
    } catch (error) {
      // Keep supporting URL-encoded form submissions.
    }
  }

  if (data.website) {
    return jsonResponse({ ok: true });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Responses");
    sheet.appendRow(["Submitted at", "Name", "Email", "What are you building?", "Details"]);
  }

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.building || data.subject || "",
    data.details || data.message || "",
  ]);

  return jsonResponse({ ok: true });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
