import type { APIRoute } from "astro";
import {
  PERUDEVS_API_KEY,
  PERUDEVS_URL,
  REGISTER_COOKIE_NAME,
} from "astro:env/server";

async function buscarDatosDNI(dni: string) {
  const apiKey = PERUDEVS_API_KEY;

  if (!apiKey) {
    console.error("Error: PERUDEVS_API_KEY no esta definida en .env");
    throw new Error("Configuración de servidor incompleta.");
  }

  const url = `${PERUDEVS_URL}dni/simple?document=${dni}&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error de la API externa: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.estado === true) {
      return data.resultado;
    } else {
      console.warn(`API (DNI: ${dni}): ${data.mensaje}`);
      return null;
    }
  } catch (error) {
    console.error("Error de red al consultar:", error);
    throw new Error("Error de conexión con la API de DNI.");
  }
}

export const GET: APIRoute = async ({ params, cookies }) => {
  const token = cookies.get(REGISTER_COOKIE_NAME)?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "No estas autorizado." }), {
      status: 401,
    });
  }

  const { dni } = params;

  if (!dni || dni.length !== 8 || !/^\d+$/.test(dni)) {
    return new Response(
      JSON.stringify({
        error: "El formato del DNI debe ser de 8 dígitos numéricos.",
      }),
      { status: 400 }
    );
  }

  try {
    const datosUsuario = await buscarDatosDNI(dni);

    if (datosUsuario) {
      return new Response(JSON.stringify(datosUsuario), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "DNI no encontrado." }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error(`Error en API Route /api/users/${dni}:`, error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      {
        status: 500,
      }
    );
  }
};
