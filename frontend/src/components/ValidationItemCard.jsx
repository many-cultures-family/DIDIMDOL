import { Alert, Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

const STATUS = {
  pass: { label: '통과', color: 'success' },
  warn: { label: '확인 필요', color: 'warning' },
  fail: { label: '수정 필요', color: 'error' },
}

// 항목 하나의 검증 결과 + LLM/번역기 풀이 + LLM 수정 제안
// AI 수정 제안은 "제안"으로만 보여 주고, 반영 여부는 사용자가 누른 뒤 서버가 결정한다.
export default function ValidationItemCard({ item, onAcceptSuggestion, accepting }) {
  const status = STATUS[item.status] ?? STATUS.warn

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {item.label}
          </Typography>
          <Chip size="small" label={status.label} color={status.color} />
        </Stack>

        {/* 값은 서버에서 마스킹된 상태로 내려온다 */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          입력값: {item.value || '(비어 있음)'}
        </Typography>

        {item.explanation && (
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              풀이
            </Typography>
            <Typography variant="body2">{item.explanation}</Typography>
          </Box>
        )}

        {item.suggestion && (
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                disabled={accepting || item.suggestionAccepted}
                onClick={() => onAcceptSuggestion(item.id)}
              >
                {item.suggestionAccepted ? '반영됨' : '반영'}
              </Button>
            }
          >
            AI 수정 제안: {item.suggestion}
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
