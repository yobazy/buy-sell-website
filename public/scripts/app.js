// Client facing scripts here
$(document).ready(function () {
$
(()=> {
  const renderItems = function(items) {
    for (let item of items) {
      const $newItem = addNewItem(item);
      $('.items').append($newItem);
    }
  }
  const addNewItem = function(item) {
    const $item = (`
    <div class="layout"><h2>${item.title}</h2>
    <img src="${item.url}" />
      <h2>${item.price}</h2>
      <p>${item.description}</p>
      <div class="button2">
      <button class="button">Favourite</button>
       <button class="button">Buy</button>
       <button class="button">View</button></div>`)

    return $item;
  };

const loadItems = function() {
  $.get('/items', (item) => {
    renderItems(item);
  })
}
loadItems();

} )

});