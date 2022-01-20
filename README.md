# Project-Atelier

## Overview

Project Atelier comprises a complete redesign of the retail portal designed to modernize the site and improve sale numbers.

## Table of Contents

- [ProductOverview] (#productoverview)
    - [Modules] (#modules)
    - [Description] (#description)
        - [ProductOverview] (#productoverview)
        - [Ratings&Reviews] (#ratings&reviews)
        - [Questions&Answers] (#questions&answers)
        - [RelatedItems&Comparison] (#relateditems&comparison)
- [Installation] (#installation)
    - [Scripts] (#scripts)
- [Contributors] (#contributors)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Product Overview

### Modules
- Product Overview
- Ratings & Reviews
- Questions & Answers
- Related Items & Outfit Creation
### Description

#### Product Overview

The Overview module will be the top-most module on the Product Detail page.  The functionality contained within this module can be divided into several pieces:
- Image gallery
- Product information
- Style selector
- Add to cart

This component will guide the customer through selecting a specific style and size to add to their cart.   As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

#### Ratings & Reviews

The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces:
- Write new review
- Reviews List
- Sorting
- Rating Breakdown
- Product Breakdown

This component will extend the ability to write, read, and browse through reviews for the current product.

All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

#### Questions & Answers

The Questions & Answers module will allow asking and answering of questions for the product selected.  The functionality contained within this module can be divided into several pieces:
- View questions
- Search for a question
- Asking a question
- Answering a question

This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.

All questions will be asked and answered per product.  Specific styles will not be accounted for within the Questions & Answers module.

#### Related Items & Comparison

The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Installation

You will need Git and Node.js installed to continue.

```bash
# Clone this repository
$ git clone https://github.com/rpp32-fec-morel/Project-Atelier.git

# Go into the repository
$ cd project-atelier

# Install dependencies
$ npm install

# Run webpack
$ npm run build

# Run App
$ npm start

# Access a local copy
// Head to your browser -> localhost:3000
```

### Scripts

`npm run build` = Runs Webpack with a watch flag to continuously be watching for any changes in the files

`npm start` = Runs Nodemon for our server index.js file

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Contributors (in Alphabetical Order)

<p>
  :boy: <b>Ash Tsai</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ashtsai14">@divyabhagavathiappan</a> <br>

  :woman: <b>Jenya Rusinova</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/jenrusinova">@divyabhagavathiappan</a> <br>

  :boy: <b>Peter Park</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ppark051191">@divyabhagavathiappan</a> <br>

  :boy: <b>Yanlin Ye</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/a244629128">@divyabhagavathiappan</a> <br>
</p>
