'use strict';

//GLOBAL VARIABLES
var imageSectionTag = document.getElementById('imageDiv');
var leftImage = document.getElementById('left_img');
var middleImage = document.getElementById('middle_img');
var rightImage = document.getElementById('right_img');
var totalClicks = 0;


var rightImgOnPage = null;
var middleImgOnPage = null;
var leftImgOnPage = null;

var ProductImage = function(product, imgURL) {
  this.product = product;
  this.clicks = 0;
  this.timeshown = 0;
  this.imgURL = imgURL;

  ProductImage.allImages.push(this);

}

ProductImage.allImages = [];

//HELPER FUNCTIONS
var renderNewImages = function(leftIndex, middleIndex, rightIndex) {
  leftImage.src = ProductImage.allImages[leftIndex].imgURL;
  middleImage.src = ProductImage.allImages[middleIndex].imgURL;
  rightImage.src = ProductImage.allImages[rightIndex].imgURL;
};

var pickNewProduct = function(){
  //PICK A NEW PRODUCT  
  var leftIndex = Math.ceil(Math.random() * ProductImage.allImages.length -1);
  var middleIndex = Math.ceil(Math.random() * ProductImage.allImages.length -1);
  do {
    var rightIndex = Math.ceil(Math.random () * ProductImage.allImages.length -1);
  } while ( rightIndex === middleIndex === leftIndex);

  leftImgOnPage = ProductImage.allImages[leftIndex];
  middleImgOnPage = ProductImage.allImages[middleIndex];
  rightImgOnPage = ProductImage.allImages[rightIndex];
}


//EVENT HANDLER 
var handleClickOnImg = function(event){

  if(totalClicks < 10 ) {
    var imageClicked = event.target;
    var id = imageClicked.id;

    if(id === 'left_image' || id === 'middle_image'  || id === 'right_image'){
      if (id === 'left_image'){
         leftImgOnPage.clicks ++;
      }
      if (id === 'middle_image') {
        middleImgOnPage.clicks ++;
      if(id === 'right_image'){
        rightImgOnPage.clicks ++;
      }

      leftImgOnPage.timeshown ++;
      middleImgOnPage.timeshown ++;
      rightImgOnPage.timeshown ++;
    
      pickNewProduct();

      }
    }
    totalClicks ++;
    if(totalClicks === 10) {
      imageSectionTag.removeEventListener('click', handleClickOnImg)
      console.log('You have voted on 20 products, thanks!');
    }
  };

  imageSectionTag.addEventListener('click', handleClickOnImg);

}

new ProductImage('Starwars Rollerboard', './img/bag.jpg')
new ProductImage('Banana Cutter', './img/banana.jpg')
new ProductImage('Bathroom', './img/bathroom')
new ProductImage('boots', './img/boots.jpg' )
new ProductImage('breakfast', './img/breakfast.jpg' )
new ProductImage('bubblegym', './img/bubblegum.jpg' )
new ProductImage('chair', './img/chair.jpg' )
new ProductImage('cthulehe', './img/cthulhe.jpg' )
new ProductImage('dog-duck', './img/dog-duck.jpg' )
new ProductImage('dragon', './img/dragon.jpg' )
new ProductImage('pen', './img/pen.jpg' )
new ProductImage('petsweep', './img/pet-sweep.jpg' )
new ProductImage( 'scissors', './img/scissors.jpg' )
new ProductImage('shark', './img/shark.jpg' )
new ProductImage('sweep', './img/sweep.png' )
new ProductImage('tauntaun', './img/tauntaun.jpg' )
new ProductImage('unicorn', './img/unicorn.jpg' )
new ProductImage('usb', './img/usb.gif')
new ProductImage('water-can', './img/water-can.jpg' )
new ProductImage('wine-glass', './img/wine-glass.jpg' )


pickNewProduct();
