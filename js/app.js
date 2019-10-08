'use strict';

//GLOBAL VARIABLES
var imageSectionTag = document.getElementById('imageDiv');
var leftImage = document.getElementById('left_img');
var middleImage = document.getElementById('middle_img');
var rightImage = document.getElementById('right_img');
var totalClicks = 0;
var totalRounds = 25;
var rightImgOnPage = null;
var middleImgOnPage = null;
var leftImgOnPage = null;

var productArray = [
  ['bag', './img/bag.jpg'],
  ['banana', './img/banana.jpg'],
  ['bathroom', './img/bathroom.jpg'],
  ['boots', './img/boots.jpg'],
  ['breakfast', './img/breakfast.jpg'],
  ['bubblegum', './img/bubblegum.jpg'],
  ['chair', './img/chair.jpg'],
  ['cthulhu', './img/cthulhu.jpg'],
  ['dog-duck', './img/dog-duck.jpg'],
  ['dragon', './img/dragon.jpg'],
  ['pen', './img/pen.jpg'],
  ['pet-sweep', './img/pet-sweep.jpg'],
  ['scissors', './img/scissors.jpg'],
  ['shark', './img/shark.jpg'],
  ['sweep', './img/sweep.png'],
  ['tauntaun', './img/tauntaun.jpg'],
  ['unicorn', './img/unicorn.jpg'],
  ['usb', './img/usb.gif'],
  ['water-can', './img/water-can.jpg'],
  ['wine-glass', './img/wine-glass.jpg'],
];

var produceImages = function () {
  for (var i = 0; i < productArray.length; i++) {
    var product = productArray[i][0];
    var source = images[i][0];
    var data = new ProductImage(product, source);
  }
};

//CONSTRUCTOR FUNCTION***
var ProductImage = function(product, imgURL) {
  this.product = product;
  this.clicks = 0;
  this.timeshown = 0;
  this.imgURL = imgURL;

  ProductImage.allImages.push(this);

}

ProductImage.allImages = [];
console.log(ProductImage.allImages);

//PROTOTYPE ARRAY TO HOLD CLICK ITEMS **Inspired by Trevor

ProductImage.prototype.clicked = function(){
  this.clicks++;
};

ProductImage.prototype.totalTimesShown = function() {
  this.timeshown++;
};
//HELPER FUNCTIONS
//Renders random images to DOM
var renderNewImages = function(leftIndex, middleIndex, rightIndex) {
  leftImage.src = ProductImage.allImages[leftIndex].imgURL;
  middleImage.src = ProductImage.allImages[middleIndex].imgURL;
  rightImage.src = ProductImage.allImages[rightIndex].imgURL;
};
//Generates 3 images that can't be the same
var pickNewProduct = function() {
  var leftIndex = Math.ceil(Math.random() * ProductImage.allImages.length -1);
  
  do {
    var middleIndex = Math.ceil(Math.random() * ProductImage.allImages.length -1);
    var rightIndex = Math.ceil(Math.random() * ProductImage.allImages.length -1);
  } while(leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex);


  leftImgOnPage = ProductImage.allImages[leftIndex];
  middleImgOnPage = ProductImage.allImages[middleIndex];
  rightImgOnPage = ProductImage.allImages[rightIndex];

  renderNewImages(leftIndex, middleIndex, rightIndex);
};


//EVENT HANDLER 
var handleClickOnImg = function(event){
console.log ('im working');
  if(totalClicks < totalRounds ) {
    var imageClicked = event.target;
    var id = imageClicked.id;

    if(id === 'left_img' || id === 'middle_img'  || id === 'right_img'){
      if (id === 'left_img'){
         leftImgOnPage.clicked();
      };
      if (id === 'middle_img') {
        middleImgOnPage.clicked();
      };
      if(id === 'right_img'){
        rightImgOnPage.clicked();
      };

      leftImgOnPage.totalTimesShown();
      middleImgOnPage.totalTimesShown();
      rightImgOnPage.totalTimesShown();
    
      pickNewProduct();

      };
    };
    totalClicks ++;
    if(totalClicks === totalRounds) {
      imageSectionTag.removeEventListener('click', handleClickOnImg)
      console.log('You have voted on 20 products, thanks!');
      showFinalList();
    }
  };


  var showFinalList = function (){
 //This code was barrowed from Travis Skyles! 
    var resultsSection = document.getElementById('resultsSection');
    var resultsList = document.createElement('ul');
    resultsSection.appendChild(resultsList);
    for (var i = 0; i < ProductImage.allImages.length; i++){
      var resultItem = document.createElement ('li');
      resultItem.textContent = `${ProductImage.allImages[i].product} was clicked ${ProductImage.allImages[i].clicks} times, and shown ${ProductImage.allImages[i].timeshown} times`;
      resultsList.appendChild(resultItem);
      makeImageChart()
    }
  };

  imageSectionTag.addEventListener('click', handleClickOnImg);

new ProductImage('Starwars Rollerboard', './imgs/bag.jpg');
new ProductImage('Banana Cutter', './imgs/banana.jpg');
new ProductImage('Bathroom', './imgs/bathroom.jpg');
new ProductImage('boots', './imgs/boots.jpg' );
new ProductImage('breakfast', './imgs/breakfast.jpg' );
new ProductImage('bubblegym', './imgs/bubblegum.jpg' );
new ProductImage('chair', './imgs/chair.jpg' );
new ProductImage('cthulehe', './imgs/cthulhe.jpg' );
new ProductImage('dog-duck', './imgs/dog-duck.jpg' );
new ProductImage('dragon', './imgs/dragon.jpg' );
new ProductImage('pen', './imgs/pen.jpg' );
new ProductImage('petsweep', './imgs/pet-sweep.jpg' );
new ProductImage( 'scissors', './imgs/scissors.jpg' );
new ProductImage('shark', './imgs/shark.jpg' );
new ProductImage('sweep', './imgs/sweep.png' );
new ProductImage('tauntaun', './imgs/tauntaun.jpg' );
new ProductImage('unicorn', './imgs/unicorn.jpg' );
new ProductImage('usb', './imgs/usb.gif');
new ProductImage('water-can', './imgs/water-can.jpg' );
new ProductImage('wine-glass', './imgs/wine-glass.jpg' );


pickNewProduct();

//Generate a sample ChartJS chart

var genLabels = function(images) {
  var labelsArr = [];
  for (var i = 0; i < images.length; i++){
    labelsArr.push(images[i].product);
  };
  console.log(labelsArr);
  return labelsArr;
};

var genData = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].clicks);
  };
  console.log(dataArr);
  return dataArr
};

//myChart Function

function makeImageChart(){

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: genLabels(ProductImage.allImages),
    datasets: [{
      label: '# of Votes',
      data: genData(ProductImage.allImages),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
}
