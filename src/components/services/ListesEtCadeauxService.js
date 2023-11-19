// services/getlistesetcadeaux.js
import { useDispatch } from 'react-redux';
// import { updateGiftsList2, updateGiftsConnectedUserList } from 'chemin-vers-vos-actions';

const ListesEtCadeauxService = () => {
    // const dispatch = useDispatch();

    const getListesEtCadeaux = async (logs, tokenData) => {
        try {
            const response = await fetch("https://noel.helvie.fr/api/getlistesetcadeaux.php", {
                headers: {
                    "user-name": encodeURIComponent(logs.signinName),
                    "app-name": "NoelTan",
                    "noel-token": tokenData
                }
            });

            if (response.status === 200) {
                // setErrorLoginPass(false);
                const giftsData = await response.json();

                // dispatch(updateGiftsList2(giftsData.filter((data) => data.pseudo.toLowerCase() !== logs.signinName.toLowerCase())));
                // dispatch(updateGiftsConnectedUserList(giftsData.filter((data) => data.pseudo.toLowerCase() === logs.signinName.toLowerCase())));

                return { success: true, message: 'Cadeaux récupérés', gifts: giftsData };
            } else {
                // setErrorLoginPass(true);
                throw new Error("Failed to get listes et cadeaux. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des listes et cadeaux : ", error);
            return { success: false, message: 'Erreur lors de la récupération des listes et cadeaux', error };
        }
    };

    return {
        getListesEtCadeaux,
    };
};

export default ListesEtCadeauxService;