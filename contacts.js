const xlsx = require('xlsx');
const axios = require('axios');
const fs = require('fs');

// Read the Excel file
const workbook = xlsx.readFile('Contacts-Mallik-Business.xlsx');
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]];

// Convert the sheet to JSON
let contacts = xlsx.utils.sheet_to_json(worksheet);

// Function to fetch contact name from TrueCaller API
const fetchContactName = async (phoneNumber) => {
    try {
        const response = await axios.get(`https://api.truecaller.com/v1/search?phone=${phoneNumber}`, {
            headers: {
                'Authorization': 'Bearer YOUR_TRUECALLER_API_KEY'
            }
        });
        return response.data.name;
    } catch (error) {
        console.error(`Error fetching contact name for ${phoneNumber}:`, error);
        return null;
    }
};

// Update contacts with fetched names
const updateContacts = async () => {
    for (let contact of contacts) {
        if (!contact.name && contact.phone) {
            const name = await fetchContactName(contact.phone);
            if (name) {
                contact.name = name;
            }
        }
    }

    // Convert JSON back to sheet
    const newWorksheet = xlsx.utils.json_to_sheet(contacts);
    workbook.Sheets[sheet_name_list[0]] = newWorksheet;

    // Write the updated workbook to a new file
    xlsx.writeFile(workbook, 'updated_contacts.xlsx');
};

// Run the update
updateContacts();