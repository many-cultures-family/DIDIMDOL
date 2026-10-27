// 서류 검증 관련 API.
// 엔드포인트 경로·요청/응답 형식은 백엔드와 아직 확정 전 (확인 필요).
// 확정되면 여기만 고치면 되도록 화면 코드는 이 함수들만 쓴다.
import { request, USE_MOCK } from './client.js'
import * as mock from '../mocks/documents.js'

/** 서류 업로드 → { documentId } */
export function uploadDocument(file) {
  if (USE_MOCK) return mock.uploadDocument(file)
  const form = new FormData()
  form.append('file', file)
  return request('/documents', { method: 'POST', body: form })
}

/**
 * 항목별 검증 결과 + 풀이(lang 언어) + 수정 제안
 * → { documentId, items: [{ id, label, value, status, explanation, suggestion, suggestionAccepted }] }
 */
export function getValidationResult(documentId, lang) {
  if (USE_MOCK) return mock.getValidationResult(documentId, lang)
  return request(`/documents/${documentId}/validation?lang=${encodeURIComponent(lang)}`)
}

/** 수정 제안 반영 요청. 반영 여부는 서버가 검증 후 결정 → 갱신된 item */
export function acceptSuggestion(documentId, itemId) {
  if (USE_MOCK) return mock.acceptSuggestion(documentId, itemId)
  return request(`/documents/${documentId}/items/${itemId}/accept`, { method: 'POST' })
}
