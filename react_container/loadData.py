from django.apps import AppConfig

from react_container.models import Restaurant

class DataLoader():
    def Load_Events_Data(self):
        from .models import Event
        import pandas as pd
        from sodapy import Socrata
        import json
        import datetime
        import parsedatetime as pdt
        client = Socrata("data.calgary.ca", None)
        results = client.get("n625-9k5x", limit=2000)
        results_df = pd.DataFrame.from_records(results)
        results_df = results_df[['address', 'notes', 'title', 'event_type', 'more_info_url', 'all_dates', 'longitude', 'latitude', 'host_organization']]
        results_df = results_df[results_df.host_organization != "City of Calgary"]
        results_records = results_df.to_dict('records')
        p = pdt.Calendar()
        result_instances = []
        for result in results_records:
            time_struct, parse_status = p.parse(result['all_dates'].split('<br>')[0])
            result_instances.append(Event(
                title=result['title'],
                notes=result['notes'],
                address=result['address'],
                event_type=result['event_type'],
                url=result['more_info_url'],
                all_dates=json.dumps(result['all_dates'].split('<br>')),
                first_date= datetime.datetime(*time_struct[:6]),
                latitude=float(result['latitude']),
                longitude=float(result['longitude'])
            ))
        
        Event.objects.all().delete()
        Event.objects.bulk_create(result_instances)
    
    def Load_Restaurants_Data(self):
        from .models import Event
        import pandas as pd
        import csv
        import geocoder

        result_instances = []
        with open('react_container/files/CalgaryRestaurantsLong.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)
            for row in csv_reader:
                result_instances.append(Restaurant(name=row[0], 
                                                   address=row[1], 
                                                   phone=row[2], 
                                                   website = row[3], 
                                                   rating = row[4], 
                                                   pricing = row[5],
                                                   description = row[6], 
                                                   tags = row[7], 
                                                   image_urls = row[8], 
                                                   latitude = row[9], 
                                                   longitude = row[10]))
                
        Restaurant.objects.all().delete()
        print(result_instances[0])
        Restaurant.objects.bulk_create(result_instances)