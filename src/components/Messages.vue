<template>
  <div class="hello">
    <div v-for="(message) in messages" :key="message.tags.id" style="disply:flex">
      <div class="message-container fade-in" :style="getMessageStyles(message.tags)">
        <strong>{{message.tags.username}}</strong>
        <br />
        <div v-html="parseMessage(message.message, message.tags.emotes)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../tmiclient.js";
import { mapGetters } from "vuex";

export default {
  name: "MessageDisplay",
  computed: {
    ...mapGetters(["users", "messages"]),
  },
  mounted() {
    client.on("message", (channel, tags, message, self) => {
      if (self) return;

      this.$store.commit("addMessage", {
        tags: tags,
        message: message,
      });

      this.$store.commit("addUser", {
        userId: tags["user-id"],
        username: tags["username"],
      });
    });
  },
  methods: {
    parseMessage(message, emotes) {
      if (emotes) {
        let newMessage = message;
        let parsedEmotes = [];

        for (const [emoteKey, emote] of Object.entries(emotes)) {
          let loc = emote[0];
          let emojiLocations = loc.split("-");

          parsedEmotes[emojiLocations[0]] = {
            imageUrl: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${emoteKey}/1.0" />`,
            startLoc: emojiLocations[0],
            length: emojiLocations[1] - emojiLocations[0],
          };
        }

        parsedEmotes
          .slice()
          .reverse()
          .forEach((emoteData) => {
            let textToReplace = newMessage.substr(
              emoteData.startLoc,
              emoteData.length + 1
            );

            var regexPattern = new RegExp(
              `(?<!s)${this.escapeRegExp(textToReplace)}(?!s)`,
              "g"
            );

            console.log(regexPattern);
            newMessage = newMessage.replace(regexPattern, emoteData.imageUrl);
          });

        return newMessage;
      }

      return message;
    },
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    },
    getMessageStyles(tags) {
      return {
        backgroundColor:
          tags["user-id"] === "151175705" ? "lightblue" : "white",
      };
    },
  },
};
</script>



<style scoped>
.fade-in {
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  -moz-animation: fadeIn ease 2s;
  -o-animation: fadeIn ease 2s;
  -ms-animation: fadeIn ease 2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.message-container {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
