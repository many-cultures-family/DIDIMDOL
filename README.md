# 디딤돌

항목 검증 + LLM/번역기 풀이 + LLM 수정 제안을 제공하는 웹 서비스.
기술 스택 근거는 `docs/STACK.md` (A안: React + FastAPI).

## 폴더 구조

```
DIDIMDOL/
  frontend/   # React(Vite) 화면 (실행 방법은 frontend/README.md)
  backend/    # FastAPI 서버
  test/
```

## 버전 선정

설치는 모두 Homebrew로 한다.

| 구분 | 도구 | 버전 | 비고 |
| --- | --- | --- | --- |
| 화면 | Node.js | 24 LTS | `brew install node@24` |
| 화면 | Vite | 8.3.4 | `package.json`에 정확히 고정 |
| 화면 | React | 19.3 | 19.3.1 설치, 정확히 고정 |
| 화면 | MUI | 9.5 | 9.5.0 설치, 정확히 고정. Mantine은 쓰지 않는다 |
| 서버 | Python | 3.14 | |
| 서버 | FastAPI | 0.162.0 | |
| 서버 | Uvicorn | 0.54.0 | 서버는 Uvicorn으로 실행 |

## 개발 환경 결정

| 항목 | 결정 |
| --- | --- |
| 화면 언어 | JavaScript (TypeScript 쓰지 않음) |
| UI 도구 | MUI로 확정, Mantine 제외 |
| 화면 패키지 관리 | npm. `package-lock.json`을 커밋한다 |
| 포트 | 서버 8080, Vite 5173 |
| 서버 연결 | Vite proxy 사용 (`/api` → `http://localhost:8080`) |
| 서버 실행 | Uvicorn |
| 서버 린트·포맷 | ruff 하나로 둘 다 |
| 화면 린트 | Vite 템플릿 기본 ESLint만 그대로 사용 |
| 화면 포맷 | Prettier는 구성하지 않는다 |
| 테스트 | 서버는 지금 넣고, 화면 테스트는 나중에 넣는다 |
| Python venv 위치 | 백엔드 폴더 루트 (`backend/`) |
| `.gitignore` | 그대로 둔다 |

## 실행

화면: [frontend/README.md](frontend/README.md) 참고. 개발 서버는 `http://localhost:5173`.
서버: Uvicorn으로 `8080` 포트에서 실행한다.


## 백엔드 개발 환경 설정

### 1. 가상환경 생성

프로젝트 최상위 디렉터리에서 실행합니다.

```bash
python3 -m venv .venv
```

### 2. 가상환경 활성화

macOS / Linux:

```bash
source .venv/bin/activate
```

### 3. 라이브러리 설치

프로젝트 최상위 디렉터리에서 실행합니다.

```bash
pip install -r requirements.txt
```

### 4. 서버 실행

```bash
cd backend
uvicorn main:app --reload
```

### 5. 가상환경 종료

```bash
deactivate
```
