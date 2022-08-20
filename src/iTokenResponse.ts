export default interface iTokenRespponse {
    updated_at: number,
    data: {[name: string]: {
        name:string,
        symbol:string,
        price:string,
        price_BNB:string
    }}
} 