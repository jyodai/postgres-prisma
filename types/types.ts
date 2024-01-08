export interface Entry {
    id : number;
    date: Date;
    category_id: number;
    amount: string;
    store: string;
    memo: string;
    claim_flag: number;
    category?: Category;
}

export interface Category {
    id : number;
    name: string;
    type : number;
    color: string;
    memo: string;
    sort: number;
}
