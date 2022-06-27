import { IUser } from "model/User";

type AuthHeader = {
    Authorization:string
}

const authHeader = ():(AuthHeader|undefined) => {

    const userStr:(string|null) = localStorage.getItem("user");
    let user:(IUser|null) = null;

    if (userStr) {
        user = JSON.parse(userStr) as IUser;
        if (user && user.token) {
            return {
                Authorization: `Bearer ${user.token}`
            };
        }
        return;
    }
    return;

}

export default authHeader;