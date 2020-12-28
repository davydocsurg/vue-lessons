<template>
  <div class="about">
    <transition name="fade">
    <h1>This is an about page</h1>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: all 1s;
}

.fade-leave{

}

.fade-leave-active{
  transition: all 1s;
  opacity: 0;
}
</style>