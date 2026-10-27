import { useState } from 'react'
import Layout from './components/Layout.jsx'
import UploadPage from './pages/UploadPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

// 화면은 두 개뿐이라 라우터 없이 documentId 유무로 전환한다.
// documentId 가 없으면 업로드 화면, 있으면 해당 서류의 검증 결과 화면.
export default function App() {
  const [documentId, setDocumentId] = useState(null)

  return (
    <Layout onHome={() => setDocumentId(null)}>
      {documentId ? (
        <ResultPage key={documentId} documentId={documentId} />
      ) : (
        <UploadPage onUploaded={setDocumentId} />
      )}
    </Layout>
  )
}
