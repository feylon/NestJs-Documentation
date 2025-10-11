import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { loginDTO } from "./Auth.DTO";

@Injectable()
export class AuthService {
    constructor(private JwtService: JwtService) { }

    async LoginFunction(body: loginDTO) {
        const { login, password } = body;

        const Userdata = [
            { id: 1, login: "admin01", password: "admin01" },
            { id: 2, login: "admin02", password: "admin02" },
            { id: 3, login: "admin03", password: "admin03" },
            { id: 4, login: "admin04", password: "admin04" },
            { id: 5, login: "admin05", password: "admin05" },
        ];
        const user = Userdata.find(e => e.login == login);
        if (!user) throw new HttpException({ message: "Ma'lumot topilmadi" }, HttpStatus.NOT_FOUND)

        if (!(user.password == password)) throw new HttpException({ message: "Parol xato" }, HttpStatus.UNAUTHORIZED);
        const payload = { id: user.id };

        const token = this.JwtService.sign(payload);

        return {
            accessToken: token
        }

    }


    async verify(token: string) {
        return this.verify(token);
    }
}