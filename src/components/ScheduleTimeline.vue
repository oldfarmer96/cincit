<script setup lang="ts">
import { ref } from "vue";
import type { ScheduleEvent } from "@/interfaces/timeLine.interface";
import ScheduleIcons from "./ui/ScheduleIcons.vue";

const scheduleData: { [key: string]: ScheduleEvent[] } = {
  dia1: [
    {
      time: "08:30 - 09:40",
      type: "ceremonia",
      title: "Inaguración",
      description: "Bienvenida oficial y presentación de CINCIT 2025",
      location: "Auditorio Principal",
    },
    {
      time: "10:00 - 11:10",
      type: "ponencia",
      title: "Data Analytics e Inteligencia Artificial en Power BI",
      description: "",
      speaker: {
        name: "ING. RENZO MARTIN ROCA RAMOS",
        linkedin: "https://www.linkedin.com/in/rocarenzo/",
        website: "https://flow.page/renzoroca",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Consultor de Proyectos de Business Intelligence, Business Analytics y Big Data",
        topic: "",
        image: "/ponentes/RenzoRocaRamos.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:30 - 12:40",
      type: "ponencia",
      title: "Ciberseguridad",
      description: "",
      speaker: {
        name: "DR. FELIX ELOY JIMENEZ CHUQUE",
        linkedin: "https://www.linkedin.com/in/fjimenezchuque",
        website: "https://www.govtech.pe/",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Ciberseguridad, Gobierno Digital, Sistemas de Identificación Biométrica, Digitalización.",
        topic: "",
        image: "/ponentes/FelixEloyJiminezChuque.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "13:00 - 13:30",
      type: "talleres",
      title: "Horario de registro para los talleres disponibles",
      description: "",
      location: "",
    },
    {
      time: "13:30 - 15:00",
      type: "descanso",
      title: "Pausa para el almuerzo y comida",
      description: "",
      location: "",
    },
    {
      time: "15:00 - 16:30",
      type: "talleres",
      title: "Talleres Prácticos",
      description: "",
      location: "Laboratorios EPIS",
    },
  ],
  dia2: [
    {
      time: "08:30 - 09:40",
      type: "ponencia",
      title:
        "Creando mi primer chatbot con IA Generativa en la nube con Azure Foundry",
      description: "",
      speaker: {
        name: "ING. TONY STIVENSON TRUJILLO DAVILA",
        linkedin: "https://www.linkedin.com/in/tonytec/",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Especialista en Arquitectura de Datos y soluciones Big Data en la nube orientadas a la optimización del negocio.",
        topic: "",
        image: "/ponentes/TONYSTIVENSONTRUJILLODAVILA.webp",
      },
      location: "Auditorio Principal",
    },

    {
      time: "10:00 - 11:10",
      type: "ponencia",
      title:
        "Reconocimiento de cultivos agrícolas en distintas etapas de desarrollo mediante visión artificial y clasificación supervisada de imágenes Sentinel-2",
      description: "",
      speaker: {
        name: "DRA. ANTONIA MACEDO CRUZ",
        title: "",
        website: "https://amexcomp.mx/members/view-account/371/",
        institution: "",
        orcid: "",
        specialty:
          "Hidrociencias, Teledetección, Visión Artificial aplicada a la agricultura y recursos naturales, Geomática.",
        topic: "",
        image: "/ponentes/AntoniaMacedoCruz.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:30 - 12:40",
      type: "ponencia",
      title:
        "Oportunidades y Networking: Cómo un Posgrado en el Extranjero Transformó mi Carrera",
      description: "",
      speaker: {
        name: "MG. RUTH HUAMAN ALLCCAHUAMAN",
        linkedin: "https://www.linkedin.com/in/ruth-m-huaman-a-a536b8174/",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Ciencias de la computación , Inteligencia de Negocios (Business Intelligence), Aprendizaje Profundo por Refuerzo.",
        topic: "",
        image: "/ponentes/RuthHuamanA.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "13:00 - 13:30",
      type: "talleres",
      title: "Horario de registro para los talleres disponibles",
      description: "",
      location: "",
    },
    {
      time: "13:30 - 15:00",
      type: "descanso",
      title: "Pausa para el almuerzo y comida",
      description: "",
      location: "",
    },
    {
      time: "15:00 - 16:30",
      type: "talleres",
      title: "Talleres Prácticos",
      description: "",
      location: "Laboratorios EPIS",
    },
  ],
  dia3: [
    {
      time: "08:30 - 09:40",
      type: "ponencia",
      title:
        "Arquitecturas distribuidas en la etapa del desarrollo de software (Mricrofrontend como solución de escalabilidad en el desarrollo frontal)",
      description: "",
      speaker: {
        name: "MG. KEVIN ARNOLD ARIAS FIGUEROA",
        linkedin: "https://www.linkedin.com/in/kevin-arnold-af/",
        website:
          "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=301361",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Arquitectura de Software, Desarrollo de software empresarial, Gestión de Tecnologías de la Información.",
        topic: "",
        image: "/ponentes/KevinArnoldAriasFigueroa.webp",
      },
      location: "Auditorio Principal",
    },

    {
      time: "10:00 - 11:10",
      type: "ponencia",
      title: "Cosas que debes considerar antes de egresar",
      description: "",
      speaker: {
        name: "ING. ARELIS ALEJANDRA REYES GUERRA",
        linkedin: "https://www.linkedin.com/in/arelis-reyes/",
        website: "https://website.beacons.ai/arelis_reyes/cv",
        tiktok: "https://www.tiktok.com/@arelis_reyes",
        youtube: "https://www.youtube.com/@arelis_reyes19",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Creadora de Contenido Digital sobre Tecnología, Programación y programación de Videojuegos.",
        topic: "",
        image: "/ponentes/ArelisReyes.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:30 - 12:40",
      type: "ponencia",
      title: "Dispositivo para enseñanza del alfabeto Braille a niños ciegos",
      description: "",
      speaker: {
        name: "DR. MANUEL JESUS IBARRA CABRERA",
        website:
          "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=2511",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Ingeniería de software, informática educativa, juegos educativos, computación móvil y sistemas colaborativos.",
        topic: "",
        image: "/ponentes/ManuelJesusIbarraCabrera.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "13:00 - 13:30",
      type: "talleres",
      title: "Horario de registro para los talleres disponibles",
      description: "",
      location: "",
    },
    {
      time: "13:30 - 15:00",
      type: "descanso",
      title: "Pausa para el almuerzo y comida",
      description: "",
      location: "",
    },
    {
      time: "15:00 - 16:30",
      type: "talleres",
      title: "Talleres Prácticos",
      description: "",
      location: "Laboratorios EPIS",
    },
  ],
  dia4: [
    {
      time: "08:30 - 09:40",
      type: "ponencia",
      title: "Power BI y analítica empresarial",
      description: "",
      speaker: {
        name: "MG. JORGE ALBERTO PRADO PALOMINO",
        website:
          "https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=56759",
        title: "",
        institution: "",
        orcid: "",
        specialty: "Administración, Finanzas, Negocios.",
        topic: "",
        image: "/ponentes/JorgeAlbertoPradoPalomino.webp",
      },
      location: "Auditorio Principal",
    },

    {
      time: "10:00 - 11:10",
      type: "ponencia",
      title:
        "Ética y sesgos en la inteligencia artificial aplicada a la industria",
      description: "",
      speaker: {
        name: "ING. SHEILA STEFANY CCAHUA CHAVEZ",
        linkedin: "https://www.linkedin.com/in/sheilastccahua/",
        website: "https://linktr.ee/stefachav",
        tiktok: "https://www.tiktok.com/@stefachav",
        title: "",
        institution: "",
        orcid: "",
        specialty:
          "Data Scientist (Senior), Investigación Operativa, Desarrollo de modelos predictivos y visualización de datos.",
        topic: "",
        image: "/ponentes/SheylaCcachuaChavez.webp",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:30 - 12:40",
      type: "talleres",
      title: "Concurso de proyectos",
      description: "",
      speaker: {
        name: "",
        title: "",
        institution: "",
        orcid: "",
        specialty: "",
        topic: "",
        image: "",
      },
      location: "Auditorio Principal",
    },
    {
      time: "13:00 - 13:30",
      type: "ceremonia",
      title: "Clausura del evento",
      description: "",
      location: "",
    },
    {
      time: "13:30 - 15:00",
      type: "descanso",
      title: "Pausa para el almuerzo y comida",
      description: "",
      location: "",
    },
    {
      time: "16:00 - 17:00",
      type: "ceremonia",
      title: "Tarde de confraternidad",
      description: "",
      location: "",
    },
  ],
};

const eventDays = [
  {
    date: "10 Noviembre 2025",
    day: "Día 1",
  },
  {
    date: "11 Noviembre 2025",
    day: "Día 2",
  },
  {
    date: "12 Noviembre 2025",
    day: "Día 3",
  },
  {
    date: "13 Noviembre 2025",
    day: "Día 4",
  },
];

const activeTab = ref("dia1");

const getEventTypeColor = (type: ScheduleEvent["type"]) => {
  switch (type) {
    case "ponencia":
      return "border-blue-500 bg-blue-500/5";
    case "talleres":
      return "border-green-500 bg-green-500/5";
    case "ceremonia":
      return "border-purple-500 bg-purple-500/5";
    case "descanso":
      return "border-amber-500 bg-amber-500/5";
    default:
      return "border-border bg-card";
  }
};

const getEventIconColor = (type: ScheduleEvent["type"]) => {
  switch (type) {
    case "ponencia":
      return "text-blue-500";
    case "talleres":
      return "text-green-500";
    case "ceremonia":
      return "text-purple-500";
    case "descanso":
      return "text-amber-500";
    default:
      return "";
  }
};
</script>

<template>
  <section class="py-8 md:py-16 px-4 mb-16">
    <div class="w-full">
      <div
        class="grid w-full grid-cols-4 max-w-4xl mx-auto mb-12 h-auto bg-gray-900/90 p-2 rounded-xl"
      >
        <button
          v-for="(day, index) in eventDays"
          :key="index"
          @click="activeTab = `dia${index + 1}`"
          :class="[
            'flex flex-col p-4 h-auto rounded-lg transition-all duration-200 cursor-pointer',
            activeTab === `dia${index + 1}`
              ? 'bg-gray-800 border border-white/20'
              : 'border border-transparent',
          ]"
        >
          <span class="font-bold text-base text-white/70">{{ day.day }}</span>
          <span
            class="text-xs md:text-sm opacity-90 mt-1 break-words text-center text-white/70"
            >{{ day.date }}</span
          >
        </button>
      </div>

      <div v-for="(events, day) in scheduleData" :key="day">
        <div
          v-if="activeTab === day"
          class="relative flex flex-col items-center gap-8 max-w-6xl mx-auto"
        >
          <div
            class="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-800/60 hidden md:block"
          ></div>

          <div
            v-for="(event, index) in events"
            :key="`${day}-${index}`"
            class="relative flex items-center w-full"
          >
            <template v-if="true">
              <div
                :class="[
                  'hidden md:flex w-1/2',
                  index % 2 !== 0 ? 'justify-start' : 'justify-end pr-8',
                ]"
              >
                <div
                  v-if="index % 2 === 0"
                  :class="[
                    'w-full max-w-lg animate-fade-in-up',
                    getEventTypeColor(event.type),
                  ]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!-- izquierdo -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span class="">{{ event.time }}</span>

                      <div
                        v-if="event.location"
                        class="flex justify-center items-center gap-2"
                      >
                        <svg
                          class="stroke-current h-4 w-4"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                          />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span class="">{{ event.location }}</span>
                      </div>
                    </div>
                    <h3 class="text-lg font-bold text-white/70">
                      {{ event.title }}
                    </h3>
                    <p class="text-sm">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        v-if="event.speaker.image"
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>

                        <div class="flex gap-2 justify-start items-center">
                          <a
                            v-if="event.speaker.linkedin"
                            target="_blank"
                            :href="event.speaker.linkedin"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                              />
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.website"
                            target="_blank"
                            v-if="event.speaker.website"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 48 48"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                              >
                                <path
                                  stroke-linejoin="round"
                                  d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"
                                />
                                <path
                                  stroke-linejoin="round"
                                  d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"
                                />
                                <path
                                  stroke-linecap="round"
                                  d="M4.5 31h39m-39-14h39"
                                />
                              </g>
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.tiktok"
                            target="_blank"
                            v-if="event.speaker.tiktok"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M16 1h-3.5v15.5c0 1.5-1.5 3-3 3s-3-.5-3-3c0-2 1.899-3.339 3.5-3V10c-6.12 0-7 5-7 6.5S3.977 23 9.5 23c4.522 0 6.5-3.5 6.5-6V8c1.146 1.018 2.922 1.357 5 1.5V6c-3.017 0-5-2.654-5-5"
                              />
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.youtube"
                            target="_blank"
                            v-if="event.speaker.youtube"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                              />
                            </svg>
                          </a>
                        </div>
                        <p
                          v-if="event.speaker.title"
                          class="text-xs text-muted-foreground mb-2"
                        >
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div class="flex items-center gap-1">
                            <!-- <Icon name="lucide:building" class="h-3 w-3" /> -->

                            <div v-if="event.speaker.institution">
                              <svg
                                class="stroke-current h-3 w-3"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                                />
                                <path d="M6 12h4" />
                                <path d="M6 16h4" />
                                <path d="M16 12h2" />
                                <path d="M16 16h2" />
                                <path d="M16 20h2" />
                                <path d="M6 20h4" />
                                <path d="M14 12h2" />
                                <path d="M14 16h2" />
                              </svg>
                              <!-- <Building class="h-3 w-3" /> -->
                              <span class="truncate">
                                {{ event.speaker.institution }}</span
                              >
                            </div>
                          </div>
                          <p v-if="event.speaker.specialty">
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p v-if="event.speaker.topic">
                            <strong>Enfoque:</strong>
                            {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- END -->
                </div>
              </div>

              <div
                class="relative z-10 flex-col items-center flex-shrink-0 hidden md:flex"
              >
                <div
                  :class="[
                    'flex flex-col items-center justify-center h-20 w-20 rounded-full border-4 shadow-lg',
                    getEventTypeColor(event.type),
                  ]"
                >
                  <ScheduleIcons
                    :type="event.type"
                    :class-name="getEventIconColor(event.type) + ' h-5 w-5'"
                  />
                  <p
                    class="text-xs font-bold mt-1 text-center leading-tight text-white/70"
                  >
                    {{ event.time.split(" - ")[0] }}
                  </p>
                </div>
              </div>

              <div
                :class="[
                  'hidden md:flex w-1/2',
                  index % 2 !== 0 ? 'pl-8' : 'justify-start',
                ]"
              >
                <div
                  v-if="index % 2 !== 0"
                  :class="[
                    'w-full max-w-lg animate-fade-in-up',
                    getEventTypeColor(event.type),
                  ]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!--  derecho  -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span class="">{{ event.time }}</span>

                      <div
                        v-if="event.location"
                        class="flex justify-center items-center gap-2"
                      >
                        <svg
                          class="stroke-current h-4 w-4"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                          />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span class="">{{ event.location }}</span>
                      </div>
                    </div>
                    <h3 class="text-lg font-bold">
                      {{ event.title }}
                    </h3>
                    <p class="text-sm">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        v-if="event.speaker.image"
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>

                        <div class="flex gap-2 justify-start items-center">
                          <a
                            v-if="event.speaker.linkedin"
                            target="_blank"
                            :href="event.speaker.linkedin"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                              />
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.website"
                            target="_blank"
                            v-if="event.speaker.website"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 48 48"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                              >
                                <path
                                  stroke-linejoin="round"
                                  d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"
                                />
                                <path
                                  stroke-linejoin="round"
                                  d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"
                                />
                                <path
                                  stroke-linecap="round"
                                  d="M4.5 31h39m-39-14h39"
                                />
                              </g>
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.tiktok"
                            target="_blank"
                            v-if="event.speaker.tiktok"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M16 1h-3.5v15.5c0 1.5-1.5 3-3 3s-3-.5-3-3c0-2 1.899-3.339 3.5-3V10c-6.12 0-7 5-7 6.5S3.977 23 9.5 23c4.522 0 6.5-3.5 6.5-6V8c1.146 1.018 2.922 1.357 5 1.5V6c-3.017 0-5-2.654-5-5"
                              />
                            </svg>
                          </a>

                          <a
                            :href="event.speaker.youtube"
                            target="_blank"
                            v-if="event.speaker.youtube"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                              />
                            </svg>
                          </a>
                        </div>
                        <p
                          v-if="event.speaker.title"
                          class="text-xs text-muted-foreground mb-2"
                        >
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div
                            v-if="event.speaker.institution"
                            class="flex items-center gap-1"
                          >
                            <!-- <Icon name="lucide:building" class="h-3 w-3" /> -->
                            <svg
                              class="stroke-current h-3 w-3"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                              />
                              <path d="M6 12h4" />
                              <path d="M6 16h4" />
                              <path d="M16 12h2" />
                              <path d="M16 16h2" />
                              <path d="M16 20h2" />
                              <path d="M6 20h4" />
                              <path d="M14 12h2" />
                              <path d="M14 16h2" />
                            </svg>
                            <!-- <Building class="h-3 w-3" /> -->
                            <span class="truncate">{{
                              event.speaker.institution
                            }}</span>
                          </div>
                          <p v-if="event.speaker.specialty">
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p v-if="event.speaker.topic">
                            <strong>Enfoque:</strong> {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END -->
                </div>
              </div>

              <div class="md:hidden w-full flex flex-col items-center">
                <div
                  class="relative z-10 flex flex-col items-center flex-shrink-0 mb-4"
                >
                  <div
                    :class="[
                      'flex flex-col items-center justify-center h-16 w-16 rounded-full border-4 shadow-lg',
                      getEventTypeColor(event.type),
                    ]"
                  >
                    <ScheduleIcons
                      :type="event.type"
                      :class-name="getEventIconColor(event.type) + ' h-5 w-5'"
                    />
                    <p
                      class="text-xs font-bold mt-1 text-center leading-tight text-white/70"
                    >
                      {{ event.time.split(" - ")[0] }}
                    </p>
                  </div>
                </div>

                <div
                  :class="['w-full', getEventTypeColor(event.type)]"
                  class="rounded-xl border p-4 text-white/70"
                >
                  <!-- mobile -->
                  <div class="pb-3">
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <svg
                        class="stroke-current h-4 w-4"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{{ event.time }}</span>
                    </div>
                    <div
                      class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                    >
                      <div
                        v-if="event.location"
                        class="flex justify-center items-center gap-2"
                      >
                        <svg
                          class="stroke-current h-4 w-4"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                          />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{{ event.location }}</span>
                      </div>
                    </div>
                    <h3 class="text-lg font-bold">{{ event.title }}</h3>
                    <p class="text-sm text-muted-foreground">
                      {{ event.description }}
                    </p>
                  </div>

                  <div v-if="event.speaker" class="pt-0">
                    <div class="flex items-start gap-4 mt-4">
                      <img
                        v-if="event.speaker.image"
                        :src="event.speaker.image || '/placeholder.svg'"
                        :alt="event.speaker.name"
                        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-primary mb-1">
                          {{ event.speaker.name }}
                        </p>
                        <div class="flex gap-2 justify-start items-center">
                          <a
                            v-if="event.speaker.linkedin"
                            target="_blank"
                            :href="event.speaker.linkedin"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                              />
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.website"
                            target="_blank"
                            v-if="event.speaker.website"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 48 48"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                              >
                                <path
                                  stroke-linejoin="round"
                                  d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"
                                />
                                <path
                                  stroke-linejoin="round"
                                  d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"
                                />
                                <path
                                  stroke-linecap="round"
                                  d="M4.5 31h39m-39-14h39"
                                />
                              </g>
                            </svg>
                          </a>
                          <a
                            :href="event.speaker.tiktok"
                            target="_blank"
                            v-if="event.speaker.tiktok"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M16 1h-3.5v15.5c0 1.5-1.5 3-3 3s-3-.5-3-3c0-2 1.899-3.339 3.5-3V10c-6.12 0-7 5-7 6.5S3.977 23 9.5 23c4.522 0 6.5-3.5 6.5-6V8c1.146 1.018 2.922 1.357 5 1.5V6c-3.017 0-5-2.654-5-5"
                              />
                            </svg>
                          </a>

                          <a
                            :href="event.speaker.youtube"
                            target="_blank"
                            v-if="event.speaker.youtube"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                              />
                            </svg>
                          </a>
                        </div>
                        <p
                          v-if="event.speaker.title"
                          class="text-xs text-muted-foreground mb-2"
                        >
                          {{ event.speaker.title }}
                        </p>
                        <div class="space-y-1 text-xs text-muted-foreground">
                          <div
                            v-if="event.speaker.institution"
                            class="flex items-center gap-1"
                          >
                            <svg
                              class="stroke-current h-3 w-3 text-amber-300"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
                              />
                              <path d="M6 12h4" />
                              <path d="M6 16h4" />
                              <path d="M16 12h2" />
                              <path d="M16 16h2" />
                              <path d="M16 20h2" />
                              <path d="M6 20h4" />
                              <path d="M14 12h2" />
                              <path d="M14 16h2" />
                            </svg>
                            <span class="truncate">{{
                              event.speaker.institution
                            }}</span>
                          </div>
                          <p v-if="event.speaker.specialty">
                            <strong>Especialidad:</strong>
                            {{ event.speaker.specialty }}
                          </p>
                          <p v-if="event.speaker.topic">
                            <strong>Enfoque:</strong> {{ event.speaker.topic }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END -->
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
