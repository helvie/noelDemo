import { BACKEND_URL } from '@/utils/urls';

const UserInfosService = () => {

    const getUserInfos = async (userName, token) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/getuserinfos.php`, {
                headers: {
                    "user-name": encodeURIComponent(userName),
                    "app-name": "NoelTan",
                    "noel-token": token
                }
            });

            if (response.status === 200) {
                const userData = await response.json();
                return { success: true, message: 'Cadeaux récupérés', userData: userData };
            } else {
                throw new Error("Failed to get user data. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des informations utilisateur : ", error);
            return null;
        }
    };

    return {
        getUserInfos,
    };
};

export default UserInfosService;