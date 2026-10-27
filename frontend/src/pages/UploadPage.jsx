import { useState } from 'react'
import { Alert, Button, Paper, Stack, Typography } from '@mui/material'
import { uploadDocument } from '../api/documents.js'

export default function UploadPage({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit() {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const { documentId } = await uploadDocument(file)
      onUploaded(documentId)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            서류 검증하기
          </Typography>
          <Typography color="text.secondary">
            작성한 서류를 올리면 항목별로 확인하고 쉬운 말로 풀어 드려요.
          </Typography>
        </div>

        <Button variant="outlined" component="label">
          {file ? file.name : '파일 선택'}
          <input
            hidden
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        <Button variant="contained" size="large" disabled={!file || loading} onClick={handleSubmit}>
          {loading ? '검증 중…' : '검증 시작'}
        </Button>
      </Stack>
    </Paper>
  )
}
