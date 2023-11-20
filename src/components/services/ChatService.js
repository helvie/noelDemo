
const ChatService = () => {

  const getChatData = async (username, token) => {

    try {
      const response = await fetch("https://noel.helvie.fr/api/getChat.php", {
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

  const saveMessage = async (tchatInput, giftsConnectedUserList, user) => {

    try {
      const idUser = giftsConnectedUserList.find(person => person.pseudo === user.name)?.idUser;

      const response = await fetch("https://noel.helvie.fr/api/insertChat", {
        method: 'POST',
        headers: {
          "Noel-Token": user.token,
          "User-Name": encodeURIComponent(user.name),
          "App-Name": "NoelTan",
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          idUtilisateur: idUser,
          contenu: tchatInput,
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }

      const data = await response.text();
      console.log("Réussi", data);
      return data;
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