const axios = require('axios');


const Helper = {

    async microsoftLogin(username, password, results) {
        // const data = `{ "username":"anusorn.w@ru.ac.th", "password":"Awongod27"}`;
        const data = `{"username":"${username}","password":"${password}"}`;

        const pwd = encodeURIComponent(password);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `xxx`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };
          try {
            const response = await axios.request(config);
            const _results = response.data;
            return { success: true, message: 'Login successful.', results: _results };
        } catch (error) {
            // ถ้าอยากดูสาเหตุจริง
            // const status = error?.response?.status;
            // const errData = error?.response?.data;
            return { success: false, message: 'E-mail or password invalid. ' + error.message, results: [] };
        } 
 
    }
}

module.exports = Helper