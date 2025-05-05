const { google } = require('googleapis');
const fs = require('fs/promises');
const path = require('path');

// ค่าคงที่
const SHEET_ID = '1q5mC34HAYerLMc0E9chU3nI5p38BLzYbfVhrZU48is4';
const SHEET_NAME = 'Test UI';
const CREDENTIALS_PATH = path.resolve(__dirname, '../credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * อัปเดตผลลัพธ์ของ test case ไปยัง Google Sheet
 * @param {string} testCaseId เช่น 'TC-001'
 * @param {'Pass'|'Fail'} status 
 */
async function updateTestResult(testCaseId, status) {
  try {
    const credentialsRaw = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(credentialsRaw);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // อ่านคอลัมน์ A เพื่อหา test case
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === testCaseId);

    if (rowIndex === -1) {
      console.error(`❌ ไม่พบ Test Case ID "${testCaseId}" ในคอลัมน์ A`);
      return;
    }

    const rowNumber = rowIndex + 1;
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!I${rowNumber}:J${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[status, now]],
      },
    });

    console.log(`✅ อัปเดต ${testCaseId} เป็น ${status} เวลา ${now}`);
  } catch (err) {
    console.error(`❌ อัปเดต ${testCaseId} ล้มเหลว`, err);
  }
}

module.exports = { updateTestResult };
