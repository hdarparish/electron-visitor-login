const sql = require("mssql");
const config = require("./config");

sql.connect(config, (error) => {
  if (error) {
    throw error;
  }
  console.log("Successfully connected to the database");
});

const addLogin = async (data) => {
  let firstName = data.firstName;
  let lastName = data.lastName;
  let phoneNumber = data.phoneNumber;
  let signinTime = data.signinTime;
  let symptoms = data.symptoms;
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("input_firstName", sql.NText, firstName)
      .input("input_lastName", sql.NText, lastName)
      .input("input_phoneNumber", sql.Numeric, phoneNumber)
      .input("input_signinTime", sql.DateTime, signinTime)
      .input("input_symptoms", sql.Bit, symptoms)

      .query(
        "INSERT INTO [dbo].[logins]([first_name],[last_name],[phone_number],[sign_in],[symptoms]) VALUES(@input_firstName, @input_lastName, @input_phoneNumber, @input_signinTime, @input_symptoms)"
      );

    //close connection
    pool.close();
  } catch (err) {
    console.log(err);
    pool.close();
  }
};

const getLogins = async () => {
  try {
    let pool = await sql.connect(config);
    // let request = await pool.request();d
    let date = new Date().toLocaleDateString();
    let result = await pool
      .request()
      .input("input_date", sql.DateTime, date)
      //convert the date because it has a timestamp
      .query(
        "SELECT * FROM dbo.logins WHERE sign_out is null and CAST(sign_in AS date) = TRY_CONVERT(DATE, @input_date, 102)"
      );

    //close connection
    pool.close();
    return result;
  } catch (err) {
    throw err;
  }
};

const visitorLogout = async (logId) => {
  try {
    let pool = await sql.connect(config);
    // let request = await pool.request();d
    let date = new Date().toLocaleString();
    let result = await pool
      .request()
      .input("input_logid", sql.Int, logId)
      .input("input_signout", sql.DateTime, date)
      //convert the date because it has a timestamp
      .query(
        "UPDATE dbo.logins SET sign_out = @input_signout WHERE log_id = @input_logid"
      );

    //close connection
    pool.close();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addLogin,
  getLogins,
  visitorLogout,
};
