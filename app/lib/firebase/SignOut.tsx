import { getAuth, signOut } from "firebase/auth";

export const SignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("User signed out");
    }).catch((error) => {
        console.log("Error signing out: ", error);
    });

    let handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Sign out clicked");
        location.href = "/";
    };

    return handleClick;
}