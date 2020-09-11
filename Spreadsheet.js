const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('1CUikN0MckN1v2RU2Ub_La7JPE_ppzMl7pTbesEgwwz4');

async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    await sheet.loadHeaderRow();
    await sheet.loadCells('A1:CU910');

    //Call rows and cells from sheet
    const rows = await sheet.getRows();
    const cells = await sheet.getCellByA1('A1');

    //Two main ways of retrieving cells from document
    //let cells = sheet.getCellByA1('A1:CU910');
    //let cells = await sheet.getCell(0, 5);

    let headers = sheet.headerValues;

    const list_of_pokemon = [];

    for (let j = 1; j < cells._sheet._cells.length; j++) {
        let new_pokemon = {};

        for (let i = 0; i < 99; i++) {
            new_pokemon[headers[i]] = cells._sheet._cells[j][i]._rawData.formattedValue;
        }
        //new_pokemon = Object.assign(new_pokemon, pokemon);
        list_of_pokemon.push(new_pokemon);
    }
}

accessSpreadsheet();
