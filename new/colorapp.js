"use strict";

const activeAcc = JSON.parse(localStorage.getItem("Active"));
const headermsg = document.querySelector("h1");
const logoutBtn = document.querySelector(".logout");
const wrdBtn = document.querySelector(".word-btn");
const wrdInput = document.querySelector(".user-word-input");
const colorWrd = document.querySelector(".color-word");
const colorInput = document.querySelector(".color-input");

//Colors

// const red = document.querySelector(".red");
// const orange = document.querySelector(".orange");
// const yellow = document.querySelector(".yellow");
// const green = document.querySelector(".green");
// const blue = document.querySelector(".blue");
// const indigo = document.querySelector(".indigo");
// const violet = document.querySelector(".violet");

const colors = [
  document.querySelector(".red"),
  document.querySelector(".orange"),
  document.querySelector(".yellow"),
  document.querySelector(".green"),
  document.querySelector(".blue"),
  document.querySelector(".indigo"),
  document.querySelector(".violet"),
];

const changer = function (el) {
  console.log(el.classList);
  el.style.color = "red";
  // el.addEventListener("click",function(){
  // })
};
colors.forEach((color) => color.addEventListener("click", changer(color)));

const initLogin = function () {
  const activeAcc = JSON.parse(localStorage.getItem("Active"));
  console.log(activeAcc);
  headermsg.style.fontSize = "50px";
  headermsg.textContent = `Welcome Back ${activeAcc.userName}`;
};
initLogin();

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("Active");
  window.location.href = "index.html";
});

wrdBtn.addEventListener("click", function () {
  console.log("Clicked");
  colorWrd.textContent = wrdInput.value;
});

// colorInput.addEventListener()
