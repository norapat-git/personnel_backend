require('dotenv').config();
//const oracledb = require("oracledb");
var express = require("express");
const app = express();
app.use(express.json());
'use strict';
Error.stackTraceLimit = 50;
// var oracledb = require("oracledb");

//const ModelSelect = require('../../models/db/SelectModel');
const ModelInsert = require('../../models/db/InsertModel');
//const UpdateModel = require('../../models/db/UpDateModel');
const DeleteModel = require('../../models/db/DeleteModel');
//const INT_MASTER_GRADE = require('../interfaces/TABLE_INT_MASTER_GRADE.interface');

const Data_Controller_TABLE_INT_MASTER_GRADE = {

    async Insert_TABLE_INT_MASTER_GRADE(res, data) {
        
        try {

            if (!data) {
                res.status(200).json({ "success": false, "message": 'Unauthorized Data' });
                // throw new Error("Unauthorized Access")
            }

            const cnt_obj = data.length;
            let sql = `INSERT INTO INT_MASTER_GRADE(STD_CODE,REGIS_YEAR,REGIS_SEMESTER,COURSE_NO,SECTION_NO,CREDIT,GRADE,EXAM_LOCATION_NO,MODIFIED_BY,MODIFIED_DATE)
                 VALUES(:1,:2,:3,:4,:5,:6,:7,:8,:9,sysdate)` ;
            //  VALUES(:STD_CODE,:REGIS_YEAR,:REGIS_SEMESTER,:COURSE_NO,TO_NUMBER(:SECTION_NO),TO_NUMBER(:CREDIT),:GRADE,TO_NUMBER(:EXAM_LOCATION_NO),:MODIFIED_BY,sysdate)`;

             

            const options = {
                autoCommit: true 
            };

            
            let result;
            if (cnt_obj == 1) {
                result = await ModelInsert.insertdb(res, sql, data[0], options);
            } else if (cnt_obj > 1) {
                result =  ModelInsert.insert_many(res, sql, data, options);
            } else {
                return false;
                //return res.status(403).json({ "success": false, "message": 'Data is null.' });
            }

             if (result) {
                return true;
            } else {
                return false;
            }  
           
            /* if (cnt_obj == 1) {
                return await ModelInsert.insertdb(res, sql, data[0], options);
            } else if (cnt_obj > 1) {
                return await ModelInsert.insert_many(res, sql, data, options);
            } else {
                return res.status(403).json({ "success": false, "message": 'Data is null.' });
            } */

        } catch (error) {
            console.error(error);
            return res.status(200).json({ "success": false, "message": 'Control ' + error.message });
        } 

    },

    /*  async Update_Data_TABLE_INT_MASTER_GRADE(res, data, val) {
 
     let data = [];
         let sql = `update INT_MASTER_GRADE set x = ${val} where x=:1`;
 
         const options = {
             autoCommit: true,
             bindDefs: {
                 SLIPT_NO: { dir: oracledb.BIND_INOUT, type: oracledb.STRING, maxSize: 1 }
             }
         };
 
         const result = await UpdateModel.updatedb(res, sql, data, options);
         //console.log(result);
         if (result) {
             return true;
         } else {
             return false;
         }
     },*/

    async Delete_Data_TABLE_INT_MASTER_GRADE(res, data) {
        try {
            if (!data) {
                return res.status(200).json({ "success": false, "message": 'Unauthorized Data' });
                // throw new Error("Unauthorized Access")
            }

            const _data = [];
            let sql = ``;
            const results = await DeleteModel.deletedb(res, sql, _data);
            if (results) {
                return true;
                //return res.status(200).json({ "success": true, "message": 'Delete successfully.' });
            } else {
                return false;
                // return res.status(200).json({ "success": false, 'message': 'Delete not success.' });
            }

        } catch (error) {
            return res.status(200).json({ "success": false, 'message': error.message });
        }

    },
}

module.exports = Data_Controller_TABLE_INT_MASTER_GRADE;