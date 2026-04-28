<script setup lang="ts">
import { ref, watch } from "vue";
import { z, ZodError } from "zod";

const props = defineProps<{ email: string }>();

const isModalOpen = ref(false);
const voucherFileName = ref("Haz clic para subir tu voucher");
const isLoading = ref(false);
const error = ref("");
const zodServerErrors = ref<string[] | null>(null);
const successMessage = ref("");
const isFetchingDni = ref(false);
const dniError = ref("");
const areNamesLocked = ref(false);

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const registerUserSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido."),
  lastName: z.string().min(1, "El apellido es requerido."),
  institution: z.string().min(1, "La institución es requerida."),
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 dígitos."),
  numTicket: z.string(),
  email: z.string().email("Correo electrónico no válido."),
  telephone: z.string().regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos."),
  voucher: z
    .instanceof(File, { message: "El voucher es requerido." })
    .refine((file) => file.size > 0, "El voucher no puede estar vacío.")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
      `El tamaño máximo del archivo es de ${MAX_FILE_SIZE_MB}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se permiten formatos .jpeg, .jpg, .png y .webp."
    ),
});

const formValues = ref({
  firstName: "",
  lastName: "",
  institution: "",
  dni: "",
  numTicket: "",
  email: props.email,
  telephone: "",
  voucher: null as File | null,
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    formValues.value.voucher = target.files[0];
  }
};

const onSubmit = async () => {
  isLoading.value = true;
  error.value = "";
  zodServerErrors.value = null;
  successMessage.value = "";

  if (!formValues.value.voucher) {
    error.value = "Por favor, sube tu voucher de pago.";
    isLoading.value = false;
    return;
  }

  const formData = new FormData();

  Object.entries(formValues.value).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value);
    }
  });

  try {
    registerUserSchema.parse(Object.fromEntries(formData.entries()));

    const res = await fetch("/api/register-user", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Ocurrió un error en el registro.");
    }

    successMessage.value = result.message;

    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  } catch (err) {
    if (err instanceof ZodError) {
      zodServerErrors.value = err.errors.map((e) => e.message);
      return;
    }

    if (err instanceof Error) {
      error.value = err.message;
    }

    // console.error("Error: ", err);
  } finally {
    isLoading.value = false;
  }
};

const scrollToVisible = (event: FocusEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
};

const handleFetchUser = async () => {
  const dni = formValues.value.dni;

  if (dni.length !== 8 || !/^\d+$/.test(dni)) {
    dniError.value = "El DNI debe tener 8 dígitos numéricos.";
    return;
  }

  isFetchingDni.value = true;
  dniError.value = "";
  areNamesLocked.value = false;

  try {
    const res = await fetch(`/api/user/${dni}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo completar la búsqueda.");
    }

    formValues.value.firstName = data.nombres;
    formValues.value.lastName = `${data.apellido_paterno} ${data.apellido_materno}`;
    //no se esta usando esto
    areNamesLocked.value = true;
  } catch (err) {
    if (err instanceof Error) {
      dniError.value = err.message;
    } else {
      dniError.value = "Un error inesperado ocurrió.";
    }
    formValues.value.firstName = "";
    formValues.value.lastName = "";
  } finally {
    isFetchingDni.value = false;
  }
};

watch(
  () => formValues.value.voucher,
  (newFile) => {
    voucherFileName.value = newFile
      ? newFile.name
      : "Haz clic para subir tu voucher";
  }
);

watch(
  () => formValues.value.dni,
  () => {
    if (areNamesLocked.value) {
      areNamesLocked.value = false;
      formValues.value.firstName = "";
      formValues.value.lastName = "";
      dniError.value = "";
    }
  }
);

watch(
  () => formValues.value.dni,
  (newValue) => {
    formValues.value.dni = newValue.replace(/\D/g, "").slice(0, 8);
  }
);

watch(
  () => formValues.value.dni,
  async (dni) => {
    if (dni.length === 8) {
      await handleFetchUser();
    }
  }
);
</script>

