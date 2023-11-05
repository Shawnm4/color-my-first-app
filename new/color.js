"use strict";

// const user = localStorage.getItem("user");
// console.log(JSON.parse(user));

//BTNS
const createBtn = document.querySelector(".create-btn");
const loginBtn = document.querySelector(".login-btn");
const btns = document.querySelectorAll(".btn");
const createWindowBtn = document.querySelector(".create-window-btn");
const leaveCreateWindowBtn = document.querySelector(".x");
// Containers
const leftSide = document.querySelector(".left-container");
const nav = document.querySelector("nav");
const createWindow = document.querySelector(".create-window");
const rightSide = document.querySelector(".right-container");
const firstLoadScreen = document.querySelector(".first-load-screen");
// INPUT FIELDS;
const loginUserPass = document.querySelector(".password-input");
const userNameInput = document.querySelector(".create-user-input");
const phoneNumberInput = document.querySelector(".create-number-input");
const createPassInput = document.querySelector(".create-pass-input");
const createEmailInput = document.querySelector(".create-email-input");
const loginUserInput = document.querySelector(".username-input");
// ERROR MESSAGES;
const userDoesNotExist = document.querySelector(".error-message");
const userErrorMessage = document.querySelector(".user-error-msg");
const numErrorMessage = document.querySelector(".num-error-msg");
const passErrorMessage = document.querySelector(".pass-error-msg");
const emailErrorMessage = document.querySelector(".email-error-msg");



const biggerBtn = function () {
  this.style.height = parseFloat(getComputedStyle(this).height) + 10 + "px";
  this.style.width = parseFloat(getComputedStyle(this).width) + 10 + "px";
};
const smallerBtn = function () {
  this.style.height = parseFloat(getComputedStyle(this).height) - 10 + "px";
  this.style.width = parseFloat(getComputedStyle(this).width) - 10 + "px";
};

btns.forEach((button) => button.addEventListener("mouseenter", biggerBtn));
btns.forEach((button) => button.addEventListener("mouseout", smallerBtn));

createBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createWindow.classList.remove("create-hidden");
  rightSide.classList.add("trans-class");
  leftSide.classList.add("trans-class");
  loginUserPass.setAttribute("disabled", true);
  loginUserInput.setAttribute("disabled", true);
  loginBtn.setAttribute("disabled", true);
  createBtn.setAttribute("disabled", true);
});

console.log(getComputedStyle(createWindow).opacity);

// ACCOUNT CREATION FUNCTIONS;

const isUserValid = function () {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const validUser = usernameRegex.test(userNameInput.value);
  console.log(validUser);
  if (validUser) {
    return true;
  }
  if (!validUser) {
    userNameInput.value = "";
    userErrorMessage.style.color = "red";
    userErrorMessage.textContent = "Invalid Username";
    return false;
  }
};

const isNumberValid = function () {
  const phoneRegex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  const validNum = phoneRegex.test(phoneNumberInput.value);
  if (validNum) {
    return true;
  }
  if (!validNum) {
    phoneNumberInput.value = "";
    numErrorMessage.style.color = "red";
    numErrorMessage.textContent = "Invalid Phone Number";
    return false;
  }
};

const isPassWordValid = function () {
  let password = createPassInput.value;
  const passwordRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const validPass = passwordRegex.test(password);
  console.log(validPass);
  if (validPass) {
    return true;
  }
  if (!validPass) {
    createPassInput.value = "";
    passErrorMessage.style.color = "red";
    passErrorMessage.textContent = "Invalid Password";
    return false;
  }
};

const isEmailValid = function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(createEmailInput.value);
  console.log(validEmail);
  if (validEmail) {
    return true;
  }
  if (!validEmail) {
    createEmailInput.value = "";
    emailErrorMessage.style.color = "red";
    emailErrorMessage.textContent = "Invalid Email";
    return false;
  }
};

