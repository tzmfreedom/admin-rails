quote_details = [
  {
    id: 1,
    quote_id: 1,
    category: 'hoge',
    item_name: '商品A',
    price: 1_000,
    quantity: 3,
  },
  {
    id: 2,
    quote_id: 1,
    category: 'hoge',
    item_name: '商品B',
    price: 1_000,
    quantity: 3,
  },
  {
    id: 3,
    quote_id: 1,
    category: 'hoge',
    item_name: '商品C',
    price: 1_000,
    quantity: 3,
  },
]

QuoteDetail.seed(:id, *quote_details)