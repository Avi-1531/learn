class apiresponse {
  constructor(statuscode, data, message = "") {
    this.statuscode = statuscode;
    this.data = data;
    this.message = message;
    // if statuscode is less than 400 then that is considered to be success that is its value is true
    this.success = statuscode < 400;
  }
}

export { apiresponse };
