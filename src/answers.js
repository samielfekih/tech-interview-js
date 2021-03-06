/**
 * We are building an e-commerce website.
 * Our customers can add articles to a virtual cart, purchase it,
 * and we deliver them to their home the next day.
 * The price they are charged with is the sum of the prices of every article
 * in their cart. Prices are expressed in cents.
 * @param {json} data See `./src/level1.json`
 * @return {object}   See `./src/__tests__/__snapshots/level1.js.snap`
 */
export function level1(data) {
  const articles = data.articles;
  const carts = data.carts;
  var result = {};
  result.carts = [];

  for (var i = 0; i<carts.length; i++){
    var carttotal = 0; //initialize cart total to 0
    //for each item in the cart, we need to look for the price and the quantity to calculate the cost
    for (var j = 0; j < carts[i].items.length; j ++){  
      for (var k = 0; k< articles.length; k++){
        if (carts[i].items[j].article_id == articles[k].id){ 
          carttotal = carttotal + carts[i].items[j].quantity * articles[k].price;
        }
      }
    }
    result.carts.push({id : carts[i].id, total : carttotal});
  }


  return result;
}

/**
 * The delivery cost depends on the amount of the customers' cart:
 * the more articles they purchase, the less we charge them.
 * @param {json} data See `./src/level2.json`
 * @return {object}   See `./src/__tests__/__snapshots/level2.js.snap`
 */
export function level2(data) {
  const articles = data.articles;
  const carts = data.carts;
  const deliveryFees = data.delivery_fees;

  var result = {};
  result.carts = [];

  for (var i = 0; i<carts.length; i++){
    var carttotal = 0; //initialize cart total to 0
    //for each item in the cart, we need to look for the price and the quantity to calculate the cost
    for (var j = 0; j < carts[i].items.length; j ++){  
      for (var k = 0; k< articles.length; k++){
        if (carts[i].items[j].article_id == articles[k].id){ 
          carttotal = carttotal + carts[i].items[j].quantity * articles[k].price;
        }
      }
    }
    // Calculate delivery fees
    for (var j = 0; j<deliveryFees.length ; j++){
      if (deliveryFees[j].eligible_transaction_volume.min_price <= carttotal) 
        if (deliveryFees[j].eligible_transaction_volume.max_price == null || 
          deliveryFees[j].eligible_transaction_volume.max_price > carttotal){
          carttotal = carttotal + deliveryFees[j].price;
          break;
        }
    }
    result.carts.push({id : carts[i].id, total : carttotal});
  }


  return result;
}

/**
* Some products are on discount because the marketing department made a deal
* with the supplier. There are two kinds of discounts:
* - a direct reduction of the article's price, e.g. you remove 50€
*   from your 300€ caviar tin and pay only 250€
* - a percentage reduction, e.g. you remove 20% from your 5€ fresh cream
*   and pay only 4€
* @param {json} data See `./src/level3.json`
* @return {object}   See `./src/__tests__/__snapshots/level3.js.snap`
 */
export function level3(data) {
  const articles = data.articles;
  const carts = data.carts;
  const deliveryFees = data.delivery_fees;
  const discounts = data.discounts;

  var result = {};
  result.carts = [];

  for (var i = 0; i<carts.length; i++){
    var carttotal = 0; //initialize cart total to 0
    //for each item in the cart, we need to look for the price and the quantity to calculate the cost
    for (var j = 0; j < carts[i].items.length; j ++){  
      for (var k = 0; k< articles.length; k++){
        if (carts[i].items[j].article_id == articles[k].id){
          var article_price = articles[k].price;

          // we check if there is a discount on the item and change the price if there is
          for (var l = 0; l < discounts.length ; l ++){
            if (discounts[l].article_id == articles[k].id){
              if (discounts[l].type == "amount")
                article_price = article_price - discounts[l].value;
              else if (discounts[l].type == "percentage")
                article_price =  Math.floor(article_price * (100 - discounts[l].value)/100);
            }
          }

          carttotal = carttotal + carts[i].items[j].quantity * article_price;
          
        }
      }
    }

    // Calculate delivery fees
    for (var j = 0; j<deliveryFees.length ; j++){
      if (deliveryFees[j].eligible_transaction_volume.min_price <= carttotal) 
        if (deliveryFees[j].eligible_transaction_volume.max_price == null || 
          deliveryFees[j].eligible_transaction_volume.max_price > carttotal){
          carttotal = carttotal + deliveryFees[j].price;
          break;
        }
    }
    result.carts.push({id : carts[i].id, total : carttotal});
  }




  return result;
}
