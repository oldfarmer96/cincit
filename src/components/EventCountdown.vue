<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

const calculateTimeLeft = (distance: number) => {
  if (distance > 0) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const formatValue = (value: number) => value.toString().padStart(2, "0");

const dateStr = "2025-11-10 08:00";
const eventDate = new Date(`${dateStr.replace(" ", "T")}:00-05:00`).getTime();
let timer: number | undefined;

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const isEventActive = ref(false);
const isHydrated = ref(false);

const timeUnits = computed(() => [
  { label: "Días", value: timeLeft.value.days },
  { label: "Horas", value: timeLeft.value.hours },
  { label: "Min", value: timeLeft.value.minutes },
  { label: "Seg", value: timeLeft.value.seconds },
]);

onMounted(async () => {
  await nextTick();

  const updateCountdown = () => {
    const newDistance = eventDate - new Date().getTime();
    if (newDistance <= 0) {
      isEventActive.value = true;
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (timer) window.clearInterval(timer);
    } else {
      timeLeft.value = calculateTimeLeft(newDistance);
    }
  };

  updateCountdown();

  isHydrated.value = true;

  if (!isEventActive.value) {
    timer = window.setInterval(updateCountdown, 1000);
  }
});

onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<template>
  <div
    v-if="!isHydrated"
    class="flex items-center justify-center lg:items-start lg:justify-start"
  >
    <div class="grid grid-cols-4">
      <div
        v-for="unitLabel in ['Días', 'Horas', 'Min', 'Seg']"
        :key="unitLabel"
        class="p-4 bg-slate-800/40 mx-1 rounded-lg cursor-default text-center"
      >
        <div class="text-3xl font-bold text-gradient text-white/70 mb-1">
          00
        </div>
        <div class="text-white/70 text-sm">{{ unitLabel }}</div>
      </div>
    </div>
  </div>

  <template v-else>
    <div v-if="isEventActive" class="mt-6 text-center lg:text-left">
      <h2 class="text-4xl font-bold text-white/70 animate-pulse">
        ¡EVENTO FINALIZADO!
      </h2>
    </div>

    <div
      v-else
      class="flex items-center justify-center lg:items-start lg:justify-start"
    >
      <div class="grid grid-cols-4">
        <div
          v-for="(unit, index) in timeUnits"
          :key="unit.label"
          class="p-4 bg-slate-800/40 mx-1 rounded-lg cursor-default text-center"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="text-3xl font-bold text-gradient text-white/70 mb-1">
            {{ formatValue(unit.value) }}
          </div>
          <div class="text-white/70 text-sm">{{ unit.label }}</div>
        </div>
      </div>
    </div>
  </template>
</template>
