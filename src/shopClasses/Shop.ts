import Item from './Item'
import User from './User'


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
            shopItem.innerText = `${ele.itemName}: ${ele.description} | $${ele.price}`
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
            if(this.myUser !== undefined){
            this.myUser.addToCart(someItem)
            }else{

            }
        })
    }

}