from fastapi import APIRouter
from starlette.responses import JSONResponse
from celery_tasks.tasks import populateRSS_task


router = APIRouter(prefix='/trends', tags=['RSS'], responses={404: {"description": "Not found"}})

@router.post("/rss/{c_code}")
async def root(c_code: str):
    """
    It just returns the task id, which can later be used to get the result
    :param c_code: country code to get RSS
    """
    task = populateRSS_task.apply_async(kwargs={'c_code':c_code})
    
    return JSONResponse({"task_id": task.id})