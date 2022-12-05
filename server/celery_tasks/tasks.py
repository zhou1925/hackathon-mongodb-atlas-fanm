import pymongo
import xmltodict
import requests
from celery import shared_task


def populateData(country_code: str):
    """ 
    get google trends RSS by country code
    convert xml to dict and insert data to MongoDB 
    :param country_code: country code to get RSS
    """
    r = requests.get(f'https://trends.google.es/trends/trendingsearches/daily/rss?geo={country_code}')
    data = xmltodict.parse(r.content)
    
    mongo_pass='28DsIhH0mAqKKvfV'
    client = pymongo.MongoClient(f"mongodb+srv://mongouser:{mongo_pass}@cluster0.lvnnmax.mongodb.net/?retryWrites=true&w=majority")
    db = client['rss-google-db']
    collection = db['rss-test']

    for item in data['rss']['channel']['item']:
        # set dict with empty data
        item_data = {}
        # fill dict
        item_data['title'] = item['title']
        item_data['approx_traffic'] = item['ht:approx_traffic']
        # insert to mongo
        collection.insert_one(item_data)

@shared_task(bind=True,autoretry_for=(Exception,), retry_backoff=True, retry_kwargs={"max_retries": 5})
def populateRSS_task(self, **kwargs):
    """
    task receive a country code and get and insert data to mongodb
    :param c_code: get c_code from **kwargs
    """
    country_code = kwargs['c_code']
    populateData(country_code)
    return country_code
