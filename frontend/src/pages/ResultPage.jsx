import { useEffect, useState } from 'react'
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { acceptSuggestion, getValidationResult } from '../api/documents.js'
import ValidationItemCard from '../components/ValidationItemCard.jsx'

// 풀이를 받을 언어 목록 (실제 지원 언어는 백엔드와 확정 필요)
const LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh', label: '中文' },
]

export default function ResultPage({ documentId }) {
  const [lang, setLang] = useState('ko')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [accepting, setAccepting] = useState(false)

  useEffect(() => {
    let ignore = false
    getValidationResult(documentId, lang)
      .then((data) => !ignore && setResult(data))
      .catch((e) => !ignore && setError(e.message))
    return () => {
      ignore = true
    }
  }, [documentId, lang])

  function handleLangChange(nextLang) {
    setResult(null)
    setError(null)
    setLang(nextLang)
  }

  async function handleAccept(itemId) {
    setAccepting(true)
    try {
      // 서버가 검증한 뒤 갱신된 항목을 돌려준다
      const updated = await acceptSuggestion(documentId, itemId)
      setResult((prev) => ({
        ...prev,
        items: prev.items.map((it) => (it.id === itemId ? updated : it)),
      }))
    } catch (e) {
      setError(e.message)
    } finally {
      setAccepting(false)
    }
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          검증 결과
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="lang-label">풀이 언어</InputLabel>
          <Select
            labelId="lang-label"
            label="풀이 언어"
            value={lang}
            onChange={(e) => handleLangChange(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <MenuItem key={l.code} value={l.code}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {!result && !error && <CircularProgress sx={{ alignSelf: 'center' }} />}

      {result?.items.map((item) => (
        <ValidationItemCard
          key={item.id}
          item={item}
          accepting={accepting}
          onAcceptSuggestion={handleAccept}
        />
      ))}
    </Stack>
  )
}
