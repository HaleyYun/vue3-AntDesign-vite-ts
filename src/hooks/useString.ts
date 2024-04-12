import {} from "vue"
export function useOperateString(){
    const slicingString=(string:string)=>{
       let StrArr:string[] = string.split("。")
       console.log(StrArr);
       return StrArr[1]
    }
    return {
        slicingString,
    }
}
