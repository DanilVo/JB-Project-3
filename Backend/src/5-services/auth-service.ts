import UserModel from "../3-models/user-model";

class AuthService {
    
    public async register(user: UserModel) {
        user.validation()

        
    }

}

const authService = new AuthService();
export default authService;
