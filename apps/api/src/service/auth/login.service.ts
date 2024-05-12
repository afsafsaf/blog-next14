import { JWT_SECRET } from "@/config"
import { comparePassword } from "@/lib/bcrypt"
import prisma from "@/prisma"
import { User } from "@prisma/client"
import { sign } from 'jsonwebtoken'

export const loginService = async (body: Pick<User, "email" | "password">) => {
    try {
        const { email, password } = body

        //kita cek dulu apakah emailnya sudah ada di database kita atau belum
        const user = await prisma.user.findFirst({
            where: { email },
        })

        //Kalau emailnya tidak ada didatabase, maka akan menampilkan error
        if (!user) {
            throw new Error(`Invalid email address`)
        }

        //Kalau emailnya ada maka kita akan compare passwordnya. compare password kita ambil dari library bcrypt yang sudah kita buat. didalamnya dia butuh 2 argumen, yaitu candidate password dan dan hashed password. candidate password yaitu password yang dimasukkan dari req.body
        const isPasswordValid = await comparePassword(password, user.password)

        //Kemudian kita lakukan pengecekan. kalau misalnya passwordnya ga valid, maka kita lempar error
        if (!isPasswordValid) {
            throw new Error(`Incorrect Password`)
        }

        //tapi kalau passwordnya valid, kita bakal men-generated token. kita bakal kirim datanya ke front-end. data register dan data tokennya. 
        const token = sign({ id: user.id }, JWT_SECRET, {
            expiresIn: '2h'
        })

        return {
            message: "login success",
            data: user,
            token
        }
    } catch (error) {
        throw error
    }
}