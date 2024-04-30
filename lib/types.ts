
export type UserCredentials = {
    email: string
    password: string
}

export type RegisterUserCredentials = {
    username: string
    confirmPassword: string
} & UserCredentials

export type NonregisteredFriend = {
    name: string
}

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
    id: number
    name: string
    latitude: string
    longitude: string
    difficulty: Difficulty
    address: string
    description: string
    mapAddress: string | null
    holes: Hole[]
}

// Rounds

export type RoundPlayer = {
    player: Friend
    scores: number[]
}

export type RoundInfo = {
    players: RoundPlayer[]
    course: Course
}






