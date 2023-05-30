import {v4 as uuid} from 'uuid'

export default class Item{

    constructor(
        private _itemName: string,
        private _price: number,
        private _description: string,
        private _id: string = uuid()
    ){}

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get itemName(): string {
        return this._itemName;
    }
    public set itemName(value: string) {
        this._itemName = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}