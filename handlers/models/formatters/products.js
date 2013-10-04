function null_formatter() {
  return null;
}

function individual_formatter(product) {
  return  { "_links": {
              "self": { "href": "/products/"  + product._id}
          },
          "productId": product.productId,
          "name": product.name,
          "description": product.description
  };
}

function list_formatter(products) {
  var templated_curie_path =  { "name": "en",
                                              "href": "http://example.com/docs/rels/{rel}",
                                              "templated": true
                                            };

  var hal_formatted = { "_links": {
              "self": { "href": "/products/" },
              "curies": { "name": "en",
                            "href": "http://example.com/docs/rels/{rel}",
                            "templated": true
                          }
          },
          "_embedded": {"en:product": []}
  };

  products.forEach(function(product) {
    hal_formatted._embedded["en:product"].push(individual_formatter(product));
  });


  return hal_formatted;
}

module.exports = {
  individual: individual_formatter,
  list: list_formatter,
  null: null_formatter
  };