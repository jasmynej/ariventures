export type SignUpData = {
    email: string
    password: string
    username: string
    display_name: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type UserProfile = {
    id: number
    user_id: string
    role: string
    display_name: string
    username: string
    image: string
    cover_image: string
    bio: string
}

export type AdminUser = {
    id: string
    profile_id: number
    full_name: string
    role: string
}