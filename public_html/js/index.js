/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL='http://api.login2explore.com:5577';
var jbdbIRL = "/api/irl";
var jpdbIML= "/api/iml";
var stdDBName= "Student";
var stdRelationName="Student-data";
var Token="90938117|-31949270403038068|90955502";

$("#id").focus();

function saveRecNo(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonobj(){
    var stdid=$("#id").val();
    var jsonStr={id: stdid};
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $("#name").val(data.name);
    $("#class").val(data.class);
    $("#dob").val(data.dob);
    $("#address").val(data.address);
    $("#enroll_data").val(data.enroll_data);
}

function getEmp(){
    var stdIdJsonObj=getEmpIdAsJsonobj();
    var getRequest=createGET_BY_KEYRequest(Token, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, jbdbIRL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if(resultObj.satus === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
    else if(resultObj.satus === 200){
        $("#id").prop("disabled", false);
        fillData(resultObj);
        $('#change').prop('disabled', false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
}

function validateData() {
    var stdId = $("#id").val();
    var stdName = $("#name").val();
    var stdclass = $("#class").val();
    var stddob = $("#dob").val();
    var stdaddress = $("#address").val();
    var stdenroll = $("#enroll_date").val();
    if (stdId === "") {
        alert("student roll no is Required Value");
        $("#id").focus();
        return "";
    }
    if (stdName === "") {
        alert("student Name is Required Value");
        $("#name").focus();
        return "";
    }
    if (stdclass === "") {
        alert("student class is Required Value");
        $("#class").focus();
        return "";
    }
    if (stddob === "") {
        alert("student date of birth is Required Value");
        $("#dob").focus();
        return "";
    }
    if (stdaddress === "") {
        alert("student address is Required Value");
        $("#address").focus();
        return "";
    }
    if (stdenroll === "") {
        alert("student enrollment date is Required Value");
        $("#enroll_date").focus();
        return "";
    }
    var jsonStrObj = {
        id: stdId,
        name: stdName,
        class: stdclass,
        dob: stddob,
        address: stdaddress,
        enroll_date: stdenroll
    };
    return JSON.stringify(jsonStrObj);
}


function resetForm() {
    $("#id").val("");
    $("#name").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enroll_date").val("");
    $("#id").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#id").focus();
}


function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return "";
    }
    var putReq = createPUTRequest(Token, jsonStr, stdDBName, stdRelationName);
    alert(putReq);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReq, jbdbIRL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#id").focus();
}

function changeData() {
    $("#change").prop("diabled", true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(Token, jsonChg, stdRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, jbdbIRL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
    $("#id").focus();
}
