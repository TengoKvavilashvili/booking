const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();

let ticketPrice = +movieSelect.value;

// ფუნქცია შერჩეული ადგილების შესანახად localStorage-ში

function setSeatsData(seatsIndex) {
   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
 }

// ფუნქცია LocalStorage-დან შერჩეული ადგილების გადმოსატვირთად

function populateUI() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
 
   if (selectedSeats !== null && selectedSeats.length > 0) {
     seats.forEach((seat, index) => {
       if (selectedSeats.indexOf(index) > -1) {
         seat.classList.add('selected');
       }
     });
   }
 
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if (selectedMovieIndex !== null) {
     movieSelect.selectedIndex = selectedMovieIndex;
   }
 }
// არჩეული ადგილების რაოდენობისა და მთლიანი ღირებულების განახლების ფუნქცია

function updateSelectedCount() {
   const selectedSeats = document.querySelectorAll('.row .seat.selected');
 
   const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
 
   localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
   setSeatsData(seatsIndex);
 
   const selectedSeatsCount = selectedSeats.length;
   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
 }

// ადგილის შერჩევის ფუნქცია

function seatClickHandler() {
   if (this.classList.contains('occupied')) {
     return;
   }
 
   this.classList.toggle('selected');
 
   updateSelectedCount();
 }
 

// ფილმის შერჩევის ფუნქცია
function movieChangeHandler() {
   ticketPrice = +this.value;
   updateSelectedCount();
 }
// ადგილების შერჩევა
seats.forEach((seat) => {
   seat.addEventListener('click', seatClickHandler);
 });

//ფილმის შეცვლა
movieSelect.addEventListener('change', movieChangeHandler);

//მთლიანი ღირებულება შერჩეული ადგილების მიხედვით

updateSelectedCount();