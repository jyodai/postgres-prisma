export interface Entry {
    id : number;
    date: Date;
    category_id: number;
    amount: number;
    store: string;
    memo: string;
    claim_flag: number;
    claim_amount : number;
    category: Category | null;
}

export interface Category {
    id : number;
    name: string;
    type : number;
    color: string;
    memo: string;
    sort: number;
}
