const db = require('./db')

let accountDetails = {
  1000: { accno: 1000, username: "userone", balance: 5000, password: "user1" },
  1001: { accno: 1001, username: "usertwo", balance: 3000, password: "user2" },
  1002: { accno: 1002, username: "userthree", balance: 3000, password: "user3" },
  1003: { accno: 1003, username: "userfour", balance: 3000, password: "user4" },
  1004: { accno: 1004, username: "userfive", balance: 3000, password: "user5" }

}

let currentUser;

const register = (accno, username, password) => {
  // console.log("register called");


  return db.User.findOne({accno}).then(user => {
    // console.log(user);
    if (user) {
      return {
        status: false,
        statusCode: 422,
        message: "user already exists"

      }




    }
    else {
      const newUser = new db.User({

        accno,
        balance: 0,
        username,
        password



      });
      newUser.save();
      return {


        status: true,
        statusCode: 200,
        message: "registration successful"

      }


    }

  })
  
  // if (accno in accountDetails) {
  //   return {
  //     status: false,
  //     statusCode: 422,
  //     message: "user already exists"

  //   }

  // }
  // else {
  //   accountDetails[accno] = {
  //     accno,
  //     balance: 0,
  //     username,
  //     password


  //   }
  //   //   this.saveDetaials();
  //   console.log(accountDetails);
  //   return {
  //     status: true,
  //     statusCode: 200,
  //     message: "registration successful"

  //   }

  // }
}

const login = (req, accno, pswd) => {

  var acno = parseInt(accno);
  return db.User.findOne({

    accno,
    password:pswd


  }).then(user=>{

     if(user){

      req.session.currentUser=user
      return {

        status: true,
        statusCode: 200,
        message: "login successful",
        name: user.username

      }

    }
      return {
        
        status: false,
        statusCode: 422,
        message: "invalid credentials"
  
         }
    })



  // console.log(accno)
  // console.log(pswd)
  // let dataset = accountDetails;
  // if (accno in dataset) {

  //   var pswd1 = dataset[accno].password
  //   console.log(pswd1)
  //   if (pswd1 == pswd) {
  //     req.session.currentUser = dataset[accno].username

  //     return {

  //       // alert("login successful");

  //       // this.saveDetaials();
  //       status: true,
  //       statusCode: 200,
  //       message: "login successful"

  //     }
  //   }
  //   return {

  //     statusCode: 422,
  //     status: false,
  //     message: "incorrect password"


  //   }
  // }
  // return {

  //   statusCode: 422,
  //   status: false,
  //   message: "no user is exist provide account number "


  // }


  }

const deposit = (accno, amount, pswd) => {

  var amt = parseInt(amount);
    return db.User.findOne({

      accno,
      password:pswd
   
    }).then(user=>{

        if(!user){
          return {
            // alert("no user exist with provided Account number")
            status: false,
            statusCode: 422,
            message: "no user exist with provided account number"
          }
       }
       





          user.balance+=amt;
          user.save();
          return {

            status: true,
            statusCode: 200,
            message: "Account has been credited",
            balance: user.balance
          }


    })
  // console.log(amount)
  
  // console.log(amt+5);

  // let dataset = accountDetails;
  // if (accno in dataset) {

  //   var pswd1 = dataset[accno].password
  //   // console.log(pswd1)
  //   if (pswd1 == pswd) {
  //     dataset[accno].balance += amt
  //     // this.saveDetaials();
  //     // console.log(dataset[accno].balance);

  //     // alert("Account credited with amount:" + amount+" New balance is :" + dataset[accno].balance);

  //     return {

  //       status: true,
  //       statusCode: 200,
  //       message: "Account has been credited",
  //       balance: dataset[accno].balance
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       statusCode: 422,
  //       message: "incorrect password"
  //     }
  //     // alert("incorrect password")

  //     // balance:dataset[accno].balance

  //   }
  // }
  // else {
  //   return {
  //     // alert("no user exist with provided Account number")
  //     status: false,
  //     statusCode: 422,
  //     message: "no user exist with provided account number"
  //   }
  // }

}
const withdraw = (accno, amount, pswd) => {
  // if(!req.session.currentUser){
  //   return {
  //     status: false,
  //     statusCode: 422,
  //     message: "please login"
  //   }
  // }
  var amt = parseInt(amount);
  return db.User.findOne({

    accno,
    password:pswd



  }).then(user=>{
      if(!user){
        return {
          status: false,
          statusCode: 422,
          message: "no user exist with provided Account number"
        }
      }
    if(user.balance<amt){

      return {
        status: false,
        statusCode: 422,
        message: "insufficient balance"

      }
    }
    user.balance-=amt;
    user.save();

    return {
      status: true,
      statusCode: 200,
      message: "Account debited",
      balance: user.balance
    }




    })
    
    
    
    
    
    
    
    }










//   let dataset = accountDetails;
//   if (accno in dataset) {

//     var pswd1 = dataset[accno].password
//     // console.log(pswd1)
//     if (pswd1 == pswd) {
//       if (amount > dataset[accno].amount) {
//         return {
//           status: false,
//           statusCode: 422,
//           message: "insufficient balance"

//         }
//       }
//       else {
//         dataset[accno].balance -= amt
//         // this.saveDetaials();

//         // alert("Account credited with amount:" + amount+" New balance is :" + dataset[accno].balance);

//         return {
//           status: true,
//           statusCode: 200,
//           message: "Account debited",
//           balance: dataset[accno].balance
//         }
//       }
//     }

//     else {
//       return {
//         status: false,
//         statusCode: 422,
//         message: "incorrect password"

//       }

//     }
//   }
//   else {
//     return {
//       status: false,
//       statusCode: 422,
//       message: "no user exist with provided Account number"
//     }

//   }
// }



module.exports = {

  register,
  login,
  deposit,
  withdraw
}

