<template>
  <div class="matrix-container" aria-label="Animación de texto estilo Matrix">
    <span
      v-for="(letter, index) in letters"
      :key="`${index}-${letter.char}`"
      class="letter"
      :class="{ 'matrix-active': letter.isMatrix }"
    >
      {{ letter.isSpace ? "&nbsp;" : letter.char }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface Props {
  text?: string;
  initialDelay?: number;
  letterAnimationDuration?: number;
  letterInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  text: "CINCIT",
  initialDelay: 350,
  letterAnimationDuration: 500,
  letterInterval: 100,
});

const letters = ref<LetterState[]>(
  props.text.split("").map((char) => ({
    char,
    isMatrix: false,
    isSpace: char === " ",
  }))
);

const getRandomChar = (): string => (Math.random() > 0.5 ? "1" : "0");

const animateLetter = (index: number) => {
  if (index >= letters.value.length) return;

  const letterState = letters.value[index];
  if (letterState.isSpace) return;

  letterState.char = getRandomChar();
  letterState.isMatrix = true;

  setTimeout(() => {
    letterState.char = props.text[index];
    letterState.isMatrix = false;
  }, props.letterAnimationDuration);
};

const startAnimation = () => {
  let currentIndex = 0;
  const animate = () => {
    if (currentIndex >= props.text.length) {
      return;
    }
    animateLetter(currentIndex);
    currentIndex++;
    setTimeout(animate, props.letterInterval);
  };
  animate();
};

onMounted(() => {
  setTimeout(startAnimation, props.initialDelay);
});
</script>

<style scoped>
.matrix-container {
  display: inline-block;
  background: linear-gradient(to right, #3b82f6, #0891b2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  font-weight: bold;
}

.letter {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease-in-out, text-shadow 0.2s ease-in-out;
}

.matrix-active {
  color: #155dfc;
  text-shadow: 0 2px 4px rgba(21, 93, 252, 0.5);
}
</style>
