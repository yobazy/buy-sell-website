// Client facing scripts here

// function for creating new item
$(document).ready(() => {
  const addNewItem = function(item) {
    const $item = $(`
      <div class="layout">
      <h2>${item.title}</h2>
      <img src="${item.item_photo_url}" />
      <span class="artist-price">
        <p id="maker">Maker:${item.user_name}</p>
        <h2>$${item.price/100}</h2>
      </span>
      <p>${item.description}</p>
      <div class="button2">
      <button class="button">Favourite</button>
      <a href="mailto:${item.email}?subject=Interested in your ${item.title} avatar">Message Seller</a>
      <button class="button">View</button>
      </div>`);
    if(item.sold_status == true)  {
      $item.append('<h1>Sold Out!</h1>')
    }
    return $item;
  };

  const myItems = function(item) {
    const $myItem = $(`
      <div class="layout">
      <h2>${item.title}</h2>
      <img src="${item.item_photo_url}" />
      <span class="artist-price">
        <h2>$${item.price/100}</h2>
      </span>
      <p>${item.description}</p>
      <div class="button2">
      <button class="button">Mark as Sold</button>
      <button class="button">Delete</button>
      </div>`);
    return $myItem;
  };

  // render all items on page
  const renderItems = function(itemJSON) {
    let itemsArr = itemJSON.items;
    $('.items-grid').empty();

    for (let item of itemsArr) {
      let $item = addNewItem(item);
      $('.items-grid').append($item);
      $('.items-grid').append($(`<div class="item-spacer"></div>`))
    }
  };

  // render admin's items on page
  const renderMyItems = function(itemJSON) {
    let itemsArr = itemJSON.items;
    $('.items-grid').empty();

    for (let item of itemsArr) {
      let $item = myItems(item);
      $('.items-grid').append($item);
      $('.items-grid').append($(`<div class="item-spacer"></div>`))
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
  const loadMyItems = function() {
    $.ajax('/api/myitems', { method: 'GET' })
      .then(function(myItems) {
        renderMyItems(myItems);
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

  $('#item-filter-form').hide();

  $('#filter').on('click', () => {
    $('#item-filter-form').slideDown();
    return;
  });

  $('.cancel-filter').on('click', () => {
    $('#item-filter-form').slideUp();
    return;
  });

  // show favourite items for user
  // THIS ASSUMES USER_ID IS = 1, NEED TO ADD FURTHER IMPLEMENTATION

  $("#show_favourites").click(function(event) {
    loadFavItems();
  });

  // Even listener for price filter form submit button
  $("#item-filter-form").submit(function(event) {

    // prevent form from actually submitting
    event.preventDefault();

    // extract min and max prices from form
    let minPrice = $("#item-filter-form").find("#min-price").val();
    let maxPrice = $("#item-filter-form").find("#max-price").val();

    // form validation: if form isn't correct, alert error, else clear errors and submit
    if (minPrice < 0 || maxPrice < 0) {
      $("#submit-errors1").text(
        "Price filters must be 0 or greater"
      );
    } else {
      //clear errors
      $("#submit-errors1").text("");

      const data = $(this).serialize();

      // sent ajax request
      $.ajax({
        type: "POST",
        url: "/api/items/filter",
        data: data,
        datatype: "query",
      })

      // when receive response, re-render items list
      .done(function (responseData) {
        renderItems(responseData);
      })
      // if error, log error
      .fail(function (errorData) {
        console.log("fail: ", errorData);
      });
    }
  });

  loadItems();

});




