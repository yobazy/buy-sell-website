    SELECT items.id as id, items.title as title, items.description as description, items.item_photo_url as item_photo_url, items.price as price, users.name as user_name, users.email as email, items.sold_status as sold_status, favourites.id as favourite_id, favourites.user_id as favourite_user_id, favourites.item_id as favourite_item_id
    FROM favourites
    JOIN items ON item_id = items.id
    JOIN users ON items.user_id = users.id
    GROUP BY items.id, users.id, favourites.id
    HAVING favourites.user_id = 1
    ORDER BY items.price;
