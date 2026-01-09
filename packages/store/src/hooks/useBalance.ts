import { useRecoilValue} from "recoil"
import { balanceAtom } from "../atoms/balance.js"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}