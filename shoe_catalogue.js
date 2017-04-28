//*********Targeting my html elements
var picDiv = document.querySelector(".slidediv");
var addButton = document.querySelector("#addButton");
var shoesCat = document.querySelector(".shoesCat");
var overlay = document.querySelector(".overlay");
var closeicon = document.querySelector(".closeicon");
var cancelUploading = document.querySelector("#cancelButton");
var uploading = document.querySelector("#uploadButton");
var shoesCat = document.querySelector('.shoesCat');

//**********My array of objects

var shoes = [{
        image: 'newbalanceNavy.jpg',
        brand: 'New balance',
        color: 'Navy',
        size: '7',
        in_stock: 5,
        price: 2000
    },
    {
        image: 'nikeblack.jpg',
        brand: 'Nike',
        color: 'Black',
        size: '9',
        in_stock: 3,
        price: 1500
    },
    {
        image: 'pumawhite.jpg',
        brand: 'Puma',
        color: 'White',
        size: '6',
        in_stock: 4,
        price: 1000
    },
    {
        image: 'adidasgreen.jpg',
        brand: 'Adidas',
        color: 'Green',
        size: '8',
        in_stock: 7,
        price: 1200
    },
    {
        image: 'newbalancebrown.jpeg',
        brand: 'New balance',
        color: 'Brown',
        size: '7',
        in_stock: 3,
        price: 800
    },
    {
        image: 'jordangreen.png',
        brand: 'Jordan',
        color: 'Green',
        size: '6',
        in_stock: 8,
        price: 1500
    },
    {
        image: 'adidasblack.jpg',
        brand: 'Adidas',
        color: 'Black',
        size: '8',
        in_stock: 2,
        price: 1900
    },
    {
        image: 'lacostemaroon.jpg',
        brand: 'Lacoste',
        color: 'Maroon',
        size: '7',
        in_stock: 3,
        price: 1500
    },
];

//Compiling and rendering my shoe display
var myTemplate = document.querySelector("#myTemplate").innerHTML;
var myTemplateInstance = Handlebars.compile(myTemplate);
var iziphumo = myTemplateInstance({
    shoe: shoes
});
shoesCat.innerHTML += iziphumo;

//**********Compiling and rendering the population of my dropdown option values
var myFilterTemplate = document.querySelector("#myFilterTemplate").innerHTML;
var myFilterTemplateInstance = Handlebars.compile(myFilterTemplate);

var brandsNames = [];
var colorsNames = [];
var sizesNumbers = [];

var brandMap = {};
var colorMap = {};
var sizeMap = {};

//**********Creating a unique dynamic list on my dropdowns. If an name is there it mustnt be added
var dynamicPopulation = function() {
    for (var x = 0; x < shoes.length; x++) {
        var shoeData = shoes[x];

        if (brandMap[shoeData.brand] === undefined) {
            brandMap[shoeData.brand] = shoeData.brand;
            brandsNames.push(shoeData.brand);
        }

        if (brandMap[shoeData.color] === undefined) {
            brandMap[shoeData.color] = shoeData.color;
            colorsNames.push(shoeData.color);
        }

        if (brandMap[shoeData.size] === undefined) {
            brandMap[shoeData.size] = shoeData.size;
            sizesNumbers.push(shoeData.size);
        }
    }
}
dynamicPopulation();

//********** Rendering my template
var FilterResults = myFilterTemplateInstance({
    brandFilter: brandsNames,
    colorFilter: colorsNames,
    sizeFilter: sizesNumbers
});
document.querySelector('.filterdiv').innerHTML = FilterResults;

//*********Targeting my html elements
var brandSelect = document.querySelector(".brandsSelect");
var colorSelect = document.querySelector(".colorsSelect");
var sizeSelect = document.querySelector(".sizesSelect");


//********** A function to make my cover pic dissaper when the the seach button is pressed
var searchItems = function() {
    picDiv.style.display = "none";
    shoesCat.style.display = "block";

    shoesCat.innerHTML = myTemplateInstance({
        shoe: brandFiltering(brandSelect.value),
        shoe: colorFiltering(colorSelect.value),
        shoe: sizeFiltering(sizeSelect.value)
    });
}

//**********function to show my overlay div when the add button is pressed
var addAnItem = function() {
    overlay.style.display = "block";
}

//**********Function to close my overlay div when the cancel or x icon is pressed
var cancelAddingItems = function() {
    if (overlay.style.display = "block") {
        overlay.style.display = "none";
    }
}

//**********A function to upload new items, take values added and push it into array of objects
var uploadItems = function() {
    //*********updating my catalogue with taking the ipnut values and push it into shoe array of objects
    shoes.push({
        image: document.querySelector("#inputImage").value,
        brand: document.querySelector("#inputBrand").value,
        color: document.querySelector("#inputColor").value,
        size: document.querySelector("#inputSize").value,
        in_stock: document.querySelector("#inputInStock").value,
        price: document.querySelector("#inputPrice").value
    });


    dynamicPopulation();

    //*********re-rendering my filters with updates
    var FilterResults = myFilterTemplateInstance({
        brandFilter: brandsNames,
        colorFilter: colorsNames,
        sizeFilter: sizesNumbers
    });
    document.querySelector('.filterdiv').innerHTML = FilterResults;

    //*********clear all my input boxes
    document.querySelector("#inputImage").value = '';
    document.querySelector("#inputBrand").value = '';
    document.querySelector("#inputColor").value = '';
    document.querySelector("#inputSize").value = '';
    document.querySelector("#inputInStock").value = '';
    document.querySelector("#inputPrice").value = '';

    //********** closing my overlay div
    overlay.style.display = "none";
}


//********** Filtering my brands
function brandFiltering(selectedBrand) {
    var brandSearchResults = [];


    if (selectedBrand == "All brands")
        return shoes;

    for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].brand === selectedBrand) {
            brandSearchResults.push(shoes[i])
        }

    }
    //console.log(brandSearchResults);

    return brandSearchResults;
}
brandFiltering(brandSelect.value);

//********** Filtering my color
function colorFiltering(selectedColor) {
    var colorSearchResults = [];


    if (selectedColor == "All colors")
        return shoes;

    for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].color === selectedColor) {
            colorSearchResults.push(shoes[i])
        }

    }
        //console.log(colorSearchResults);
        return colorSearchResults;
}
colorFiltering(colorSelect.value);

//********** Filtering my size
function sizeFiltering(selectedSize) {
    var sizeSearchResults = [];


    if (selectedSize == "All sizes")
        return shoes;

    for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].size === selectedSize) {
            sizeSearchResults.push(shoes[i])
        }

    }
    console.log(sizeSearchResults);
    return sizeSearchResults;
}
sizeFiltering(sizeSelect.value);


//********** Listening to any event that happens on my webpage
addButton.addEventListener("click", addAnItem);
cancelUploading.addEventListener("click", cancelAddingItems);
closeicon.addEventListener("click", cancelAddingItems);
uploading.addEventListener("click", uploadItems);
//brandSelect.addEventListener("change", shoeFiltering);
//colorSelect.addEventListener("change", colorFiltering);
//sizeSelect.addEventListener("change", sizeFiltering);
var searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchItems);