<template>
  <section>
    <div class="max-w-2xl mx-auto">
      <div>
        <form
          v-if="!successMessage"
          @submit.prevent="onSubmit"
          class="space-y-3 text-white/70"
        >
          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-2">
              <label
                for="dni"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="M6 10h4m-4 4h4m4-4h4"></path>
                </svg>
                DNI *
              </label>

              <div class="flex gap-2">
                <input
                  v-model="formValues.dni"
                  id="dni"
                  type="text"
                  inputmode="numeric"
                  maxlength="8"
                  pattern="[0-9]*"
                  placeholder="Ingresa tu DNI"
                  required
                  @focus="scrollToVisible"
                  @keyup.enter="handleFetchUser"
                  class="px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
                />
                <button
                  type="button"
                  @click="handleFetchUser"
                  :disabled="isFetchingDni || formValues.dni.length !== 8"
                  class="flex-shrink-0 flex items-center justify-center p-2 cursor-pointer rounded-lg bg-blue-800 text-sm font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <span v-if="!isFetchingDni">Buscar</span>
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 text-white"
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
              </div>

              <p v-if="dniError" class="text-sm text-red-400 mt-1">
                {{ dniError }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                for="firstName"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Nombres *
              </label>
              <input
                v-model="formValues.firstName"
                id="firstName"
                type="text"
                placeholder="Ingresa tus nombres"
                @focus="scrollToVisible"
                required
                class="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div class="space-y-2">
              <label
                for="lastName"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Apellidos *
              </label>
              <input
                v-model="formValues.lastName"
                id="lastName"
                type="text"
                placeholder="Ingresa tus apellidos"
                @focus="scrollToVisible"
                required
                class="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                for="institution"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <line x1="9" y1="22" x2="9" y2="4"></line>
                  <line x1="15" y1="22" x2="15" y2="4"></line>
                  <line x1="2" y1="20" x2="22" y2="20"></line>
                </svg>
                Institución / Universidad *
              </label>
              <input
                v-model="formValues.institution"
                id="institution"
                type="text"
                placeholder="Nombre de tu institución"
                required
                @focus="scrollToVisible"
                class="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
              />
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Correo Electrónico *
              </label>
              <input
                id="email"
                type="email"
                :value="formValues.email"
                readonly
                class="w-full px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700 opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label
                for="telephone"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                Teléfono *
              </label>
              <input
                v-model="formValues.telephone"
                id="telephone"
                type="number"
                placeholder="Ingresa tu teléfono"
                required
                @focus="scrollToVisible"
                class="w-full px-2 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
              />
            </div>

            <div class="space-y-2">
              <label
                for="numTicket"
                class="text-sm font-medium flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-6 h-6"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Recibo / Voucher - número</title>
                  <!-- borde irregular como recibo -->
                  <path d="M6 4h24v26l-3-2-3 2-3-2-3 2-3-2-3 2V4z" />
                  <!-- líneas representando texto -->
                  <path d="M10 10h16" />
                  <path d="M10 14h16" />
                  <path d="M10 18h10" />
                  <!-- caja del número de voucher -->
                  <rect
                    x="22"
                    y="20"
                    width="8"
                    height="6"
                    rx="1"
                    ry="1"
                    fill="currentColor"
                  />
                  <text
                    x="26"
                    y="24.6"
                    text-anchor="middle"
                    font-size="4.2"
                    fill="#fff"
                    font-family="Arial, Helvetica, sans-serif"
                  ></text>
                </svg>

                Código del voucher de pago *
              </label>
              <div class="relative">
                <input
                  v-model="formValues.numTicket"
                  id="numTicket"
                  type="text"
                  placeholder="Código de operación"
                  required
                  @focus="scrollToVisible"
                  class="w-full px-2 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:ring-primary focus:border-primary transition"
                />
                <button
                  type="button"
                  @click="isModalOpen = true"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white/80 transition"
                  aria-label="Ver ejemplo de voucher"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="voucher"
              class="text-sm font-medium text-white/80 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
              >
                <path
                  d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                ></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Voucher de Pago *
            </label>
            <label
              for="voucher"
              class="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer block"
            >
              <input
                id="voucher"
                type="file"
                accept="image/png,image/webp,image/jpg,image/jpeg"
                class="hidden"
                @change="handleFileChange"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto text-primary mb-2 h-8 w-8"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p class="text-white/70">{{ voucherFileName }}</p>
              <p class="text-sm text-white/50 mt-1">
                PNG, JPG, WEBP (máx. 5MB)
              </p>
            </label>
          </div>

          <div
            v-if="zodServerErrors"
            class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-4"
          >
            <p class="font-medium mb-2">
              Por favor, corrige los siguientes errores:
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="(m, i) in zodServerErrors" :key="i">
                {{ m }}
              </li>
            </ul>
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
            class="w-full flex justify-center bg-blue-800 hover:bg-blue-900 cursor-pointer disabled:cursor-default items-center py-2 px-2 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            <span v-if="!isLoading">Completar Registro</span>
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

        <div v-if="successMessage" class="text-center animate-fade-in-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-16 w-16 text-green-400 mx-auto mb-4"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 class="text-2xl font-bold text-green-400">¡Registro Exitoso!</h3>
          <p class="text-white/80 mt-2">{{ successMessage }}</p>
          <p class="text-sm text-white/60 mt-4">
            Serás redirigido en unos segundos...
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      @click="isModalOpen = false"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div
        @click.stop
        class="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-11/12 relative text-white"
      >
        <button
          @click="isModalOpen = false"
          class="absolute top-3 right-3 text-white/50 hover:text-white transition"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3 class="text-xl font-bold mb-4">Ejemplo de Código de Voucher</h3>

        <div class="border border-slate-600 rounded-md overflow-hidden">
          <img
            src="/voucher-referencia.webp"
            alt="Ejemplo de un voucher de pago señalando el código de operación"
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>
