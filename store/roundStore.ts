import { create } from "zustand"
import { Course, Friend, RoundInfo } from "../lib/types"


type RoundStore = {
    creatingRound: boolean
    roundInfo: RoundInfo | null
    setCreatingRound: (state: boolean) => void
    setRoundInfo: (roundInfo: RoundInfo) => void
}


const useRoundStore = create<RoundStore>(
    (set, get) => ({
        creatingRound: false,
        roundInfo: null,
        setCreatingRound(starting: boolean) {
            set(state => ({ ...state, creatingRound: starting }))
        },
        setRoundInfo(roundInfo: RoundInfo) {
            set(state => ({ ...state, roundInfo }))
        }
    })
)

export { useRoundStore }
