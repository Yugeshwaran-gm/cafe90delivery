// Single source of truth for all menu data
const rawMenuItems = [
  // Biryani
  { id: 1, name: "Chicken Biryani", category: "Biryani", type: "non-veg", desc: "Aromatic basmati rice cooked with spicy chicken & herbs.", price: 249, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Biryani" },
  { id: 10, name: "Empty Biryani", category: "Biryani", type: "veg", desc: "Flavorful biryani rice served without meat.", price: 149, img: "https://source.unsplash.com/featured/600x400/?Vegetable%20Biryani" },
  { id: 11, name: "Egg Biryani", category: "Biryani", type: "non-veg", desc: "Biryani rice served with boiled eggs and masala.", price: 189, img: "https://source.unsplash.com/featured/600x400/?Egg%20Biryani" },
  { id: 12, name: "Hyderabad Biryani", category: "Biryani", type: "non-veg", desc: "Authentic Hyderabadi dum biryani with tender chicken.", price: 279, img: "https://source.unsplash.com/featured/600x400/?Hyderabadi%20Chicken%20Biryani" },
  { id: 13, name: "Chicken 65 Biryani", category: "Biryani", type: "non-veg", desc: "Spicy Chicken 65 pieces layered with biryani rice.", price: 289, img: "https://source.unsplash.com/featured/600x400/?Chicken%2065%20Biryani" },
  { id: 14, name: "Mutton Biryani", category: "Biryani", type: "non-veg", desc: "Slow-cooked succulent mutton with fragrant basmati.", price: 349, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Biryani" },

  // Veg Starters
  { id: 100, name: "Gobi 65", category: "Staters", type: "veg", desc: "Spicy and crispy fried cauliflower florets.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Gobi%2065" },
  { id: 101, name: "Gobi Manchurian", category: "Staters", type: "veg", desc: "Crispy cauliflower tossed in tangy manchurian sauce.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Gobi%20Manchurian" },
  { id: 102, name: "Gobi Pepper Fry", category: "Staters", type: "veg", desc: "Cauliflower stir-fried with black pepper and spices.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Gobi%20Pepper%20Fry" },
  { id: 103, name: "Mushroom 65", category: "Staters", type: "veg", desc: "Spicy and crispy fried mushrooms.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Mushroom%2065" },
  { id: 104, name: "Mushroom Manchurian", category: "Staters", type: "veg", desc: "Mushroom cubes in tangy manchurian sauce.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Manchurian" },
  { id: 105, name: "Mushroom Pepper Fry", category: "Staters", type: "veg", desc: "Mushrooms stir-fried with black pepper.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Pepper%20Fry" },
  { id: 106, name: "Paneer 65", category: "Staters", type: "veg", desc: "Spicy and crispy fried paneer cubes.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Paneer%2065" },
  { id: 107, name: "Paneer Manchurian", category: "Staters", type: "veg", desc: "Paneer cubes in tangy manchurian sauce.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Manchurian" },
  { id: 108, name: "Paneer Pepper Fry", category: "Staters", type: "veg", desc: "Paneer stir-fried with black pepper.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Pepper%20Fry" },
  { id: 109, name: "Baby Corn 65", category: "Staters", type: "veg", desc: "Crispy fried baby corn with spices.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Baby%20Corn%2065" },
  { id: 110, name: "Baby Corn Manchurian", category: "Staters", type: "veg", desc: "Baby corn in tangy manchurian sauce.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Baby%20Corn%20Manchurian" },
  { id: 111, name: "Baby Corn Pepper Fry", category: "Staters", type: "veg", desc: "Baby corn stir-fried with black pepper.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Baby%20Corn%20Pepper%20Fry" },
  { id: 112, name: "Honey Paneer", category: "Staters", type: "veg", desc: "Crispy paneer tossed in sweet and spicy honey sauce.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Honey%20Paneer" },
  { id: 113, name: "Honey Babycorn", category: "Staters", type: "veg", desc: "Crispy baby corn tossed in honey sauce.", price: 170, img: "https://source.unsplash.com/featured/600x400/?Honey%20Babycorn" },
  { id: 114, name: "Paneer Pakoda", category: "Staters", type: "veg", desc: "Gram flour coated deep fried paneer fritters.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Pakoda" },

  // Non-Veg Starters
  { id: 115, name: "Chicken Lollipop Dry", category: "Staters", type: "non-veg", desc: "Crispy fried chicken wings shaped like lollipops.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Lollipop%20Dry" },
  { id: 116, name: "Chicken Lollipop Sauce", category: "Staters", type: "non-veg", desc: "Chicken lollipops tossed in spicy schezwan sauce.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Lollipop%20Sauce" },
  { id: 117, name: "Chicken 65", category: "Staters", type: "non-veg", desc: "Deep-fried spicy chicken bites.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Chicken%2065" },
  { id: 118, name: "Chicken Manchurian", category: "Staters", type: "non-veg", desc: "Chicken pieces in tangy manchurian sauce.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Manchurian%20Dry" },
  { id: 119, name: "Chicken Dynamite", category: "Staters", type: "non-veg", desc: "Spicy and creamy dynamite chicken bites.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Dynamite%20Chicken" },
  { id: 120, name: "Pepper Chicken Dry", category: "Staters", type: "non-veg", desc: "Spicy chicken stir-fried with black pepper.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Pepper%20Chicken%20Fry" },
  { id: 121, name: "Hot Pepper Chicken", category: "Staters", type: "non-veg", desc: "Extra spicy pepper chicken with green chilies.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Hot%20Pepper%20Chicken" },
  { id: 122, name: "Garlic Chicken", category: "Staters", type: "non-veg", desc: "Chicken stir-fried with plenty of garlic and spices.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Garlic%20Chicken" },
  { id: 123, name: "Schezwan Chicken", category: "Staters", type: "non-veg", desc: "Spicy schezwan style stir-fried chicken.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Schezwan%20Chicken" },
  { id: 124, name: "Chicken Pallipalayam (Bone)", category: "Staters", type: "non-veg", desc: "Traditional Erode style chicken with coconut and red chillies.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Pallipalayam%20(Bone)" },
  { id: 125, name: "Chicken Pallipalayam (Boneless)", category: "Staters", type: "non-veg", desc: "Boneless Pallipalayam chicken with coconut slices.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Pallipalayam%20(Boneless)" },
  { id: 126, name: "Chicken Pallipalayam (Nattukozhi)", category: "Staters", type: "non-veg", desc: "Country chicken Pallipalayam for authentic taste.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Pallipalayam%20(Nattukozhi)" },
  { id: 127, name: "Pudhina Chicken", category: "Staters", type: "non-veg", desc: "Chicken tossed in fresh mint and green chilli paste.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Pudhina%20Chicken" },
  { id: 128, name: "Lemon Chicken", category: "Staters", type: "non-veg", desc: "Tangy and zesty lemon flavored chicken.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Lemon%20Chicken" },
  { id: 129, name: "Mughalai Chicken", category: "Staters", type: "non-veg", desc: "Rich and creamy Mughalai style chicken starter.", price: 210, img: "https://source.unsplash.com/featured/600x400/?Mughalai%20Chicken" },
  { id: 130, name: "Chicken Fry (Nattukozhi)", category: "Staters", type: "non-veg", desc: "Crispy country chicken fry with traditional spices.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Fry%20(Nattukozhi)" },

  // Soups
  { id: 18, name: "Vegetable Soup", category: "Soup", type: "veg", desc: "Healthy and nutritious mixed vegetable soup.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Vegetable%20Soup" },
  { id: 19, name: "Hot & Sour Soup", category: "Soup", type: "veg", desc: "Spicy and tangy soup with vegetables and mushrooms.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Hot%20%26%20Sour%20Soup" },
  { id: 20, name: "Veg Clear Soup", category: "Soup", type: "veg", desc: "Light and refreshing vegetable broth.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Clear%20Vegetable%20Soup" },
  { id: 21, name: "Milaguthani Soup", category: "Soup", type: "veg", desc: "Traditional South Indian spiced lentil and pepper soup.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Milaguthani%20Soup" },
  { id: 23, name: "Tomato Soup", category: "Soup", type: "veg", desc: "Classic rich tomato soup with a touch of cream.", price: 90, img: "https://source.unsplash.com/featured/600x400/?Tomato%20Soup" },
  { id: 24, name: "Cream of Mushroom Soup", category: "Soup", type: "veg", desc: "Velvety smooth cream of mushroom soup.", price: 90, img: "https://source.unsplash.com/featured/600x400/?Creamy%20Mushroom%20Soup" },
  { id: 25, name: "Hot & Sour Chicken Soup", category: "Soup", type: "non-veg", desc: "Spicy and tangy chicken soup with shredded chicken.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Hot%20%26%20Sour%20Chicken%20Soup" },
  { id: 26, name: "Chicken Clear Soup", category: "Soup", type: "non-veg", desc: "Healthy clear chicken broth with tender pieces.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Clear%20Soup" },
  { id: 27, name: "Chicken Manchow Soup", category: "Soup", type: "non-veg", desc: "Classic Indo-Chinese chicken manchow soup with crispy noodles.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Manchow%20Soup" },
  { id: 28, name: "Chicken Coriander Soup", category: "Soup", type: "non-veg", desc: "Fragrant chicken soup with fresh coriander and lemon.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Coriander%20Soup" },
  { id: 29, name: "Nattukozhi Soup", category: "Soup", type: "non-veg", desc: "Traditional country chicken soup with local spices.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Nattukozhi%20Soup" },
  { id: 30, name: "Nandu Soup", category: "Soup", type: "non-veg", desc: "Spicy and flavorful crab soup.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Nandu%20Soup" },
  { id: 31, name: "Mutton Soup", category: "Soup", type: "non-veg", desc: "Rich and hearty mutton bone broth.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Soup" },

  // Grill & Tandoori
  { id: 200, name: "Grill Chicken (Half)", category: "Grill & Tandoori", type: "non-veg", desc: "Juicy flame-grilled chicken with classic spices.", price: 230, img: "https://source.unsplash.com/featured/600x400/?Grill%20Chicken%20(Half)" },
  { id: 201, name: "Grill Chicken (Full)", category: "Grill & Tandoori", type: "non-veg", desc: "Whole flame-grilled chicken for the family.", price: 440, img: "https://source.unsplash.com/featured/600x400/?Grill%20Chicken%20(Full)" },
  { id: 202, name: "Masala Grill (Half)", category: "Grill & Tandoori", type: "non-veg", desc: "Spicy masala-infused grilled chicken.", price: 230, img: "https://source.unsplash.com/featured/600x400/?Masala%20Grill%20(Half)" },
  { id: 203, name: "Masala Grill (Full)", category: "Grill & Tandoori", type: "non-veg", desc: "Full portion of spicy masala grilled chicken.", price: 440, img: "https://source.unsplash.com/featured/600x400/?Masala%20Grill%20(Full)" },
  { id: 204, name: "Pepper Grill (Half)", category: "Grill & Tandoori", type: "non-veg", desc: "Grilled chicken with a kick of black pepper.", price: 250, img: "https://source.unsplash.com/featured/600x400/?Pepper%20Grill%20(Half)" },
  { id: 205, name: "Pepper Grill (Full)", category: "Grill & Tandoori", type: "non-veg", desc: "Whole chicken grilled with cracked black pepper.", price: 460, img: "https://source.unsplash.com/featured/600x400/?Pepper%20Grill%20(Full)" },
  { id: 206, name: "Tandoori (Half)", category: "Grill & Tandoori", type: "non-veg", desc: "Classic clay-oven roasted tandoori chicken.", price: 260, img: "https://source.unsplash.com/featured/600x400/?Tandoori%20(Half)" },
  { id: 207, name: "Tandoori (Full)", category: "Grill & Tandoori", type: "non-veg", desc: "Whole tandoori chicken marinated in yogurt and spices.", price: 480, img: "https://source.unsplash.com/featured/600x400/?Tandoori%20(Full)" },
  { id: 208, name: "Alfaham Chicken (Half)", category: "Grill & Tandoori", type: "non-veg", desc: "Arabic style charcoal-grilled chicken.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Alfaham%20Chicken%20(Half)" },
  { id: 209, name: "Alfaham Chicken (Full)", category: "Grill & Tandoori", type: "non-veg", desc: "Full Arabic style charcoal-grilled chicken feast.", price: 460, img: "https://source.unsplash.com/featured/600x400/?Alfaham%20Chicken%20(Full)" },
  { id: 210, name: "Mayonnaise", category: "Grill & Tandoori", type: "veg", desc: "Extra creamy garlic mayonnaise dip.", price: 20, img: "https://source.unsplash.com/featured/600x400/?Mayonnaise" },

  // Tikka
  { id: 300, name: "Paneer Tikka", category: "Tikka", type: "veg", desc: "Classic grilled paneer cubes marinated in spiced yogurt.", price: 200, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Tikka" },
  { id: 301, name: "Chicken Tikka", category: "Tikka", type: "non-veg", desc: "Juicy boneless chicken pieces grilled to perfection.", price: 200, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Tikka" },
  { id: 302, name: "Tangdi Kabab (3 Pcs)", category: "Tikka", type: "non-veg", desc: "Spiced chicken drumsticks grilled in a clay oven.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Tangdi%20Kabab%20(3%20Pcs)" },
  { id: 303, name: "Hariyali Chicken Tikka", category: "Tikka", type: "non-veg", desc: "Chicken pieces marinated in a vibrant green mint and coriander paste.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Hariyali%20Chicken%20Tikka" },

  // Restore Missing Items
  { id: 2, name: "Margherita Pizza", category: "Pizza", type: "veg", desc: "Classic delight with 100% real cheese and fresh basil.", price: 249, img: "https://source.unsplash.com/featured/600x400/?Margherita%20Pizza" },
  { id: 3, name: "Chicken Pasta", category: "Pasta", type: "non-veg", desc: "Creamy pasta with grilled chicken and herbs.", price: 269, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Pasta" },
  { id: 4, name: "Shawarma Roll", category: "Shawarma", type: "non-veg", desc: "Juicy chicken shawarma wrapped in soft pita.", price: 149, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Shawarma%20Roll" },
  { id: 5, name: "Veg Sandwich", category: "Sandwiches", type: "veg", desc: "Fresh vegetables with sauce & cheese.", price: 129, img: "https://source.unsplash.com/featured/600x400/?Veg%20Sandwich" },
  { id: 6, name: "Chocolate Brownie", category: "Desserts", type: "veg", desc: "Warm brownie with ice cream & chocolate.", price: 129, img: "https://source.unsplash.com/featured/600x400/?Chocolate%20Brownie" },
  { id: 7, name: "Cappuccino", category: "Refreshments", type: "veg", desc: "Rich espresso with steamed milk.", price: 99, img: "https://source.unsplash.com/featured/600x400/?Cappuccino" },
  { id: 8, name: "Fresh Juice", category: "Fresh Juices", type: "veg", desc: "Refreshing juice made with real fruits.", price: 79, img: "https://source.unsplash.com/featured/600x400/?Fresh%20Juice" },
  { id: 9, name: "Masala Chai", category: "Refreshments", type: "veg", desc: "Indian masala tea made with love.", price: 59, img: "https://source.unsplash.com/featured/600x400/?Masala%20Chai" },

  // Barbeque
  { id: 400, name: "Chicken Strips Boneless (6pcs)", category: "Barbeque", type: "non-veg", desc: "Crispy boneless chicken strips with BBQ seasoning.", price: 130, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Strips%20Boneless%20(6pcs)" },
  { id: 401, name: "Chicken Wings (5pcs)", category: "Barbeque", type: "non-veg", desc: "Flame-grilled chicken wings tossed in BBQ sauce.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Wings%20(5pcs)" },
  { id: 402, name: "Chicken Drumstick (2pcs)", category: "Barbeque", type: "non-veg", desc: "Juicy chicken drumsticks grilled to perfection.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Drumstick%20(2pcs)" },
  { id: 403, name: "BBQ Fish (2pcs)", category: "Barbeque", type: "non-veg", desc: "Fresh fish fillets grilled with smoky BBQ spices.", price: 140, img: "https://source.unsplash.com/featured/600x400/?BBQ%20Fish%20(2pcs)" },

  // Lamb Specials
  { id: 500, name: "Mutton Chukka Varuval", category: "Lamb Specials", type: "non-veg", desc: "Spicy and dry mutton roast with traditional South Indian spices.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Chukka%20Varuval" },
  { id: 501, name: "Mutton Varutha Kari", category: "Lamb Specials", type: "non-veg", desc: "Classic mutton curry with roasted spices.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Varutha%20Kari" },
  { id: 502, name: "Mutton Pepper Fry", category: "Lamb Specials", type: "non-veg", desc: "Succulent mutton pieces stir-fried with plenty of black pepper.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Pepper%20Fry" },
  { id: 503, name: "Mutton Ghee Roast", category: "Lamb Specials", type: "non-veg", desc: "Rich and aromatic mutton roast cooked in pure ghee.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Mutton%20Ghee%20Roast" },

  // Sea Food
  { id: 600, name: "Prawn Pepper Fry", category: "Sea Food", type: "non-veg", desc: "Juicy prawns stir-fried with black pepper and curry leaves.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Prawn%20Pepper%20Fry" },
  { id: 601, name: "Prawn Manchurian", category: "Sea Food", type: "non-veg", desc: "Crispy fried prawns in tangy manchurian sauce.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Prawn%20Manchurian" },
  { id: 602, name: "Prawn Chilli", category: "Sea Food", type: "non-veg", desc: "Spicy and flavorful chilli prawns with bell peppers.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Prawn%20Chilli" },
  { id: 603, name: "Ginger Prawn", category: "Sea Food", type: "non-veg", desc: "Succulent prawns infused with fresh ginger flavor.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Ginger%20Prawn" },
  { id: 604, name: "Garlic Prawn", category: "Sea Food", type: "non-veg", desc: "Prawns sautÃ©ed with golden roasted garlic.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Garlic%20Prawn" },
  { id: 605, name: "Tawa Fish (2pcs)", category: "Sea Food", type: "non-veg", desc: "Spiced fish fillets shallow-fried on a griddle.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Tawa%20Fish%20(2pcs)" },
  { id: 606, name: "Fish Finger (6pcs)", category: "Sea Food", type: "non-veg", desc: "Crispy breaded fish fingers served with dip.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Fish%20Finger%20(6pcs)" },
  { id: 607, name: "Fish Fry (2pcs)", category: "Sea Food", type: "non-veg", desc: "Classic deep-fried fish with traditional spices.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Fish%20Fry%20(2pcs)" },
  { id: 608, name: "Crab Dry", category: "Sea Food", type: "non-veg", desc: "Spicy and aromatic dry crab roast.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Crab%20Dry" },

  // Egg Specials
  { id: 700, name: "Egg Omelette", category: "Egg Specials", type: "non-veg", desc: "Classic fluffy omelette with onions and green chilies.", price: 40, img: "https://source.unsplash.com/featured/600x400/?Egg%20Omelette" },
  { id: 701, name: "Egg Podimas", category: "Egg Specials", type: "non-veg", desc: "Scrambled eggs with South Indian spices and tempered onions.", price: 60, img: "https://source.unsplash.com/featured/600x400/?Egg%20Podimas" },
  { id: 702, name: "Boiled Egg (1pc)", category: "Egg Specials", type: "non-veg", desc: "Perfectly boiled egg served with a pinch of salt and pepper.", price: 15, img: "https://source.unsplash.com/featured/600x400/?Boiled%20Egg%20(1pc)" },
  { id: 703, name: "Egg Kalakki", category: "Egg Specials", type: "non-veg", desc: "Soft and runny masala omelette, a street food favorite.", price: 30, img: "https://source.unsplash.com/featured/600x400/?Egg%20Kalakki" },
  { id: 704, name: "Egg Chilli", category: "Egg Specials", type: "non-veg", desc: "Fried eggs tossed in a spicy and tangy chilli sauce.", price: 90, img: "https://source.unsplash.com/featured/600x400/?Egg%20Chilli" },
  { id: 705, name: "Egg Pepper", category: "Egg Specials", type: "non-veg", desc: "Eggs sautÃ©ed with plenty of freshly ground black pepper.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Egg%20Pepper" },
  { id: 706, name: "Egg Manchurian", category: "Egg Specials", type: "non-veg", desc: "Fried egg pieces in a savory manchurian gravy.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Egg%20Manchurian" },
  { id: 707, name: "Egg Muttamaas", category: "Egg Specials", type: "non-veg", desc: "Traditional spicy egg preparation with thick gravy.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Egg%20Muttamaas" },

  // Shawarma
  { id: 800, name: "Shawarma Plain (Roll)", category: "Shawarma", type: "non-veg", desc: "Classic chicken shawarma wrapped in soft pita.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Shawarma%20Plain%20(Roll)" },
  { id: 801, name: "Shawarma Plain (Plate)", category: "Shawarma", type: "non-veg", desc: "Open chicken shawarma served on a plate with extra meat.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Shawarma%20Plate" },
  { id: 802, name: "Peri-Peri Shawarma (Roll)", category: "Shawarma", type: "non-veg", desc: "Spicy Peri-Peri flavored chicken shawarma roll.", price: 110, img: "https://source.unsplash.com/featured/600x400/?Peri-Peri%20Shawarma%20(Roll)" },
  { id: 803, name: "Peri-Peri Shawarma (Plate)", category: "Shawarma", type: "non-veg", desc: "Spicy Peri-Peri chicken shawarma served on a plate.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Peri-Peri%20Shawarma%20(Plate)" },
  { id: 804, name: "Pallipalayam Shawarma (Roll)", category: "Shawarma", type: "non-veg", desc: "Unique Pallipalayam style spicy chicken shawarma roll.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Pallipalayam%20Shawarma%20(Roll)" },
  { id: 805, name: "Pallipalayam Shawarma (Plate)", category: "Shawarma", type: "non-veg", desc: "Pallipalayam style chicken shawarma plate.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Pallipalayam%20Shawarma%20(Plate)" },
  { id: 806, name: "Special Shawarma (Roll)", category: "Shawarma", type: "non-veg", desc: "Chef's special shawarma roll with extra toppings.", price: 130, img: "https://source.unsplash.com/featured/600x400/?Special%20Shawarma%20(Roll)" },
  { id: 807, name: "Special Shawarma (Plate)", category: "Shawarma", type: "non-veg", desc: "Ultimate special chicken shawarma plate.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Special%20Shawarma%20(Plate)" },

  // Veg Gravy
  { id: 900, name: "Mushroom Masala", category: "Gravy", type: "veg", desc: "Fresh mushrooms cooked in a rich onion-tomato gravy.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Masala" },
  { id: 901, name: "Paneer Butter Masala", category: "Gravy", type: "veg", desc: "Creamy and mildly sweet gravy with succulent paneer cubes.", price: 200, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Butter%20Masala" },
  { id: 902, name: "Mixed Veg Curry", category: "Gravy", type: "veg", desc: "Assorted vegetables simmered in a spiced gravy.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Mixed%20Veg%20Curry" },
  { id: 903, name: "Kadai Vegetable", category: "Gravy", type: "veg", desc: "Mixed vegetables cooked with bell peppers and kadai masala.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Kadai%20Vegetable" },
  { id: 904, name: "Kadai Paneer", category: "Gravy", type: "veg", desc: "Paneer cubes tossed with capsicum and aromatic spices.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Kadai%20Paneer" },
  { id: 905, name: "Chettinad Vegetable Fry", category: "Gravy", type: "veg", desc: "Authentic spicy Chettinad style mixed vegetable preparation.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Chettinad%20Vegetable%20Fry" },
  { id: 906, name: "Paneer Tikka Masala", category: "Gravy", type: "veg", desc: "Grilled paneer tikka pieces in a spicy masala gravy.", price: 200, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Tikka%20Masala" },
  { id: 907, name: "Gobi Manchurian / Chilli Gravy", category: "Gravy", type: "veg", desc: "Crispy cauliflower in your choice of manchurian or chilli gravy.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Gobi%20Manchurian%20%2F%20Chilli%20Gravy" },
  { id: 908, name: "Mushroom Manchurian / Chilli Gravy", category: "Gravy", type: "veg", desc: "Earthy mushrooms in your choice of manchurian or chilli gravy.", price: 170, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Manchurian%20%2F%20Chilli%20Gravy" },
  { id: 909, name: "Paneer Manchurian / Chilli Gravy", category: "Gravy", type: "veg", desc: "Soft paneer cubes in your choice of manchurian or chilli gravy.", price: 180, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Manchurian%20%2F%20Chilli%20Gravy" },

  // Non-Veg Gravy
  { id: 1000, name: "Chettinad Chicken Masala", category: "Gravy", type: "non-veg", desc: "Traditional spicy Chettinad chicken curry.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Chettinad%20Chicken%20Masala" },
  { id: 1001, name: "Chicken Pallipalayam Kulambu", category: "Gravy", type: "non-veg", desc: "Classic Erode style chicken gravy with coconut.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Pallipalayam%20Kulambu" },
  { id: 1002, name: "Chicken Chithamani Kulambu", category: "Gravy", type: "non-veg", desc: "Authentic spicy chicken gravy with small onions.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Curry" },
  { id: 1003, name: "Pepper Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Chicken cooked in a spicy black pepper based gravy.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Pepper%20Chicken%20Gravy" },
  { id: 1004, name: "Nattukozhi Kulambu", category: "Gravy", type: "non-veg", desc: "Authentic country chicken gravy with traditional spices.", price: 240, img: "https://source.unsplash.com/featured/600x400/?Nattukozhi%20Kulambu" },
  { id: 1005, name: "Butter Chicken Masala", category: "Gravy", type: "non-veg", desc: "Rich and creamy tomato based chicken curry.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Butter%20Chicken" },
  { id: 1006, name: "Hyderabad Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Spicy and nutty Hyderabadi style chicken gravy.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Hyderabadi%20Chicken%20Curry" },
  { id: 1007, name: "Chicken Tikka Masala", category: "Gravy", type: "non-veg", desc: "Grilled chicken pieces in a spiced tomato-cream sauce.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Tikka%20Masala" },
  { id: 1008, name: "Ginger Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Chicken pieces cooked in a ginger flavored gravy.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Ginger%20Chicken%20Gravy" },
  { id: 1009, name: "Garlic Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Chicken pieces cooked with plenty of golden garlic.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Garlic%20Chicken%20Gravy" },
  { id: 1010, name: "Kadai Chicken Masala", category: "Gravy", type: "non-veg", desc: "Chicken cooked with bell peppers and fresh ground spices.", price: 190, img: "https://source.unsplash.com/featured/600x400/?Kadai%20Chicken%20Masala" },
  { id: 1011, name: "Chilli Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Indo-Chinese style spicy chilli chicken with gravy.", price: 190, img: "https://source.unsplash.com/featured/600x400/?Chilli%20Chicken%20Gravy" },
  { id: 1012, name: "Chicken Manchurian Gravy", category: "Gravy", type: "non-veg", desc: "Indo-Chinese style chicken manchurian with gravy.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Manchurian%20Gravy" },
  { id: 1013, name: "Mughalai Chicken Gravy", category: "Gravy", type: "non-veg", desc: "Rich and royal Mughalai style creamy chicken gravy.", price: 220, img: "https://source.unsplash.com/featured/600x400/?Mughalai%20Chicken%20Gravy" },

  // Indian Breads
  { id: 1100, name: "Pulka", category: "Indian Breads", type: "veg", desc: "Soft and oil-free wheat flatbread.", price: 20, img: "https://source.unsplash.com/featured/600x400/?Pulka" },
  { id: 1101, name: "Chapathi", category: "Indian Breads", type: "veg", desc: "Classic home-style wheat flatbread.", price: 25, img: "https://source.unsplash.com/featured/600x400/?Chapathi" },
  { id: 1102, name: "Rotti", category: "Indian Breads", type: "veg", desc: "Whole wheat bread baked in a clay oven.", price: 35, img: "https://source.unsplash.com/featured/600x400/?Rotti" },
  { id: 1103, name: "Butter Rotti", category: "Indian Breads", type: "veg", desc: "Oven-baked whole wheat bread with a brush of butter.", price: 45, img: "https://source.unsplash.com/featured/600x400/?Butter%20Rotti" },
  { id: 1104, name: "Naan", category: "Indian Breads", type: "veg", desc: "Soft and leavened refined flour bread.", price: 40, img: "https://source.unsplash.com/featured/600x400/?Naan" },
  { id: 1105, name: "Butter Naan", category: "Indian Breads", type: "veg", desc: "Soft naan bread topped with a generous amount of butter.", price: 50, img: "https://source.unsplash.com/featured/600x400/?Butter%20Naan" },
  { id: 1106, name: "Garlic Naan", category: "Indian Breads", type: "veg", desc: "Naan bread infused with fresh garlic and coriander.", price: 50, img: "https://source.unsplash.com/featured/600x400/?Garlic%20Naan" },
  { id: 1107, name: "Tandoori Parotta", category: "Indian Breads", type: "veg", desc: "Layered flatbread baked in a tandoor for a smoky flavor.", price: 35, img: "https://source.unsplash.com/featured/600x400/?Tandoori%20Parotta" },
  { id: 1108, name: "Kulcha", category: "Indian Breads", type: "veg", desc: "Soft and fluffy leavened bread, a perfect accompaniment to gravies.", price: 40, img: "https://source.unsplash.com/featured/600x400/?Kulcha" },

  // South Indian
  { id: 1200, name: "Kari Dosa", category: "South Indian", type: "non-veg", desc: "Crispy dosa topped with spicy minced meat and egg.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Kari%20Dosa" },
  { id: 1201, name: "Parotta", category: "South Indian", type: "veg", desc: "Classic layered flaky flatbread.", price: 25, img: "https://source.unsplash.com/featured/600x400/?Parotta" },
  { id: 1202, name: "Veg Kothu", category: "South Indian", type: "veg", desc: "Shredded parotta tossed with vegetables and spices.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Veg%20Kothu%20Parotta" },
  { id: 1203, name: "Egg Kothu", category: "South Indian", type: "non-veg", desc: "Shredded parotta scrambled with eggs and spices.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Egg%20Kothu%20Parotta" },
  { id: 1204, name: "Chicken Kothu", category: "South Indian", type: "non-veg", desc: "Shredded parotta tossed with spicy chicken pieces.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Kothu%20Parotta" },
  { id: 1205, name: "Chicken Kili Parotta", category: "South Indian", type: "non-veg", desc: "Parotta and chicken gravy wrapped and steamed in banana leaf.", price: 170, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Kili%20Parotta" },
  { id: 1206, name: "Chilly Parotta", category: "South Indian", type: "veg", desc: "Crispy parotta pieces tossed in a spicy chilli sauce.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Chilly%20Parotta" },
  { id: 1207, name: "Nattukozhi Kili Parotta", category: "South Indian", type: "non-veg", desc: "Country chicken and parotta steamed in banana leaf.", price: 230, img: "https://source.unsplash.com/featured/600x400/?Country%20Chicken%20Kili%20Parotta" },

  // Rice and Noodle (Veg)
  { id: 1300, name: "Babycorn Rice", category: "Rice and Noodle", type: "veg", desc: "Fragrant rice tossed with crispy babycorn and mild spices.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Babycorn%20Rice" },
  { id: 1301, name: "Gobi Rice", category: "Rice and Noodle", type: "veg", desc: "Delicious fried rice with spicy gobi florets.", price: 110, img: "https://source.unsplash.com/featured/600x400/?Gobi%20Rice" },
  { id: 1302, name: "Ghee Rice", category: "Rice and Noodle", type: "veg", desc: "Aromatic basmati rice cooked with pure ghee and whole spices.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Ghee%20Rice" },
  { id: 1303, name: "Veg Fried Rice", category: "Rice and Noodle", type: "veg", desc: "Classic stir-fried rice with assorted vegetables.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Veg%20Fried%20Rice" },
  { id: 1304, name: "Veg Noodles", category: "Rice and Noodle", type: "veg", desc: "Perfectly cooked noodles tossed with fresh veggies.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Veg%20Noodles" },
  { id: 1305, name: "Schezwan Veg Fried Rice", category: "Rice and Noodle", type: "veg", desc: "Spicy Schezwan style fried rice with vegetables.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Schezwan%20Veg%20Fried%20Rice" },
  { id: 1306, name: "Schezwan Veg Noodles", category: "Rice and Noodle", type: "veg", desc: "Zesty Schezwan noodles with a kick of heat.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Schezwan%20Veg%20Noodles" },
  { id: 1307, name: "Mushroom Rice", category: "Rice and Noodle", type: "veg", desc: "Fried rice loaded with savory mushroom pieces.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Rice" },
  { id: 1308, name: "Mushroom Noodles", category: "Rice and Noodle", type: "veg", desc: "Tasty noodles tossed with sautÃ©ed mushrooms.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Mushroom%20Noodles" },
  { id: 1309, name: "Paneer Rice", category: "Rice and Noodle", type: "veg", desc: "Fried rice with soft paneer cubes and vegetables.", price: 130, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Rice" },
  { id: 1310, name: "Paneer Noodles", category: "Rice and Noodle", type: "veg", desc: "Noodles combined with golden fried paneer.", price: 130, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Noodles" },
  { id: 1311, name: "Jeera Rice", category: "Rice and Noodle", type: "veg", desc: "Simple yet aromatic cumin tempered basmati rice.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Jeera%20Rice" },
  { id: 1312, name: "Veg Pulaav", category: "Rice and Noodle", type: "veg", desc: "One-pot vegetable pulaav with mild aromatic spices.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Vegetable%20Pulao" },

  // Rice and Noodle (Non-Veg)
  { id: 1400, name: "Chicken Fried Rice", category: "Rice and Noodle", type: "non-veg", desc: "Stir-fried rice with tender chicken pieces and egg.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Fried%20Rice" },
  { id: 1401, name: "Chicken Noodles", category: "Rice and Noodle", type: "non-veg", desc: "Classic noodles tossed with spicy chicken and vegetables.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Noodles" },
  { id: 1402, name: "Schezwan Chicken Rice", category: "Rice and Noodle", type: "non-veg", desc: "Spicy Schezwan fried rice with chicken.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Schezwan%20Chicken%20Rice" },
  { id: 1403, name: "Schezwan Chicken Noodles", category: "Rice and Noodle", type: "non-veg", desc: "Fiery Schezwan noodles with shredded chicken.", price: 150, img: "https://source.unsplash.com/featured/600x400/?Schezwan%20Chicken%20Noodles" },
  { id: 1404, name: "Egg Fried Rice", category: "Rice and Noodle", type: "non-veg", desc: "Simple and tasty fried rice with scrambled eggs.", price: 110, img: "https://source.unsplash.com/featured/600x400/?Egg%20Fried%20Rice" },
  { id: 1405, name: "Egg Noodles", category: "Rice and Noodle", type: "non-veg", desc: "Soft noodles tossed with egg and spices.", price: 110, img: "https://source.unsplash.com/featured/600x400/?Egg%20Noodles" },

  // Sandwiches
  { id: 1500, name: "Veg Sandwich", category: "Sandwiches", type: "veg", desc: "Fresh vegetables and herbs layered in toasted bread.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Veg%20Sandwich" },
  { id: 1501, name: "Paneer Sandwich", category: "Sandwiches", type: "veg", desc: "Grilled sandwich stuffed with spiced paneer filling.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Paneer%20Sandwich" },
  { id: 1502, name: "Chicken Sandwich", category: "Sandwiches", type: "non-veg", desc: "Juicy chicken breast pieces with mayo and fresh veggies.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Chicken%20Sandwich" },
  { id: 1503, name: "Egg Sandwich", category: "Sandwiches", type: "non-veg", desc: "Toasted sandwich with scrambled or fried eggs.", price: 90, img: "https://source.unsplash.com/featured/600x400/?Egg%20Sandwich" },
  { id: 1504, name: "Extra Cheese", category: "Sandwiches", type: "veg", desc: "Add an extra layer of melted cheese to your sandwich.", price: 20, img: "https://source.unsplash.com/featured/600x400/?Extra%20Cheese" },

  // Refreshments
  { id: 1600, name: "Mint Mojito", category: "Refreshments", type: "veg", desc: "Refreshing blend of mint, lime, and soda.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Mint%20Mojito" },
  { id: 1601, name: "Blue Mountain Mojito", category: "Refreshments", type: "veg", desc: "Exotic blue curaÃ§ao based mojito with a citrus twist.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Blue%20Mojito" },
  { id: 1602, name: "Fruit Mocktail", category: "Refreshments", type: "veg", desc: "Chilled mocktail made with a mix of tropical fruits.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Fruit%20Mocktail" },
  { id: 1603, name: "Virgin Mojito", category: "Refreshments", type: "veg", desc: "Classic non-alcoholic lime and mint cooler.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Virgin%20Mojito" },

  // Fresh Juices
  { id: 1700, name: "Fresh Lime Juice (Sweet/Salt)", category: "Fresh Juices", type: "veg", desc: "Refreshing lime juice served sweet or salty as per your choice.", price: 30, img: "https://source.unsplash.com/featured/600x400/?Fresh%20Lime%20Juice%20(Sweet%2FSalt)" },
  { id: 1701, name: "Fresh Lime Soda", category: "Fresh Juices", type: "veg", desc: "Zesty lime mixed with chilled sparkling soda.", price: 40, img: "https://source.unsplash.com/featured/600x400/?Fresh%20Lime%20Soda" },
  { id: 1702, name: "Apple Juice", category: "Fresh Juices", type: "veg", desc: "Pure and fresh apple juice packed with nutrients.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Apple%20Juice" },
  { id: 1703, name: "Orange Juice", category: "Fresh Juices", type: "veg", desc: "Freshly squeezed oranges for a citrusy boost.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Orange%20Juice" },
  { id: 1704, name: "Watermelon Juice", category: "Fresh Juices", type: "veg", desc: "Cooling and hydrating fresh watermelon juice.", price: 45, img: "https://source.unsplash.com/featured/600x400/?Watermelon%20Juice" },
  { id: 1705, name: "Pomegranate Juice", category: "Fresh Juices", type: "veg", desc: "Healthy and delicious pomegranate juice.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Pomegranate%20Juice" },
  { id: 1706, name: "Sathukudi Juice", category: "Fresh Juices", type: "veg", desc: "Fresh sweet lime juice, a classic Indian refresher.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Sweet%20Lime%20Juice" },
  { id: 1707, name: "Pineapple Juice", category: "Fresh Juices", type: "veg", desc: "Sweet and tangy juice made from ripe pineapples.", price: 60, img: "https://source.unsplash.com/featured/600x400/?Pineapple%20Juice" },

  // Milkshakes
  { id: 1800, name: "Vanilla Milkshake", category: "Milkshakes", type: "veg", desc: "Classic and creamy vanilla milkshake made with premium ice cream.", price: 100, img: "https://source.unsplash.com/featured/600x400/?Vanilla%20Milkshake" },
  { id: 1801, name: "Strawberry Milkshake", category: "Milkshakes", type: "veg", desc: "Fresh and fruity strawberry milkshake.", price: 120, img: "https://source.unsplash.com/featured/600x400/?Strawberry%20Milkshake" },
  { id: 1802, name: "Chocolate Milkshake", category: "Milkshakes", type: "veg", desc: "Rich and indulgent chocolatey goodness.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Chocolate%20Milkshake" },
  { id: 1803, name: "Butter Scotch Milkshake", category: "Milkshakes", type: "veg", desc: "Creamy milkshake with the classic butterscotch crunch.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Butterscotch%20Milkshake" },
  { id: 1804, name: "Black Currant Milkshake", category: "Milkshakes", type: "veg", desc: "Tangy and sweet black currant flavored milkshake.", price: 140, img: "https://source.unsplash.com/featured/600x400/?Black%20Currant%20Milkshake" },
  { id: 1805, name: "Kit Kat Milkshake", category: "Milkshakes", type: "veg", desc: "Crunchy Kit Kat pieces blended into a thick shake.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Kit%20Kat%20Milkshake" },
  { id: 1806, name: "Oreo Milkshake", category: "Milkshakes", type: "veg", desc: "The ultimate cookies and cream experience.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Oreo%20Milkshake" },
  { id: 1807, name: "Cafe Special Cold Coffee", category: "Milkshakes", type: "veg", desc: "Our signature smooth and strong chilled coffee.", price: 160, img: "https://source.unsplash.com/featured/600x400/?Cafe%20Special%20Cold%20Coffee" },

  // Ice Cream
  { id: 1900, name: "Vanilla Ice Cream", category: "Ice Cream", type: "veg", desc: "Two scoops of classic creamy vanilla ice cream.", price: 60, img: "https://source.unsplash.com/featured/600x400/?Vanilla%20Ice%20Cream" },
  { id: 1901, name: "Butter Scotch Ice Cream", category: "Ice Cream", type: "veg", desc: "Delicious butter scotch ice cream with crunchy praline.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Butterscotch%20Ice%20Cream" },
  { id: 1902, name: "Strawberry Ice Cream", category: "Ice Cream", type: "veg", desc: "Fresh and fruity strawberry flavored ice cream.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Strawberry%20Ice%20Cream" },
  { id: 1903, name: "Chocolate Ice Cream", category: "Ice Cream", type: "veg", desc: "Rich and dark chocolate ice cream scoops.", price: 70, img: "https://source.unsplash.com/featured/600x400/?Chocolate%20Ice%20Cream" },
  { id: 1904, name: "Black Currant Ice Cream", category: "Ice Cream", type: "veg", desc: "Exotic black currant ice cream with real fruit bits.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Black%20Currant%20Ice%20Cream" },
  { id: 1905, name: "Ilaneer Payasam", category: "Ice Cream", type: "veg", desc: "Traditional tender coconut kheer, served chilled.", price: 80, img: "https://source.unsplash.com/featured/600x400/?Tender%20Coconut%20Payasam" },
];

// High-quality, robust, unique Unsplash image pools for each category
const IMAGE_POOLS = {
  biryani: [
    "photo-1633945274405-b6c8069047b0", // Chicken Biryani
    "photo-1563379091339-03b21ab4a4f8", // Hyderabad Biryani
    "photo-1626777552726-4a6b54c97e46", // Egg/Veg Biryani
    "photo-1589301760014-d929f3979dbc", // Empty/Rice Biryani
    "photo-1631515243349-e0cb75fb8d3a", // Chicken 65 Biryani
    "photo-1601050690597-df056fb4ce78"  // Mutton Biryani
  ],
  soup: [
    "photo-1547592165-e1d17fed6005", // Veg Soup
    "photo-1548940740-2047263be971", // Tomato Soup
    "photo-1603105037880-880cd4edfb0d", // Spicy Soup
    "photo-1547592180-85f173990554", // Mushroom Soup
    "photo-1505253716362-afaea1d3d1af", // Clear Soup
    "photo-1620418029225-b040778736e4", // Lentil Soup
    "photo-1594756202469-9ff9799b2e4e", // Noodle Soup
    "photo-1596797038530-2c107229654b"  // Bone Soup
  ],
  vegStarter: [
    "photo-1565557623262-b51c2513a641", // Paneer 65
    "photo-1589301760014-d929f3979dbc", // Gobi 65
    "photo-1606491956689-2ea866880c84", // Mushroom Manchurian
    "photo-1589302168068-9646b45d5707", // Crispy Corn
    "photo-1546964124-0cce460f38ef", // Honey Paneer
    "photo-1610192244261-3f33de3f55e4"  // Paneer Pakoda
  ],
  nonVegStarter: [
    "photo-1608039829572-78524f79c4c7", // Chicken Lollipop
    "photo-1562967914-6c41219937f5", // Chicken 65
    "photo-1626082927389-6cd097cdc6ec", // Pepper Chicken
    "photo-1614398751258-450f38ef56b9", // Manchurian
    "photo-1632778149955-e80f8ceca2e8", // Chicken Dynamite
    "photo-1604908176997-125f25cc6f3d"  // Dry Chicken
  ],
  grill: [
    "photo-1598515214211-89d3c73ae83b", // Tandoori
    "photo-1627435601357-374b1be78490", // Grill
    "photo-1532550907401-a500c9a57435", // Masala Grill
    "photo-1544025162-d76694265947"  // Alfaham
  ],
  tikka: [
    "photo-1599487488170-d11ec9c172f0", // Paneer Tikka
    "photo-1628294895518-a7cca7820468", // Chicken Tikka
    "photo-1608897013039-887f21d8c804", // Tangdi Kabab
    "photo-1626777552726-4a6b54c97e46"  // Hariyali Tikka
  ],
  barbeque: [
    "photo-1527477396000-e2cb8622c2f7", // Wings
    "photo-1560684352-8497838a2229", // Strips
    "photo-1519708227418-c8fd9a32b7a2"  // BBQ Fish
  ],
  lamb: [
    "photo-1544025162-d76694265947", // Chukka
    "photo-1603360946369-dc9bb6258143", // Curry
    "photo-1626777552726-4a6b54c97e46", // Pepper Fry
    "photo-1543353071-10c8ba85a904"  // Ghee Roast
  ],
  seafood: [
    "photo-1565557623262-b51c2513a641", // Prawn Pepper
    "photo-1534422298391-e4f8c172dddb", // Fish Finger
    "photo-1519708227418-c8fd9a32b7a2", // Tawa Fish
    "photo-1559737607-3f0503d5d92b", // Prawn Manchurian
    "photo-1596797038530-2c107229654b"  // Crab
  ],
  egg: [
    "photo-1525351484163-7529414344d8", // Omelette
    "photo-1542826438-bd32f43d626f", // Podimas
    "photo-1587486913049-53fc88980cfc", // Boiled Egg
    "photo-1551183053-bf91a1d81141"  // Kalakki
  ],
  shawarma: [
    "photo-1644783350106-90e620588636", // Roll
    "photo-1561758033-d89a9ad46330", // Plate
    "photo-1635352737678-831e50529d15"  // Peri-Peri
  ],
  gravyVeg: [
    "photo-1631452180519-c014fe946bc7", // Paneer Butter Masala
    "photo-1588166524941-3bf61a9c41db", // Mushroom Masala
    "photo-1606491956689-2ea866880c84", // Kadai Paneer
    "photo-1546964124-0cce460f38ef"  // Veg Curry
  ],
  gravyNonVeg: [
    "photo-1603894584373-5ac82b2ae398", // Butter Chicken
    "photo-1626777552726-4a6b54c97e46", // Chettinad Chicken
    "photo-1565557623262-b51c2513a641"  // Pepper Chicken Gravy
  ],
  bread: [
    "photo-1565557623262-b51c2513a641", // Garlic Naan
    "photo-1589301760014-d929f3979dbc", // Parotta
    "photo-1626777552726-4a6b54c97e46"  // Chapathi/Roti
  ],
  southIndian: [
    "photo-1668236543090-82eba5ee5976", // Kari Dosa
    "photo-1618449840785-6ec21fa733d8", // Kothu Parotta
    "photo-1589301760014-d929f3979dbc"  // Parotta Plain
  ],
  friedRice: [
    "photo-1603133872878-6c6fdd0e08f1", // Fried Rice
    "photo-1627308595229-7830a5c91f9f", // Ghee Rice
    "photo-1589301760014-d929f3979dbc"  // Pulao
  ],
  noodles: [
    "photo-1585032226651-759b368d7246", // Veg Noodles
    "photo-1569562211093-4ed0d0758f12"  // Spicy Noodles
  ],
  sandwich: [
    "photo-1521390188846-e2a3a97453a0", // Cheese Sandwich
    "photo-1567234669013-216f99333333"  // Paneer/Chicken Sandwich
  ],
  mojito: [
    "photo-1513558161293-cdaf765ed2fd", // Mint Mojito
    "photo-1497534446932-c925b458314e"  // Fruit Mocktail
  ],
  juice: [
    "photo-1621506289937-a8e4df240d0b", // Apple/Orange Juice
    "photo-1553787499-6f9133860242"  // Watermelon Juice
  ],
  shake: [
    "photo-1579954115545-a95591f28bfc", // Chocolate Shake
    "photo-1572490122747-3968b75cc699", // Vanilla Shake
    "photo-1501430654243-c934cca2a150"  // Cold Coffee
  ],
  iceCream: [
    "photo-1560008581-09826d1de6a7", // Vanilla Scoop
    "photo-1551024506-0bccd828d307"  // Brownie Sundae
  ]
};

const getImageForItem = (item) => {
  const name = item.name.toLowerCase();
  const category = item.category.toLowerCase();
  const type = item.type;

  // Specific item matches for biryani
  if (name.includes("chicken biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[0]}?auto=format&fit=crop&w=600&q=80`;
  if (name.includes("hyderabad")) {
    if (category.includes("biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[1]}?auto=format&fit=crop&w=600&q=80`;
    if (category.includes("gravy")) return `https://images.unsplash.com/${IMAGE_POOLS.gravyNonVeg[2]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (name.includes("egg biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[2]}?auto=format&fit=crop&w=600&q=80`;
  if (name.includes("empty biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[3]}?auto=format&fit=crop&w=600&q=80`;
  if (name.includes("chicken 65 biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[4]}?auto=format&fit=crop&w=600&q=80`;
  if (name.includes("mutton biryani")) return `https://images.unsplash.com/${IMAGE_POOLS.biryani[5]}?auto=format&fit=crop&w=600&q=80`;

  // Specific soups
  if (category.includes("soup")) {
    if (name.includes("tomato")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[1]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("mushroom")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[3]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("hot") || name.includes("sour")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[2]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("clear")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[4]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("milaguthani")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[5]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("manchow")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[6]}?auto=format&fit=crop&w=600&q=80`;
    if (name.includes("mutton") || name.includes("nandu") || name.includes("nattukozhi")) return `https://images.unsplash.com/${IMAGE_POOLS.soup[7]}?auto=format&fit=crop&w=600&q=80`;
    
    const idx = item.id % IMAGE_POOLS.soup.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.soup[idx]}?auto=format&fit=crop&w=600&q=80`;
  }

  // Specific Drinks / Refreshments
  if (category.includes("refreshments") || category.includes("fresh juices") || category.includes("milkshakes") || category.includes("ice cream")) {
    if (name.includes("mojito")) {
      const idx = item.id % IMAGE_POOLS.mojito.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.mojito[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
    if (name.includes("juice") || name.includes("soda") || name.includes("lime")) {
      const idx = item.id % IMAGE_POOLS.juice.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.juice[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
    if (name.includes("milkshake") || name.includes("coffee")) {
      const idx = item.id % IMAGE_POOLS.shake.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.shake[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
    if (category.includes("ice cream") || name.includes("brownie") || name.includes("payasam")) {
      const idx = item.id % IMAGE_POOLS.iceCream.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.iceCream[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
  }

  // Category fallback with index distribution
  if (category.includes("biryani")) {
    const idx = item.id % IMAGE_POOLS.biryani.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.biryani[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("stater") || category.includes("starter") || category.includes("staters")) {
    if (type === "veg") {
      const idx = item.id % IMAGE_POOLS.vegStarter.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.vegStarter[idx]}?auto=format&fit=crop&w=600&q=80`;
    } else {
      const idx = item.id % IMAGE_POOLS.nonVegStarter.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.nonVegStarter[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
  }
  if (category.includes("grill")) {
    const idx = item.id % IMAGE_POOLS.grill.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.grill[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("tikka")) {
    const idx = item.id % IMAGE_POOLS.tikka.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.tikka[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("barbeque")) {
    const idx = item.id % IMAGE_POOLS.barbeque.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.barbeque[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("lamb")) {
    const idx = item.id % IMAGE_POOLS.lamb.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.lamb[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("sea food")) {
    const idx = item.id % IMAGE_POOLS.seafood.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.seafood[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("egg")) {
    const idx = item.id % IMAGE_POOLS.egg.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.egg[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("shawarma")) {
    const idx = item.id % IMAGE_POOLS.shawarma.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.shawarma[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("gravy")) {
    if (type === "veg") {
      const idx = item.id % IMAGE_POOLS.gravyVeg.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.gravyVeg[idx]}?auto=format&fit=crop&w=600&q=80`;
    } else {
      const idx = item.id % IMAGE_POOLS.gravyNonVeg.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.gravyNonVeg[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
  }
  if (category.includes("bread")) {
    const idx = item.id % IMAGE_POOLS.bread.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.bread[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("south indian")) {
    const idx = item.id % IMAGE_POOLS.southIndian.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.southIndian[idx]}?auto=format&fit=crop&w=600&q=80`;
  }
  if (category.includes("rice and noodle")) {
    if (name.includes("noodle")) {
      const idx = item.id % IMAGE_POOLS.noodles.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.noodles[idx]}?auto=format&fit=crop&w=600&q=80`;
    } else {
      const idx = item.id % IMAGE_POOLS.friedRice.length;
      return `https://images.unsplash.com/${IMAGE_POOLS.friedRice[idx]}?auto=format&fit=crop&w=600&q=80`;
    }
  }
  if (category.includes("sandwiches")) {
    const idx = item.id % IMAGE_POOLS.sandwich.length;
    return `https://images.unsplash.com/${IMAGE_POOLS.sandwich[idx]}?auto=format&fit=crop&w=600&q=80`;
  }

  // Default fallback image
  return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80`;
};

export const menuItems = rawMenuItems.map((item) => ({
  ...item,
  img: getImageForItem(item)
}));


export const categories = ["All", "Soup", "Staters", "Grill & Tandoori", "Tikka", "Barbeque", "Lamb Specials", "Sea Food", "Egg Specials", "Shawarma", "Gravy", "Indian Breads", "South Indian", "Rice and Noodle", "Biryani", "Sandwiches", "Refreshments", "Fresh Juices", "Milkshakes", "Ice Cream", "Desserts"];
