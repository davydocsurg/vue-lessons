<template>
  <div class="container">
    <h2>The Super Quiz</h2>
    <hr />
    <div class="container col-xs-12 col-sm-offset-2 col-md-6 col-md-offset-3">
      <!-- <div class="card">
<div class="card-header"> What is 27 -122? </div>
<div class="card-body container"> -->
      <!-- <div class="row container p-3">
<button class="btn btn-primary mr-5">-12</button>
<button class="btn btn-primary ml-5">-133</button>
</div>
<div class="row container p-3">
<button class="btn btn-primary mr-5">-12</button>
<button class="btn btn-primary ml-5">-133</button>
</div> -->
      <!-- </div> -->
      <!-- </div> -->
      <transition name="flip" mode="out-in">
        <component
          :is="mode"
          @answered="answered($event)"
          @confirmed="mode = 'app-question'"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import Question from "@/components/quiz/Question.vue";
import Answer from "@/components/quiz/Answer.vue";

export default {
  data() {
    return {
      mode: "app-question",
    };
  },
  methods: {
    answered(isCorrect) {
      if (isCorrect) {
        this.mode = "app-answer";
      } else {
        this.mode = "app-question";
        alert("Wrong, try again!");
      }
    },
  },
  components: {
    appQuestion: Question,
    appAnswer: Answer,
  },
};
</script>

<style lang="css" scoped>
.container {
  justify-content: center !important;
}

.flip-enter {
  /* transform: rotateY(0deg); */
}

.flip-enter-active {
  animation: flip-in 0.6s ease-out;
}

.flip-leave {
  /* transform: rotateY(0deg); */
}

.flip-leave-active {
  animation: flip-out 0.6s ease-out;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
