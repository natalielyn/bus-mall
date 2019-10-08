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

var ProductImage = function(product, imgURL) {
  this.product = product;
  this.clicks = 0;
  this.timeshown = 0;
  this.imgURL = imgURL;

  ProductImage.allProducts.push(this);

}

ProductImage.allProducts = [];

//HELPER FUNCTIONS
var renderNewImages = function(leftIndex, middleIndex, rightIndex) {
  leftImage.src = ProductImage.allProducts[leftIndex].imgURL;
  middleImage.src = ProductImage.allProducts[middleIndex].imgURL;
  rightImage.src = ProductImage.allProducts[rightIndex].imgURL;
};

var randomProduct = function() {
  return Math.ceil(Math.random() * ProductImage.allProducts.length -1);
}

var pickNewProduct = function(){ 
  var leftIndex = randomProduct ();

  do {
    var middleIndex = randomProduct ();
  } while (middleIndex === leftIndex);
 
  do {
    var rightIndex = randomProduct();
  } while (rightIndex === leftIndex || rightIndex === middleIndex);

  leftImgOnPage = ProductImage.allProducts[leftIndex];
  middleImgOnPage = ProductImage.allProducts[middleIndex];
  rightImgOnPage = ProductImage.allProducts[rightIndex];

  renderNewImages(leftIndex, middleIndex, rightIndex);
};


//EVENT HANDLER 
var handleClickOnImg = function(event){
console.log ('im working');
  if(totalClicks < totalRounds ) {
    var imageClicked = event.target;
    var id = imageClicked.id;

    if(id === 'left_image' || id === 'middle_image'  || id === 'right_image'){
      if (id === 'left_image'){
         leftImgOnPage.clicks ++;
      };
      if (id === 'middle_image') {
        middleImgOnPage.clicks ++;
      };
      if(id === 'right_image'){
        rightImgOnPage.clicks ++;
      };

      leftImgOnPage.timeshown ++;
      middleImgOnPage.timeshown ++;
      rightImgOnPage.timeshown ++;
    
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
    for (var i = 0; i < ProductImage.allProducts.length; i++){
      var resultItem = document.createElement ('li');
      resultItem.textContent = `${ProductImage.allProducts[i].name} was clicked ${ProductImage.allProducts[i].timesClicked} times, and shown ${ProductImage.allProducts[i].timesShown} times`;
      resultsList.appendChild(resultItem);
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
