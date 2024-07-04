const BASE_URL = "https://6686536483c983911b01b906.mockapi.io";

class Authentication {
  constructor( email, password) {
    this.email = email;
    this.password = password;
  }

 

  verifyData() {
   

    if (!this.email.endsWith("@gmail.com")) {
      throw new Error("Email entered is not valid");
    }
    if (this.password.length < 5) {
      throw new Error("Password must have at least 5 characters");
    }
  }

  async signup() {
    try {
      const getUsers = await fetch(`${BASE_URL}/users`);
      const users = await getUsers.json();

      // const doesUserExists = users.filter(user => user.email === this.email )
      const doesUserExists = users.find((user) => user.email === this.email);

      if (doesUserExists) {
        return {
          statusCode: 409,
          message: "the email is already exists",
          data: "",
        };
      }

      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const createdUser = await response.json();

      return {
        statusCode: 201,
        message: "signed up successfully",
        data: createdUser,
      };
    } catch (error) {
      console.log("in catch block");
      console.log(error);
    }
  }

  async login() {
    const getUsers = await fetch(`${BASE_URL}/users`);
    const users = await getUsers.json();

    const doesUserExits = users.find((user) => user.email === this.email);

    if (!doesUserExits) {
      return {
        statusCode: 404,
        message: "email or password incorrect",
        data: "",
      };
    }

    if (this.password !== doesUserExits.password) {
      return {
        statusCode: 404,
        message: "email or password incorrect",
        data: "",
      };
    }

    return {
      statusCode: 200,
      message: "logged in successfully",
      data: doesUserExits,
    };
  }
}

export { Authentication };