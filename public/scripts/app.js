// Client facing scripts here

// function for creating new tweet element

$(document).ready(() => {
const addNewItem = function(item) {
  console.log(item);

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
  </div>`)
  return $item;
};

// render all items on page
const renderItems = function(itemJSON) {
  console.log(itemJSON)
  let itemsArr = itemJSON.items
  $('.items-grid').empty();
  for (let item of itemsArr) {
    console.log('item',item)
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
    .catch(function(err)  { console.error(err) });
};


// get item object from item_id
const getItemsByItemID = function(favId)  {
  $.ajax('/api/items/', { method: 'GET' })
    .then(function(items) {
      let allItems = items.items
      let arrOfFavs = []
      console.log('made it')
      console.log('all_items', allItems)
      // for each item
      for(let item of allItems) {
        if(item.id === favId) {
          console.log(item.id, 'this item is fav')
          arrOfFavs.push(item)
        }
      }
      let banana = {items: arrOfFavs}
      console.log(banana)
      return banana;
    })
    .catch(function(err)  { console.error(err) });
};

// show favourite items for user
// THIS ASSUMES USER_ID IS = 1, NEED TO ADD FURTHER IMPLEMENTATION
const loadFavItems = function() {
  $.ajax('/api/favourites/', { method: 'GET' })
    .then(function(favItems) {
      console.log('favitems',favItems.items)
      let favs = getItemsByItemID(1)
      console.log('favs',favs)
      renderItems(favs);
    })
    .catch(function(err)  { console.error(err) });
};




  console.log("HELLLOOOOOO")
  loadItems();
  $("#show_favourites").click(function(event) {
    alert('favourites clicked')
    loadFavItems()
  });


})

// show favourite items for user
// THIS ASSUMES USER_ID IS = 1, NEED TO ADD FURTHER IMPLEMENTATION
// const favItems = function() {
//   $.ajax('/api/favourites/', { method: 'GET' })
//     .then(function(items) {
//       renderItems(items);
//     })
//     .catch(function(err)  { console.error(err) });
// };



$(document).ready(function()  {
  console.log('this is happening')
  loadItems();
  $("#show_favourites").click(function(event) {
    alert('favourites clicked')
    //loadFavourites
  });
});





// $
// (()=> {
//   const renderItems = function(items) {
//     for (let item of items) {
//       const $newItem = addNewItem(item);
//       $('.items').append($newItem);
//     }
//   }
//   const addNewItem = function(item) {
//     const $item = (`
//     <div class="layout">
//       <h2>${item.title}</h2>
//       <img src="${item.url}" />
//       <h2>${item.price}</h2>
//       <p>${item.description}</p>
//       <div class="button2">
//       <button class="button">Favourite</button>
//       <button class="button">Buy</button>
//       <button class="button">View</button>
//     </div>`)

//     return $item;
//   };

//   // render all items on page
//   const loadItems = function() {
//     $.get('/items', (items) => {
//       renderItems(items);
//     })
//   }
//   loadItems();

// } )

// $(document).ready(function()  {
//   loadItems();
// })
