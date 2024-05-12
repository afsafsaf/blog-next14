
import { hashPassword } from "@/lib/bcrypt"
import prisma from "@/prisma"
import { User } from "@prisma/client"

//body diambil dari type prisma. Promise tersebut akan mengembalikan return type terhadap function registerService. dia bakal mereturn sebuah promise yang nanti hsil akhirnya adalah user 
export const registerService = async (
    body: Pick<User, 'email' | 'fullName' | 'password'>
): Promise<User> => {
    try {
        const { email, password } = body
        const existingUser = await prisma.user.findFirst({
            where: { email }
        })

        //Kalau emailnya sudah ada, maka kita langsung lempar error
        if (existingUser) {
            throw new Error(`Email already exist`)
        }

        //Kalau email belum ada kita akan create datanya. tapi sebelum create data, kita bakal hashing dulu     passwordnya.
        const hashedPassword = await hashPassword(password)

        //isi datanya kita copy seluruh yang ada di body, habisitu password nya kita ganti sama yang sudah di hashed

        return await prisma.user.create({
            data: { ...body, password: hashedPassword }
        })


    } catch (error) {
        throw error
    }
}