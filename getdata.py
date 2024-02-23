import sqlite3

def get_images(category):
    
    """
    Retrieves image information from the database based on the specified category,
    or retrieves all images if no category is specified.

    Args:
    - category (str): The category of products to retrieve images for.
                      If None, retrieves images for all categories.

    Returns:
    - List of tuples containing image information.
      Each tuple includes:
        - name (str): The name of the product.
        - price (float): The price of the product.
        - image (str): The URL or path to the image file.
        - productid (int): The unique identifier of the product.

    Notes:
    - Connects to the SQLite database named 'webshop.db'.
    - Retrieves image information from the 'Products' table.
    - If a category is specified, only retrieves images for that category.
    - Returns a list of tuples containing image details (name, price, image URL, product ID).
    - Closes the database connection after retrieving the images.
    """
    
    conn = sqlite3.connect("webshop.db")
    cursor = conn.cursor()
    
    if category:
        cursor.execute("SELECT name, price, image, productid FROM Products WHERE category = ?", (category,))
    else:
        cursor.execute("SELECT name, price, image, productid FROM Products")

    images = cursor.fetchall()
    image_urls =  [(img[0], img[1], img[2], img[3]) for img in images]
    conn.close()
    return image_urls
