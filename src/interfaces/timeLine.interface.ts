export interface Speaker {
  name: string;
  title?: string;
  image?: string;
  institution?: string;
  orcid?: string;
  specialty?: string;
  topic?: string;
  linkedin?: string;
  website?: string;
  tiktok?: string;
  youtube?: string;
}

export interface ScheduleEvent {
  time: string;
  location: string;
  title: string;
  description: string;
  type: "ponencia" | "talleres" | "ceremonia" | "descanso";
  speaker?: Speaker;
}
