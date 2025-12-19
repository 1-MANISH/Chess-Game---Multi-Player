

const Button = ({onClick,mText,pText}:{onClick:()=>void,mText:string,pText:string | undefined}) => {
        return (
                <button 
                        onClick={onClick}
                        className="w-full cursor-pointer py-6 px-4 rounded bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        <div className="flex flex-col ">
                                 <span className="text-3xl font-extrabold">{mText}</span>
                                {pText && <span className="text-lg">{pText}</span>}
                         </div>
                </button>
        )
}

export default Button