import request from "@/network/request"
const testAPI = require("@/apis")

export const createStaff = config => request._post(testAPI.STAFF_CREATE, config);
export const checkIn = config => request._post(testAPI.STAFF_CHECK_IN, config);
export const getAllStaff = config => request._post(testAPI.STAFF_QUERY, config);

export const deleteStaffById = config => request._post(testAPI.STAFF_DELETE, config);