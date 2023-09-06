<template>
  <div class="chat-container">
    <div class="chat" v-if="!state.username">
      <form class="login-form" @submit.prevent="Login">
        <label for="username">Vue-Firebase Real-time Chat</label>
        <input type="text" v-model="inputUsername" placeholder="Please enter your username">
        <input type="submit" value="Login" class="login">
      </form>
    </div>

    <div class="chat" v-else>
      <header class="chat-header">
        <button class="logout" @click="Logout">Logout</button>
        <h1>{{ state.username }}</h1>
      </header>

      <section class="chat-box">
        <div
          v-for="message in state.messages"
          :key="message.id"
          :class="(message.username === state.username ? 'message current-user' : 'message')">
          <div class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </section>

      <form class="chat-input" @submit.prevent="SendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ref, onMounted } from 'vue';
import db from './firebase';

export default {
  setup() {
    const inputUsername = ref('');
    const inputMessage = ref('');

    const state = ref({
      username: '',
      messages: [],
    });

    const Login = () => {
      if (inputUsername.value) {
        state.value.username = inputUsername.value;
        inputUsername.value = '';
      }
    };

    const Logout = () => {
      state.value.username = '';
    };

    const SendMessage = async () => {
      if (inputMessage.value === '' || inputMessage.value === null) {
        return;
      }

      const newMessage = {
        username: state.value.username,
        content: inputMessage.value,
      };

      await addDoc(collection(db, 'messages'), newMessage);

      inputMessage.value = '';
    };

    onMounted(() => {
      onSnapshot(collection(db, 'messages'), (snapshot) => {
        state.value.messages = snapshot.docs.map(doc => doc.data());
      });
    });

    return {
      inputUsername,
      Login,
      Logout,
      state,
      inputMessage,
      SendMessage,
    };
  },
};
</script>

<style>
:root, .login, .logout {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

body {
  background-color: #444;
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.chat {
  width: 100%;
  max-width: 600px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  color: #fff;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}

.login-form label {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
}

.login-form input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  margin-bottom: 20px;
}

.login-form input[type="submit"] {
  background-color: #2196F3;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.login-form input[type="submit"]:hover {
  background-color: #1769aa;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2196F3;
  color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px;
}

.logout {
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.logout:hover {
  opacity: 0.8;
}

.chat-header h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.chat-box {
  overflow-y: auto;
  height: 400px;
  padding: 20px;
}

.message {
  background-color: #444;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  color: #fff;
}

.message.current-user {
  background-color: #2196F3;
}

.message .message-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.message .username {
  font-weight: bold;
  margin-right: 10px;
}

.message .content {
  margin: 0;
  color: #fff;
}

.chat-input {
  background-color: #444;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  border-top: 1px solid #333;
}

.chat-input input[type="text"] {
  padding: 10px;
  width: 100%;
  border: none;
  font-size: 16px;
  border-top-left-radius: 10px;
  margin: 0;
  background-color: #333;
  color: #fff;
}

.chat-input input[type="submit"] {
  background-color: #2196F3;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-top-right-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.chat-input input[type="submit"]:hover {
  background-color: #1769aa;
}
</style>