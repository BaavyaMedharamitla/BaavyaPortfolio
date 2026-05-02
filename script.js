const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const cursor = document.getElementById("butterfly-cursor");
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const hero = document.querySelector(".hero");

/* =========================
TAB TITLE
========================= */

const defaultTitle = "Baavya Medharamitla | Interactive Portfolio";

document.addEventListener("visibilitychange", () => {
document.title = document.hidden
? "Come Back | The Butterfly Awaits"
: defaultTitle;
});

/* =========================
LOADER
========================= */

window.addEventListener("load", () => {
const loader = document.getElementById("loader");
if(loader){
loader.style.opacity = "0";
setTimeout(() => loader.remove(), 700);
}
});

/* =========================
THEME TOGGLE
========================= */

const savedTheme = localStorage.getItem("theme") || "dark-mode";
body.classList.add(savedTheme);

themeToggle.addEventListener("click", () => {

if(body.classList.contains("dark-mode")){
body.classList.replace("dark-mode","light-mode");
localStorage.setItem("theme","light-mode");
}else{
body.classList.replace("light-mode","dark-mode");
localStorage.setItem("theme","dark-mode");
}

});

/* =========================
BUTTERFLY CURSOR
========================= */

document.addEventListener("mousemove", e => {

cursor.style.left = `${e.clientX}px`;
cursor.style.top = `${e.clientY}px`;

});

document.querySelectorAll("a, button, .magnetic").forEach(el => {

el.addEventListener("mouseenter", () => {
cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
});

el.addEventListener("mouseleave", () => {
cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

});

/* =========================
MAGNETIC EFFECT
========================= */

document.querySelectorAll(".magnetic").forEach(item => {

item.addEventListener("mousemove", function(e){

const rect = this.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

this.style.transform = `translate(${x*0.12}px, ${y*0.12}px)`;

});

item.addEventListener("mouseleave", function(){
this.style.transform = "translate(0,0)";
});

});

/* =========================
REVEAL SCROLL
========================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("active");
}
});

},{threshold:0.15});

reveals.forEach(el => observer.observe(el));

/* =========================
PARTICLE BACKGROUND
========================= */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
x:null,
y:null,
radius:180
};

let particles = [];

document.addEventListener("mousemove", e => {
mouse.x = e.x;
mouse.y = e.y;
});

class Particle{

constructor(){
this.reset();
}

reset(){
this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;
this.baseX = this.x;
this.baseY = this.y;
this.size = Math.random()*2+1;
this.density = Math.random()*30+8;
}

draw(){

const theme = body.classList.contains("light-mode")
? "113,89,255"
: "159,123,255";

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fillStyle = `rgba(${theme},0.6)`;
ctx.fill();
}

update(){

let dx = mouse.x-this.x;
let dy = mouse.y-this.y;

let distance = Math.sqrt(dx*dx+dy*dy);

if(distance < mouse.radius){

let force = (mouse.radius-distance)/mouse.radius;

let directionX = dx/distance;
let directionY = dy/distance;

this.x -= directionX*force*this.density;
this.y -= directionY*force*this.density;

}else{

this.x -= (this.x-this.baseX)/12;
this.y -= (this.y-this.baseY)/12;

}

}
}

function initParticles(){

particles = [];

for(let i=0;i<220;i++){
particles.push(new Particle());
}

}

initParticles();

function connectParticles(){

const theme = body.classList.contains("light-mode")
? "113,89,255"
: "159,123,255";

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx = particles[a].x-particles[b].x;
let dy = particles[a].y-particles[b].y;

let distance = dx*dx+dy*dy;

if(distance<8000){

ctx.strokeStyle = `rgba(${theme},0.04)`;
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}
}
}
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.update();
p.draw();
});

connectParticles();

requestAnimationFrame(animate);

}

animate();

/* =========================
RESIZE
========================= */

window.addEventListener("resize", () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initParticles();
});

/* =========================
HERO PARALLAX
========================= */

document.addEventListener("mousemove", e => {

const x = (window.innerWidth/2 - e.clientX)/80;
const y = (window.innerHeight/2 - e.clientY)/80;

hero.style.transform = `translate(${x}px,${y}px)`;

});

/* =========================
ACTIVE NAV
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", ()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 200;

if(scrollY >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(link=>{

link.style.color = "";

if(link.getAttribute("href") === `#${current}`){
link.style.color = "var(--primary)";
}

});

});