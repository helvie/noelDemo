import { BACKEND_URL } from '@/utils/urls';

const ChatService = () => {

  const getChatData = async (username, token) => {

    try {
      const response = await fetch(`${BACKEND_URL}/api/getChat.php`, {
        headers: {
          "user-name": encodeURIComponent(username),
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

  const saveMessage = async (tchatInput, user) => {

    try {

      const response = await fetch(`${BACKEND_URL}/api/insertChat`, {
        method: 'POST',
        headers: {
          "Noel-Token": user.token,
          "User-Name": encodeURIComponent(user.name),
          "App-Name": "NoelTan",
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          idUtilisateur: user.id,
          contenu: tchatInput,
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }

      return { success: true, message: 'message enregistré', result: response.ok };

    } catch (error) {
      console.error("Erreur maj statut cadeau", error);
      throw error;
    }
  };

  return {
    getChatData,
    saveMessage,
  };
};

export default ChatService;