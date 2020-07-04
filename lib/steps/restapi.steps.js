'use strict';

const _ = require('lodash');
const assert = require('assert');


module.exports = function () {

    this.Given(/^The json request data$/i, function (data) {
        this.requestBody = JSON.parse(data);
    });

    this.Given(/^The request data$/i, function (data) {
        const dataRows = data.hashes();
        const firstRow = dataRows[0];
        this.requestBody = firstRow;
    });


    this.Given(/^the property "(.*)" is set to "(.*)"$/i, function (path, value) {
        this.requestBody = this.requestBody || {};
        _.set(this.requestBody, path, value);
    });
    
    this.Given(/^the property "(.*)" is set to the response property "(.*)"$/i, function (path, oldPath) {
        this.requestBody = this.requestBody || {};
        _.set(this.requestBody, path, _.get(this.actualResponse, oldPath));
    });

    this.When(/^I make a GET request to "(.*)"$/i, function (uri) {
        console.log("checking the uri -- " + uri);
        return this.httpGet(uri);
    });

    this.When(/^I make a DELETE request to "(.*)"$/i, function (uri) {
        console.log("checking the uri -- " + uri);
        return this.httpDelete(uri);
    });

    this.When(/^I make a POST request to "(.*)"$/i, function (uri) {
        return this.httpPost(uri);
    });

    this.When(/^I make a PUT request to "(.*)"$/i, function (uri) {
        return this.httpPut(uri);
    });

    this.Then(/^The response should be "(.*)"$/i, function (expectedResponse, callback) {
        console.log("-------Actual response:" + this.actualResponse);
        console.log("-------Expected response:" + expectedResponse);
        assert.equal(this.actualResponse, expectedResponse, `\r\nExpected: ${expectedResponse}\r\nActual: ${this.actualResponse}`);
        callback();
    });

    this.Then(/^The response property "(.*)" should be "(.*)"$/i, function (path, expectedValue, callback) {
        const actualValue = this.getValue(path);
        console.log("-------Actual Value:" + actualValue);
        console.log("-------Expected Value:" + expectedValue);
        assert.equal(actualValue, expectedValue, this.prettyPrintError(actualValue, expectedValue));
        callback();
    });

    this.Then(/^The response status code should be "(.*)"$/i, function (expectedValue, callback) {
        console.log("-------Expected HTTP response code: " + expectedValue);
        console.log("-------Actual HTTP code: " + this.statusCode);
        assert.equal(this.statusCode, expectedValue, this.prettyPrintError(this.statusCode, expectedValue));
        callback();
    });
};