
const ListesEtCadeauxService = () => {

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
                const giftsData = await response.json();

                return { success: true, message: 'Cadeaux récupérés', gifts: giftsData };
            } else {
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