// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/'
let apiPath = '/'
const api = {
  employeeAttrQuery: apiPath + 'entry/form/query',
  employeeAttrGet: apiPath + 'entry/form/get/',
  employeeAttrConfig: apiPath + 'entry/form/config/',
  dictRegion: apiPath + 'api/dict/list/region',
  employeeAttrSave: apiPath + 'entry/form/save'
}

const apiDict = {

}

const apiStatus = {
  success: '0'
}

export { api, apiDict, apiStatus }
