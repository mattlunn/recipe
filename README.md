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

# Thoughts...

 1. In a productionised site, I'd have likely seen the need to create a "FoodItem" collection (name, image, calories, ...), and then have "Ingredient"
  remain a sub-document within "Recipe", albeit with a "food_item_id" relationship. I'd keep the "name" on the "Ingredient" (i.e. denormalize it from "FoodItem.name"),
  since the "name" is required all the time, and it'll save additional collection queries.

 2. I'd also minify the CSS and JS in the build step; likely using my own minifier ;)... https://github.com/mattlunn/mini-fier

