    SELECT items.id, items.title, items.description, items.item_photo_url, items.price, users.name, users.email
    FROM items
    JOIN users ON items.user_id = users.id
    WHERE price >= 5 AND price <= 12
    GROUP BY items.id, users.id
    ORDER BY items.price
