
const axios = require('axios');

const SelectModel = require('../../../models/db/SelectModel');
const InsertModel = require('../../../models/db/InsertModel');
const UpdateModel = require('../../../models/db/UpDateModel');
const Authen = require('../../../utils/microsoft/login');

const DataController = {

    async getMicrosoftLogin(req, res) {

        try {
            const { email, password } = req.body;
            //  console.log(req.body);

            if (!email) {
                return res.status(200).json({ "success": false, "message": 'Unauthorized Access' });
            }

            let data = [email];
            let sql = `select USER_NAME,PWD,FACULTY_NO,MAJOR_NO,CITIZEN_ID,
                    TO_CHAR(INSERT_DATE, 'dd/mm/yyyy', 'NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')INSERT_DATE,
                    SYS_LEVEL,FIRST_NAME,LAST_NAME,TELEPHONE_NO,SYS_ACCESS,SYS_ID 
                    FROM test WHERE USER_NAME=:1`;

            const result_user = await SelectModel.findAll(res, sql, data);
            const results_user = result_user.rows ?? [];
            if (results_user.length === 0) {
                return res.status(200).json({ success: false, message: 'User not found.' });
            }

            const auth = await Authen.microsoftLogin(email, password, results_user);
            if (!auth.success) {
                return res.status(200).json({ success: false, message: auth.message });
            }

            data = [results_user[0].CITIZEN_ID];
            sql = `select sysdate from test2 where PER_CITIZEN_ID = :1`;
            
            const result_profile = await SelectModel.findAll(res, sql, data);
            const profiles = result_profile.rows ?? [];
            if (profiles.length === 0) {
                return res.status(200).json({ success: false, message: 'User not found.' });
            }

            data = [email];
            sql = `update test set LAST_LOGIN=SYSDATE where USER_NAME=:1`;
            await UpdateModel.updatedb(res, sql, data);

            // merge data
            const results = {
                ...results_user[0],
                ...(profiles.find(p => p.PER_CITIZEN_ID === results_user[0].CITIZEN_ID) || {})
            };
            
            return res.status(200).json({ success: true, message: '', results });

        } catch (error) {
            return res.status(200).json({ "success": false, "message": error.message });
        }

    },

}

/* function getLogin(res, username, password) {
    // const data = `{ "username":"anusorn.w@ru.ac.th", "password":"Awongod27"}`;
    const data = `{"username":"${username}","password":"${password}"}`;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://202.41.160.113:1323/login?username=${username}&password=${password}`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            let data = response.data;
            res.status(200).json({ "success": true, data });
            // return response.data;
        })
        .catch((error) => {
            console.log(error);
            res.status(200).json({ "success": false, error });
            // return error;
        }); 
}*/


module.exports = DataController;

