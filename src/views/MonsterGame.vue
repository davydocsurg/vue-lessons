<template>
  <div id="app">
    <div class="container card mt-5 pd-4">
      <section class="d-flex charac">
        <!-- avatar -->
        <div class="container col-md-6">
          <h6>Avatar</h6>
          <div class="progress healthbar text-center">
            <div
              class="healthbar progress-bar"
              style="background-color: green; margin: 0; color: white;"
              :style="{ width: playerHealth + '%' }"
            >
              <b class="text-center">
                {{ playerHealth }}
              </b>
            </div>
          </div>
        </div>

        <!-- monster -->
        <div class="container col-md-6">
          <h6>Monster</h6>
          <div class="progress healthbar text-center">
            <div
              class="healthbar progress-bar"
              style="background-color: green; margin: 0; color: white;"
              :style="{ width: monsterHealth + '%' }"
            >
              <b class="text-center">
                {{ monsterHealth }}
              </b>
            </div>
          </div>
        </div>
      </section>
      <section v-if="!gameIsRunning">
        <div class="controls">
          <button
            id="start-game"
            class="btn btn-primary btn-lg"
            @click="startGame"
          >
            Start Game
          </button>
        </div>
      </section>
      <section class="" v-else>
        <div class="row controls acts">
          <button id="attack" class="btn btn-info shadow-lg" @click="attack">
            Attack
          </button>
          <button
            id="special-attack"
            class="btn btn-warning ml-2"
            @click="specialAttack"
          >
            Special Attack
          </button>
          <button id="heal" class="btn btn-success ml-2" @click="heal">
            Heal
          </button>
          <button id="give-up" class="btn btn-danger ml-2" @click="giveUp">
            Give Up
          </button>
        </div>
      </section>
      <section class="row log container">
        <div
          class="small-12 columns text-center card mb-5"
          v-if="rounds.length > 0"
        >
          <ul class="text-center">
            <li
              v-for="round in rounds"
              :key="round"
              class="text-center mr-5"
              :class="{
                'player-turn': round.isPlayer,
                'monster-turn': !round.isPlayer,
              }"
            >
              {{ round.text }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      rounds: [],
    };
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.rounds = [];
    },
    attack: function () {
      // player attack
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.rounds.unshift({
        isPlayer: true,
        text: "Avatar hits Monster " + damage + " times",
      });
      if (this.checkStatus()) {
        return;
      }

      // monster attack
      this.monsterHits();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      if (this.checkStatus()) {
        return;
      }
      this.monsterHits();
      this.rounds.unshift({
        isPlayer: true,
        text: "Avatar hits Monster " + damage + " times harder",
      });
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.rounds.unshift({
        isPlayer: true,
        text: "Avatar gains 10 heals",
      });
      this.monsterHits();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    monsterHits: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkStatus();
      this.rounds.unshift({
        isPlayer: false,
        text: "Monster hits Avatar " + damage + " times",
      });
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkStatus: function () {
      // if player wins
      if (this.monsterHealth <= 0) {
        if (confirm("Avatar won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Avatar lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="css">
.charac {
  padding: 2rem;
  text-align: center !important;
  justify-content: center !important;
}

.card {
  justify-content: center !important;
  text-align: center !important;
}

.healthbar {
  background-color: rgb(185, 190, 185);
  color: white !important;
  width: 80%;
  /* margin: auto; */
  transition: width 500ms;
  /* margin: 100px !important; */
  /* height: 40% !important; */
  /* border: transparent 1px solid;
	border-radius: 4%; */
}

.controls,
.log {
  margin-top: 30px;
  text-align: center;
  justify-content: center !important;
  /* padding: 10px; */
  /* border: 1px solid #cccccc;
    box-shadow: 0px 3px 6px #cccccc; */
}

.turn {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
}

.log ul {
  list-style: none;
  font-weight: bold;
  justify-content: center !important;
  text-align: center !important;
  /* text-transform: uppercase; */
}

.log ul li {
  justify-content: center !important;
  text-align: center !important;
  margin: 5px;
}

.log ul .player-turn {
  color: blue;
  background-color: #e4e9ff;
}

.log ul .monster-turn {
  color: red;
  background-color: #ffc0c1;
}

button {
  font-size: 20px;
  background-color: #eee;
  padding: 12px;
}

.acts {
  justify-content: center !important;
  text-align: center !important;
}
</style>
