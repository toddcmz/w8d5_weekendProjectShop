import Item from './Item'
import User from './User'
import {v4 as uuid} from 'uuid'

export default class Shop{

    constructor(

        private _itemsInShop: Item[] = [],
        private _myUser: User | undefined = undefined

    ){
        const tshirt1 = new Item('Fridge Shirt', 20, 'Shirt with a funny haiku')
        const tshirt2 = new Item('Calvin Shirt', 15, 'Unlicensed comic material')
        const tshirt3 = new Item('Vb Shirt', 30, 'Dryfit sports shirt')
        const coffee1 = new Item('Latte', 5.5, 'Thanks a latte')
        const coffee2 = new Item('Capuccino', 6, 'More foam more yum')
        const coffee3 = new Item('Chai', 4, 'Sweet or spicy or both')
        this.itemsInShop.push(tshirt1)
        this.itemsInShop.push(tshirt2)
        this.itemsInShop.push(tshirt3)
        this.itemsInShop.push(coffee1)
        this.itemsInShop.push(coffee2)
        this.itemsInShop.push(coffee3)
    }

    public get itemsInShop(): Item[] {
        return this._itemsInShop
    }
    public set itemsInShop(value: Item[]) {
        this._itemsInShop = value
    }

    public get myUser(): User | undefined {
        return this._myUser
    }
    public set myUser(value: User | undefined) {
        this._myUser = value
    }

    showItems(){
        const shopUoList = document.querySelector('#shopStockList')!
        for(let ele of this.itemsInShop){
            const shopItem = document.createElement('div')
            shopItem.id = ele.id
            shopItem.innerHTML = `<u>${ele.itemName}</u> | ${ele.description} | <i>$${ele.price}</i><br>`
            shopUoList.appendChild(shopItem)
            const addItemButton = document.createElement('button')
            addItemButton.id = ele.id
            addItemButton.innerText = 'Add to Cart'
            shopItem.appendChild(addItemButton)
            this.addToCartEventListener(addItemButton, ele)
        }
    }

    loginUser(someUser:User){
        this.myUser = someUser
        this.showItems()
    }

    addToCartEventListener(someButton:HTMLButtonElement, someItem:Item){
        someButton.addEventListener('click', ()=>{
            //we actually need to use the info in someItem
            // to generate a new item, and pass THAT Item
            // into the cart, otherwise all the items have
            // the same ID.
            const itemForCart = new Item(someItem.itemName, someItem.price, someItem.description, uuid() )
            if(this.myUser !== undefined){
                this.myUser.addToCart(itemForCart)
            }else{

            }
        })
    }

}