const createAcc = function () {
  const user = isUserValid();
  const email = isEmailValid();
  const password = isPassWordValid();
  const number = isNumberValid();
  if (!localStorage.getItem("userInfo")) {
    if (email && user && password && number) {
      const userInfo = JSON.stringify([
        {
          userName: userNameInput.value,
          phoneNumber: phoneNumberInput.value,
          email: createEmailInput.value,
          password: createPassInput.value,
          accID: 0,
        },
      ]);
      localStorage.setItem("Active", JSON.stringify(userInfo));
      localStorage.setItem("userInfo", userInfo);
    }
  } else {
    if (
      JSON.parse(localStorage.getItem("userInfo")).find((acc) => {
        return acc.userName === userNameInput.value;
      })
    ) {
      userNameInput.value = "";
      userErrorMessage.style.color = "red";
      userErrorMessage.textContent = "Username Already Taken";
      return;
    } else {
      if (email && user && password && number) {
        const userInfo2 = {
          userName: userNameInput.value,
          phoneNumber: phoneNumberInput.value,
          email: createEmailInput.value,
          password: createPassInput.value,
        };
        const colorAccsParsed = JSON.parse(localStorage.getItem("userInfo"));
        console.log(colorAccsParsed);
        const highestId = colorAccsParsed.reduce((acc, curr) => {
          if (acc > curr.accID) return acc;
          else return curr.accID;
        }, 0);
        userInfo2.accID = highestId + 1;
        localStorage.setItem("Active", JSON.stringify(userInfo2));
        colorAccsParsed.push(userInfo2);
        localStorage.setItem("userInfo", JSON.stringify(colorAccsParsed));
        createWindow.classList.add("create-hidden");
        rightSide.classList.remove("trans-class");
        leftSide.classList.remove("trans-class");
        window.location.href = "colorpage.html";
      }
    }
  }
};
const closeCreateWindow = function () {
  createWindow.classList.add("create-hidden");
  rightSide.classList.remove("trans-class");
  leftSide.classList.remove("trans-class");
  createEmailInput.value =
    createPassInput.value =
    phoneNumberInput.value =
    userNameInput.value =
      "";
  userErrorMessage.textContent = "";
  numErrorMessage.textContent = "";
  emailErrorMessage.textContent = "";
  passErrorMessage.textContent = "";
  loginUserPass.removeAttribute("disabled");
  loginUserInput.removeAttribute("disabled");
  loginBtn.removeAttribute("disabled");
  createBtn.removeAttribute("disabled");
};

// export const test = "this is a test";
let curAcc;

const accLogin = function (e) {
  e.preventDefault();
  const accsArr = JSON.parse(localStorage.getItem("userInfo"));
  const doesExist = accsArr.find((acc) => {
    return acc.userName === loginUserInput.value;
  });
  if (!doesExist) {
    userDoesNotExist.style.color = "red";
    return (userDoesNotExist.textContent =
      "Cant Find An Account With That Username");
  } else {
    const activeAcc = accsArr.find((acc) => {
      return acc.userName === loginUserInput.value;
    });
    if (activeAcc.password === loginUserPass.value) {
      window.location.href = "colorpage.html";
      localStorage.setItem(`Active`, JSON.stringify(activeAcc));
    } else userDoesNotExist.style.color = "red";
    userDoesNotExist.textContent = "Incorrect Password";
  }
};

loginBtn.addEventListener("click", accLogin);
leaveCreateWindowBtn.addEventListener("click", closeCreateWindow);
createWindowBtn.addEventListener("click", createAcc);

const colorAccs = JSON.parse(localStorage.getItem("userInfo"));
// console.log(colorAccs);

const test = [7, 10, 3, 2, 4];

// console.log(colorAccs);

// console.log(colorAccs.at(0).accID);
// console.log(colorAccs.at(1).accID);

// const maxNum = test.reduce((acc, cur) => {
//   if (cur > acc) return cur;
//   else return acc;
// }, test.at(0));

// console.log(maxNum);

// const highestId = colorAccs.reduce((acc, curr) => {
//   if (acc > curr.accID) return acc;
//   else return curr;
// }, 0);
// console.log(highestId);

// // console.log(colorAccs[-1]);

// document.addEventListener("DOMContentLoaded", function () {
//   console.log("LOADED");
// });

// const theAcc = JSON.parse(localStorage.getItem("userInfo")).find((acc) => {
//   return acc.userName === "Senjusk";
// });
// console.log(theAcc);
