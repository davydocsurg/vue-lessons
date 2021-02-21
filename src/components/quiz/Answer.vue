<template>
  <div class="alert alert-success text-center">
    <h2>That's Correct!</h2>
    <hr />
    <button class="btn btn-primary" @click="onNextQuestion">
      Next Question
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onNextQuestion() {
      this.$emit("confirmed");
    },
  },
};
</script>
