export interface signUp {
    name : string,
    email : string,
    password : string
}
export interface login {
    email : string,
    password : string
}
export interface product {
    id : number,
    productName : string,
    productPrice : number,
    productColor : string,
    productCategory : string,
    productImageUrl : string,
    productDescription : string,
    quantity : undefined | number,
    productId : undefined | number
}
export interface cart {
    id ?: number,
    productName : string,
    productPrice : number,
    productColor : string,
    productCategory : string,
    productImageUrl : string,
    productDescription : string,
    quantity : undefined | number
    userId : number,
    productId : number
}
export interface priceSummary {
    price : number,
    discount : number,
    tax : number,
    delivery : number,
    total : number
}

export interface order {
    email : string,
    address : string,
    contact : string,
    totalPrice : number,
    userId : number,
    id : number | undefined
}