import type { APIRoute } from "astro";
import { NEXT_PUBLIC_API_URL, REGISTER_COOKIE_NAME } from "astro:env/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get(REGISTER_COOKIE_NAME)?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "No estas autorizado para continuar." }),
        {
          status: 401,
        }
      );
    }

    const formData = await request.formData();

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/register/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Error al completar el registro.");
    }

    cookies.delete(REGISTER_COOKIE_NAME, { path: "/" });

    return new Response(
      JSON.stringify({
        message:
          "¡Registro exitoso! Tu inscripción está pendiente de revisión.",
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en /api/register-user:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
