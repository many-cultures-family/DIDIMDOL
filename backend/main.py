from fastapi import FastAPI

app = FastAPI(title="디딤돌")


@app.get("/health")
def health():
    return {"status": "ok"}
