const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const app = express();
const port = 8000;
const corsOptions = {
  origin: "https://sheets-node-pnxftv7z9-my-team-c7844730.vercel.app/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors());
app.use(express.static("public"));

app.get("/append", async (req, res) => {
  const name = req.query.name || "DefaultName";
  const phone = req.query.phone || "DefaultPhone";

  try {
    // Authenticate the service account
    let creds = {
      type: "service_account",
      project_id: "spot-411514",
      private_key_id: "efa76d3d2789371047e991701074a2316ad204e4",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCX21p0kNVQSp2U\nJJyZyfnf3M07drKjutmq/hvX7x4agMIXihWC22yRTzu0hFBkdaOFg7UW0OWKvcBB\nW2JeR0iH8iclZqyNUlRWzXVw3j+dYCCB8uOpk0PGnYatTlrMJPwlQV4oirhyubT/\ngU8v17zqShz19BGuOfs6rUXt81i2Y1UrrWbcbI4dpZafdXyGa4vJmovGPhUS9a14\ncu4YHrjw5txu7jzTojXukmUA1/+xkYZAfc7/mfqf6uxWVfd1lG+swJgedGDUpsXP\nEtGxI+Pf4LdE9Y68xtHL+2WCJsk6q0eT077lWsw7LksBhHJCNIfi7A1ymvo19DTE\njdW3J1YHAgMBAAECggEAODyFfRF9zaQ0Qv5j+BfyL1MHtfO5KCU0IrzD9u2YilwQ\nhMMgQDueMxnSlIFDfFCMZA9oarClsQGgRxPek+d2FtI4aQNi91r73MFtsoS7rj5B\nC561bMEaol0H2PphaaRwtCNHCWCF+gaH3u82MhOE5IbZvsPKIGlcflhYw0wRGEmS\n213zRe+Xy+Z3gMvpCfr36bnVFcwbQsRFMykMCakVKnlKf9lSqDuM9ClHjP5cXewF\n6QIQCVsW4VOJkmvpkVa9oSgdVrUzIXXpGiR/h/71vwFcmjhv3Ovjij1/Qfxs9Qmw\ngah8nSUB0ZYPd050bmIm8kR/AMKTqe7FL7FSdtI3AQKBgQDI7W+wVsoXSUp22Otf\n4J90wMikFYzicHyo/MuElLi5y/8qh1XxYQ6VAlkH5A8eoZ0TKp3KI9hmCu1s94iB\nGeOvjViyPHlKqjZS8Oex33K5zXK4gXh7l7WF8Tr+g9/Q4Dm7o5RSYnkjalwsGcAA\nAOPuAQWJ5tzgaMJWwVG5X3jGxwKBgQDBesHJzhG0yzf2oADXic2BKT9HfbYvttXX\nHIzx9GtDDo9ADwENWHqN1Xrpe3xOsf06LbwlDptUsuvJ3FmwBX0pGPQDLSlJ3XhV\nKgNHAqEtIZtrQ8iTlYMKhNENZ2xM081RrZ24WvNkGYo8THsDjjmHdhBFQdkDywRv\njJB+Ofi2wQKBgBYo+bR9HfTLhIbvDaaZY3zA9mACcHNY7KbGmruYm3cCZLYQDw58\nIduVUrRoFrLOKEDA5n4wzeETO3RVKJz0egQWlr2xpb7yXuNu5l7bwg9z9T8cKGmZ\nJdAL9vGzIbAryrJDLEyZx7p8NIY4oNBfSMQrIK1A5QNrCmP/FkBXoz5pAoGAfP81\n247KWadAzJCqepWIsv1W6HULEuBoXsUPOfHSqkvpuFT5NQoIg0F8WwNwV9cd5kxN\n1RMOvzWop404VEP3jGmWm8a9ef8fEsZFv8avIl0n77CnENHzCwSrmqFKkofzieVE\nlCoOPIlTiYlPoAhumlloQZY9AfpTL038u8/wIwECgYEAtiy/KYY1IjAx/5JGbTjv\nrg7F+aGAxJ2f8lquGWtzIjW/jyapbcVgsZe9ywfO70b82poNCITv8WFPpxr1lDyp\nv/J2Cn4A09Oz3jPwRaTm/mODZx/3Z8K666bp5oBY3wk3nGJ7TG/o9r0EE61pkWD2\nig7z69+1PXgKs8r0hlSmS+c=\n-----END PRIVATE KEY-----\n",
      client_email: "user-info@spot-411514.iam.gserviceaccount.com",
      client_id: "102097669527135668518",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/user-info%40spot-411514.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    const clientEmail = creds.client_email;
    const privateKey = creds.private_key;
    const googleSheetId = "1q3uoIFxOSFDjbjy7IfCzgpqNNWFwGDVA8HmYJdntYtY";

    const googleAuth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey.replace(/\\n/g, "\n"),
      "https://www.googleapis.com/auth/spreadsheets"
    );

    // Google Sheet instance
    const sheetInstance = await google.sheets({
      version: "v4",
      auth: googleAuth,
    });

    // Check if the phone number already exists in the sheet
    const existingData = await sheetInstance.spreadsheets.values.get({
      auth: googleAuth,
      spreadsheetId: googleSheetId,
      range: "Sheet1!B:B", // Assuming phone numbers are in column B, adjust accordingly
    });

    const existingPhoneNumbers = existingData.data.values
      ? existingData.data.values.flat()
      : [];

    if (existingPhoneNumbers.includes(phone)) {
      console.log(
        "Phone number already exists in the sheet. Validation failed."
      );
      return res.status(400).json({
        error: "Phone number already in use. Please enter a unique number.",
      });
    }

    // Append the new data to the sheet
    const updateToGsheet = [[name, phone]];
    await sheetInstance.spreadsheets.values.append({
      auth: googleAuth,
      spreadsheetId: googleSheetId,
      range: "Sheet1!A1:Z1000",
      valueInputOption: "RAW",
      resource: {
        values: updateToGsheet,
      },
    });

    console.log("Data appended successfully!");

    // Send a response to the client
    res.json({ message: "Function called successfully!" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
