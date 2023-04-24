import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, TokenDTO } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginAdmin(props: LoginDTO): Promise<TokenDTO>;
    registerAdmin(props: RegisterDTO): Promise<TokenDTO>;
    login(props: LoginDTO): Promise<TokenDTO>;
    register(props: RegisterDTO): Promise<TokenDTO>;
    refresh(body: TokenDTO): Promise<TokenDTO>;
}
