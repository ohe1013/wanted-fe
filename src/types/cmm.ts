export type ButtonProp= {
    type?: 'button' | 'submit'| 'reset';
    color?: string;
    cb ?: ()=>any;
    msg?:string

} 