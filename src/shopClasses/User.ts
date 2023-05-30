import {v4 as uuid} from 'uuid'
import Item from './Item'

export default class User{

    constructor(
        private _fullName: string,
        private _age: number,
        private _cart: Item[] = [],
        private _id: string = uuid()
    ){}

    static createNewUser(fullName:string, age:number){
        if(fullName && age){
            return new User(fullName, age)
        }else{
            return null
        }
    }

    public get fullName(): string {
        return this._fullName;
    }
    public set fullName(value: string) {
        this._fullName = value;
    }
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    cartHTMLElement(){
        const cartUoList = document.querySelector('#UserCartList')!
        for(let ele of this.cart){
            const cartItem = document.createElement('div')
            cartItem.id = ele.id
            cartItem.className = ele.itemName
            cartItem.innerText = `${ele.itemName}: ${ele.description} | $${ele.price}`
            cartUoList.append(cartItem)
            const rmThisButton = document.createElement('button')
            rmThisButton.id = ele.id
            rmThisButton.innerText = 'Remove'
            cartItem.appendChild(rmThisButton)
            this.addRemoveOneEventListener(rmThisButton)
            const rmAllButton = document.createElement('button')
            rmAllButton.id = ele.itemName
            rmAllButton.innerText = 'Remove All'
            cartItem.appendChild(rmAllButton)
            this.addRemoveAllEventListener(rmAllButton)
        }
    }

    addRemoveOneEventListener(someButton:HTMLButtonElement){
        someButton.addEventListener('click',() =>{
            const thisDiv = document.getElementById(someButton.id)!
            thisDiv.remove()
        })
        this.removeQuantityFromCart(someButton.id,1)
    }

    addRemoveAllEventListener(someButton:HTMLButtonElement){
        someButton.addEventListener('click',() =>{
            const theseDivs = document.getElementsByClassName(someButton.id)!
            for (let ele of theseDivs){
                ele.remove()
            }
            this.removeFromCart(someButton.id)
        })
    }

    addToCart(thisItem:Item):void{
        this.cart.push(thisItem)
        this.cartHTMLElement()
    }
    
    removeFromCart(thisItemName:string):void{
        this.cart = this.cart.filter(item => item.itemName !== thisItemName)
    }

    removeQuantityFromCart(thisItemId:string, quantity:number):void{
        let itemCount:number = 0
        for(let i=0; i<this.cart.length; i++){
            if(this.cart[i].id === thisItemId){
                itemCount +=1
            } // end if
        } // end get count of items for loop
        // if our count of items is less than or equal to removal quantity, run remove from cart
        if (itemCount <= quantity){
            this.removeFromCart(thisItemId)
        }else{
            let countRemoved:number = 0
            //const tempCart:Item[] = []
            for(let [i,ele] of this.cart.entries()){
                if (ele.id === thisItemId && countRemoved !== quantity){
                    this.cart.splice(i,1)
                    countRemoved +=1
                } // end if
            }// end for - for each item in the cart
        }// end handling removal if chain entirely
    }// end removeQuantityFromCart

    cartTotal():number{
        return this.cart.reduce((acc, cur) => acc + cur.price,0)
    }

    printCart():void{
        console.log(this.cart)
    }
}