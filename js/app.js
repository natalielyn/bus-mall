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

// var productArray = [
//   ['bag', './imgs/bag.jpg'],
//   ['banana', './imgs/banana.jpg'],
//   ['bathroom', './imgs/bathroom.jpg'],
//   ['boots', './imgs/boots.jpg'],
//   ['breakfast', './imgs/breakfast.jpg'],
//   ['bubblegum', './imgs/bubblegum.jpg'],
//   ['chair', './imgs/chair.jpg'],
//   ['cthulhu', './imgs/cthulhu.jpg'],
//   ['dog-duck', './imgs/dog-duck.jpg'],
//   ['dragon', './imgs/dragon.jpg'],
//   ['pen', './imgs/pen.jpg'],
//   ['pet-sweep', './imgs/pet-sweep.jpg'],
//   ['scissors', './imgs/scissors.jpg'],
//   ['shark', './imgs/shark.jpg'],
//   ['sweep', './imgs/sweep.png'],
//   ['tauntaun', './imgs/tauntaun.jpg'],
//   ['unicorn', './imgs/unicorn.jpg'],
//   ['usb', './imgs/usb.gif'],
//   ['water-can', './imgs/water-can.jpg'],
//   ['wine-glass', './imgs/wine-glass.jpg'],
// ];



//CONSTRUCTOR FUNCTION***********************************
var ProductImage = function(product, imgURL) {
  this.product = product;
  this.imgURL = imgURL;
  this.clicks = 0;
  this.timeshown = 0;
  ProductImage.allImages.push(this);
};

ProductImage.allImages = [];


function  updateLocalStorage() {
  var arrString = JSON.stringify(ProductImage.allImages);
  localStorage.setItem('products', arrString);
}
//HELPER FUNCTIONS*************************************************
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


//EVENT HANDLER *****************************************************
var handleClickOnImg = function(event){
  if(totalClicks < totalRounds ) {
    var imageClicked = event.target;
    var id = imageClicked.id;

    if(id === 'left_img' || id === 'middle_img'  || id === 'right_img'){
      if (id === 'left_img'){
         leftImgOnPage.clicks++;
      };
      if (id === 'middle_img') {
        middleImgOnPage.clicks++;
      };
      if(id === 'right_img'){
        rightImgOnPage.clicks++;
      };

      leftImgOnPage.timeshown++;
      middleImgOnPage.timeshown++;
      rightImgOnPage.timeshown++;
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
      updateLocalStorage();
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
new ProductImage('cthulhu', './imgs/cthulhu.jpg' );
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
  return labelsArr;
};

var genDataClicks = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].clicks);
  };
  return dataArr
};

var genDataTime = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].timeshown);
  }
  return dataArr;
}



//MY CHART FUNCTION******************************************************

function makeImageChart(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: genLabels(ProductImage.allImages),
    datasets: [{
      label: 'Votes',
      data: genDataClicks(ProductImage.allImages),
      backgroundColor: [
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
      ],
      borderColor: [
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
      ],
      borderWidth: 1
    },
    {
      label: 'Appearances',
      data: genDataTime(ProductImage.allImages),
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderWidth: 1
    }
    ],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  }
});
}