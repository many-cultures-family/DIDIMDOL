// FastAPI 서버 호출용 fetch 래퍼.
// 개발 중에는 vite.config.js 프록시가 /api 를 FastAPI로 넘긴다.
// LLM(Gemini) 호출은 프론트에서 하지 않는다. 항상 FastAPI를 거친다.

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function request(path, { body, ...options } = {}) {
  const isForm = body instanceof FormData
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: isForm ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    body: isForm || body === undefined ? body : JSON.stringify(body),
  })

  if (!res.ok) {
    let message = `요청 실패 (${res.status})`
    try {
      const data = await res.json()
      // FastAPI 기본 에러 형식: { "detail": ... }
      if (typeof data.detail === 'string') message = data.detail
    } catch {
      // 본문이 JSON이 아니면 기본 메시지 사용
    }
    throw new Error(message)
  }

  return res.status === 204 ? null : res.json()
}
