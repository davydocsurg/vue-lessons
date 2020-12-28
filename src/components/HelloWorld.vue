<template>
  <div class="container mb-4">
    <div class="card shadow-lg bg-dark text-white">
      <div class="card-header"><strong>Vue Animations</strong></div>
      <div class="card-body mt-4 mb-4">
        <select name="" id="" v-model="alertAnimation" class="form-control">
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <br /><br />
        <button class="btn btn-primary" @click="show = !show">
          Show Alert
        </button>
        <br />
        <br />

        <br />
        <transition :name="alertAnimation">
          <div class="alert alert-success" v-if="show">This is a success!</div>
        </transition>

        <transition :name="alertAnimation" type="animation">
          <div class="alert alert-danger" v-if="show">This is danger!</div>
        </transition>

        <transition
          appear=""
          enter-active-class="animated flip"
          leave-active-class="animated backOutRight"
        >
          <div class="alert alert-warning" v-if="show">This is a warning!</div>
        </transition>

         <transition
          appear=""
          enter-active-class="animated hinge"
          leave-active-class="animated lightSpeedOutRight"
        >
          <div class="alert alert-secondary" v-if="show">This is a secondary alert!</div>
        </transition>

        <transition :name="alertAnimation" mode="out-in">
          <div class="alert alert-success" v-if="show" key="success">
            This is a success!
          </div>
          <div class="alert alert-primary" v-else key="sec">
            This is a primary!
          </div>
        </transition>

        <hr />
        <button class="btn btn-success" @click="load = !load">
          LOAD/REMOVE
        </button>
        <br /><br />
        <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false"
        >
          <!-- <b-progress-bar style="width: 20rem; height: 3rem;" v-if="load"></b-progress-bar> -->
          <progress
            style="width: 20rem; height: 3rem;"
            v-if="load"
            class="bg-danger mb-3"
            key="progress"
          ></progress>
          <div class="progress mb-3" key="progressBar" v-if="load">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="20"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            class="bg-danger"
            style="width: 20rem; height: 3rem; border-radius: 50px;"
            v-if="load"
            key="dange"
          ></div>
        </transition-group>
        <hr />
        <button
          class="btn btn-warning"
          @click="
            selectedComponent == 'SuccessAlert'
              ? (selectedComponent = 'DangerAlert')
              : (selectedComponent = 'SuccessAlert')
          "
        >
          Toggle Component
        </button>
        <br /><br />
        <transition name="fade" mode="out-in">
          <component :is="selectedComponent"></component>
        </transition>
        <br />
        <hr />
        <button class="btn btn-sm btn-secondary" @click="addItem">
          Add Item
        </button>
        <br /><br />
        <div class="mb-4">
          <ul class="list-group">
          <transition-group name="slide">
            <li
              class="list-group-item text-dark num"
              v-for="(number, index) in numbers"
              @click="removeItem(index)"
              style="cursor: pointer;"
              :key="number"
            >
              {{ number }}
            </li>
          </transition-group>
        </ul>
        </div>
        <div class="card-footer">Vue animes</div>
      </div>
    </div>
  </div>
</template>

<script>
import SuccessAlert from "./SuccessAlert.vue";
import DangerAlert from "./DangerAlert.vue";

export default {
  name: "HelloWorld",

  // props: {
  //   msg: String
  // }

  data() {
    return {
      show: false,
      load: false,
      alertAnimation: "fade",
      elWidth: 20,
      selectedComponent: "SuccessAlert",
      numbers: [1, 2, 3, 4, 5, 6],
    };
  },

  methods: {
    beforeEnter(el) {
      console.log("beforeEnter");
      this.elWidth = 20;
      el.style.width = this.elWidth + "rem";
    },
    enter(el, done) {
      console.log("enter");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elWidth + round * 2 + "rem";
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 30);
    },
    afterEnter(el) {
      console.log("afterEnter");
    },
    enterCancelled(el) {
      console.log("enterCancelled");
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      this.elWidth = 20;
      el.style.width = this.elWidth + "rem";
    },
    leave(el, done) {
      console.log("leave");
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = this.elWidth - round * 2 + "rem";
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 30);
    },
    afterLeave(el) {
      console.log("afterLeave");
    },
    leaveCancelled(el) {
      console.log("leaveCancelled");
    },
    addItem() {
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1);
    },
    removeItem(index) {
      this.numbers.splice(index, 1);
    },
  },

  components: {
    SuccessAlert,
    DangerAlert,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}

//
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1.3s ease-out forwards;
  transition: opacity 1s;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateY(20rem);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  to {
    transform: translateY(20px);
  }

  from {
    transform: translateY(0);
  }
}

.num:hover {
  background-color: #ffe2e2;
  box-shadow: 1px 1px 4px rgb(26, 189, 153);
}
</style>
