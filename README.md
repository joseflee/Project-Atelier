# Project-Atelier

## Overview

Project Atelier comprises a complete redesign of the retail portal designed to modernize the site and improve sale numbers.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Product Description](#product-description)
- [License](#license)
- [Contributors](#contributors)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# Setup and Installation

You will need Git and Node.js installed to continue.

Additional information needed:
- Personal Access token with github



```bash
# Clone this repository
$ git clone https://github.com/rpp32-fec-morel/Project-Atelier.git

# Go into the repository
$ cd project-atelier

# Install dependencies
$ npm install

#Add Personal Access token to config.js file

# Run webpack
$ npm run build

# Run App
$ npm start

# Access a local copy
// Head to your browser -> localhost:3000
```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# Product Description

### Product consists of the following modules
- [Product Overview](#product-overview)
- [Ratings & Reviews](#ratings-and-reviews)
- [Questions & Answers](#questions-and-answers)
- [Related Items and Comparison](#related-items-and-comparison)
## Description

#### Product Overview

The Overview located at the top-most position of the page.  The functionality contained within this module can be divided into several pieces:
- Image gallery which displays the following:
    - Default Gallery
        - Displays main image as well as thumbnail images. 
        - Thumbnail images display at most 7 images or less. Up and Down arrows only appear if there are additional pictures to display.
        - Left and right arrows next to the main display image will displayed the previous/next image when clicked. A indicator in the thumbnail gallery will reflect which image is displayed.
    - Expanded Gallery
        - Displays a main image as well as thumbnail images.
        - Clicking main image will put all focus on the main image and hide everything else. Click the image again will bring up a magnifyer to view the displayed picture at 2.5x the zoom. Clicking again will bring the user back to the main view of the expanded gallery.
        - The left and right arrows will displayed the previous/next image. A indicator in the thumbnail gallery will reflect which image is displayed.
- Product information
    - Displays product info and slogan below the main display image.
    - The type of product, product name, and pricing is located to the right of the display image.
        - If product is on sale, the original price will be crossed out with a sale price displayed right next to it.
    - A clickable anchor for Reading reviews is located at the top left of the page.
- Style selector consists of the following:
    - Size Selector
        - Displays all available sizes of the current product. Disabled if no sizes are available.
    - Quantity Selector
        - Selector is disabled until a size is selected
    - Add to "My Outfit" button
        - Consister of a button with a outlined star
        - Clicking the button will add current product to my outfit carousel below. Star will change from outline to solid.
        - Clicking the button again will remove the current product from the outfit carousel. Star will change from solid to outlined.
    - Selectable Styles
        - All style options will be displayed in rows of 4. 
        - Clicking each style will update the image gallery with photos of the corresponding style.
        - A description of the selected style will be displayed above the style images.
- Add to cart
    - Add To Cart Button
        - Alerts the user that product has been "Added to Cart"

#### Ratings and Reviews

The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces:
- Write new review
- Reviews List
- Sorting
- Rating Breakdown
- Product Breakdown

This component will extend the ability to write, read, and browse through reviews for the current product.

All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

#### Questions and Answers

The Questions & Answers module will allow asking and answering of questions for the product selected.  The functionality contained within this module can be divided into several pieces:
- View questions
- Search for a question
- Asking a question
- Answering a question

This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.

All questions will be asked and answered per product.  Specific styles will not be accounted for within the Questions & Answers module.

#### Related Items and Comparison

The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### <a name="Contributors"></a> Contributors (in Alphabetical Order)

<p>
  :boy: <b>Ash Tsai</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ashtsai14">@ashtsai14</a> <br>

  :woman: <b>Jenya Rusinova</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/jenrusinova">@jenrusinova</a> <br>

  :boy: <b>Peter Park</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ppark051191">@ppark051191</a> <br>

  :boy: <b>Yanlin Ye</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/a244629128">@a244629128</a> <br>
</p>
