// Client facing scripts here

// function for creating new tweet element

$(document).ready(() => {
  console.log('jquery loaded')
  const addNewItem = function(item) {

    const $item = $(`
      <div class="layout">
      <h2>${item.title}</h2>
      <img src="${item.item_photo_url}" />
      <h2>$${item.price}</h2>
      <p>${item.description}</p>
      <div class="button2">
      <button class="button">Favourite</button>
      <button class="button">Buy</button>
      <button class="button">View</button>
      </div>`);
    return $item;
  };

  // render all items on page
  const renderItems = function(itemJSON) {
    let itemsArr = itemJSON.items;

    $('.items-grid').empty();

    for (let item of itemsArr) {
      let $item = addNewItem(item);
      $('.items-grid').append($item);
    }
  };

  // get items to render
  const loadItems = function() {
    $.ajax('/api/items/', { method: 'GET' })
      .then(function(items) {
        renderItems(items);
      })
      .catch(function(err) { console.error(err); });
  };


  //show user's uploaded items
  //currently hard coded to user 3
  const loadMyItems = function() {
    $.ajax('/api/myitems', { method: 'GET' })
      .then(function(myItems) {
        renderItems(myItems);
      })
      .catch(function(err) { console.error(err); });
  };

  const loadFavItems = function() {
    $.ajax('/api/favourites/', { method: 'GET' })
      .then(function(favItems) {
        renderItems(favItems);
      })
      .catch(function(err) { console.error(err); });
  };

  $("#my_items").click(function(event) {
    loadMyItems();
  });


  // show favourite items for user
  // THIS ASSUMES USER_ID IS = 1, NEED TO ADD FURTHER IMPLEMENTATION

  $("#show_favourites").click(function(event) {
    loadFavItems();
  });

  // MESSY code - we need to clean up locations of things at some point
  $("#item-filter-form").submit(function(event) {
    event.preventDefault();

    let minPrice = $("#item-filter-form").find("#min-price").val();
    let maxPrice = $("#item-filter-form").find("#max-price").val();

    // form validation: if form isn't correct, alert error, else clear errors and submit
    if (minPrice < 0 || maxPrice < 0) {
      $("#submit-errors").text(
        "Price filters must be 0 or greater"
      );
    } else {
      //clear errors
      $("#submit-errors").text("");

      console.log("this inside app.js form code", $(this));
      const data = $(this).serialize();
      console.log("data inside app.js form code", data);

      $.ajax({
        type: "POST",
        url: "/api/items/filter",
        data: data,
        datatype: "query",
      })
        .done(function(responseData) {
          console.log("success: ", responseData);
          loadItems();

          //reset new tweet form text field
          $("#item-filter-form").find("#min-price").val("");
          $("#item-filter-form").find("#max-price").val("");
        })
        .fail(function(errorData) {
          console.log("fail: ", errorData);
        });
    }
  });

  loadItems();
});




