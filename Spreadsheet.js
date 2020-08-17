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


    /*let pokemon = {
        name: String,
        location_order: Number,
        location: String,
        location_Notes: String,
        before_badge: String,
        location_2: String,
        location_Notes_2: String,
        before_Badge_2: String,
        location_3: String,
        location_Notes_3: String,
        before_Badge_3: String,
        location_4: String,
        location_Notes_4: String,
        before_Badge_4: String,
        location_5: String,
        location_Notes_5: String,
        before_Badge_5: String,
        location_6: String,
        location_Notes_6: String,
        before_Badge_6: String,
        location_7: String,
        location_Notes_7: String,
        before_Badge_7: String,
        location_8: String,
        location_Notes_8: String,
        before_Badge_8: String,
        location_9: String,
        location_Notes_9: String,
        before_Badge_9: String,
        location_10: String,
        location_Notes_10: String,
        before_Badge_10: String,
        location_11: String,
        location_Notes_11: String,
        before_Badge_11: String,
        location_12: String,
        location_Notes_12: String,
        before_Badge_12: String,
        location_13: String,
        location_Notes_13: String,
        before_Badge_13: String,
        location_14: String,
        location_Notes_14: String,
        before_Badge_14: String,
        location_15: String,
        location_Notes_15: String,
        before_Badge_15: String,
        location_16: String,
        location_Notes_16: String,
        before_Badge_16: String,
        location_17: String,
        location_Notes_17: String,
        before_Badge_17: String,
        location_18: String,
        location_Notes_18: String,
        before_Badge_18: String,
        location_19: String,
        location_Notes_19: String,
        before_Badge_19: String,
        location_20: String,
        location_Notes_20: String,
        before_Badge_20: String,
        location_21: String,
        location_Notes_21: String,
        before_Badge_21: String,
        location_22: String,
        location_Notes_22: String,
        before_Badge_22: String,
        type_1: String,
        type_2: String,
        evolutions_Types: String,
        first_Stage: String,
        evolutions: Number,
        final_evolution: String,
        legendary: String,
        pre_Point_of_No_Return: String,
        branched_Evolution: String,
        baby: String,
        mystery_Egg: String,
        starter: String,
        egg_Group_1: String,
        egg_Group_2: String,
        dex_Number: Number,
        hp_EV: Number,
        atk_EV: Number,
        def_EV: Number,
        sp_ATK_EV: Number,
        sp_DEF_EV: Number,
        speed_EV: Number,
        hp: Number,
        attack: Number,
        defense: Number,
        sp_Attack: Number,
        sp_Defense: Number,
        speed: Number,
        best_stat_Total: Number,
        average: Number,
        entry_Order: Number,
        lowest_Atk_combined: Number,
    };*/

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