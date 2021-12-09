# Project-Atelier

Overview:

Project Atelier comprises a complete redesign of the retail portal designed to modernize the site and improve sale numbers.

-----------------------------------------------------------------------------------------------------------------------------

New Brand / Name
New Color Scheme

Page Performance:
- Time to First Paint: 0.8 sec
- Time to First Meaningful Paint: 2.0 sec
- Time to Interactive: 2.5 sec

Modules:
- Product Overview
- Ratings & Reviews
- Questions & Answers
- Related Items & Outfit Creation

Product Overview:
- Image Gallery
    - Largest piece of the module
    - Shows images of the product and the corresponding style that is selected currently
    - Selecting a new style renders new images for that style
    - Allows browsing and zooming in to the photos
    - Gallery is to be viewable in two states:
        - Default: Collapsed view
            - Single main image, overlaid by list of thumbnail images
            - First image is default as the main image
            - If new style is selected, index of image currently selected show be same when gallery updates
            - Thumbnail of main image is to highlighted to indicate selection
            - Clicking on currently selected has no effect
            - Max 7 thumbnail images will be displayed at a given time
            - If more than 7, user should be able to scroll forward and backward through the thumbnails.
                - Arrow button allows scrolling
            - Arrow buttons on the main image changes the currently selected as well and updates accordingly
            - If reaching end of 7 images, clicking on the arrows in the main image scrolls the thumbnail images as well as updating the main image.
            - Hovering over the main image changes the cursor to a magnifying glass. Clicking at this stage changes to the expanded view.
            - No left arrow when main image is first image, and no right arrow when main image is last image of the list.
        - Expanded view
            - Overlays the rest of the item detail page.
            - Consists of a main image and spans the entire screen.
            - Offers the left and right arrows if applicable and has the same functions.
            - Icons are shown instead of thumbnails
            - Clicking on main image zooms the image by 2.5 times.
            - Hovering over the main image (excluding the arrows) changes cursor to a “+”
            - Zoomed image should correspond to where the cursor has clicked. Moving the cursor pans the zoomed image to the corresponding direction.
            - While zoomed, no arrows or thumbnail selection icons are displayed. Mouse should become a “-“ symbol. Clicking the image at this state will zoom the image out back to the default expanded image gallery view.
- Product Info
    - Star Rating 
        - Average rating based on reviews
        - By every quarter of a star
        - “Read All Reviews” Anchor to the R&R Module with no. of reviews
    - Product Category
    - Product Title
    - Price
        - Updates dynamically with style selected with a default style selected
    - Product Overview
    - A Star to indicate a “My Outfit” item
- Style Selector
    - No limit to no. of styles
    - Rows of 4
    - Default is first in the list
    - Thumbnails are shown and clicked to be changed to specific style
    - Product always has more than one style
    - One style at a time, and a style must be selected at all times
- Add to Cart
    - Two dropdowns:
        - Size
            - Shows sizes that are in stock and if the product itself is in stock
            - If no stock for current product, displays “OUT OF STOCK”
            - Default: “Select Size”
        - Quantity
            - Options range from 1 to maximum
            - Max is capped at 15, but decreases depending on how many is in stock.
            - When size is selected, dropdown defaults to 1.
        - Add to Cart
            - Places style, size, and quantity of product into the user’s cart.
            - If “Select Size” is selected, opens the size dropdown and message above dropdown states “Please select size.”
            - If no stock, button is hidden.
            - If valid size and quantity are selected, adds the product to cart.
