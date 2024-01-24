interface ProductType {
  id: number,
  product_type_id: number,
  name_uz: string,
  cost: number,
  address: string,
  created_date: number,
  productType?:string
}

export default ProductType