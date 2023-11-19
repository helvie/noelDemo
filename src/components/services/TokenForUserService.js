// services/loginService.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/reducers/user';
// import envVariables from '../../utils/envVariables';
const TokenForUserService = () => {
    // const dispatch = useDispatch();


    const getTokenForUser = async (logs, setErrorLoginPass) => {
        try {
            const response = await fetch("https://noel.helvie.fr/api/gettokenforuser.php", {
                method: 'POST',
                headers: {
                    "App-Name": "NoelTan",
                    "App-Key": "CP33NZxx+vIPC2pr1fuEuCqXycx13TZQK305ObI3h/iFC45vq5bSsWtjxPI5axn3/dxZOvqrOvLMX7S9bLCLdMv6pU5ci3O6atpmyhF8NuntU0ZftTADxrTpmNFj/XFPDqB0lkZpyfCKkfDcmJXn+pTWQ5iNGvSOJFOeYKHfDp46u7kwmQsZsIvKQBxm0Y6jFSK/ZCd4dPpOuQxdgBICffwo6uQj3vuEJ9y0TZRPmJCidYD4kQN1UfQzyLmCyYuBTCBPA4iMbgGzU1VpMu1n3/gxmb2HeFE40eUN+HNxI99MxJ4mx97B+eD7AyMCV9zotw8ZKRu4e4kUO9LAIDH0vw==",
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    login: logs.signinName,
                    mdp: logs.signinPassword
                })
            });

            if (response.status === 200) {
                setErrorLoginPass(false);
                const tokenData = await response.text();

                // setSigninName(logs.signinName);
                // dispatch(login({
                //     token: tokenData
                // }));
                console.log(tokenData);
                return { success: true, message: 'Authentification réussie', token: tokenData, name:logs.signinName };
            } else {
                setErrorLoginPass(true);
                throw new Error("Failed to get token. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération du token : ", error);
        }
    };

    return {
        getTokenForUser,
    };
};

export default TokenForUserService;