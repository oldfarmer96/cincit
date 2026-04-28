<script setup lang="ts">
import { onMounted, ref } from "vue";
const STORAGE_KEY = "verificationProgress";

const step = ref<"email" | "otp">("email");
const email = ref("");
const otp = ref("");
const isLoading = ref(false);
const error = ref("");

onMounted(() => {
  const savedProgress = localStorage.getItem(STORAGE_KEY);
  if (savedProgress) {
    try {
      const { savedEmail, savedStep } = JSON.parse(savedProgress);
      // Si el estado guardado era el paso del OTP, lo restauramos
      if (savedStep === "otp" && savedEmail) {
        email.value = savedEmail;
        step.value = savedStep;
      }
    } catch (e) {
      console.error("Error al parsear el estado guardado:", e);
      // Si hay un error con los datos guardados, los limpiamos.
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});

const onEmailSubmit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Ocurrió un error.");
    }
    step.value = "otp";
    // 3. Guardar el progreso en Local Storage
    const progressToSave = { savedEmail: email.value, savedStep: "otp" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToSave));
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const onOtpSubmit = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, code: otp.value }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Ocurrió un error.");
    }

    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "/completar-registro";
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const handleBackToEmail = () => {
  localStorage.removeItem(STORAGE_KEY);
  step.value = "email";
  error.value = "";
  otp.value = "";
};

const scrollToVisible = (event: FocusEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
};
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="text-3xl md:text-5xl mb-4 text-gradient font-bold mt-6">
        REGISTRO
      </h2>
    </div>

    <div class="flex items-center justify-center">
      <div
        v-if="step === 'email'"
        class="w-full max-w-md p-2 md:p-4 bg-slate-900/50"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gradient mb-4">
            Primero verifica tu correo
          </h2>
          <div class="p-2 rounded-xl text-left border-white/5 bg-gray-800/40">
            <h4 class="font-semibold text-white/90 mb-2">
              Pasos para registrarse:
            </h4>
            <ul class="text-sm text-white/70 space-y-1 list-disc pl-5">
              <li>Ingresa tu correo electrónico.</li>
              <li>Recibirás un código de verificación.</li>
              <li>Ingresa el código para validar tu correo.</li>
              <li>
                Completa el formulario de inscripción con tu voucher de pago.
              </li>
            </ul>
          </div>
        </div>
        <form @submit.prevent="onEmailSubmit" class="space-y-4 mt-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-white/80 mb-2"
              >Correo Electrónico</label
            >
            <input
              v-model="email"
              id="email"
              type="email"
              name="email"
              placeholder="tu-correo@ejemplo.com"
              required
              @focus="scrollToVisible"
              class="w-full text-white/70 px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700 transition"
            />
          </div>
          <div
            v-if="error"
            class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3"
          >
            {{ error }}
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center py-1 px-2 rounded-lg bg-blue-800 text-white/70 cursor-pointer hover:bg-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-default"
          >
            <span v-if="!isLoading">Enviar Código</span>
            <svg
              v-else
              class="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      <div v-else class="w-full max-w-md p-2 md:p-4 bg-slate-900/50">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white/90">Verificar Código</h2>
          <p class="text-sm text-white/70 mt-2">
            Ingresa el código de 6 dígitos enviado a
            <span class="font-bold text-primary">{{ email }}</span>
          </p>
        </div>
        <form @submit.prevent="onOtpSubmit" class="space-y-6 mt-6">
          <div>
            <label for="otp" class="sr-only">Código de Verificación</label>
            <input
              v-model="otp"
              id="otp"
              type="text"
              maxlength="6"
              pattern="\d{6}"
              required
              @focus="scrollToVisible"
              placeholder=""
              class="w-full text-center text-white/70 tracking-[1em] px-2 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-white/70 transition"
            />
          </div>
          <div
            v-if="error"
            class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3"
          >
            {{ error }}
          </div>
          <div class="space-y-3">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center items-center py-1 px-2 rounded-lg text-white/70 bg-blue-800 hover:bg-blue-900 transition-all duration-300 disabled:opacity-50"
            >
              <span v-if="!isLoading">Verificar Código</span>
              <svg
                v-else
                class="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              @click="handleBackToEmail"
              class="w-full py-1 px-2 rounded-lg bg-transparent text-white/70 hover:bg-slate-800/50 border border-slate-700 transition-colors"
            >
              Cambiar Email
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
