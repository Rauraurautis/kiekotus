type RequiresCSRF = {
    csrfToken: string
}

export type UserCredentials = {
    email: string
    password: string
} & RequiresCSRF

export type NonregisteredFriend = {
    name: string
} & RequiresCSRF

export type Coordinates = {
    latitude: number
    longitude: number
}

export type Hole = {
    distance: number
    par: number
}

export type Friend = {
    id: number
    name: string
    type: "nonregistered" | "friend"
}

type Difficulty = "AAA1" | "AA2" | "A3" | "BB1" | "B2" | "C1" | "D1"

export type Course = {
    title: string
    latlng: Coordinates
    difficulty: Difficulty
    address: string
    description: string
    mapAddress: string | null
    holes: Hole[]
}

// Rounds

export type RoundPlayer = {
    player: Friend
    scores: Number[]
}

export type RoundInfo = {
    players: RoundPlayer[]
    course: Course
}






