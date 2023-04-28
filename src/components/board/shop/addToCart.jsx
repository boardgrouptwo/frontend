async function addToCart(user_id, product) {
    try {
      const { product_no, product_name, product_price, product_amount } = product;
  
      // 카트에 해당 상품이 이미 추가되어 있는지 확인
      const existingItem = await db.query('cartList', { user_id });
      const existingProduct = existingItem.find((item) => item.product_no === product_no);
  
      if (existingProduct) {
        // 이미 추가된 상품일 경우, 수량 업데이트
        await db.query('cartUpdate', {
          user_id,
          product_no,
          product_amount,
        });
      } else {
        // 새로운 상품일 경우, 추가
        await db.query('cartUpload', {
          user_id,
          product_no,
          product_name,
          product_price,
          product_amount,
        });
      }
  
      // 장바구니에 추가된 상품 리스트 반환
      const cartList = await db.query('cartList', { user_id });
      return cartList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add item to cart');
    }
  }
  