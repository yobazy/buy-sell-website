// Client facing scripts here
$(document).ready(function () {

  // Escape function to prevent script injection in posts
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Inserts item object info from item into new item article
  const createItemElement = function (itemData) {
    let itemElement =
    `<article>
      <header>
        <span class="profile">
          <span class="profile-image"><img src="${itemData.item_photo_url}"></span>
          <span class="title">${itemData.title}</span>
          <span class="tag">${itemData.price}</span>
      </header>
      <div class="item-body">${escape(itemData.description)}</div>
      <div class="item-spacer"></div>
      <footer>
        <span class="icons">
          <span class="flag"><i class="fa-brands fa-font-awesome"></i></span>
          <span class="retweet"><i class="fa-solid fa-retweet"></i></span>
          <span class="like"><i class="fa-solid fa-heart"></i></span>
        </span>
      </footer>
    </article>`;

    return itemElement;
  };


  // Appends item articles - pushes items to #items-container
  const renderItems = function (items) {
  console.log("inside renderItems - items: ", items);
  // adds space between tweets
  const articleSpacer = "<div class='article-spacer'></div>";
  let itemsArray = items.items;
  // loops through tweets
  for (const item of itemsArray) {
    console.log("inside renderItems - item: ", item);
    const $item = createItemElement(item);
    $("#items-container").prepend($item, articleSpacer);
  }
};

//query database for list of tweet objects
const loadItems = function () {
  $.ajax({
    type: "GET",
    url: "api/items/",
  })
    .done(function (responseData) {
      renderItems(responseData);
    })
    .fail(function (errorData) {
      console.log("fail: ", errorData);
    });
};

//run once when page first loads
loadItems();

});
