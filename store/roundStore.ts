import { create } from "zustand"
import { Course, Friend, RoundInfo } from "../lib/types"


type RoundStore = {
    creatingRound: boolean
    roundInfo: RoundInfo | null
    setRoundInfo: (roundInfo: RoundInfo) => void

}



const useRoundStore = create<RoundStore>(
    (set, get) => ({
        creatingRound: false,
        roundInfo: null,
        setRoundInfo(roundInfo: RoundInfo) {
            set(state => ({ ...state, roundInfo }))
        }
    })
)

export { useRoundStore }
