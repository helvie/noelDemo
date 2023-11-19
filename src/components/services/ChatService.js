const ChatService = () => {
    // const dispatch = useDispatch();

    const getChatData = async (userName, token) => {
        try {
            const response = await fetch("https://noel.helvie.fr/api/getChat.php", {
                headers: {
                    "user-name": encodeURIComponent(userName),
                    "app-name": "NoelTan",
                    "noel-token": token
                }
            });

            if (response.status === 200) {
                const chatData = await response.json();
                const sortedChatData = chatData.sort((a, b) => b.date - a.date);
                return { success: true, message: 'Chat récupéré', chat: sortedChatData };
            } else {
                throw new Error("Failed to get chat data. Status: " + response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données du chat : ", error);
            return { success: false, message: 'Erreur lors de la récupération du chat', error };
        }
    };

    return {
        getChatData,
    };
};

export default ChatService;