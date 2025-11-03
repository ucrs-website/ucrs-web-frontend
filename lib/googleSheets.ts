import { google } from 'googleapis'

/**
 * Get Google Sheets API client
 */
export function getGoogleSheetsClient() {
  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL

    if (!privateKey || !clientEmail) {
      throw new Error('Missing Google Sheets credentials')
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
  } catch (error) {
    console.error('Error creating Google Sheets client:', error)
    throw error
  }
}

/**
 * Add a newsletter subscriber to Google Sheets
 */
export async function addNewsletterSubscriber(data: {
  email: string
  timestamp: string
  userAgent: string
  ipAddress: string
}) {
  try {
    const sheets = getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const sheetName = process.env.GOOGLE_SHEET_NAME

    if (!spreadsheetId || !sheetName) {
      throw new Error('Missing Google Sheet configuration')
    }

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[data.email, data.timestamp, data.userAgent, data.ipAddress]],
      },
    })

    return response.data
  } catch (error) {
    console.error('Error adding subscriber to Google Sheets:', error)
    throw error
  }
}

/**
 * Check if email already exists in the sheet
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const sheetName = process.env.GOOGLE_SHEET_NAME

    if (!spreadsheetId || !sheetName) {
      throw new Error('Missing Google Sheet configuration')
    }

    // Get all emails from column A
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return false
    }

    // Check if email exists (case-insensitive)
    const emailLower = email.toLowerCase()
    return rows.some(
      (row) => row[0] && row[0].toLowerCase() === emailLower
    )
  } catch (error) {
    console.error('Error checking email existence:', error)
    throw error
  }
}
