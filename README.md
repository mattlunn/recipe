# Getting started...

 1. Checkout the repository

        git clone https://github.com/mattlunn/recipe.git

 2. Install dependencies

        cd recipe && npm install

 3. Create the `config` file

        cp config/config-sample.json config/config.json && vim config/config.json

 4. Scaffold some data (if desired)

         node scripts/scaffold

 5. Start the app

         node main.js

# Testing

 1. You'll need mocha installed globally

         sudo npm install -g mocha

 2. Install dev dependencies

         npm install --dev

 3. Run the test suite...

         npm test

# Linting

 1. You'll need jscs installed globally

        sudo npm install -g jscs

 2. Run the lint rules...

        npm lint

# Thoughts...

 1. In a productionised site, I'd have likely seen the need to create a "FoodItem" collection (name, image, calories, ...), and then have "Ingredient"
  remain a sub-document within "Recipe", albeit with a "food_item_id" relationship. I'd keep the "name" on the "Ingredient" (i.e. denormalize it from "FoodItem.name"),
  since the "name" is required all the time, and it'll save additional collection queries.

 2. I'd also minify the CSS and JS in the build step; likely using my own minifier ;)... https://github.com/mattlunn/mini-fier
 
 3. The search is currently case sensitive (e.g. "lemon" won't match "Lemon"). Storing a lower-cased version of the name, and matching against the lower-cased search term would be a solution to this (as the alternative is to search using case-insensitive RegEx search, which avoids indexes).

