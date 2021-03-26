let accountDetails = {
  1000: { accno: 1000, username: "userone", balance: 5000, password: "user1" },
  1001: { accno: 1001, username: "usertwo", balance: 3000, password: "user2" },
  1002: { accno: 1002, username: "userthree", balance: 3000, password: "user3" },
  1003: { accno: 1003, username: "userfour", balance: 3000, password: "user4" },
  1004: { accno: 1004, username: "userfive", balance: 3000, password: "user5" }

}
const register = (accno, username, password) => {

  console.log("register called");

  if (accno in accountDetails) {
    return {

      status: false,
      message: "user already exists"


    }
  }
  else {
    accountDetails[accno] = {
      accno,
      balance: 0,
      username,
      password


    }
    //   this.saveDetaials();
    console.log(accountDetails);
    return {

      status: true,
      message: "registration successful"

    }

  }
}

const login = (accno, pswd) => {
  console.log(accno)
  console.log(pswd)
  let dataset = accountDetails;
  if (accno in dataset) {

    var pswd1 = dataset[accno].password
    console.log(pswd1)
    if (pswd1 == pswd) {
      currentUser = dataset[accno].username

      return {

        // alert("login successful");

        // this.saveDetaials();
        status: true,
        message: "login successful"

      }
    }
      return {


        status: false,
        message: "incorrect password"


      }
    }
    return {

      status: false,
      message: "no user is exist provide account number "


    }


  }

module.exports = {

  register,
  login
}

