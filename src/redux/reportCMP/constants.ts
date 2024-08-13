const eID = 117905;
export const baseUrl = "http://185.244.172.108:8081";

export const reportItems = {
  CMP: {
    GET_ROWS: `/v1/outlay-rows/entity/${eID}/row/list`,
    ADD_ROW: `/v1/outlay-rows/entity/${eID}/row/create`,
    UPDATE_ROW: `/v1/outlay-rows/entity/${eID}/row`,
    DELETE_ROW: `/v1/outlay-rows/entity/${eID}/row`,
  },
};
